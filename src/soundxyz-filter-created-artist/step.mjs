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
export default (filePath = null) => [
  {
    name: "call-block-logs",
    transformer: {
      args: [filePath, filterStep, mapStep],
    },
  },
];
