import "dotenv/config";
import fetch from "node-fetch";

const host = "https://7tv.io/v3";

export async function getEmoteSet(setId) {
  const endpoint = "/emote-sets/";
  const url = encodeURI(host + endpoint + setId);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    return data;
  }
  // return original response
  return res.json();
};
