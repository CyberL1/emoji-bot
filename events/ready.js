export default {
  name: "ready",
  once: true,
  run: async (client) => {
    console.log(`${client.user.username} ready`);
  },
};
