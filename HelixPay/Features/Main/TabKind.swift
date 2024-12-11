//
//  TabKind.swift
//  CoinIdentifier
//
//  Created by Mien PV on 02/02/2024.
//

import SwiftUI

enum TabKind: CaseIterable {
  case home
  case addEvent
  case settings
}

extension TabKind {
  var image: Image {
    switch self {
    case .home:
      return Image(.tabBarHome)
    case .addEvent:
      return Image(systemName: "plus")
    case .settings:
      return Image(.setting)
    }
  }

  var title: String {
    switch self {
    case .home:
      return L10n.TabBar.home
    case .addEvent:
      return ""
    case .settings:
      return L10n.TabBar.settings
    }
  }
}
