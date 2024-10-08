import { create } from "kubo-rpc-client";

const PROJECT_ID = "2GajDLTC6y04qsYsoDRq9nGmWwK";
const PROJECT_SECRET = "48c62c6b3f82d2ecfa2cbe4c90f97037";
const PROJECT_ID_SECRECT = `${PROJECT_ID}:${PROJECT_SECRET}`;

export const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    Authorization: `Basic ${Buffer.from(PROJECT_ID_SECRECT).toString(
      "base64"
    )}`,
  },
});

export const getNFTMetadataFromIPFS = async (cid: string) => {
  for await (const file of ipfsClient.get(cid)) {
    const content = new TextDecoder().decode(file).trim();
    const startIndex = content.indexOf("{");
    const lastIndex = content.lastIndexOf("}") + 1;
    const json = content.slice(startIndex, lastIndex);
    try {
      const jsJson = JSON.parse(json);
      return jsJson;
    } catch (error) {
      console.log("Error parsing JSON:", error);
      return undefined;
    }
  }
};
