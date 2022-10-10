const { REST, SlashCommandBuilder, Routes } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.BOT_TOKEN;
const clientId = process.env.BOT_ID;
const guildId = process.env.GUILD_ID;

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) => console.log('Successfully registered ${data.length} application commands.'))
  .catch(console.error);

// Not recognizing the ${data.length} variable for some reason.
// TODO: Correct ${} recognization issues