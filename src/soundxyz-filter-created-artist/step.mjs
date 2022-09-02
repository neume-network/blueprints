// @format
import { decodeLog } from "eth-fun";

const address = "0x78e3adc0e811e4f93bd9f1f9389b923c9a3355c2";
const createdArtistSelector =
  "0x23748b43b77f98380e738976c6324996908ffc1989994dd3c68631c87a65a7c0";
const filterStep = (log) =>
  log.topics[0] === createdArtistSelector && log.address === address;

function decodeArtistAddress(log) {
  const topics = log.topics;
  topics.shift();
  const result = decodeLog(
    [
      {
        type: "uint256",
        name: "artistId",
      },
      {
        type: "string",
        name: "name",
      },
      {
        type: "string",
        name: "symbol",
      },
      {
        type: "address",
        name: "artistAddress",
        indexed: true,
      },
    ],
    log.data,
    topics
  );
  return result.artistAddress.toLowerCase();
}

const mapStep = (log) => ({ address: decodeArtistAddress(log) });
const step0 = (filePath) => ({
  name: "call-block-logs",
  transformer: {
    args: [filePath, filterStep, mapStep],
  },
});

const transferEventSelector =
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const emptyBytes32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const filterStep1 = (log) =>
  log.topics[0] === transferEventSelector &&
  log.topics[1] === emptyBytes32 &&
  Object.keys(contracts).includes(log.address);
const mapStep1 = ({ metadata, log }) => ({
  address: log.address,
  tokenId: `${BigInt(log.topics[3]).toString(10)}`,
  createdAtBlockNumber: `${parseInt(log.blockNumber, 16)}`,
  platform: metadata.platform,
});

const step1 = {
  name: "call-block-logs",
  transformer: {
    // NOTE: https://github.com/neume-network/strategies/issues/258
    args: ["soundxyz-artists-created", filterStep1, mapStep1],
  },
};
export default (filePath = null) => [step0(filePath), step1];
