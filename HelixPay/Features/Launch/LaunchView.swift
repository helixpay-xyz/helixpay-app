//
//  LaunchView.swift
//  ARDrawing
//
//  Created by Mien PV on 10/05/2024.
//

import SwiftUI

struct LaunchView: View {
  @Binding var isLaunchViewShowed: Bool

  var body: some View {
    contentView
      .task {
        try? await Task.sleep(nanoseconds: 2_000_000_000)
        isLaunchViewShowed = false
      }
  }

  var contentView: some View {
    VStack(spacing: 12) {
      Image(.logo)
        .resizable()
        .frame(width: 150, height: 150)
        .clipShape(.rect(cornerRadius: 12))
      Text(L10n.Common.appName)
        .font(.aeonikPro(.headingH5))
      ProgressView()
    }
    .foregroundStyle(Color.grayWhite)
    .tint(Color.gray200)
    .frame(maxWidth: .infinity, maxHeight: .infinity)
    .background(Color.gray900)
  }
}

#Preview {
  LaunchView(isLaunchViewShowed: .constant(true))
}
