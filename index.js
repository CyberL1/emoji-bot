import "dotenv/config";
import { Client, Collection, REST } from "discord.js";
import { readdirSync, readFileSync } from "fs";

if (process.argv[2] === "deploy") {
  console.log("Starting deploy");

  const rest = new REST().setToken(process.env.BOT_TOKEN);

  await rest.put(`/applications/${process.env.CLIENT_ID}/commands`, {
    body: JSON.parse(readFileSync("commands.json", { encoding: "UTF-8" })),
  });

  console.log("Deploy ended");
}

const client = new Client({ intents: [] });

client.commands = new Collection();
client.modals = new Collection();

const eventFiles = readdirSync("events").filter((f) => f.endsWith(".js"));

for (const file of eventFiles) {
  const { default: event } = await import(`./events/${file}`);
  const eventName = file.split(".")[0];

  console.log(`Loading "${eventName}" event`);

  if (event.once) {
    client.once(eventName, event.run);
  } else {
    client.on(eventName, event.run);
  }
}

const commandFiles = readdirSync("commands").filter((f) => f.endsWith(".js"));

for (const file of commandFiles) {
  const { default: command } = await import(`./commands/${file}`);
  const commandName = file.split(".")[0];

  console.log(`Loading "${commandName}" command`);

  client.commands.set(commandName, command);
}

const modalFiles = readdirSync("modals").filter((f) => f.endsWith(".js"));

for (const file of modalFiles) {
  const { default: modal } = await import(`./modals/${file}`);
  const modalName = file.split(".")[0];

  console.log(`Loading "${modalName}" modal`);

  client.modals.set(modalName, modal);
}

client.login(process.env.BOT_TOKEN);
