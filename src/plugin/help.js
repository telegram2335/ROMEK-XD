import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../config.cjs';

// Get total memory and free memory in bytes
const totalMemoryBytes = os.totalmem();
const freeMemoryBytes = os.freemem();

// Define unit conversions
const byteToKB = 1 / 1024;
const byteToMB = byteToKB / 1024;
const byteToGB = byteToMB / 1024;

// Function to format bytes to a human-readable format
function formatBytes(bytes) {
  if (bytes >= Math.pow(1024, 3)) {
    return (bytes * byteToGB).toFixed(2) + ' GB';
  } else if (bytes >= Math.pow(1024, 2)) {
    return (bytes * byteToMB).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes * byteToKB).toFixed(2) + ' KB';
  } else {
    return bytes.toFixed(2) + ' bytes';
  }
}

// Bot Process Time
const uptime = process.uptime();
const day = Math.floor(uptime / (24 * 3600)); // Calculate days
const hours = Math.floor((uptime % (24 * 3600)) / 3600); // Calculate hours
const minutes = Math.floor((uptime % 3600) / 60); // Calculate minutes
const seconds = Math.floor(uptime % 60); // Calculate seconds

// Uptime
const uptimeMessage = `*I am alive now since ${day}d ${hours}h ${minutes}m ${seconds}s*`;
const runMessage = `*☀️ ${day} Day*\n*🕐 ${hours} Hour*\n*⏰ ${minutes} Minutes*\n*⏱️ ${seconds} Seconds*\n`;

const xtime = moment.tz("Asia/Colombo").format("HH:mm:ss");
const xdate = moment.tz("Asia/Colombo").format("DD/MM/YYYY");
const time2 = moment().tz("Asia/Colombo").format("HH:mm:ss");
let pushwish = "";

if (time2 < "05:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "11:00:00") {
  pushwish = `Good Morning 🌄`;
} else if (time2 < "15:00:00") {
  pushwish = `Good Afternoon 🌅`;
} else if (time2 < "18:00:00") {
  pushwish = `Good Evening 🌃`;
} else if (time2 < "19:00:00") {
  pushwish = `Good Evening 🌃`;
} else {
  pushwish = `Good Night 🌌`;
}

const test = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const mode = config.MODE === 'public' ? 'public' : 'private';
  const pref = config.PREFIX;

  const validCommands = ['list', 'help', 'menu'];

  if (validCommands.includes(cmd)) {
    const str = `╭╔════════════════════╗  
      🌟 *ROMEK-XD BOT* 🌟  
╚════════════════════╝  

👑 *Owner:* ROMEk-XD 
👤 *User:* ${m.pushName}  
🛠 *Baileys:* Multi Device  
⚙ *Type:* NodeJs  
🔄 *Mode:* ${mode}  
📟 *Platform:* ${os.platform()}  
🔎 *Prefix:* [${prefix}]  
🔎 *Version:* 1.1.0  

🎉 *Hello ${m.pushName}, ${pushwish}!* 🎉  

━━━━━━━━━━━━━━━  
🌟 *CONVERTER* 🌟  
━━━━━━━━━━━━━━━  
🔎 ${prefix}attp  
🔎 ${prefix}attp2  
🔎 ${prefix}attp3  
🔎 ${prefix}ebinary  
🔎 ${prefix}dbinary  
🔎 ${prefix}emojimix  
🔎 ${prefix}mp3  

━━━━━━━━━━━━━━━  
🤖 *AI TOOLS* 🤖  
━━━━━━━━━━━━━━━  
🔎 ${prefix}ai  
🔎 ${prefix}bug  
🔎 ${prefix}report  
🔎 ${prefix}gpt  
🔎 ${prefix}dalle  
🔎 ${prefix}remini  
🔎 ${prefix}gemini  

━━━━━━━━━━━━━━━  
🛠 *TOOLS* 🛠  
━━━━━━━━━━━━━━━  
🔎 ${prefix}calculator  
🔎 ${prefix}tempmail  
🔎 ${prefix}checkmail  
🔎 ${prefix}trt  
🔎 ${prefix}tts  

━━━━━━━━━━━━━━━  
📢 *GROUP* 📢  
━━━━━━━━━━━━━━━  
🔎 ${prefix}linkgroup  
🔎 ${prefix}setppgc  
🔎 ${prefix}setname  
🔎 ${prefix}setdesc  
🔎 ${prefix}group  
🔎 ${prefix}add  
🔎 ${prefix}kick  
🔎 ${prefix}hidetag  

━━━━━━━━━━━━━━━  
⬇ *DOWNLOAD* ⬇  
━━━━━━━━━━━━━━━  
🔎 ${prefix}apk  
🔎 ${prefix}facebook  
🔎 ${prefix}mediafire  
🔎 ${prefix}pinterest  
🔎 ${prefix}gitclone  
🔎 ${prefix}ytmp3  
🔎 ${prefix}ytmp4  
🔎 ${prefix}tiktok  

━━━━━━━━━━━━━━━  
🔎 *SEARCH* 🔎  
━━━━━━━━━━━━━━━  
🔎 ${prefix}play  
🔎 ${prefix}yts  
🔎 ${prefix}imdb  
🔎 ${prefix}google  
🔎 ${prefix}gimage  
🔎 ${prefix}pinterest  
🔎 ${prefix}wallpaper  
🔎 ${prefix}lyrics  

━━━━━━━━━━━━━━━  
🏆 *OWNER* 🏆  
━━━━━━━━━━━━━━━  
🔎 ${prefix}join  
🔎 ${prefix}leave  
🔎 ${prefix}block  
🔎 ${prefix}unblock  
🔎 ${prefix}setppbot  
🔎 ${prefix}anticall  
🔎 ${prefix}autotyping  

━━━━━━━━━━━━━━━  
🕵‍♂ *STALKING* 🕵‍♂  
━━━━━━━━━━━━━━━  
🔎 ${prefix}truecaller  
🔎 ${prefix}instastalk  
🔎 ${prefix}githubstalk  

🔥 *Powered by ROMEK-XD* 🔥`;

    await Matrix.sendMessage(m.from, {
      image: fs.readFileSync('./src/romek.jpg'),
      caption: str,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363321472746562@newsletter',
          newsletterName: "ROMEKTRICKS",
          serverMessageId: 143
        }
      }
    }, {
      quoted: m
    });

    // Send audio after sending the menu
    await Matrix.sendMessage(m.from, {
      audio: { url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/menunew.m4a' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: m });
  }
};

export default test;
