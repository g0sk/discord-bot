import {Client, CommandInteraction, SlashCommandBuilder} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("reload")
  .setDescription("Actualiza los commandos del bot (Sólo para las 🐐 )");

export async function execute(interaction: CommandInteraction) {}
