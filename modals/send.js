import replaceEmoji from "../utils/replaceEmoji.js";

export default {
  run: async (interaction) => {
    const content = replaceEmoji(
      interaction,
      interaction.fields.getTextInputValue("content"),
    );

    if (content.length > 2000) {
      return interaction.reply({
        content: `Too long message (${content.length}/2000)`,
        ephemeral: true,
      });
    }

    interaction.reply({ content });
  },
};
