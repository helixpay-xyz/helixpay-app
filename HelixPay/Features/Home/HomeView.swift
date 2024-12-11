//
//  HomeView.swift
//  HelixPay
//
//  Created by Mien PV on 30/03/2024.
//

import SwiftUI

struct HomeView: View {
  @Environment(\.dismiss) private var dismiss
  var body: some View {
    VStack(spacing: 15) {
      headerView
      ScrollView {
        VStack(alignment: .leading, spacing: 16) {
          balanceView
        }
      }
      .scrollIndicators(.never)
    }
//    .background(
//        LinearGradient(
//            gradient: Gradient(stops: [
//              .init(color: Color.generalBrand, location: 0.0),
//              .init(color: Color.gray900, location: 0.76),
//              .init(color: Color.gray900, location: 1.0)
//            ]),
//            startPoint: .top,
//            endPoint: .bottom
//        )
//            )
    .background(Color.gray900)
    .edgesIgnoringSafeArea(.all)
  }
}

// MARK: - Header
private extension HomeView {
  var headerView: some View {
    HStack {
      Text("HelixPay")
        .foregroundColor(.white)
        .font(.aeonikPro(.headingH4))
      
      Spacer()
      addButton
    }
    .frame(height: 44)
    .padding(.horizontal, 20)
    .padding(.top, 50)
  }

  var addButton: some View {
    Button {
      dismiss()
    } label: {
      Image(.add)
        .resizable()
        .frame(width: 28, height: 28)
        .padding(10)
        .background(Color.generalBrand)
        .clipShape(Rectangle())
    }
    .buttonStyle(.scale)
  }
}

// MARK: - Balance
private extension HomeView {
    var balanceView: some View {
        VStack(alignment: .center, spacing: 16) { // Center alignment
            Image(.avatar)
                .resizable()
                .frame(width: 96, height: 96)
                .clipShape(Circle())
            
            HStack(spacing: 8) {
                Text("0x5a...3541")
                    .foregroundColor(.white)
                    .font(.aeonikPro(.headingH5))
                
                Button {
                    // Add button action here
                } label: {
                  Image(.chevronDown)
                    .resizable()
                    .frame(width: 24, height: 24)
                }
            }
            .frame(maxWidth: .infinity, alignment: .center)
        }
        .padding(EdgeInsets(top: 16, leading: 24, bottom: 0, trailing: 24))
        .frame(maxWidth: .infinity, alignment: .center)
    }
}

#Preview {
  HomeView()
}
