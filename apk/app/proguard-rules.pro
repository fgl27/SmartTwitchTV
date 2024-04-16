# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
#-keepclassmembers class fqcn.of.javascript.interface.for.webview {
#   public *;
#}

# Uncomment this to preserve the line number information for
# debugging stack traces.
#-keepattributes SourceFile,LineNumberTable

# If you keep the line number information, uncomment this to
# hide the original source file name.
#-renamesourcefileattribute SourceFile

# Gson uses generic type information stored in a class file when working with
# fields. Proguard removes such information by default, keep it.
-keepattributes Signature

# This is also needed for R8 in compat mode since multiple
# optimizations will remove the generic signature such as class
# merging and argument removal. See:
# https://r8.googlesource.com/r8/+/refs/heads/main/compatibility-faq.md#troubleshooting-gson-gson
-keep class com.google.gson.reflect.TypeToken { *; }
-keep class * extends com.google.gson.reflect.TypeToken

# Optional. For using GSON @Expose annotation
-keepattributes AnnotationDefault,RuntimeVisibleAnnotations

#Crashlytics
-keepattributes SourceFile,LineNumberTable        # Keep file names and line numbers.
-keep public class * extends java.lang.Exception  # Optional: Keep custom exceptions.

-keepattributes InnerClasses
-keep class com.fgl27.twitch.Tools**
-keepclassmembers class com.fgl27.twitch.Tools** {
    *;
}

-keep class com.fgl27.twitch.PlayerActivity**
-keepclassmembers class com.fgl27.twitch.PlayerActivity** {
    *;
}

-keep class com.fgl27.twitch.BlackListMediaCodecSelector**
-keepclassmembers class com.fgl27.twitch.BlackListMediaCodecSelector** {
    *;
}

-keep class com.fgl27.twitch.Constants**
-keepclassmembers class com.fgl27.twitch.Constants** {
    *;
}

-keep class com.fgl27.twitch.DataSource.mDefaultHttpDataSourceFactory**
-keepclassmembers class com.fgl27.twitch.DataSource.mDefaultHttpDataSourceFactory** {
    *;
}

-keep class com.fgl27.twitch.DataSource.mDefaultHttpDataSource**
-keepclassmembers class com.fgl27.twitch.DataSource.mDefaultHttpDataSource** {
    *;
}

-keep class com.fgl27.twitch.BootBroadcastReceiver**
-keepclassmembers class com.fgl27.twitch.BootBroadcastReceiver** {
    *;
}

-keep class com.fgl27.twitch.notification.NotificationService**
-keepclassmembers class com.fgl27.twitch.notification.NotificationService** {
    *;
}

-keep class com.fgl27.twitch.notification.NotificationUtils**
-keepclassmembers class com.fgl27.twitch.notification.NotificationUtils** {
    *;
}

-keep class com.fgl27.twitch.notification.ScreenReceiver**
-keepclassmembers class com.fgl27.twitch.notification.ScreenReceiver** {
    *;
}

-keep class com.fgl27.twitch.channels.ChannelsUtils**
-keepclassmembers class com.fgl27.twitch.channels.ChannelsUtils** {
    *;
}

-keep class com.fgl27.twitch.channels.SyncChannelJobService**
-keepclassmembers class com.fgl27.twitch.channels.SyncChannelJobService** {
    *;
}
