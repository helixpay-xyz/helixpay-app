//
//  MainView.swift
//  HelixPay
//
//  Created by Mien PV on 28/03/2024.
//

import SwiftUI

struct MainView: View {
    @StateObject private var appCoordinator = AppCoordinator<Route>()
    @State private var shouldShowUpsertEventView = false

    @State private var currentTab: TabKind = .home
    @State private var previousTab: TabKind = .home

    init() {
        UITabBar.appearance().isHidden = true
    }

    var body: some View {
        NavigationStack(
            path: $appCoordinator.path
        ) {
            VStack(spacing: 0) {
                TabView(selection: $currentTab) {
                    HomeView()
                        .tag(TabKind.home)

                    Spacer()
                        .tag(TabKind.addEvent)

                    SettingsView()
                        .tag(TabKind.settings)
                }

                CustomTabBar(selectedTab: $currentTab)
            }
            .background(Color.gray900)
            .edgesIgnoringSafeArea(.all)
        }
        .environmentObject(appCoordinator)
        .fullScreenCover(isPresented: $shouldShowUpsertEventView) {
            UpsertEventView()
        }
        .onChange(of: currentTab) { [previousTab = currentTab] newTab in
            self.previousTab = previousTab
            self.currentTab = newTab
            if newTab == .addEvent {
                shouldShowUpsertEventView = true
                currentTab = previousTab
            }
        }
    }
}

#Preview {
    MainView()
}
