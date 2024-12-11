//
//  OnBoardingView.swift
//  HelixPay
//
//  Created by Miên PV on 11/12/24.
//

import SwiftUI

struct OnboardingView: View {
    @State private var currentPage = 0
    @Binding var isOnboardingComplete: Bool
    
    let pages = [
        OnboardingPageModel(
          title1: "Buy & Sell",
          title2: "Instantly!",
          description: "Use our swapper to safely swap tokens at the best prives, instantly",
          imageName: "onboard1",
          accentColor: .white
        ),
        OnboardingPageModel(
          title1: "Smart Wallet",
          title2: "Connect!",
          description: "Connect with web3 wallet, do everthing.",
          imageName: "onboard2",
          accentColor: .white
        ),
        OnboardingPageModel(
          title1: "Welcome to",
          title2: "HelixPay!",
          description: "The best way to buy & sell tokens.",
          imageName: "onboard3",
          accentColor: .white
        )
    ]
    
    var body: some View {
        ZStack {
            // Background gradient
            LinearGradient(
              gradient: Gradient(colors: [Color.gray800.opacity(1), Color.gray700.opacity(1)]),
                startPoint: .top,
                endPoint: .bottom
            )
            .edgesIgnoringSafeArea(.all)
          
          VStack(alignment: .center, spacing: 16) {
            
            TabView(selection: $currentPage) {
                ForEach(0..<pages.count, id: \.self) { index in
                  OnboardingImageView(page: pages[index])
                        .tag(index)
                }
            }
            .padding(.top, 20)
            .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
            .animation(.easeInOut, value: currentPage)
            
            Spacer()
            
            VStack {
              TabView(selection: $currentPage) {
                  ForEach(0..<pages.count, id: \.self) { index in
                      OnboardingContentView(page: pages[index])
                          .tag(index)
                  }
              }
              .tabViewStyle(PageTabViewStyle(indexDisplayMode: .never))
              .animation(.easeInOut, value: currentPage)
              .frame(height: 130)
           
                
              // Page Indicators
              HStack {
                  ForEach(0..<pages.count, id: \.self) { index in
                      Circle()
                      .fill(index == currentPage ? Color.generalBrand : Color.gray.opacity(0.5))
                          .frame(width: 10, height: 10)
                          .animation(.spring(), value: currentPage)
                  }
              }
              .padding(.bottom, 90)
              
              // Navigation Buttons
              HStack {
                  // Previous Button
//                  if currentPage > 0 {
//                      Button(action: {
//                          withAnimation {
//                              currentPage = max(0, currentPage - 1)
//                          }
//                      }) {
//                          Text("Previous")
//                              .foregroundColor(.blue)
//                              .padding()
//                              .background(Color.white)
//                              .cornerRadius(10)
//                              .shadow(radius: 3)
//                      }
//                  }
                  
//                  Spacer()
                    
                  // Next/Start Button
                Button(action: {
                    withAnimation {
                        if currentPage < pages.count - 1 {
                            currentPage += 1
                        } else {
                            isOnboardingComplete = true
                        }
                    }
                }) {
                    Text(currentPage == pages.count - 1 ? "Get Started" : "Next")
                        .foregroundColor(Color.gray900)
                        .font(.aeonikPro(.headingH4))
                        .padding()
                        .frame(width: UIScreen.main.bounds.width - 50)
                        .background(Color.generalBrand)
                        .cornerRadius(10)
                        .shadow(radius: 3)
                }
                .padding(.horizontal, 15)
              }
              .padding()
            }
            .background(
                RoundedRectangle(cornerRadius: 60)
                    .fill(Color.gray900)
                    .frame(height: 400)
            )
        }
      }
    }
}

struct OnboardingPageModel {
  let title1: String
  let title2: String
  let description: String
  let imageName: String
  let accentColor: Color
}


struct OnboardingContentView: View {
    let page: OnboardingPageModel
    
    var body: some View {
        VStack {
            VStack {
              HStack(spacing: 8) {
                Text(page.title1)
                  .font(.aeonikPro(.headingH3))
                  .fontWeight(.bold)
                  .foregroundColor(page.accentColor)
                
                Text(page.title2)
                  .font(.aeonikPro(.headingH3))
                  .fontWeight(.bold)
                  .foregroundColor(Color.generalBrand)
              }
              .frame(maxWidth: .infinity, alignment: .center) // Center the row
                
              Spacer()
                .frame(height: 15)
              Text(page.description)
                .font(.body)
                .foregroundColor(page.accentColor)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
            }
        }
        .padding()
    }
}


struct OnboardingImageView: View {
    let page: OnboardingPageModel
    
    var body: some View {
        VStack {
            VStack {
              Image(page.imageName)
                .resizable()
                .scaledToFit()
                .frame(height: 310)
            }
        }
        .padding()
    }
}


struct ContentView: View {
    @State private var isOnboardingComplete = false
    
    var body: some View {
        Group {
            if isOnboardingComplete {
                // Your main app view
                Text("Welcome to the App!")
            } else {
                OnboardingView(isOnboardingComplete: $isOnboardingComplete)
            }
        }
    }
}

#Preview {
  OnboardingView(isOnboardingComplete: .constant(true))
}
