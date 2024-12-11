//
//  CrashManager.swift
//

import Foundation
import FirebaseCrashlytics

final class CrashManager {
  static let shared = CrashManager()
  
  private init() {
#if DEBUG
    Crashlytics.crashlytics()
      .setCrashlyticsCollectionEnabled(false)
#else
    Crashlytics.crashlytics()
      .setCrashlyticsCollectionEnabled(true)
#endif
  }
  
  func setUserID(userID: String) {
    Crashlytics.crashlytics().setUserID(userID)
  }
  
  func log(message: String) {
    Crashlytics.crashlytics().log(message)
  }
  
  func report(_ error: Error) {
    Crashlytics.crashlytics().record(error: error)
  }
}
