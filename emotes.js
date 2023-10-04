import { getEmoteSet } from "./7tv-requests.js";
import { encodeImageToBase64 } from "./utils.js";
import {
  VerifyDiscordRequest,
  DiscordRequest,
  createGuildEmoji,
  getGuildEmojis,
} from "./discord-requests.js";

function isEmoteAdded(emoteToAdd, emoteList, applicationId) {
  for (let i = 0; i < emoteList.length; i++) {
    const checkedEmote = emoteList[i];

    if (checkedEmote.user.id !== applicationId) {
      continue;
    }
    if (checkedEmote.name === emoteToAdd.name) {
      return true;
    }
  }

  return false;
}

export async function uploadAllEmotesFromSet(setId, guildId, applicationId) {
  const set = await getEmoteSet(setId);
  const emoteList = await getGuildEmojis(guildId);

  for (let i = 0; i < set.emotes.length; i++) {
    const emote = set.emotes[i];
    if (isEmoteAdded(emote, emoteList, applicationId)) continue;
    const fileExtension = "/3x.webp";
    const emoteURL = "https:" + emote.data.host.url + "/" + fileExtension;
    const imageData = await encodeImageToBase64(emoteURL);

    await createGuildEmoji(guildId, emote.name, imageData);
  }
}
