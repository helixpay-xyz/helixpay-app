//
//  DefaultDatabaseManager.swift
//

import Foundation
import CoreData
import Combine

public class DefaultDatabaseManager: DatabaseManager {
  var persistence: CoreDataManager
  
  // MARK: - Inits
  public init(in persistence: CoreDataManager = CoreDataManager.shared) {
    self.persistence = persistence
  }
  
  public func insert<Entity: EntityInteractable>(
    entity: Entity,
    in contextType: ContextType = .main
  ) throws {
    try insert(entities: [entity], in: contextType)
  }
  
  public func insert<Entity: EntityInteractable>(
    entities: [Entity],
    in contextType: ContextType = .background
  ) throws {
    let context = getContext(in: contextType)
    
    try context.performAndWait {
      for entity in entities {
        let cdEntity = try entity.transformToCD(context: context)
        writeLog("[CoreData] insert: \(cdEntity)", logLevel: .debug, log: dbLog)
      }
      
      context.name = Entity.entityName
      try saveContext(context)
    }
  }
  
  public func getList<Entity>(
    predicate: NSPredicate?,
    sortDescriptors: [NSSortDescriptor]?,
    fetchLimit: Int?
  ) throws -> [Entity] where Entity: EntityInteractable {
    var entities: [Entity]!
    let context = getContext(in: .main)
    
    try context.performAndWait {
      let fetchRequest = Entity.getNSFetchRequest()
      fetchRequest.predicate = predicate
      fetchRequest.sortDescriptors = sortDescriptors
      
      if let fetchLimit {
        fetchRequest.fetchLimit = fetchLimit
      }
      
      writeLog("[CoreData] getList: \(fetchRequest)", logLevel: .debug, log: dbLog)
      let cdEntities = try context.fetch(fetchRequest)
      entities = try cdEntities.map { try Entity.initFromCD($0) }
    }
    
    return entities
  }
  
  public func delete<Entity: EntityInteractable>(
    _ dumpType: Entity.Type,
    predicate: NSPredicate,
    in contextType: ContextType
  ) throws {
    let fetchRequest = NSFetchRequest<NSFetchRequestResult>(entityName: Entity.entityName)
    fetchRequest.predicate = predicate
    
    writeLog("[CoreData] deleteEntities \(Entity.entityName) with predicate", log: dbLog)
    writeLog("[CoreData] deleteEntities: \(fetchRequest)", logLevel: .debug, log: dbLog)
    let batchDeleteRequest = NSBatchDeleteRequest(fetchRequest: fetchRequest)
    batchDeleteRequest.resultType = .resultTypeObjectIDs
    
    let context = getContext(in: contextType)
    context.name = Entity.entityName
    try executeContext(context, request: batchDeleteRequest)
  }
  
  public func removeAll<Entity: EntityInteractable>(
    _ dumpType: Entity.Type,
    in contextType: ContextType
  ) throws {
    let fetchRequest = Entity.getNSFetchRequestResult()
    writeLog("[CoreData] removeAll: \(fetchRequest)", logLevel: .debug, log: dbLog)
    
    let batchDeleteRequest = NSBatchDeleteRequest(fetchRequest: fetchRequest)
    batchDeleteRequest.resultType = .resultTypeObjectIDs
    
    let context = getContext(in: contextType)
    context.name = Entity.entityName
    try executeContext(context, request: batchDeleteRequest)
  }
  
}

// MARK: - Supports
extension DefaultDatabaseManager {
  private func getContext(in contextType: ContextType) -> NSManagedObjectContext {
    switch contextType {
    case .main:
      return persistence.mainContext
    case .background:
      return persistence.backgroundContext
    }
  }
  
  private func saveContext(_ context: NSManagedObjectContext) throws {
    do {
      try context.save()
    } catch {
      context.rollback()
      throw error
    }
  }
  
  public func executeContext(
    _ context: NSManagedObjectContext,
    request: NSPersistentStoreRequest
  ) throws {
    do {
      try context.execute(request)
    } catch {
      context.rollback()
      throw error
    }
  }
}
