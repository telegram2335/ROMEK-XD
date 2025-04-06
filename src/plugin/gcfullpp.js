import { downloadMediaMessage } from '@whiskeysockets/baileys';
import Jimp from 'jimp';
import config from '../config.cjs';

const gcfullpp = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd !== "gcfullpp") return;

  if (!m.isGroup) {
    return m.reply("❌ *This command can only be used in group chats.*");
  }

  const groupMetadata = await sock.groupMetadata(m.from);
  const participant = groupMetadata.participants.find(p => p.id === m.sender);

  if (!participant?.admin) {
    return m.reply("❌ *Only group admins are allowed to use this command.*");
  }

  if (!m.quoted?.message?.imageMessage) {
    return m.reply("⚠️ *Please reply to an image to set it as group profile picture.*");
  }

  await m.React("⏳");

  try {
    const media = await downloadMediaMessage(m.quoted, "buffer", {});
    if (!media) {
      await m.React("❌");
      return m.reply("❌ *Failed to download image. Try again.*");
    }

    const image = await Jimp.read(media);
    if (!image) throw new Error("Invalid image format");

    const size = Math.max(image.bitmap.width, image.bitmap.height);
    const squareImage = new Jimp(size, size, 0x000000FF);

    const x = (size - image.bitmap.width) / 2;
    const y = (size - image.bitmap.height) / 2;
    squareImage.composite(image, x, y);

    squareImage.resize(640, 640);
    const buffer = await squareImage.getBufferAsync(Jimp.MIME_JPEG);

    await sock.updateProfilePicture(m.from, buffer);
    await m.React("✅");

    return sock.sendMessage(
      m.from,
      {
        text: `
┌─〔 *GROUP FULL PP UPDATED* 〕─◉
│
│ ✅ *Successfully updated group display picture!*
│ 👑 *By:* @${m.sender.split("@")[0]}
│
└─➤ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*
        `.trim(),
        mentions: [m.sender]
      },
      { quoted: m }
    );

  } catch (error) {
    console.error("Group Full PP Error:", error);
    await m.React("❌");
    return m.reply("❌ *Error occurred while setting group profile picture:* " + error.message);
  }
};

export default gcfullpp;