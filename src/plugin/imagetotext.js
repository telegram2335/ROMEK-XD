import Tesseract from 'tesseract.js';
import { writeFile, unlink } from 'fs/promises';
import config from '../config.cjs';

// Stylish Text Extraction Function
const givetextCommand = async (m, Matrix) => {
    // Command setup
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const arg = m.body.slice(prefix.length + cmd.length).trim();

    // Valid commands
    const validCommands = ['givetext', 'extract'];
    if (!validCommands.includes(cmd)) return;

    // Image validation
    if (!m.quoted || m.quoted.mtype !== 'imageMessage') {
        return m.reply(`✨ *Send/Reply with an image to extract text!* ✨\nUsage: *${prefix + cmd} [language]*`);
    }

    // Language setup (default to 'eng')
    const lang = arg || 'eng';

    try {
        // Download the image
        const media = await m.quoted.download();
        if (!media) throw new Error('Failed to download media.');

        // Temporary file creation
        const filePath = `./${Date.now()}.png`;
        await writeFile(filePath, media);

        // Extract text using Tesseract
        await m.React('⏳'); // Processing reaction
        const { data: { text } } = await Tesseract.recognize(filePath, lang, {
            logger: (info) => console.log('🔍 Tesseract Progress:', info),
        });

        // Craft the stylish response
        const responseMessage = `📝 *Extracted Text* 📝\n\n${text || 'No text found.'}\n\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ*`;
        await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
        await m.React('✅'); // Success reaction

        // Cleanup
        await unlink(filePath);
    } catch (error) {
        console.error('✖ Error extracting text:', error);
        await Matrix.sendMessage(m.from, { text: '❌ *Oops! Failed to extract text from the image.*' }, { quoted: m });
        await m.React('❌'); // Error reaction
    }
};

export default givetextCommand;