export default {
  run: async (interaction) => {
    const command = interaction.commandName;
    const cmd = interaction.client.commands.get(command);

    if (cmd) {
      if (
        interaction.isChatInputCommand() ||
        interaction.isContextMenuCommand()
      ) {
        cmd.run(interaction);
      } else if (interaction.isAutocomplete()) {
        cmd.autocomplete(interaction);
      }
    } else if (interaction.isModalSubmit()) {
      const modal = interaction.client.modals.get(interaction.customId);

      modal.run(interaction);
    } else if (interaction.isButton()) {
      if (interaction.customId.startsWith("page-")) {
        const originalCommand = interaction.message.interaction.commandName;

        const page = Number(interaction.customId.split("-")[1]);
        const cmd = interaction.client.commands.get(originalCommand);

        cmd.page(interaction, page);
      }
    }
  },
};
