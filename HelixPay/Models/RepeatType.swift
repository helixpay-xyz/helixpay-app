//
//  RepeatType.swift
//  HelixPay
//
//  Created by Mien PV on 18/06/2024.
//

import Foundation

enum RepeatType: String, CaseIterable {
  case none = "NONE"
  case daily = "DAILY"
  case weekly = "WEEKLY"
  case monthly = "MONTHLY"
  case yearly = "YEARLY"

  var title: String {
    switch self {
    case .none:
      return "None"
    case .daily:
      return "Daily"
    case .weekly:
      return "Weekly"
    case .monthly:
      return "Monthly"
    case .yearly:
      return "Yearly"
    }
  }
}
