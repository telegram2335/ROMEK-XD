import axios from 'axios';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../config.cjs';

const Lyrics = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['lyrics', 'lyric'];

  if (validCommands.includes(cmd)) {
    if (!text) {
      return m.reply(`*Hello, ${m.pushName}*\n\n> _Example Usage:_\n\`\`\`.lyrics Spectre|Alan Walker\`\`\``);
    }

    try {
      await m.React('🕘');
      await m.reply('_Please wait, fetching your lyrics..._');

      if (!text.includes('|')) {
        return m.reply('⚠️ *Use the correct format:*\n\n_Song Name|Artist Name_\nExample: `.lyrics Shape of You|Ed Sheeran`');
      }

      const [title, artist] = text.split('|').map(part => part.trim());

      if (!title || !artist) {
        return m.reply('❗ *Both song and artist name are required.*\nExample: `.lyrics Believer|Imagine Dragons`');
      }

      const apiUrl = `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
      const response = await axios.get(apiUrl);
      const result = response.data;

      if (result && result.lyrics) {
        const lyrics = result.lyrics;

        let buttons = [
          {
            name: "cta_copy",
            buttonParamsJson: JSON.stringify({
              display_text: "📋 Copy Lyrics",
              id: "copy_code",
              copy_code: lyrics
            })
          },
          {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
              display_text: "Support Romek-XD",
              url: `https://whatsapp.com/channel/0029Vaj1hl1Lo4hksSXY0U2t`
            })
          },
          {
            name: "quick_reply",
            buttonParamsJson: JSON.stringify({
              display_text: "Main Menu",
              id: ".menu"
            })
          }
        ];

        let msg = generateWAMessageFromContent(m.from, {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadata: {},
                deviceListMetadataVersion: 2
              },
              interactiveMessage: proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({ text: lyrics }),
                footer: proto.Message.InteractiveMessage.Footer.create({ text: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ" }),
                header: proto.Message.InteractiveMessage.Header.create({
                  title: "",
                  subtitle: "",
                  hasMediaAttachment: false
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                  buttons: buttons
                })
              })
            }
          }
        }, {});

        await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
          messageId: msg.key.id
        });

        await m.React('✅');
      } else {
        throw new Error('No lyrics found.');
      }
    } catch (error) {
      console.error('Error getting lyrics:', error.message);
      m.reply('❌ *An error occurred while fetching lyrics.*');
      await m.React('❌');
    }
  }
};

export default Lyrics;