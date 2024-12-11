//
//  AppCoordinator.swift
//  HelixPay
//
//  Created by Mien PV on 30/03/2024.
//

import SwiftUI

protocol AppRoute: Hashable {}

final class AppCoordinator<R: AppRoute>: ObservableObject {
  @Published var path = NavigationPath()

  public func back(_ steps: Int = 1) {
    if path.count >= steps {
      path.removeLast(steps)
    }
  }

  public func replace(_ routes: [R]) {
    path = NavigationPath()
    for route in routes {
      path.append(route)
    }
  }

  public func replace(_ route: R) {
    path = NavigationPath()
    path.append(route)
  }

  public func push(_ route: R) {
    path.append(route)
  }
}
