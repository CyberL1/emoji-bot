import {
  TextInputBuilder,
  ModalBuilder,
  ActionRowBuilder,
} from "@discordjs/builders";
import { TextInputStyle } from "discord.js";

export default {
  name: "Reply",
  run: async (interaction) => {
    const textComponent = new TextInputBuilder()
      .setCustomId("content")
      .setLabel("Message content")
      .setStyle(TextInputStyle.Paragraph)
      .setMaxLength(2000);

    const actionRow = new ActionRowBuilder().addComponents(textComponent);

    const modal = new ModalBuilder()
      .setCustomId("reply-to")
      .setTitle("Reply to a message")
      .addComponents(actionRow);

    await interaction.showModal(modal);
  },
};
