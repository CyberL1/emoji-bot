export default {
  run: async (interaction) => {
    const command = interaction.commandName;
    const cmd = interaction.client.commands.get(command);

    if (cmd) {
      if (interaction.isChatInputCommand()) {
        cmd.run(interaction);
      } else if (interaction.isAutocomplete()) {
        cmd.autocomplete(interaction);
      }
    }
  },
};
