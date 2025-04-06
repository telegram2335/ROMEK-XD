import axios from 'axios';
import config from '../config.cjs';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const imageCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  let query = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['image', 'img', 'gimage'];
  const numberOfImages = 5;

  if (validCommands.includes(cmd)) {
    // Query validation
    if (!query && !(m.quoted && m.quoted.text)) {
      return sock.sendMessage(m.from, {
        text: `❌ *Please provide some text to search.*\n\n✏️ *Example:* \`${prefix + cmd} black cats\``
      });
    }

    if (!query && m.quoted?.text) {
      query = m.quoted.text;
    }

    try {
      await sock.sendMessage(m.from, { text: '⏳ *Fetching images, please wait...*' });

      const images = [];

      for (let i = 0; i < numberOfImages; i++) {
        const url = `https://api.guruapi.tech/api/googleimage?text=${encodeURIComponent(query)}`;
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        if (response.status === 200) {
          const buffer = Buffer.from(response.data, 'binary');
          images.push(buffer);
        } else {
          throw new Error('Image generation failed.');
        }
      }

      for (let img of images) {
        await sleep(500);
        await sock.sendMessage(
          m.from,
          {
            image: img,
            caption: `🖼️ *Result for:* \`${query}\`\n\n📥 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ`
          },
          { quoted: m }
        );
      }

      await m.React("✅");

    } catch (error) {
      console.error("Image Command Error:", error);
      await m.React("❌");
      return sock.sendMessage(m.from, {
        text: '❌ *Oops! Failed to fetch images.*\nPlease try again later.'
      });
    }
  }
};

export default imageCommand;