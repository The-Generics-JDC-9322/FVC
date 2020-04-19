const test = require('ava');
import { isHBMessage } from "../../common/com-protocol.js";

test("regex for [hb,x]", t => {
  t.is(isHBMessage("[hb,12]"), true);

  t.is(isHBMessage("[hb, 14]"), true);

  t.is(isHBMessage(""), false);

});