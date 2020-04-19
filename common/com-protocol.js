
export function isConMessage(msg) {
  let re = RegExp('[\[]c.*');
  return re.test(msg);
}

export function isHBMessage(msg) {
  let re = RegExp('[\[]hb.*');
  return re.test(msg);
}
