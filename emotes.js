import "dotenv/config";
import fetch from "node-fetch";

const host7TV = "https://7tv.io/v3";

export const getEmoteSet = async function (setId) {
  const endpoint = "/emote-sets/";
  const url = encodeURI(host7TV + endpoint + setId);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res.json();
};
