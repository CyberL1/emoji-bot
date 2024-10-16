import {
  ActionRowBuilder,
  messageLink,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import findEmoji from "../utils/findEmoji.js";
import replaceEmoji from "../utils/replaceEmoji.js";

export default {
  run: async (interaction) => {
    const emoji = interaction.options.getString("emoji");
    const message = interaction.options.getString("message");

    if (!emoji && !message) {
      const textComponent = new TextInputBuilder()
        .setCustomId("content")
        .setLabel("Message content")
        .setStyle(TextInputStyle.Paragraph)
        .setMaxLength(2000);

      const actionRow = new ActionRowBuilder().addComponents(textComponent);

      const modal = new ModalBuilder()
        .setCustomId("send")
        .setTitle("Send a message")
        .addComponents(actionRow);

      return await interaction.showModal(modal);
    }

    let content = "";

    if (message) {
      content = replaceEmoji(interaction, message);
    }

    if (emoji) {
      content += ` ${emoji}`;
    }

    const replyTo = interaction.options.getString("reply-to");

    if (replyTo) {
      const replyToLink = replyTo.startsWith("https://")
        ? replyTo
        : messageLink(interaction.channelId, replyTo);
      content += `\n-# Replied to: ${replyToLink}`;
    }

    interaction.reply({ content });
  },

  autocomplete: async (interaction) => {
    const focusedValue = interaction.options.getFocused();
    const emojis = findEmoji(interaction, { filter: focusedValue });

    await interaction.respond(
      emojis.slice(0, 25).map((e) => ({
        name: e.name,
        value: e.animated ? `<a:${e.name}:${e.id}>` : `<:${e.name}:${e.id}>`,
      })),
    );
  },
};
