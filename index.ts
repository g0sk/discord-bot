import {Client} from "discord.js";
import {deployCommands} from "./src/deploy-commands";
import commands from "./src/commands";

export const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages", "GuildVoiceStates"],
});

client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});

client.on("guildCreate", async (guild) => {
  await deployCommands({guildId: guild.id});
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const {commandName} = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(interaction);
  }
});

const token = Bun.env.DISCORD_TOKEN ?? "";

client.login(token);
