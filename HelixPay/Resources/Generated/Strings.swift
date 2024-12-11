// swiftlint:disable all
// Generated using SwiftGen — https://github.com/SwiftGen/SwiftGen

import Foundation

// swiftlint:disable superfluous_disable_command file_length implicit_return prefer_self_in_static_references

// MARK: - Strings

// swiftlint:disable explicit_type_interface function_parameter_count identifier_name line_length
// swiftlint:disable nesting type_body_length type_name vertical_whitespace_opening_braces
public enum L10n {
  public enum Common {
    /// Localizable.strings
    public static let appName = L10n.tr("Localizable", "common.appName", fallback: "Countdown")
    /// Cancel
    public static let cancel = L10n.tr("Localizable", "common.cancel", fallback: "Cancel")
    /// Continue
    public static let `continue` = L10n.tr("Localizable", "common.continue", fallback: "Continue")
    /// Delete
    public static let delete = L10n.tr("Localizable", "common.delete", fallback: "Delete")
    /// Done
    public static let done = L10n.tr("Localizable", "common.done", fallback: "Done")
    /// Edit
    public static let edit = L10n.tr("Localizable", "common.edit", fallback: "Edit")
    /// No
    public static let no = L10n.tr("Localizable", "common.no", fallback: "No")
    /// Ok
    public static let ok = L10n.tr("Localizable", "common.ok", fallback: "Ok")
    /// Save
    public static let save = L10n.tr("Localizable", "common.save", fallback: "Save")
    /// Yes
    public static let yes = L10n.tr("Localizable", "common.yes", fallback: "Yes")
  }
  public enum NewEvent {
    /// Category
    public static let category = L10n.tr("Localizable", "newEvent.category", fallback: "Category")
    /// Date
    public static let date = L10n.tr("Localizable", "newEvent.date", fallback: "Date")
    /// Name
    public static let name = L10n.tr("Localizable", "newEvent.name", fallback: "Name")
    /// Fill in your event name
    public static let namePlaceholder = L10n.tr("Localizable", "newEvent.namePlaceholder", fallback: "Fill in your event name")
    /// Reminder
    public static let reminder = L10n.tr("Localizable", "newEvent.reminder", fallback: "Reminder")
    /// Repeat
    public static let `repeat` = L10n.tr("Localizable", "newEvent.repeat", fallback: "Repeat")
    /// New Event
    public static let title = L10n.tr("Localizable", "newEvent.title", fallback: "New Event")
    public enum Reminder {
      /// Same as The Due Date
      public static let sameAsDueDate = L10n.tr("Localizable", "newEvent.reminder.sameAsDueDate", fallback: "Same as The Due Date")
    }
    public enum Repeat {
      /// Monthly
      public static let monthly = L10n.tr("Localizable", "newEvent.repeat.monthly", fallback: "Monthly")
      /// None
      public static let `none` = L10n.tr("Localizable", "newEvent.repeat.none", fallback: "None")
      /// Weekly
      public static let weekly = L10n.tr("Localizable", "newEvent.repeat.weekly", fallback: "Weekly")
      /// Yearly
      public static let yearly = L10n.tr("Localizable", "newEvent.repeat.yearly", fallback: "Yearly")
    }
  }
  public enum TabBar {
    /// Home
    public static let home = L10n.tr("Localizable", "tabBar.home", fallback: "Home")
    /// Settings
    public static let settings = L10n.tr("Localizable", "tabBar.settings", fallback: "Settings")
  }
}
// swiftlint:enable explicit_type_interface function_parameter_count identifier_name line_length
// swiftlint:enable nesting type_body_length type_name vertical_whitespace_opening_braces

// MARK: - Implementation Details

extension L10n {
  private static func tr(_ table: String, _ key: String, _ args: CVarArg..., fallback value: String) -> String {
    let format = Bundle.main.localizedString(forKey: key, value: value, table: table)
    return String(format: format, locale: Locale.current, arguments: args)
  }
}
