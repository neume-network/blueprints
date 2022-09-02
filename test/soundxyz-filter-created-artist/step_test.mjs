// @format
import { readdir, unlink, readFile } from "fs/promises";
import { env } from "process";
import { resolve } from "path";

import test from "ava";
import { boot } from "@neume-network/core";

import step from "../../src/soundxyz-filter-created-artist/step.mjs";

const teardown = async (t) => {
  try {
    const files = await readdir(resolve(env.DATA_DIR));
    for (const file of files) {
      await unlink(resolve(env.DATA_DIR, file));
    }
  } catch (err) {
    console.error(err);
  }
};
test.afterEach.always(teardown);

const config = {
  queue: {
    options: {
      concurrent: 1,
    },
  },
};

test("running a crawl path that extracts artist created event", async (t) => {
  const start = 15454602;
  const end = start + 1;
  const path = [
    [
      {
        name: "call-block-logs",
        extractor: {
          args: [start, end],
        },
      },
    ],
    step(),
  ];
  await boot(path, config);

  const content = (
    await readFile(resolve(env.DATA_DIR, "call-block-logs-transformation"))
  ).toString();
  const result = JSON.parse(content);
  t.is(result[0].address, "0xb8dfff430eb204eeeae713a9d4642352e3df6887");
});
