/* eslint-disable indent */
// Require ENV variables
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.BOT_TOKEN;

// For command files
const fs = require('node:fs');
const path = require('node:path');

// Requireing nessecary discord.js classes
const { Client, GatewayIntentBits, Collection } = require('discord.js');

// Create new client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

// Setting up commands
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // with the key as the command name and value as the export
  client.commands.set(command.data.name, command);
}

// Setting up events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// FIXME: All code below has been moved to events files in the events dir
// Remove once comfortable with placement, so logic is not stuck in the index file

// client.once('ready', c => {
//   console.log(`Ready! Logged in as ${c.user.tag}`);
// });

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isChatInputCommand()) return;

//   const command = interaction.client.commands.get(interaction.commandName);

//   if (!command) return;

//   try {
//     await command.execute(interaction);
//   } catch (error) {
//     console.error(error);
//     await interaction.reply({
//       content: 'There was an error while executing this command!',
//       ephemeral: true });
//   }
// });

// Login to discord using the token
client.login(token);
