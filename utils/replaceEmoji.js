import findEmoji from "./findEmoji.js";

export default (interaction, content) => {
  const emojiRegex = /:\w+:/g;

  content = content.replaceAll(emojiRegex, (pattern) => {
    const emojiName = pattern.replaceAll(":", "");
    const emoji = findEmoji(interaction, { name: emojiName });

    if (emoji) {
      return emoji.animated
        ? `<a:${emoji.name}:${emoji.id}>`
        : `<:${emoji.name}:${emoji.id}>`;
    } else if (!emoji) {
      return pattern;
    }
  });

  return content;
};
