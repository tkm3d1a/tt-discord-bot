const { SlashCommandBuilder } = require('discord.js');
// const { nodeFetch } = import('node-fetch');
const { fetch } = require('node-fetch');
const urlRand = 'https://dad-jokes.p.rapidapi.com/random/joke';
const dotenv = require('dotenv');
dotenv.config();
const rapidAPI_Token = process.env.DJ_RAPIDAPI_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('Replies with a halfway decent Dad Joke'),
  async execute(interaction) {
    await interaction.reply(`Retreiving cat image for ${interaction.user.tag} now...`);
    // FIXME: Fetch not a function? issues with the import it seems.
    // TODO: correct fetch statements below.
    const term = interaction.options.getString('term');
    if (!term) {
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${rapidAPI_Token}`,
          'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
        },
      };

      const jokeBody = fetch.fetch(urlRand, options)
        .then(res => res.json())
        .catch(err => console.error('error:' + err));
      console.log(jokeBody);
      interaction.editReply('Check console for response...');
    } else {
      interaction.editReply('Not able to accept search terms at this time...');
    }
  },
};