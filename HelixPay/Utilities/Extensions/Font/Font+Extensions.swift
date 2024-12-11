//
//  Font+Extensions.swift
//  CoinIdentifier
//

import SwiftUI

extension SwiftUI.Font {
  enum AeonikPro {
    case headingH2
    case headingH4
    case headingH3
    case headingH5
    case headingH6
    
    case bodySemibold
    
    case smallTextMedium
    case smallTextRegular
    
    case xSmallTextSemibold
    case xSmallTextMedium
  }
  
  static func aeonikPro(_ style: AeonikPro) -> SwiftUI.Font {
    switch style {
    case .headingH2:
      return Fonts.AeonikPro.bold.swiftUIFont(size: 48)
    case .headingH3:
      return Fonts.AeonikPro.bold.swiftUIFont(size: 32)
    case .headingH4:
      return Fonts.AeonikPro.bold.swiftUIFont(size: 24)
    case .headingH5:
      return Fonts.AeonikPro.bold.swiftUIFont(size: 20)
    case .headingH6:
      return Fonts.AeonikPro.bold.swiftUIFont(size: 18)
      
    case .bodySemibold:
      return Fonts.AeonikPro.medium.swiftUIFont(size: 16)
      
    case .smallTextMedium:
      return Fonts.AeonikPro.medium.swiftUIFont(size: 14)
    case .smallTextRegular:
      return Fonts.AeonikPro.regular.swiftUIFont(size: 14)
      
    case .xSmallTextSemibold:
      return Fonts.AeonikPro.medium.swiftUIFont(size: 12)
    case .xSmallTextMedium:
      return Fonts.AeonikPro.medium.swiftUIFont(size: 12)
    }
  }
}
