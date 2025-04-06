import config from '../config.cjs';

const joinGroup = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix)
      ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
      : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();
    const args = text.split(' ');

    const validCommands = ['join'];
    if (!validCommands.includes(cmd)) return;

    const botNumber = await gss.decodeJid(gss.user.id);
    const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);

    if (!isCreator) {
      return m.reply("🚫 *Only the bot owner can use this command.*");
    }

    if (!text) return m.reply("📛 *Please provide a valid WhatsApp group invite link.*");
    if (!isValidUrl(args[0]) || !args[0].includes('whatsapp.com')) {
      return m.reply("❌ *Invalid group link. Please check and try again.*");
    }

    await m.reply("⏳ *Joining the group, please wait...*");

    const inviteCode = args[0].split("https://chat.whatsapp.com/")[1];

    await gss.groupAcceptInvite(inviteCode)
      .then(res => m.reply(`✅ *Successfully joined the group!*\n\n_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ_`))
      .catch(err => m.reply(`❌ *Failed to join the group.*\nError: ${err.message || err}`));

  } catch (error) {
    console.error("Join Group Error:", error);
    m.reply("❌ *An error occurred while processing the command.*");
  }
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export default joinGroup;