import { messageLink } from "discord.js";

export default {
  run: async (interaction) => {
    let content = interaction.options.getString("emoji");
    const replyTo = interaction.options.getString("reply-to");

    if (replyTo) {
      const replyToLink = replyTo.startsWith("https://") ? replyTo : messageLink(interaction.channelId, replyTo);
      content += `\n-# Replied to: ${replyToLink}`
    }

    interaction.reply({ content });
  },

  autocomplete: async (interaction) => {
    const { items } = await interaction.client.rest.get(
      `/applications/${process.env.CLIENT_ID}/emojis`,
    );

    const focusedValue = interaction.options.getFocused();
    const emojis = items
      .filter((e) => e.name.startsWith(focusedValue))
      .slice(0, 25);

    await interaction.respond(
      emojis.map((e) => ({
        name: e.name,
        value: e.animated ? `<a:${e.name}:${e.id}>` : `<:${e.name}:${e.id}>`,
      })),
    );
  },
};
