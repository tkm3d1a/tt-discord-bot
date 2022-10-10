/* eslint-disable indent */
// Require ENV variables
const dotenv = require('dotenv');
dotenv.config();
const token = process.env.BOT_TOKEN;

// Requireing nessecary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

// Create new client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  // Still having issue with recognizing the ${} variables.  They are not showing up in
  // highlighting and even after running do not get fixed when used.  Don't know where to
  // go and ask.  No usefull google searching so far.
  // TODO: Correct ${} recognization issues
  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply('Server Name: ${interaction.guild.name}\nTotal Members: ${interaction.guild.memberCount}');
  } else if (commandName === 'user') {
    await interaction.reply('Your Tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}');
  }
});

// Login to discord using the token
client.login(token);
