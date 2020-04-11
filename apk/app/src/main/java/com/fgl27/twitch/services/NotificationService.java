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
import com.google.gson.reflect.TypeToken;

import net.grandcentrix.tray.AppPreferences;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

import static com.google.gson.JsonParser.parseString;

public class NotificationService extends Service {

    private static final String TAG = "STTV_Notification";

    private HandlerThread NotificationThread;
    private Handler NotificationHandler;
    private HandlerThread ToastThread;
    private Handler ToastHandler;

    private ArrayList<String> oldLive = new ArrayList<>();

    private BroadcastReceiver mReceiver = null;
    private AppPreferences appPreferences;

    private boolean isRunning;
    private boolean Notify;
    private boolean screenOn = true;

    private Context context;

    private String UserId;
    private String Channels;

    private int ChannelsOffset;
    private int LayoutWidth;
    private int ImageSize;

    private float textSizeSmall;
    private float textSizeBig;

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

        String action = intent.getAction();

        if (Objects.equals(action, Constants.ACTION_NOTIFY_STOP)) StopService();
        else if (Objects.equals(action, Constants.ACTION_NOTIFY_START) && !isRunning)
            startService();
        else if (Objects.equals(action, Constants.ACTION_SCREEN_OFF)) screenOn = false;
        else if (Objects.equals(action, Constants.ACTION_SCREEN_ON)) {
            screenOn = true;
            if (isRunning) init(3 * 1000);
        }

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
            NotificationCompat.Builder builder = NotificationBuilder(getString(R.string.notification), TAG, context);

            if (builder != null) startForeground(100, builder.build());
            else StopService();
        }
    }

    public void startService() {
        super.onCreate();
        context = getApplicationContext();

        startNotification();

        appPreferences = new AppPreferences(context);

        UserId = Tools.getString(Constants.PREF_USER_ID, null, appPreferences);

        if (isRunning || !screenOn || UserId == null ||
                !Tools.getBoolean(Constants.PREF_NOTIFICATION_BACKGROUND, false, appPreferences)) {
            StopService();
            return;
        }

        if (NotificationThread == null || NotificationHandler == null) {
            NotificationThread = new HandlerThread("NotificationThread");
            NotificationThread.start();
            NotificationHandler = new Handler(NotificationThread.getLooper());
        }

        if (ToastThread == null || ToastHandler == null) {
            ToastThread = new HandlerThread("ToastThread");
            ToastThread.start();
            ToastHandler = new Handler(ToastThread.getLooper());
        }

        isRunning = true;

        oldLive = new ArrayList<>();
        String tempOldLive = Tools.getString(Constants.PREF_NOTIFY_OLD_LIST, null, appPreferences);

        if (tempOldLive != null) {
            oldLive = new Gson().fromJson(tempOldLive, new TypeToken<List<String>>() {}.getType());
        }

        Notify = oldLive.size() > 0;

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

        if (mNotifyManager != null) {
            mNotifyManager.createNotificationChannel(new NotificationChannel(id, title, NotificationManager.IMPORTANCE_NONE));
        } else return null;

        return new NotificationCompat.Builder(context, id)
                .setContentTitle(title)
                .setOngoing(true)
                .setSmallIcon(R.drawable.ic_refresh)
                .setChannelId(id);
    }

    private void setWidth() {
        WindowManager window = (WindowManager) getSystemService(Context.WINDOW_SERVICE);
        if (window != null) {
            Point ScreenSize = Tools.ScreenSize(window.getDefaultDisplay());
            float width = ScreenSize.y / 100.0f;
            int widthInt = ScreenSize.y / 100;

            LayoutWidth = widthInt * 75;
            ImageSize = widthInt * 18;
            textSizeSmall = 1.1f * width;
            textSizeBig = 1.22f * width;
        }
    }

    private void init(int timeout) {
        if (NotificationHandler != null) {
            NotificationHandler.removeCallbacksAndMessages(null);

            NotificationHandler.postDelayed(() -> {
                if (screenOn) DoNotifications();
                if (isRunning) init(1000 * 60 * 5);//it 5 min refresh
            }, timeout);
        }
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
        ArrayList<String> currentLive = new ArrayList<>();

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

                                        Bitmap bmp = null;
                                        if (!obj.get("logo").isJsonNull())
                                            bmp = GetBitmap(obj.get("logo").getAsString());

                                        result.add(
                                                new NotifyList(
                                                        game,
                                                        !obj.get("display_name").isJsonNull() ? obj.get("display_name").getAsString() : "",
                                                        bmp,
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
            setWidth();
            for (int i = 0; i < result.size(); i++) {
                DoNotification(result.get(i), i);
            }
        } else Notify = true;

        oldLive = new ArrayList<>();
        oldLive.addAll(currentLive);

        appPreferences.put(Constants.PREF_NOTIFY_OLD_LIST, new Gson().toJson(oldLive));
    }

    private void DoNotification(NotifyList result, int delay) {
        ToastHandler.postDelayed(() -> DoToast(result), 5000 * delay);
    }

    @SuppressLint("InflateParams")
    private void DoToast(NotifyList result) {
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);

        View layout;
        if (inflater != null) {
            layout = inflater.inflate(R.layout.custom_toast, null);
        } else return;

        LinearLayout layout_text = layout.findViewById(R.id.text_holder);
        if (LayoutWidth > 0) layout_text.getLayoutParams().width = LayoutWidth;
        layout_text.requestLayout();

        TextView name = layout.findViewById(R.id.name);
        name.setCompoundDrawablesWithIntrinsicBounds(
                result.isLive() ? R.drawable.circle : R.drawable.ic_refresh,
                0,
                0,
                0
        );
        name.setText(result.getName());

        TextView title = layout.findViewById(R.id.title);
        title.setText(result.getTitle().trim());

        TextView game = layout.findViewById(R.id.game);
        game.setText(result.getGame());

        ImageView image = layout.findViewById(R.id.image);
        Bitmap bmp = result.getLogo();
        if (bmp != null) {
            if (LayoutWidth > 0) bmp = Bitmap.createScaledBitmap(bmp, ImageSize, ImageSize, true);

            image.setImageBitmap(bmp);
        } else image.setImageResource(android.R.color.transparent);

        if (LayoutWidth > 0) {
            TextView now_live = layout.findViewById(R.id.now_live);
            now_live.setTextSize(textSizeBig);
            name.setTextSize(textSizeBig);
            title.setTextSize(textSizeSmall);
            game.setTextSize(textSizeSmall);
        }

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
                                    values.append(obj.get("_id").getAsString()).append(","); //Get the channel id
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

    private Bitmap GetBitmap(String url) {

        URL newUrl = null;
        Bitmap bmp = null;

        try {
            newUrl = new URL(url);
        } catch (MalformedURLException ignored) {
        }

        if (newUrl != null) {
            try {
                bmp = BitmapFactory.decodeStream(newUrl.openConnection().getInputStream());
            } catch (IOException ignored) {
            }
        }

        return bmp;
    }

    private static class NotifyList {
        private final String game;
        private final String name;
        private final Bitmap logo;
        private final String title;
        private final boolean live;

        public NotifyList(String game, String name, Bitmap logo, String title, boolean live) {
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

        public Bitmap getLogo() {
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
