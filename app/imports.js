
export function importDocument() {
  var documentImport;

  // Fitbit does not support process
  try {
    // Testing environment
    documentImport = process.env.TEST ? "../tests/app/api/document" : "document";
  } catch(error) {
    // Production environment
    documentImport = "document";
  }

  return require(documentImport);;
}

export function importHeartRate() {
  var hRPath;

  // Fitbit does not support process
  try {
    // Testing environment
    hRPath = process.env.TEST ? "../tests/app/api/heart-rate" : "heart-rate";
  } catch(error) {
    // Production environment
    hRPath = "heart-rate";
  }

  return require(hRPath);
}

export function importMessaging() {
  var messagingPath;

  // Fitbit does not support process
  try {
    // Testing environment
    messagingPath = process.env.TEST ? "../tests/app/api/messaging" : "messaging";
  } catch(error) {
    // Production environment
    messagingPath = "messaging";
  }

  return require(messagingPath);
}

export function importSystem() {
  var systemPath;

  // Fitbit does not support process
  try {
    // Testing environment
    systemPath = process.env.TEST ? "../tests/app/api/system" : "system";
  } catch(error) {
    // Production environment
    systemPath = "system";
  }

  return require(systemPath);
}

