//
//  AnyTransition+Extension.swift
//
//
//  Created by Mien PV on 25/12/2023.
//

import SwiftUI

extension AnyTransition {
  public static var backslide: AnyTransition {
    AnyTransition.asymmetric(
      insertion: .move(edge: .trailing),
      removal: .move(edge: .leading)
    )
  }
}
