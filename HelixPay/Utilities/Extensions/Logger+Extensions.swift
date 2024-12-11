//
//  Logger+Extensions.swift
//

import OSLog

let subsystem = Bundle.main.bundleIdentifier!
let osLog = OSLog(subsystem: subsystem, category: "main")
let dbLog = OSLog(subsystem: subsystem, category: "persistence")

func writeLog(_ message: String, logLevel: OSLogType = .info, log: OSLog = osLog) {
  os_log("%{public}@", log: log, type: logLevel, message)
}

func logError(_ error: Error, log: OSLog = osLog) {
  os_log("%{public}@", log: log, type: .error, error.localizedDescription)
}

func logErrorAndReport(_ error: Error, log: OSLog = osLog) {
  logError(error, log: log)
  CrashManager.shared.report(error)
}
