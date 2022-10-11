// For command files directories
const fs = require('node:fs');
const path = require('node:path');

const { REST, Routes } = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.BOT_TOKEN;
const clientId = process.env.BOT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Just rerun node deploy-commands.js when adding a new slash command file
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // push command info as json into commands array
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
  .catch(console.error);