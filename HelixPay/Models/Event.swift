//
//  Event.swift
//  HelixPay
//
//  Created by Mien PV on 18/06/2024.
//

import Foundation

struct Event {
  let id: String
  var name: String
  var icon: String
  var category: String
  var date: Date
  var isAllDay: Bool
  var repeatType: RepeatType
  var reminders: [ReminderType]

  init(
    id: String = UUID().uuidString,
    name: String,
    icon: String,
    category: String,
    date: Date,
    isAllDay: Bool,
    repeatType: RepeatType,
    reminders: [ReminderType]
  ) {
    self.id = id
    self.name = name
    self.icon = icon
    self.category = category
    self.date = date
    self.isAllDay = isAllDay
    self.repeatType = repeatType
    self.reminders = reminders
  }
}
