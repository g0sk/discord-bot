import {
  VoiceConnection,
  VoiceConnectionStatus,
  joinVoiceChannel,
} from "@discordjs/voice";
import {
  Client,
  CommandInteraction,
  SlashCommandBuilder,
  VoiceChannel,
} from "discord.js";
import {client} from "../..";

export const data = new SlashCommandBuilder()
  .setName("join")
  .setDescription("Join to the voice channel where the user currently is");

export async function execute(interaction: CommandInteraction) {
  try {
    console.log(
      `Creating voice connection to channel ${interaction.channel} with ID: ${interaction.channelId}`
    );

    if (client) {
      const connection = joinVoiceChannel({
        channelId: Bun.env.DISCORD_CHANNEL_ID ?? "",
        guildId: interaction.guildId ?? "",
        //@ts-ignore
        adapterCreator: interaction.guild?.voiceAdapterCreator,
      });

      connection.on(VoiceConnectionStatus.Signalling, (state) =>
        console.log("Signalling")
      );

      connection.on(VoiceConnectionStatus.Connecting, (state) =>
        console.log("Connecting")
      );

      connection.on(VoiceConnectionStatus.Ready, (state) =>
        console.log("Ready")
      );

      connection.on(VoiceConnectionStatus.Disconnected, (state) =>
        console.log("Disconnected")
      );

      connection.on(VoiceConnectionStatus.Destroyed, (state) =>
        console.log("Destroyed")
      );
    }
  } catch (e) {
    console.error(e);
    return interaction.reply(
      "Los reptilianos no me han dejado entrar al canal de voz, lo siento"
    );
  }
}
