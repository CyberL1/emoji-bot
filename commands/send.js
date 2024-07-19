export default {
  run: async (interaction) => {
    interaction.reply({
      content: `${interaction.options.getString("emoji")}`,
      ephemeral: true,
    });
  },

  autocomplete: async (interaction) => {
    const { items } = await interaction.client.rest.get(
      `/applications/${process.env.CLIENT_ID}/emojis`,
    );

    const focusedValue = interaction.options.getFocused();
    const emojis = items.slice(0, 25).filter((e) => e.name.startsWith(focusedValue));

    await interaction.respond(
      emojis.map((e) => ({
        name: e.name,
        value: e.animated ? `<a:${e.name}:${e.id}>` : `<:${e.name}:${e.id}>`,
      })),
    );
  },
};
