// @format
import { readdir, unlink, readFile } from "fs/promises";
import { env } from "process";
import { resolve } from "path";

import test from "ava";
import { boot } from "@neume-network/core";

import crawlPath from "../../src/filter-mint-in-singleton-music-nft-contracts/crawl_path.mjs";

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

test("running a crawl path that extracts a zora NFT mint", async (t) => {
  const start = 15458985;
  const end = start + 1;
  const path = crawlPath(start, end);
  await boot(path, config);

  const content = (
    await readFile(resolve(env.DATA_DIR, "call-block-logs-transformation"))
  ).toString();
  const result = JSON.parse(content);
  t.is(
    result[0].log.topics[3],
    "0x0000000000000000000000000000000000000000000000000000000000007c69"
  );
});
