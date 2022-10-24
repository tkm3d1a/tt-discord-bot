const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// const { nodeFetch } = import('node-fetch');
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
    await interaction.reply(`Retreiving dad joke for ${interaction.user.tag} now...`);
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

      // let setup;
      // const punchline;
      // const shareableLink;

      fetch(urlRand, options)
        .then(res => res.json())
        .then(data => {
          // console.log(data.body[0].setup);
          const setup = data.body[0].setup;
          // console.log(data.body[0].punchline);
          const punchLine = data.body[0].punchline;
          // console.log(data.body[0].shareableLink);
          // const link = data.body[0].shareableLink;

          const exampleEmbed = new EmbedBuilder()
            .setColor(0x722aa9)
            .setTitle(`${setup}`)
            // .setURL('https://discord.js.org/')
            // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
            // .setDescription('')
            // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
              { name: `${punchLine}`,
                value: '\u200B' },
            );
            // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            // .setImage('https://i.imgur.com/AfFp7pu.png')
            // .setTimestamp()
            // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

          // channel.send({ embeds: [exampleEmbed] });
          // FIXME: figure out how to send embed
          interaction.editReply({ embeds: [exampleEmbed] });
        })
        .catch(err => console.error(err));
      // interaction.editReply('Check console for response...');
      // interaction.editReply(`Setup: ${setup}`);
    } else {
      interaction.editReply('Not able to accept search terms at this time...');
    }
  },
};