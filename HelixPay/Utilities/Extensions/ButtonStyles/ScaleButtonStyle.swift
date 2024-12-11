//
//  ScaleButtonStyle.swift
//

import SwiftUI

struct ScaleButtonStyle: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .scaleEffect(configuration.isPressed ? 0.9 : 1.0)
  }
}

extension ButtonStyle where Self == ScaleButtonStyle {
  static var scale: Self {
    Self()
  }
}

#Preview {
  Button(
    action: {},
    label: {
      Text("Scale Button Style")
    }
  )
  .buttonStyle(.scale)
}
