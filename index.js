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

// Login to discord using the token
client.login(token);
