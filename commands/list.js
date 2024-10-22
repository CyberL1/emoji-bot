import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import findEmoji from "../utils/findEmoji.js";

const columnsPerPage = 1;
const emojisPerColumn = 25;

export default {
  run: async (interaction) => {
    const emojis = findEmoji(interaction);
    const columns = [];

    const page = 1;
    const maxPages = Math.ceil(
      emojis.length / (columnsPerPage * emojisPerColumn),
    );

    for (let i = 0; i < columnsPerPage; i++) {
      let value = "";

      for (const emoji of emojis.slice(
        emojisPerColumn * i,
        emojisPerColumn * (i + 1),
      )) {
        const emojiStr =
          (emoji.animated
            ? `<a:${emoji.name}:${emoji.id}>`
            : `<:${emoji.name}:${emoji.id}>`) + `\`:${emoji.name}:\``;

        const emojiLine = value + emojiStr + "\n";

        if (emojiLine.length > 1024) {
          const column = {
            name: "‎",
            value,
            inline: true,
          };

          columns.push(column);
          value = emojiStr + "\n";
        } else {
          value += emojiStr + "\n";
        }
      }

      if (value.length > 0) {
        const column = {
          name: "‎",
          value,
          inline: true,
        };

        columns.push(column);
      }
    }

    const embed = new EmbedBuilder()
      .setTitle(`Emojis - ${emojis.length}/2000`)
      .addFields(columns)
      .setFooter({ text: `Page: ${page}/${maxPages}` });

    const button = new ButtonBuilder()
      .setLabel("Manage emojis")
      .setStyle(ButtonStyle.Link)
      .setURL(
        `https://discord.com/developers/applications/${process.env.CLIENT_ID}/emojis`,
      );

    let components = [button];

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

      components = [previousPage, button, nextPage];
    }

    const row = new ActionRowBuilder().addComponents(components);

    await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true,
    });
  },
  page: async (interaction, page) => {
    const row = ActionRowBuilder.from(interaction.message.components[0]);

    const emojis = findEmoji(interaction);
    const maxPages = Math.ceil(
      emojis.length / (columnsPerPage * emojisPerColumn),
    );

    row.components[0]
      .setStyle(page <= 1 ? ButtonStyle.Secondary : ButtonStyle.Success)
      .setCustomId(`page-${page - 1}-${maxPages}`)
      .setDisabled(page <= 1);

    row.components[2]
      .setStyle(page >= maxPages ? ButtonStyle.Secondary : ButtonStyle.Success)
      .setCustomId(`page-${page + 1}-${maxPages}`)
      .setDisabled(page >= maxPages);

    const embed = EmbedBuilder.from(interaction.message.embeds[0]);
    const columns = [];

    for (let i = 0; i < columnsPerPage; i++) {
      let value = "";

      for (const emoji of emojis.slice(
        (page - 1) * emojisPerColumn + i * emojisPerColumn,
        (page - 1) * emojisPerColumn + (i + 1) * emojisPerColumn,
      )) {
        const emojiStr =
          (emoji.animated
            ? `<a:${emoji.name}:${emoji.id}>`
            : `<:${emoji.name}:${emoji.id}>`) + `\`:${emoji.name}:\``;

        const emojiLine = value + emojiStr + "\n";

        if (emojiLine.length > 1024) {
          const column = {
            name: "‎",
            value,
            inline: true,
          };

          columns.push(column);
          value = emojiStr + "\n";
        } else {
          value += emojiStr + "\n";
        }
      }

      if (value.length > 0) {
        const column = {
          name: "‎",
          value,
          inline: true,
        };

        columns.push(column);
      }
    }

    embed.setFields(columns);
    embed.setFooter({ text: `Page: ${page}/${maxPages}` });

    await interaction.update({ embeds: [embed], components: [row] });
  },
};
