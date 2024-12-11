//
//  View+readSafeArea.swift
//  Utility
//

import SwiftUI

public extension EnvironmentValues {
  var safeArea: EdgeInsets {
    get { self[SafeAreaEnvironmentKey.self] }
    set { self[SafeAreaEnvironmentKey.self] = newValue }
  }
}

public extension View {
  func readSafeArea(onChange: @escaping (EdgeInsets) -> Void) -> some View {
    background(
      GeometryReader { geometryProxy in
        Color.clear
          .preference(
            key: SafeAreaPreferenceKey.self,
            value: geometryProxy.safeAreaInsets
          )
      }
    )
    .onPreferenceChange(SafeAreaPreferenceKey.self, perform: onChange)
  }
}

private struct SafeAreaPreferenceKey: PreferenceKey {
  static var defaultValue = EdgeInsets()
  
  static func reduce(value: inout EdgeInsets, nextValue: () -> EdgeInsets) {}
}

private struct SafeAreaEnvironmentKey: EnvironmentKey {
  static var defaultValue = EdgeInsets()
}
