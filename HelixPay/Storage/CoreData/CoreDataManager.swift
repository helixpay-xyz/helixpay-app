//
//  CoreDataManager.swift
//

import CoreData

public final class CoreDataManager {
  public static let shared = CoreDataManager()

  let container: NSPersistentContainer

  private init(inMemory: Bool = false) {
    container = NSPersistentContainer(name: "HelixPay")
    if inMemory,
       let storeDescription = container.persistentStoreDescriptions.first {
      storeDescription.url = URL(fileURLWithPath: "/dev/null")
    }

    container.loadPersistentStores { _, error in
      if let error = error as NSError? {
        fatalError("❌ Unable to configure Core Data Store: \(error), \(error.userInfo)")
      }
    }

    container.viewContext.automaticallyMergesChangesFromParent = true
  }

  static var preview: CoreDataManager = {
    let result = CoreDataManager(inMemory: true)
    let viewContext = result.container.viewContext

    // create data for preview here

    do {
      try viewContext.save()
    } catch {
      let nsError = error as NSError
      fatalError("❌ Unresolved error \(nsError), \(nsError.userInfo)")
    }

    return result
  }()

  public lazy var backgroundContext: NSManagedObjectContext = {
    let context = self.container.newBackgroundContext()
    context.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
    context.automaticallyMergesChangesFromParent = true

    return context
  }()

  public lazy var mainContext: NSManagedObjectContext = {
    let context = self.container.viewContext
    context.automaticallyMergesChangesFromParent = true

    return context
  }()
}
