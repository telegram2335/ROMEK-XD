import axios from 'axios';
import config from '../config.cjs';

const imdb = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix)
      ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
      : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['imdb'];
    if (!validCommands.includes(cmd)) return;

    if (!text) return m.reply('🎬 Please provide a movie or series name.');

    const res = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${encodeURIComponent(text)}&plot=full`);

    if (res.data.Response === "False") {
      return m.reply('❌ Movie or series not found.');
    }

    const data = res.data;

    let msg = "╭───〘 *IMDB SEARCH* 〙───╮\n";
    msg += `│\n`;
    msg += `├ 🎬 *Title*       : ${data.Title}\n`;
    msg += `├ 📅 *Year*        : ${data.Year}\n`;
    msg += `├ ⭐ *Rated*       : ${data.Rated}\n`;
    msg += `├ 📆 *Released*    : ${data.Released}\n`;
    msg += `├ ⏳ *Runtime*     : ${data.Runtime}\n`;
    msg += `├ 🌀 *Genre*       : ${data.Genre}\n`;
    msg += `├ 🎥 *Director*    : ${data.Director}\n`;
    msg += `├ ✍️ *Writer*      : ${data.Writer}\n`;
    msg += `├ 👨 *Actors*      : ${data.Actors}\n`;
    msg += `├ 📃 *Plot*        : ${data.Plot}\n`;
    msg += `├ 🌐 *Language*    : ${data.Language}\n`;
    msg += `├ 🌍 *Country*     : ${data.Country}\n`;
    msg += `├ 🎖️ *Awards*     : ${data.Awards}\n`;
    msg += `├ 📦 *BoxOffice*   : ${data.BoxOffice}\n`;
    msg += `├ 🏙️ *Production*  : ${data.Production}\n`;
    msg += `├ 🌟 *IMDB Rating* : ${data.imdbRating}\n`;
    msg += `├ ✅ *IMDB Votes*  : ${data.imdbVotes}\n`;
    msg += `│\n`;
    msg += `╰─── ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ ───╯`;

    await gss.sendMessage(m.from, {
      image: { url: data.Poster },
      caption: msg,
    }, { quoted: m });

  } catch (error) {
    console.error('Error fetching IMDb data:', error);
    m.reply('❌ An error occurred while fetching the data.');
  }
};

export default imdb;