export default {
  name: "ready",
  once: true,
  run: async (client) => {
    console.log("Fetching application emojis");
    await client.application.emojis.fetch();
    console.log(`Total emojis: ${client.application.emojis.cache.size}`);

    console.log(`${client.user.username} ready`);
  },
};
