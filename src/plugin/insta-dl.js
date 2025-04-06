import axios from "axios";
import config from "../config.cjs";

const instagram = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";
  const query = m.body.slice(prefix.length + cmd.length).trim();

  if (!["ig", "insta", "instagram"].includes(cmd)) return;

  if (!query || !query.startsWith("http")) {
    return Matrix.sendMessage(m.from, {
      text: "❌ *Usage:* `.ig <Instagram URL>`\n\nExample:\n`.ig https://www.instagram.com/reel/xyz123/`"
    }, { quoted: m });
  }

  try {
    // React with hourglass while processing
    await Matrix.sendMessage(m.from, {
      react: { text: "⏳", key: m.key }
    });

    const { data } = await axios.get(`https://api.davidcyriltech.my.id/instagram?url=${query}`);

    if (!data.success || !data.downloadUrl) {
      return Matrix.sendMessage(m.from, {
        text: "⚠️ *Failed to fetch Instagram video. Please check the URL and try again.*"
      }, { quoted: m });
    }

    await Matrix.sendMessage(m.from, {
      video: { url: data.downloadUrl },
      mimetype: "video/mp4",
      caption: "📥 Instagram Video\n\n_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ_",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363321472746562@newsletter",
          newsletterName: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ",
          serverMessageId: 143,
        },
      },
    }, { quoted: m });

    // React with success tick
    await Matrix.sendMessage(m.from, {
      react: { text: "✅", key: m.key }
    });

  } catch (error) {
    console.error("Instagram Downloader Error:", error);
    Matrix.sendMessage(m.from, {
      text: "❌ *An error occurred while processing your request.*\nPlease try again later."
    }, { quoted: m });
  }
};

export default instagram;