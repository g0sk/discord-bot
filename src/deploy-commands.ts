import {REST, Routes} from "discord.js";
import commands from "./commands";

type DeployCommandsProps = {
  guildId: string;
};

const commandsData = Object.values(commands).map((command) => command.data);

let token = Bun.env.DISCORD_TOKEN ?? "";
let clientId = Bun.env.CLIENT_ID ?? "";
if (token.length === 0 || clientId.length === 0) {
  throw new Error("Discord token/clientId are not defined in .env");
}

const res = new REST({version: "10"}).setToken(token);

export async function deployCommands({guildId}: DeployCommandsProps) {
  try {
    console.log("Started refreshing application (/) commands.");
    await res.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commandsData,
    });
    console.log("Successfully reloaded application (/) commands.");
  } catch (e) {
    console.error("Error while refreshing application (/) commands:", e);
  }
}
