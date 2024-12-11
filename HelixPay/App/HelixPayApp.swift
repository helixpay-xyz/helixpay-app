//
//  HelixPayApp.swift
//  HelixPay
//
//  Created by Mien PV on 09/12/2024.
//

import SwiftUI

@main
struct HelixPayApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate

    @State private var isLaunchViewShowed = true
    @State private var isOnboardingComplete = false

    var body: some Scene {
        WindowGroup {
            Group {
                if isLaunchViewShowed {
                    LaunchView(isLaunchViewShowed: $isLaunchViewShowed)
                        .transition(.backslide)
                } else if !isOnboardingComplete {
                    OnboardingView(isOnboardingComplete: $isOnboardingComplete)
                        .transition(.backslide)
                } else {
                    MainView()
                        .transition(.backslide)
                }
            }
            .animation(.easeInOut, value: isLaunchViewShowed)
            .animation(.easeInOut, value: isOnboardingComplete)
        }
    }
}
