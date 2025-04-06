import config from '../config.cjs';

// Stylish Tag-All Function
const tagall = async (m, gss) => {
    try {
        // Bot and command setup
        const botNumber = await gss.decodeJid(gss.user.id);
        const prefix = config.PREFIX;
        const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
        const text = m.body.slice(prefix.length + cmd.length).trim();

        // Valid command check
        const validCommands = ['hidetag'];
        if (!validCommands.includes(cmd)) return;

        // Group metadata and participant details
        const groupMetadata = await gss.groupMetadata(m.from);
        const participants = groupMetadata.participants;
        const botAdmin = participants.find((p) => p.id === botNumber)?.admin;
        const senderAdmin = participants.find((p) => p.id === m.sender)?.admin;

        // Validation checks with stylish responses
        if (!m.isGroup) return m.reply('🚫 *This command is exclusive to groups!*');
        if (!botAdmin) return m.reply('⚠ *I need admin powers to tag everyone!*');
        if (!senderAdmin) return m.reply('🔒 *Only admins can use this command!*');

        // Craft the stylish message
        const customMessage = text || 'No message provided';
        let message = `✨ *Attention Everyone!* ✨\n\n📢 *Message:* ${customMessage}\n\n`;
        participants.forEach((participant) => {
            message += `➤ @${participant.id.split('@')[0]}\n`;
        });
        message += `\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`;

        // Send the tagged message
        await gss.sendMessage(
            m.from,
            {
                text: message,
                mentions: participants.map((a) => a.id),
            },
            { quoted: m }
        );
    } catch (error) {
        console.error('✖ Error in tagall:', error);
        await m.reply('❌ *Oops! Something went wrong while tagging everyone.*');
    }
};

export default tagall;