import "dotenv/config";
import { InstallGlobalCommands } from "./discord-requests.js";

// Simple test command
const TEST_COMMAND = {
  name: "test",
  description: "Basic command",
  type: 1,
};

const ADD_EMOTE_SET_COMMAND = {
  name: "add-set",
  description: "Adds all emotes in 7tv emote set by ID to discord server",
  type: 1,
  options: [
    {
      name: "set-id",
      description: "The ID of the set to add",
      required: true,
      type: 3,
    },
  ],
};

const REMOVE_EMOTE_SET_COMMAND = {
  name: "remove-set",
  description: "Removes all emotes in the 7tv set from the discord server",
  type: 1,
  options: [
    {
      name: "set-id",
      description: "The ID of the set to remove",
      required: true,
      type: 3,
    },
  ],
};

const ALL_COMMANDS = [TEST_COMMAND, ADD_EMOTE_SET_COMMAND, REMOVE_EMOTE_SET_COMMAND];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
