//
//  EntityInteractable.swift
//

import Foundation
import CoreData

public protocol EntityInteractable {
  associatedtype CDEntity: NSManagedObject
  
  static var entityName: String { get }
  static var primaryKey: String { get }
  
  static func getNSFetchRequest() -> NSFetchRequest<CDEntity>
  static func getNSFetchRequestResult() -> NSFetchRequest<NSFetchRequestResult>
  
  @discardableResult
  func transformToCD(context: NSManagedObjectContext) throws -> CDEntity
  static func initFromCD(_ cdEntity: CDEntity) throws -> Self
  
}

extension EntityInteractable {
  public static var entityName: String {
    "CD\(String(describing: self))"
  }
  
  public static var primaryKey: String {
    "id"
  }
  
  public static func getNSFetchRequestResult() -> NSFetchRequest<NSFetchRequestResult> {
    NSFetchRequest<NSFetchRequestResult>(entityName: entityName)
  }
}
