import config from '../config.cjs';

const invite = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix)
      ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
      : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['invite', 'add'];
    if (!validCommands.includes(cmd)) return;

    if (!m.isGroup) {
      return m.reply("🚫 *This command can only be used in group chats!*");
    }

    const botNumber = await gss.decodeJid(gss.user.id);
    const groupMetadata = await gss.groupMetadata(m.from);
    const isBotAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

    if (!isBotAdmin) {
      return m.reply("📛 *Bot must be an admin to send invites.*");
    }

    if (!text) {
      return m.reply(`📛 *Please provide a number to invite.*\n\nExample:\n\`${prefix + cmd} 919341***\``);
    }

    if (text.includes('+')) {
      return m.reply("📛 *Please do not use '+' sign in the number.*");
    }

    if (isNaN(text)) {
      return m.reply("📛 *Invalid number. Please enter only digits with country code.*");
    }

    const groupLink = 'https://chat.whatsapp.com/' + await gss.groupInviteCode(m.from);
    const inviteMessage = `┌─〔 *GROUP INVITATION* 〕─◉
│
│ 📌 *Group:* ${groupMetadata.subject}
│ 🔗 *Link:* ${groupLink}
│ 👤 *Invited By:* @${m.sender.split('@')[0]}
│
└─➤ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`;

    await gss.sendMessage(`${text}@s.whatsapp.net`, {
      text: inviteMessage,
      mentions: [m.sender]
    });

    m.reply("✅ *Invite link sent successfully to the user!*");

  } catch (error) {
    console.error("Invite Command Error:", error);
    m.reply("❌ *An error occurred while processing the invite. Please try again.*");
  }
};

export default invite;