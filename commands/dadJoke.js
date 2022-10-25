const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const urlRand = 'https://dad-jokes.p.rapidapi.com/random/joke';
const dotenv = require('dotenv');
dotenv.config();
const rapidAPI_Token = process.env.DJ_RAPIDAPI_KEY;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('Replies with a halfway decent Dad Joke'),
  async execute(interaction) {
    const term = interaction.options.getString('term');
    let options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${rapidAPI_Token}`,
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
      },
    };

    if (!term) {
      console.log('no term');
    } else {
      interaction.editReply('Not able to accept search terms at this time...');
      options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': `${rapidAPI_Token}`,
          'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com',
        },
      };
    }

    const getJoke = async () => {
      const jokeResponse = await fetch(urlRand, options);
      // TODO: to properly get response returned, need to await the .json() function like below
      const joke = await jokeResponse.json();
      return joke.body[0];
    };

    const jokeBody = await getJoke();

    const setup = jokeBody.setup;
    const punchLine = jokeBody.punchline;

    const jokeAsEmbed = new EmbedBuilder()
      .setColor(0x722aa9)
      .setTitle(`${setup}`)
      .addFields(
        { name: `${punchLine}`,
          value: '\u200B' },
      );

    await interaction.reply({ embeds: [jokeAsEmbed] });
  },
};