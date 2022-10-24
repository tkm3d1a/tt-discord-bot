const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cat')
    .setDescription('Replies with random cat image'),
  async execute(interaction) {
    await interaction.reply(`Retreiving cat image for ${interaction.user.tag} now...`);
    const catRes = await request('https://aws.random.cat/meow');
    const { file } = await catRes.body.json();
    interaction.editReply({ files: [file] });
  },
};