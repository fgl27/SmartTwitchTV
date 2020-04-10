package com.fgl27.twitch.services;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Point;
import android.os.Build;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;

import com.fgl27.twitch.Constants;
import com.fgl27.twitch.R;
import com.fgl27.twitch.Tools;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import net.grandcentrix.tray.AppPreferences;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Objects;

import static com.google.gson.JsonParser.parseString;

public class NotificationService extends Service {

    private static final String TAG = "STTV_Notification";

    public HandlerThread NotificationThread;
    public Handler NotificationHandler;
    ArrayList<String> currentLive = new ArrayList<>();
    ArrayList<String> oldLive = new ArrayList<>();
    private boolean isRunning;
    private boolean Notify;
    private Context context;
    private String UserId;
    private String Channels;
    private int ChannelsOffset;
    private int width;
    private boolean screenOn = true;
    BroadcastReceiver mReceiver = null;

    AppPreferences appPreferences;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        if (Objects.equals(intent.getAction(), Constants.ACTION_NOTIFY_STOP)) StopService();
        else if (Objects.equals(intent.getAction(), Constants.ACTION_NOTIFY_START) && !isRunning) start();
        else if (Objects.equals(intent.getAction(), Constants.ACTION_SCREEN_OFF) && !isRunning) screenOn = false;
        else if (Objects.equals(intent.getAction(), Constants.ACTION_SCREEN_ON) && !isRunning) screenOn = true;

        return START_NOT_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (NotificationHandler != null) NotificationHandler.removeCallbacksAndMessages(null);
        isRunning = false;
        Notify = false;
        munregisterReceiver();
    }

    public void StopService() {
        if (NotificationHandler != null) NotificationHandler.removeCallbacksAndMessages(null);
        isRunning = false;
        Notify = false;
        munregisterReceiver();
        stopForeground(true);
        stopSelf();
    }

    @Override
    public void onCreate() {
        super.onCreate();
        context = getApplicationContext();

        startNotification();
    }

    public void startNotification() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationCompat.Builder builder = NotificationBuilder("Notification service", TAG, context);

            if (builder != null) startForeground(100, builder.build());
            else StopService();
        }
    }

    public void start() {
        super.onCreate();
        context = getApplicationContext();

        startNotification();

        appPreferences = new AppPreferences(context);

        UserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);

        if (isRunning || !Tools.getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, appPreferences) || !screenOn || UserId == null) {
            StopService();
            return;
        }

        if (NotificationThread == null || NotificationHandler == null) {
            NotificationThread = new HandlerThread("NotificationThread");
            NotificationThread.start();
            NotificationHandler = new Handler(NotificationThread.getLooper());
        }

        Notify = false;
        isRunning = true;
        setWidth();

        currentLive = new ArrayList<>();
        oldLive = new ArrayList<>();
        appPreferences.put(Constants.PREF_NOTIFY_OLD, new Gson().toJson(oldLive));

        mregisterReceiver();

        init(3 * 1000);//call the first time very fast to load defaults
    }

    public void mregisterReceiver() {
        try {
            munregisterReceiver();
            IntentFilter filter = new IntentFilter(Intent.ACTION_SCREEN_ON);
            filter.addAction(Intent.ACTION_SCREEN_OFF);
            mReceiver = new ScreenReceiver();
            registerReceiver(mReceiver, filter);
        } catch (Exception e) {
            Log.w(TAG, "mregisterReceiver Exception ", e);
        }
    }

    public void munregisterReceiver() {
        try {
            if (mReceiver != null) unregisterReceiver(mReceiver);
            mReceiver = null;
        } catch (Exception e) {
            Log.w(TAG, "munregisterReceiver Exception ", e);
        }
    }

    @TargetApi(26)
    public NotificationCompat.Builder NotificationBuilder(String title, String id, Context context) {
        NotificationManager mNotifyManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

        NotificationChannel mChannel = new NotificationChannel(id, title, NotificationManager.IMPORTANCE_NONE);
        if (mNotifyManager != null) {
            mNotifyManager.createNotificationChannel(mChannel);
        } else return null;

        return new NotificationCompat.Builder(context, id)
                .setContentTitle(title)
                .setOngoing(true)
                .setSmallIcon(R.mipmap.ic_launcher)
                .setChannelId(id);
    }

    private void setWidth() {
        WindowManager window = (WindowManager) getSystemService(Context.WINDOW_SERVICE);
        if (window != null) {
            Point ScreenSize = Tools.ScreenSize(window.getDefaultDisplay());
            width = ScreenSize.y / 100;
        }
    }

    private void init(int timeout) {
        NotificationHandler.postDelayed(() -> {
            if (screenOn) DoNotifications();
            if (isRunning) init(1000 * 60 * 5);//it 5 min refresh
        }, timeout);
    }

    private void DoNotifications() {
        Channels = "";
        ChannelsOffset = 0;
        String url;
        boolean hasChannels = true;

        while (hasChannels) {//Get all user fallowed channels
            url = String.format(
                    Locale.US,
                    "https://api.twitch.tv/kraken/users/%s/follows/channels?limit=100&offset=%d&sortby=created_at&api_version=5",
                    UserId,
                    ChannelsOffset
            );

            hasChannels = GetChannels(url);
        }
        if (Channels.equals("")) return;

        Channels = Channels.substring(0, Channels.length() - 1);

        Tools.ResponseObj response;
        JsonObject obj;
        JsonArray streams;
        String id;
        String game;
        boolean isLive;
        ArrayList<NotifyList> result = new ArrayList<>();
        currentLive = new ArrayList<>();

        url = String.format(
                Locale.US,
                "https://api.twitch.tv/kraken/streams/?channel=%s&limit=100&offset=0&stream_type=all&api_version=5",
                Channels
        );

        for (int i = 0; i < 3; i++) {

            response = Tools.readUrl(url, 3000, 2, null);

            if (response != null) {

                if (response.getStatus() == 200) {
                    obj = parseString(response.getResponseText()).getAsJsonObject();

                    if (obj.isJsonObject() && !obj.get("streams").isJsonNull()) {

                        streams = obj.get("streams").getAsJsonArray();//Get the follows array

                        if (streams.size() < 1) return;

                        for (int j = 0; j < streams.size(); j++) {

                            obj = streams.get(j).getAsJsonObject();//Get the position in the follows array

                            if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                                game = !obj.get("game").isJsonNull() ? obj.get("game").getAsString() : "";
                                isLive = !obj.get("broadcast_platform").isJsonNull() && (obj.get("broadcast_platform").getAsString()).contains("live");
                                obj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                                if (obj.isJsonObject() && !obj.get("_id").isJsonNull()) {

                                    id = obj.get("_id").getAsString();
                                    currentLive.add(id);

                                    if (Notify && !oldLive.contains(id)) {
                                        result.add(
                                                new NotifyList(
                                                        game,
                                                        !obj.get("display_name").isJsonNull() ? obj.get("display_name").getAsString() : "",
                                                        !obj.get("logo").isJsonNull() ? obj.get("logo").getAsString() : "",
                                                        !obj.get("status").isJsonNull() ? obj.get("status").getAsString() : "",
                                                        isLive
                                                )
                                        );
                                    }
                                }
                            }
                        }

                    }
                    break;
                }

            }
        }

        if (Notify && result.size() > 0) {
            for (int i = 0; i < result.size(); i++) {
                DoNotification(result.get(i), i);
            }
        } else Notify = true;

        oldLive = new ArrayList<>();
        oldLive.addAll(currentLive);

        appPreferences.put(Constants.PREF_NOTIFY_OLD, new Gson().toJson(oldLive));
    }

    private void DoNotification(NotifyList result, int delay) {
        NotificationHandler.postDelayed(() -> DoToast(result), 5000 * delay);
    }

    @SuppressLint("InflateParams")
    private void DoToast(NotifyList result) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        View layout;
        if (inflater != null) {
            layout = inflater.inflate(R.layout.custom_toast, null);
        } else return;

        LinearLayout layout_text = layout.findViewById(R.id.text_holder);
        layout_text.getLayoutParams().width = width * 75;
        layout_text.requestLayout();

        TextView name = layout.findViewById(R.id.name);
        name.setText(result.getName());

        ImageView imageRerun = layout.findViewById(R.id.rerun);
        imageRerun.setImageResource(result.isLive() ? R.drawable.circle : R.drawable.ic_refresh);

        TextView title = layout.findViewById(R.id.title);
        title.setText(result.getTitle().trim());

        TextView game = layout.findViewById(R.id.game);
        game.setText(result.getGame());

        URL newUrl = null;
        Bitmap bmp = null;
        try {
            newUrl = new URL(result.getLogo());
        } catch (MalformedURLException ignored) {
        }

        if (newUrl != null) {
            try {
                bmp = BitmapFactory.decodeStream(newUrl.openConnection().getInputStream());
            } catch (IOException ignored) {
            }
        }

        ImageView image = layout.findViewById(R.id.image);
        if (bmp != null) {
            if (width > 0) bmp = Bitmap.createScaledBitmap(bmp, width * 18, width * 17, true);

            image.setImageBitmap(bmp);
        } else image.setImageResource(android.R.color.transparent);

        Toast toast = new Toast(getApplicationContext());
        toast.setGravity(Gravity.RIGHT | Gravity.TOP, 0, 20);
        toast.setDuration(Toast.LENGTH_LONG);
        toast.setView(layout);
        toast.show();
    }

    private boolean GetChannels(String url) {
        Tools.ResponseObj response;
        JsonObject obj;
        JsonArray follows;
        StringBuilder values = new StringBuilder();

        for (int i = 0; i < 3; i++) {

            response = Tools.readUrl(url, 3000, 2, null);

            if (response != null) {

                if (response.getStatus() == 200) {
                    obj = parseString(response.getResponseText()).getAsJsonObject();

                    if (obj.isJsonObject() && !obj.get("follows").isJsonNull()) {

                        follows = obj.get("follows").getAsJsonArray();//Get the follows array

                        if (follows.size() > 0)
                            ChannelsOffset += follows.size();
                        else return false;

                        for (int j = 0; j < follows.size(); j++) {

                            obj = follows.get(j).getAsJsonObject();//Get the position in the follows array

                            if (obj.isJsonObject() && !obj.get("channel").isJsonNull()) {

                                obj = obj.get("channel").getAsJsonObject(); //Get the channel obj in position

                                if (obj.isJsonObject() && !obj.get("_id").isJsonNull()) {
                                    values.append(obj.get("_id").getAsString()); //Get the channel id
                                    values.append(",");
                                }
                            }
                        }

                    }
                    break;
                }

            }
        }

        if (values.length() > 0) {
            Channels += values.toString();
            return true;
        }

        return false;
    }

    private static class NotifyList {
        private final String game;
        private final String name;
        private final String logo;
        private final String title;
        private final boolean live;

        public NotifyList(String game, String name, String logo, String title, boolean live) {
            this.game = game;
            this.name = name;
            this.logo = logo;
            this.title = title;
            this.live = live;
        }

        public String getGame() {
            return game;
        }

        public String getName() {
            return name;
        }

        public String getLogo() {
            return logo;
        }

        public String getTitle() {
            return title;
        }

        public boolean isLive() {
            return live;
        }
    }
}
