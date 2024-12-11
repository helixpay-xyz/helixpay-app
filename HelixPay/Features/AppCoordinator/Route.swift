//
//  Route.swift
//  HelixPay
//
//  Created by Mien PV on 30/03/2024.
//

import SwiftUI

enum Route: AppRoute {
  case main
}

extension Route: View {
  var body: some View {
    switch self {
    case .main: MainView()
    }
  }
}

extension Route: Hashable {
  func hash(into hasher: inout Hasher) {
    hasher.combine(self.hashValue)
  }
}
