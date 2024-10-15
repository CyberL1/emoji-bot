export default {
  name: "ready",
  once: true,
  run: async (client) => {
    console.log("Fetching application emojis");
    await client.application.emojis.fetch();
    console.log(`Total emojis: ${client.application.emojis.cache.size}`);

    console.log(`${client.user.username} ready`);

    setInterval(async () => {
      console.log("Fetching application emojis after 20 seconds");
      const oldCacheSize = client.application.emojis.cache.size;
      const newEmojis = await client.application.emojis.fetch();

      if (newEmojis.size === oldCacheSize) {
        console.log("Nothing changed");
      } else if (newEmojis.size > oldCacheSize) {
        console.log(`New emojis added: ${newEmojis.size - oldCacheSize}`);
      } else {
        console.log(`Emojis removed: ${oldCacheSize - newEmojis.size}`);

        // Manually clear and refetch cache
        client.application.emojis.cache.clear();
        await client.application.emojis.fetch();
      }

      console.log(`Total emojis: ${client.application.emojis.cache.size}`);
    }, 20000);
  },
};
