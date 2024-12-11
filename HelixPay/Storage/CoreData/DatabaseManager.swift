//
//  DatabaseManager.swift
//

import Foundation
import CoreData

public enum ContextType {
  case main
  case background
}

public protocol DatabaseManager {
  func insert<Entity: EntityInteractable>(entity: Entity, in contextType: ContextType) throws
  
  func insert<Entity: EntityInteractable>(entities: [Entity], in contextType: ContextType) throws
  
  func getList<Entity: EntityInteractable>(
    predicate: NSPredicate?,
    sortDescriptors: [NSSortDescriptor]?,
    fetchLimit: Int?
  ) throws -> [Entity]
  
  func delete<Entity: EntityInteractable>(
    _ dumpType: Entity.Type,
    predicate: NSPredicate,
    in contextType: ContextType
  ) throws
  
  func removeAll<Entity: EntityInteractable>(
    _ dumpType: Entity.Type,
    in contextType: ContextType
  ) throws
}

public extension DatabaseManager {
  func getList<Entity: EntityInteractable>(
    predicate: NSPredicate? = nil,
    sortDescriptors: [NSSortDescriptor]? = nil,
    fetchLimit: Int? = nil
  ) throws -> [Entity] {
    try getList(
      predicate: predicate,
      sortDescriptors: sortDescriptors,
      fetchLimit: fetchLimit
    )
  }
}
