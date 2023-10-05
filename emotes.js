import { getEmoteSet } from "./7tv-requests.js";
import { encodeImageToBase64 } from "./utils.js";
import {
  createGuildEmoji,
  getGuildEmojis,
  deleteGuildEmoji,
} from "./discord-requests.js";

function isEmoteAdded(sevenTVEmote, discordEmotes, applicationId) {
  for (let i = 0; i < discordEmotes.length; i++) {
    const discordEmote = discordEmotes[i];
    if (discordEmote.user.id !== applicationId) {
      continue;
    }
    if (discordEmote.name === sevenTVEmote.name) {
      return true;
    }
  }
  return false;
}

function getMatchingDiscordEmote(sevenTVEmote, discordEmotes, applicationId) {
  for (let i = 0; i < discordEmotes.length; i++) {
    const discordEmote = discordEmotes[i];
    if (discordEmote.user.id !== applicationId) {
      continue;
    }
    if (discordEmote.name === sevenTVEmote.name) {
      return discordEmote;
    }
  }
  return null;
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

export async function removeAllEmotesInSet(setId, guildId, applicationId) {
  const sevenTVSet = await getEmoteSet(setId);
  const discordEmotes = await getGuildEmojis(guildId);

  for (let i = 0; i < sevenTVSet.emotes.length; i++) {
    const sevenTVEmote = sevenTVSet.emotes[i];
    const discordEmote = getMatchingDiscordEmote(sevenTVEmote, discordEmotes, applicationId);
    if (discordEmote !== null) {
      await deleteGuildEmoji(guildId, discordEmote.id);
    }
  }
}