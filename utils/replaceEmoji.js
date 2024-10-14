import findEmoji from "./findEmoji.js";

export default (interaction, content) => {
  const emojiRegex = /:\w+:/g;
  const actualEmojiRegex = /<a?:\w.+:\d.+>/;

  content = content.replaceAll(emojiRegex, (pattern) => {
    const emojiName = pattern.replaceAll(":", "");
    const emoji = findEmoji(interaction, { name: emojiName });

    console.log(pattern, pattern.match(actualEmojiRegex));

    if (emoji) {
      return emoji.animated
        ? `<a:${emoji.name}:${emoji.id}>`
        : `<:${emoji.name}:${emoji.id}>`;
    } else if (!emoji || pattern.match(actualEmojiRegex)) {
      return pattern;
    }
  });

  return content;
};
