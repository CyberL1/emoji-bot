import { messageLink } from "discord.js";
import findEmoji from "../utils/findEmoji.js";

export default {
  run: async (interaction) => {
    let content = interaction.options.getString("emoji");
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
