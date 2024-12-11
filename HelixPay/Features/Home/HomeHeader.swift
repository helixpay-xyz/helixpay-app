//
//  HomeHeader.swift
//  HelixPay
//
//  Created by Miên PV on 10/12/24.
//


import SwiftUI

struct HomeHeader: View {
    var body: some View {
        HStack {
            // Left side - App name or logo
            Text("HelixPay")
                .font(.headline)
                .fontWeight(.bold)
            
            Spacer()
            
            // Right side - Icons or actions
            HStack(spacing: 15) {
                Button(action: {
                    // Notification action
                }) {
                    Image(systemName: "bell")
                        .foregroundColor(.primary)
                }
                
                Button(action: {
                    // Settings or profile action
                }) {
                    Image(systemName: "person.circle")
                        .foregroundColor(.primary)
                }
            }
        }
        .padding()
        .background(Color.white)
        .shadow(color: .gray.opacity(0.2), radius: 2, x: 0, y: 2)
    }
}
