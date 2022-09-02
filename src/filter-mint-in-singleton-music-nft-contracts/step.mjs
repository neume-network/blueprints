// @format
const contracts = {
  "0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7": {
    name: "zora",
    version: "1.0.0",
  },
  "0x0bc2a24ce568dad89691116d5b34deb6c203f342": {
    name: "catalog",
    version: "2.0.0",
  },
  "0xf5819e27b9bad9f97c177bf007c1f96f26d91ca6": {
    name: "noizd",
  },
  "0x2b5426a5b98a3e366230eba9f95a24f09ae4a584": {
    name: "mintsongs",
    version: "2.0.0",
  },
};

const transferEventSelector =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const emptyBytes32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

const filterStep = (log) =>
  log.topics[0] === transferEventSelector &&
  log.topics[1] === emptyBytes32 &&
  Object.keys(contracts).includes(log.address);

const mapStep = (log) => ({
  metadata: {
    platform: contracts[log.address],
  },
  log,
});
export default (filePath = null) => [
  {
    name: "call-block-logs",
    transformer: {
      args: [filePath, filterStep, mapStep],
    },
  },
];
