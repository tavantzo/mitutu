package com.mitutu;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.admob.RNFirebaseAdMobPackage; //Firebase AdMob
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // Firebase Analytics
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // Firebase Auth
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage; // Firebase Remote Config
import io.invertase.firebase.crash.RNFirebaseCrashPackage; // Firebase Crash Reporting
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // Firebase Realtime Database
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // Firebase Firestore
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
import io.invertase.firebase.perf.RNFirebasePerformancePackage; // Firebase Performance
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // Firebase Storage
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceInfo(),
          new RNFirebasePackage(),
          new RNFirebaseAnalyticsPackage(),
          new RNFirebaseAdMobPackage(),
          new RNFirebaseAuthPackage(),
          new RNFirebaseRemoteConfigPackage(),
          new RNFirebaseCrashPackage(),
          new RNFirebaseDatabasePackage(),
          new RNFirebaseFirestorePackage(),
          new RNFirebaseMessagingPackage(),
          new RNFirebasePerformancePackage(),
          new RNFirebaseStoragePackage(),
          new RNI18nPackage(),
          new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
