export default async (
  interaction,
  options = { id: "", name: "", filter: "" },
) => {
  const emojiCache = await interaction.client.application.emojis.cache;

  if (options.filter) {
    const emojis = emojiCache.filter((e) => e.name.startsWith(options.filter));
    return Array.from(emojis.values());
  } else if (options.id) {
    const emoji = emojiCache.find((e) => e.id === options.id);
    return emoji;
  } else if (options.name) {
    const emoji = emojiCache.find((e) => e.name === options.name);
    return emoji;
  }

  return Array.from(emojiCache.values());
};
