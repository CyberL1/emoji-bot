import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import findEmoji from "../utils/findEmoji.js";
import generateEmojiList from "../utils/generateEmojiList.js";

const emojisPerPage = 25;

export default {
  run: async (interaction) => {
    const emojis = findEmoji(interaction);

    const page = 1;
    const maxPages = Math.ceil(emojis.length / emojisPerPage);

    const list = generateEmojiList(emojis, 0, emojisPerPage);

    const embed = new EmbedBuilder()
      .setTitle(`Emojis - ${emojis.length}/2000`)
      .setDescription(list || ":x: No emojis")
      .setFooter({ text: `Page: ${page}/${maxPages}` });

    // Show navigation buttons only if maxPages > 1
    if (maxPages > 1) {
      const previousPage = new ButtonBuilder()
        .setLabel("Previous page")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId(`page-${page - 1}-${maxPages}`)
        .setDisabled(true);

      const nextPage = new ButtonBuilder()
        .setLabel("Next page")
        .setStyle(ButtonStyle.Success)
        .setCustomId(`page-${page + 1}-${maxPages}`);

      const row = new ActionRowBuilder().addComponents(previousPage, nextPage);

      return await interaction.reply({
        embeds: [embed],
        components: [row],
        ephemeral: true,
      });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
  page: async (interaction, page) => {
    const row = new ActionRowBuilder();

    const emojis = findEmoji(interaction);
    const maxPages = Math.ceil(emojis.length / emojisPerPage);

    if (page <= maxPages) {
      const previousPage = new ButtonBuilder()
        .setLabel("Previous page")
        .setStyle(page <= 1 ? ButtonStyle.Secondary : ButtonStyle.Success)
        .setCustomId(`page-${page - 1}-${maxPages}`)
        .setDisabled(page <= 1);

      const nextPage = new ButtonBuilder()
        .setLabel("Next page")
        .setStyle(
          page >= maxPages ? ButtonStyle.Secondary : ButtonStyle.Success,
        )
        .setCustomId(`page-${page + 1}-${maxPages}`)
        .setDisabled(page >= maxPages);

      row.components = [previousPage, nextPage];
    }

    const embed = EmbedBuilder.from(interaction.message.embeds[0]);

    let list = generateEmojiList(
      emojis,
      (page - 1) * emojisPerPage,
      (page - 1) * emojisPerPage + emojisPerPage,
    );

    if (list.length === 0) {
      list = `:x: Page ${page} not found`;

      const goBack = new ButtonBuilder()
        .setCustomId(`page-${maxPages}-${maxPages}`)
        .setStyle(ButtonStyle.Success)
        .setLabel(`Go back to page ${maxPages}`)
        .setEmoji("◀");

      row.components = [goBack];
    }

    embed.setTitle(`Emojis - ${emojis.length}/2000`);
    embed.setDescription(list);
    embed.setFooter({ text: `Page: ${page}/${maxPages}` });

    await interaction.update({ embeds: [embed], components: [row] });
  },
};
