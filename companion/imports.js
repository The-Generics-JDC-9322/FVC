
export function importMessaging() {
  var messagingPath;

  // Fitbit does not support process
  try {
    // Testing environment
    messagingPath = process.env.TEST ?  "../tests/companion/api/messaging"
     : "messaging";
  } catch(error) {
    // Production environment
    messagingPath = "messaging";
  }

  return require(messagingPath);
}
