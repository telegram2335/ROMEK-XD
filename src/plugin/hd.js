import { createRequire } from 'module';
import path from 'path';

// Setup for CommonJS require in ES modules
const require = createRequire(import.meta.url);
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const reminiPath = path.resolve(__dirname, '../media/remini.cjs');
const { remini } = require(reminiPath);

// Enhance Image Function
const tohd = async (m, gss) => {
    // Prefix detection
    const prefixMatch = m.body.match(/^[\\/!#.]/);
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const validCommands = ['hdr2', 'hd2', 'remini2', 'enhance2', 'upscale2'];

    // Command validation
    if (validCommands.includes(cmd)) {
        if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
            return m.reply(`✨ *Send/Reply with an Image to Enhance Quality* ✨\nUsage: *${prefix + cmd}*`);
        }

        // Download the quoted image
        const media = await m.quoted.download();

        try {
            // Process the image with Remini
            const enhancedImage = await remini(media, 'enhance');
            
            // Send the enhanced image with a stylish caption
            await gss.sendMessage(
                m.from,
                {
                    image: enhancedImage,
                    caption: `🌟 *Hey ${m.pushName}, Here’s Your Enhanced Image!* 🌟\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`,
                },
                { quoted: m }
            );
        } catch (error) {
            console.error('✖ Error processing media:', error);
            await m.reply('❌ *Oops! Error enhancing the image.*');
        }
    }
};

export default tohd;