//
//  Event+EntityInteractable.swift
//  HelixPay
//
//  Created by Mien PV on 18/06/2024.
//

import Foundation
import CoreData

extension Event: EntityInteractable {
  typealias CDEntity = CDEvent

  static func getNSFetchRequest() -> NSFetchRequest<CDEntity> {
    CDEntity.fetchRequest()
  }

  func transformToCD(context: NSManagedObjectContext) throws -> CDEntity {
    let cdEntity = CDEntity(context: context)
    cdEntity.id = id
    cdEntity.name = name
    cdEntity.icon = icon
    cdEntity.category = category
    cdEntity.date = date
    cdEntity.isAllDay = isAllDay
    cdEntity.repeatType = repeatType.rawValue
    cdEntity.reminders = reminders.map { $0.rawValue }

    return cdEntity
  }

  static func initFromCD(_ cdEntity: CDEntity) throws -> Self {
    Event(
      id: cdEntity.id ?? "",
      name: cdEntity.name ?? "",
      icon: cdEntity.icon ?? "",
      category: cdEntity.category ?? "",
      date: cdEntity.date ?? Date(),
      isAllDay: cdEntity.isAllDay,
      repeatType: RepeatType(rawValue: cdEntity.repeatType ?? "") ?? .none,
      reminders: cdEntity.reminders?.compactMap { ReminderType(rawValue: $0) } ?? []
    )
  }
}
