import {CommandInteraction, SlashCommandBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("dilo")
  .setDescription("Invoca al mickey mouse empírico");

export async function execute(interaction: CommandInteraction) {
  return interaction.reply("Tal cual hermano, tal cual");
}
