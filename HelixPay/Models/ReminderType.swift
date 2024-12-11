//
//  ReminderType.swift
//  HelixPay
//
//  Created by Mien PV on 18/06/2024.
//

import Foundation

enum ReminderType: String, CaseIterable {
  case atFinish = "AT_FINISH"
  case minutes5 = "MINUTES_5"
  case minutes15 = "MINUTES_15"
  case minutes30 = "MINUTES_30"
  case hour1 = "HOUR_1"
  case hour2 = "HOUR_2"
  case hour3 = "HOUR_3"
  case day1 = "DAY_1"
  case day2 = "DAY_2"
  case week1 = "WEEK_1"

  var title: String {
    switch self {
    case .atFinish:
      return "When the countdown finishes"
    case .minutes5:
      return "5 minutes before"
    case .minutes15:
      return "15 minutes before"
    case .minutes30:
      return "30 minutes before"
    case .hour1:
      return "1 hour before"
    case .hour2:
      return "2 hours before"
    case .hour3:
      return "3 hours before"
    case .day1:
      return "1 day before"
    case .day2:
      return "2 days before"
    case .week1:
      return "1 week before"
    }
  }
}
