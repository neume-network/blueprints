// @format
import test from "ava";

import { boot } from "@neume-network/core";

import crawlPath from "../../src/filter-mint-in-singleton-music-nft-contracts/crawl_path.mjs";

const config = {
  queue: {
    options: {
      concurrent: 1,
    },
  },
};

test("running a crawl path that extracts music NFT platform's mints", async (t) => {
  await boot(crawlPath, config);
});
