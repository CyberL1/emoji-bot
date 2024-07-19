export default {
  run: async (interaction) => {
    const command = interaction.commandName;
    const cmd = interaction.client.commands.get(command);

    if (cmd) {
      cmd.run(interaction);
    }
  },
};
