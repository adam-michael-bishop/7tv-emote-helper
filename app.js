import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
} from "discord-interactions";
import { VerifyDiscordRequest } from "./discord-requests.js";
import { uploadAllEmotesFromSet, removeAllEmotesInSet } from "./emotes.js";

const app = express();
const PORT = process.env.PORT || 3000;

const ChannelMessage = function (message, flags) {
  this.type = InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE;
  this.data = { content: message, flags: flags };
};

// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post("/interactions", async function (req, res) {
  // Interaction type and data
  const { type, id, data, guild_id, application_id } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name, options } = data;

    if (name === "test") {
      console.log("testing");
      return res.send(new ChannelMessage("Hello World!"));
    } else if (name === "add-set") {
      const setId = options[0].value;
      try {
        await uploadAllEmotesFromSet(setId, guild_id, application_id);
      } catch (err) {
        console.log(err);
        return res.send(
          new ChannelMessage(
            "There was an error adding the emote set",
            InteractionResponseFlags.EPHEMERAL
          )
        );
      }
      return res.send(new ChannelMessage("Poggers! It worked."));
    } else if (name === "remove-set") {
      const setId = options[0].value;
      try {
        await removeAllEmotesInSet(setId, guild_id, application_id);
      } catch (err) {
        console.log(err);
        return res.send(
          new ChannelMessage(
            "There was an error removing the emote set",
            InteractionResponseFlags.EPHEMERAL
          )
        );
      }
      return res.send(new ChannelMessage("Emote set removed."));
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
