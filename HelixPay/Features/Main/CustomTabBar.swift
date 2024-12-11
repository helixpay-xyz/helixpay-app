//
//  CustomTabBar.swift
//  CoinIdentifier
//
//  Created by Mien PV on 02/02/2024.
//

import SwiftUI

struct CustomTabBar: View {
  @Binding var selectedTab: TabKind

  var body: some View {
    HStack {
      tabButton(.home)
      centerButton(.addEvent)
      tabButton(.settings)
    }
    .background(
      Color.grayWhite
        .clipShape(CustomCurveShape())
        .shadow(color: Color.gray200, radius: 5, x: -5, y: -5)
        .ignoresSafeArea(.container, edges: .bottom)
    )
  }

  func centerButton(_ tab: TabKind) -> some View {
    Button(
      action: {
        selectedTab = tab
      },
      label: {
        tab.image
          .resizable()
          .frame(width: 24, height: 24)
          .padding(12)
          .background(Color.generalBrand, in: .circle)
          .foregroundStyle(Color.grayWhite)
          .compositingGroup()
          .shadow(color: Color.gray200, radius: 5, x: 5, y: 5)
          .shadow(color: Color.gray200, radius: 5, x: -5, y: -5)
      }
    )
    .buttonStyle(.scale)
    .offset(y: -24)
  }

  func tabButton(_ tab: TabKind) -> some View {
    VStack {
      tab.image
        .resizable()
        .frame(width: 24, height: 24)
        .foregroundStyle(
          tab == selectedTab
          ? Color.gray900
          : Color.gray500
        )

      Text(tab.title)
        .lineLimit(1)
        .minimumScaleFactor(0.1)
        .foregroundStyle(
          tab == selectedTab
          ? Color.gray900
          : Color.gray500
        )
    }
    .frame(maxWidth: .infinity)
    .font(
      tab == selectedTab
      ? Fonts.AeonikPro.bold.swiftUIFont(size: 10)
      : Fonts.AeonikPro.medium.swiftUIFont(size: 10)
    )
    .padding(.top, 4)
    .contentShape(Rectangle())
    .onTapGesture {
      selectedTab = tab
    }
  }
}

#Preview {
  CustomTabBar(selectedTab: .constant(.home))
}

struct CustomCurveShape: Shape {
  func path(in rect: CGRect) -> Path {
    return Path { path in
      path.move(to: CGPoint(x: 0, y: 0))
      path.addLine(to: CGPoint(x: rect.width, y: 0))
      path.addLine(to: CGPoint(x: rect.width, y: rect.height))
      path.addLine(to: CGPoint(x: 0, y: rect.height))

      // CURVE CENTER

      let mid = rect.width / 2

      path.move(to: CGPoint(x: mid - 60, y: 0))

      let to1 = CGPoint(x: mid, y: 35)
      let control1 = CGPoint(x: mid - 30, y: 0)
      let control2 = CGPoint(x: mid - 30, y: 35)

      path.addCurve(to: to1, control1: control1, control2: control2)

      let to2 = CGPoint(x: mid + 60, y: 0)
      let control3 = CGPoint(x: mid + 30, y: 35)
      let control4 = CGPoint(x: mid + 30, y: 0)

      path.addCurve(to: to2, control1: control3, control2: control4)
    }
  }
}
