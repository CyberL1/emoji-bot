import findEmoji from "../utils/findEmoji.js";

export default {
  run: async (interaction) => {
    const emojiId = interaction.options.getString("emoji");
    const emoji = await findEmoji(interaction, { id: emojiId });

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
    const focusedValue = interaction.options.getFocused();
    const emojis = await findEmoji(interaction, { filter: focusedValue });

    await interaction.respond(
      emojis.slice(0, 25).map((e) => ({
        name: e.name,
        value: e.id,
      })),
    );
  },
};
