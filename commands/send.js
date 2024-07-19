export default {
  run: async (interaction) => {
    interaction.reply({
      content: `${interaction.options.getString("emoji")}`,
      ephemeral: true,
    });
  },
};
