export default {
  run: async (interaction) => {
    const emojiId = interaction.options.getString("emoji");
    const emoji = await interaction.client.rest.get(
      `/applications/${process.env.CLIENT_ID}/emojis/${emojiId}`,
    );

    const embed = {
      title: "Emoji info",
      thumbnail: {
        url: `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? "gif" : "png"}`,
      },
      fields: [
        {
          name: "Name",
          value: emoji.name,
          inline: true,
        },
        {
          name: "ID",
          value: emoji.id,
          inline: true,
        },
        {
          name: "Animated",
          value: emoji.animated ? "Yes" : "No",
          inline: true,
        },
      ],
    };

    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
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
        value: e.id,
      })),
    );
  },
};
