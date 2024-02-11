import {Client, CommandInteraction, SlashCommandBuilder} from "discord.js";
import {deployCommands} from "../deploy-commands";

export const data = new SlashCommandBuilder()
  .setName("reload")
  .setDescription("Actualiza los commandos del bot (Sólo para las 🐐 )");

export async function execute(interaction: CommandInteraction) {
  const discordAdmin = Bun.env.DISCORD_ADMIN_ID ?? "";
  if (interaction.user.id !== discordAdmin) {
    return interaction.reply("No eres una 🐐, no puedes hacer esto");
  } else {
    try {
      deployCommands({guildId: interaction.guildId ?? ""});
      return interaction.reply("Commandos actualizados");
    } catch (e) {
      console.error(e);
      return interaction.reply("No se pudieron actualizar los commandos");
    }
  }
}
