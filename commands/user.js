const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Replies with user information'),
  async execute(interaction) {
    await interaction.reply(`Your Tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  },
};