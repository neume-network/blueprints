import test from "ava";

import { ingestFile } from "../src/call-block-logs-with-soundxyz-artists.mjs";

test("if ingesting files can yield main object", (t) => {
  process.env.DATA_DIR = "./test/fixtures";
  let mainObj = { hello: "world" };
  const result = ingestFile(
    "soundxyz-filter-contracts-transformation",
    mainObj
  );
  t.deepEqual(mainObj, { hello: "world" });
  t.deepEqual(result, {
    "0xca13eaa6135d719e743ffebb5c26de4ce2f9600c": { name: "sound" },
    "0xb8dfff430eb204eeeae713a9d4642352e3df6887": { name: "sound" },
    hello: "world",
  });
});
