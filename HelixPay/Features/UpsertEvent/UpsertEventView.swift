//
//  UpsertEventView.swift
//  HelixPay
//
//  Created by Mien PV on 30/03/2024.
//

import SwiftUI

struct UpsertEventView: View {
  @StateObject private var vm = UpsertEventViewModel()
  @Environment(\.dismiss) private var dismiss

  var body: some View {
    VStack(spacing: 0) {
      headerView
      ScrollView {
        VStack(alignment: .leading, spacing: 16) {
          eventNameView
          iconView
          categoryView
          dateView
          timeView
          repeatView
          reminderView
        }
      }
      .scrollIndicators(.never)
    }
    .background(Color.grayWhite)
    .foregroundStyle(.gray900)
    .tint(.gray900)
  }
}

// MARK: - Reminder
private extension UpsertEventView {
  var reminderView: some View {
    VStack(alignment: .leading, spacing: 8) {
      Text("Reminder")
        .font(.aeonikPro(.bodySemibold))

      HStack {
        if vm.reminders.isEmpty {
          Text("None")
        } else {
          ScrollView(.horizontal) {
            ForEach(vm.reminders, id: \.self) { reminder in
              Text(reminder.title)
                .padding(EdgeInsets(top: 4, leading: 8, bottom: 4, trailing: 8))
                .background(Color.gray100, in: .rect(cornerRadius: .infinity))
            }
          }
          .scrollIndicators(.never)
        }

        Spacer()
        Image(systemName: "chevron.down")
          .foregroundStyle(.gray500)
      }
      .font(.aeonikPro(.smallTextRegular))
      .frame(height: 48)
      .padding(EdgeInsets(top: 0, leading: 8, bottom: 0, trailing: 16))
      .background {
        RoundedRectangle(cornerRadius: 8)
          .strokeBorder(Color.gray300, lineWidth: 1)
      }
    }
    .padding(.horizontal, 24)
  }
}

// MARK: - Repeat
private extension UpsertEventView {
  var repeatView: some View {
    VStack(alignment: .leading, spacing: 8) {
      Text("Repeat")
        .font(.aeonikPro(.bodySemibold))
        .padding(.horizontal, 24)

      ScrollView(.horizontal) {
        HStack {
          ForEach(RepeatType.allCases, id: \.self) { repeatType in
            makeRepeatItem(repeatType, isSelected: vm.repeatType == repeatType)
          }
        }
        .padding(.horizontal, 24)
      }
      .scrollIndicators(.never)
    }
  }

  func makeRepeatItem(
    _ repeatType: RepeatType,
    isSelected: Bool
  ) -> some View {
    Text(repeatType.title)
      .font(isSelected ? .aeonikPro(.smallTextMedium) : .aeonikPro(.smallTextRegular))
      .foregroundColor(isSelected ? .generalBrand : .gray500)
      .padding(.horizontal, 16)
      .padding(.vertical, 8)
      .background {
        RoundedRectangle(cornerRadius: 8)
          .strokeBorder(isSelected ? Color.generalBrand : Color.gray300, lineWidth: 1)
      }
      .onTapGesture {
        withAnimation {
          vm.repeatType = repeatType
        }
      }
  }
}

// MARK: - Time
private extension UpsertEventView {
  var timeView: some View {
    VStack(alignment: .leading, spacing: 8) {
      HStack {
        Text("All day")
          .font(.aeonikPro(.bodySemibold))
        Spacer()
        Toggle("", isOn: $vm.isAllDay)
          .tint(Color.generalBrand)
      }
      if !vm.isAllDay {
        HStack {
          Text(vm.date, style: .time)
          Spacer()
          Image(systemName: "clock")
            .foregroundStyle(.gray500)
        }
        .font(.aeonikPro(.smallTextRegular))
        .frame(height: 48)
        .padding(.horizontal, 16)
        .background {
          RoundedRectangle(cornerRadius: 8)
            .strokeBorder(Color.gray300, lineWidth: 1)
        }
      }
    }
    .padding(.horizontal, 24)
  }
}

// MARK: - Date
private extension UpsertEventView {
  var dateView: some View {
    VStack(alignment: .leading, spacing: 8) {
      Text("Date")
        .font(.aeonikPro(.bodySemibold))

      HStack {
        Text(vm.date, style: .date)
        Spacer()
        Image(systemName: "calendar")
          .foregroundStyle(.gray500)
      }
      .font(.aeonikPro(.smallTextRegular))
      .frame(height: 48)
      .padding(.horizontal, 16)
      .background {
        RoundedRectangle(cornerRadius: 8)
          .strokeBorder(Color.gray300, lineWidth: 1)
      }

    }
    .padding(.horizontal, 24)
  }
}

// MARK: - Category
private extension UpsertEventView {
  var categoryView: some View {
    VStack(alignment: .leading, spacing: 8) {
      HStack {
        Text("Category")
          .font(.aeonikPro(.bodySemibold))
        Spacer()
        Button {

        } label: {
          Text("Add category")
            .font(.aeonikPro(.smallTextMedium))
        }
      }

      HStack {
        if let category = vm.category {
          Text(category)
        } else {
          Text("Select Category")
            .foregroundStyle(.gray500)
        }
        Spacer()
        Image(systemName: "chevron.down")
          .foregroundStyle(.gray500)
      }
        .font(.aeonikPro(.smallTextRegular))
        .frame(height: 48)
        .padding(.horizontal, 16)
        .background {
          RoundedRectangle(cornerRadius: 8)
            .strokeBorder(Color.gray300, lineWidth: 1)
        }

    }
    .padding(.horizontal, 24)
  }
}

// MARK: - Icon
private extension UpsertEventView {
  var iconView: some View {
    VStack(alignment: .leading, spacing: 8) {
      HStack {
        Text("Icon")
          .font(.aeonikPro(.bodySemibold))
        Spacer()
        Button {

        } label: {
          Text("See all")
            .font(.aeonikPro(.smallTextMedium))
        }
      }
      .padding(.horizontal, 24)

      ScrollView(.horizontal) {
        HStack {
          ForEach(1..<10) { index in
            makeIcon("is1_\(index)")
          }
        }
        .padding(.horizontal, 24)
      }
      .scrollIndicators(.never)
    }
  }

  func makeIcon(_ icon: String) -> some View {
    RoundedRectangle(cornerRadius: 12)
      .strokeBorder(Color.gray300, lineWidth: 1)
      .frame(width: 64, height: 64)
      .overlay {
        if icon == vm.icon {
          Color.green
        }
      }
      .clipShape(.rect(cornerRadius: 12))
      .overlay {
        Image(icon)
          .resizable()
          .scaledToFit()
          .frame(width: 40)
      }
      .onTapGesture {
        withAnimation {
          vm.icon = icon
        }
      }
  }
}

// MARK: - Event Name
private extension UpsertEventView {
  var eventNameView: some View {
    VStack(alignment: .leading, spacing: 8) {
      Text("Name")
        .font(.aeonikPro(.bodySemibold))
      + Text(" *")
        .font(.aeonikPro(.bodySemibold))
        .foregroundColor(.red)

      TextField("Fill in Your Event Name", text: $vm.eventName)
        .font(.aeonikPro(.smallTextRegular))
        .frame(height: 48)
        .padding(.horizontal, 16)
        .background {
          RoundedRectangle(cornerRadius: 8)
            .strokeBorder(Color.gray300, lineWidth: 1)
        }
    }
    .padding(EdgeInsets(top: 16, leading: 24, bottom: 0, trailing: 24))
  }
}

// MARK: - Header
private extension UpsertEventView {
  var headerView: some View {
    HStack {
      closeButton
      Spacer()
      Text("New Event")
      Spacer()
      closeButton.opacity(0) // Fake button
    }
    .font(.aeonikPro(.headingH4))
    .frame(height: 44)
    .padding(.horizontal, 24)
  }

  var closeButton: some View {
    Button {
      dismiss()
    } label: {
      Image(.close)
        .resizable()
        .frame(width: 24, height: 24)
    }
    .buttonStyle(.scale)
  }
}

#Preview {
  UpsertEventView()
}
