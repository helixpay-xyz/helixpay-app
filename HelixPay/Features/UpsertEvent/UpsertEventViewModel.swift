//
//  UpsertEventViewModel.swift
//  HelixPay
//
//  Created by Mien PV on 30/03/2024.
//

import Foundation

@MainActor
class UpsertEventViewModel: ObservableObject {
  @Published var eventName = ""
  @Published var icon: String? = "is1_1"
  @Published var category: String?
  @Published var date: Date = Date()
  @Published var time: Date = Date()
  @Published var isAllDay = false
  @Published var repeatType: RepeatType = .none
  @Published var reminders: [ReminderType] = [.atFinish]
}
