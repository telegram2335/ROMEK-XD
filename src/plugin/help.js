import moment from 'moment-timezone';
import fs from 'fs';
import os from 'os';
import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import config from '../../config.cjs';

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
  let selectedListId;
  const selectedButtonId = m?.message?.templateButtonReplyMessage?.selectedId;
  const interactiveResponseMessage = m?.message?.interactiveResponseMessage;
  if (interactiveResponseMessage) {
    const paramsJson = interactiveResponseMessage.nativeFlowResponseMessage?.paramsJson;
    if (paramsJson) {
      const params = JSON.parse(paramsJson);
      selectedListId = params.id;
     // console.log(selectedListId);
    }
  }
  const selectedId = selectedListId || selectedButtonId;
  
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
       
       const mode = config.MODE === 'public' ? 'public' : 'private';
       const pref = config.PREFIX;
           
        const validCommands = ['list', 'help', 'menu'];

  if (validCommands.includes(cmd)) {
    let msg = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          "messageContextInfo": {
            "deviceListMetadata": {},
            "deviceListMetadataVersion": 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `╭─────────────┈⊷
│🤖 ʙᴏᴛ ɴᴀᴍᴇ: *🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠*
│⏩ ᴠᴇʀꜱɪᴏɴ: 2.1.0
│🐼 ᴏᴡɴᴇʀ : *🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠*      
│🪀 ɴᴜᴍʙᴇʀ: +919341378016
│🔮 ᴍᴏᴅᴇ: *${mode}*
│🧨 ᴘʀᴇғɪx: [${pref}]
╰─────────────┈⊷ `
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: "©𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠"
            }),
            header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./src/romek.jpg')}, { upload: Matrix.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: "",
                  hasMediaAttachment: false  
                }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: [
                {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "ALIVE",
            id: `${prefix}alive`
          })
        },
        {
          "name": "quick_reply",
          "buttonParamsJson": JSON.stringify({
            display_text: "PING",
            id: `${prefix}ping`
          })
        },
                {
                  "name": "single_select",
                  "buttonParamsJson": `{"title":"𝐓𝐀𝐏 𝐅𝐎𝐑 𝐎𝐏𝐄𝐍 𝐌𝐄𝐍𝐔 🌟",
                 "sections":
                   [{
                    "title":"🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠 𝐀𝐋𝐋 𝐌𝐄𝐍𝐔",
                    "highlight_label":"🎉 𝐀𝐋𝐋𝐌𝐄𝐍𝐔",
                    "rows":[
                      {
                       "header":"",
                       "title":"🔰 ᴀʟʟ ᴍᴇɴᴜ",
                       "description":"🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠 𝐀𝐋𝐋𝐌𝐄𝐍𝐔🎨",
                       "id":"View All Menu"
                      },
                      {
                        "header":"",
                        "title":"⬇️ ᴅᴏᴡɴʟᴀᴏᴅᴇʀ ᴍᴇɴᴜ",
                        "description":"📂𝐒𝐇𝐎𝐖 𝐀𝐋𝐋 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 𝐅𝐄𝐀𝐓𝐔𝐑𝐄𝐒 🗂",
                        "id":"Downloader Menu"
                      },
                      {
                        "header":"",
                        "title":"👯ɢʀᴏᴜᴘ ᴍᴇɴᴜ",
                        "description":"⚡𝐅𝐄𝐀𝐓𝐔𝐑𝐄 𝐓𝐇𝐀𝐓 𝐀𝐑𝐄 𝐎𝐍𝐋𝐘 𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐅𝐎𝐑 𝐆𝐑𝐎𝐔𝐏🌀",
                        "id":"Group Menu"
                      },
                      {
                        "header":"",
                        "title":"👨‍🔧 ᴛᴏᴏʟ ᴍᴇɴᴜ",
                        "description":"🛠 𝐒𝐇𝐎𝐖 𝐌𝐄 𝐓𝐎𝐎𝐋 𝐌𝐄𝐍𝐔",
                        "id":"Tool Menu"
                      },
                      {
                        "header":"",
                        "title":"🗿 ᴍᴀɪɴ ᴍᴇɴᴜ",
                        "description":"🤖 𝐁𝐎𝐓 𝐌𝐀𝐈𝐍 𝐂𝐎𝐌𝐌𝐀𝐍𝐃🗳",
                        "id":"Main Menu"
                      },
                     {
                        "header":"",
                        "title":"👨‍💻 ᴏᴡɴᴇʀ ᴍᴇɴᴜ",
                        "description":"😎𝐅𝐄𝐀𝐓𝐔𝐑𝐄 𝐓𝐇𝐀𝐓 𝐀𝐑𝐄 𝐎𝐍𝐋𝐘 𝐅𝐎 𝐌𝐘 𝐎𝐖𝐍𝐄𝐑 👨‍💼",
                        "id":"Owner Menu"
                      },
                      {
                        "header":"",
                        "title":"✨ ᴀɪ ᴍᴇɴᴜ",
                        "description":"🎉𝐒𝐇𝐎𝐖 𝐌𝐄 𝐀𝐈 𝐌𝐄𝐍𝐔 🎉",
                        "id":"Ai Menu"
                      },
                      {
                        "header":"",
                        "title":"🔍sᴇᴀʀᴄʜ ᴍᴇɴᴜ🔎",
                        "description":"♂️𝐒𝐇𝐎𝐖 𝐌𝐄 𝐒𝐄𝐀𝐑𝐂𝐇 𝐌𝐄𝐍𝐔",
                        "id":"Search Menu"
                      },
                      {
                        "header":"",
                        "title":"✨ sᴛᴀʟᴋ ᴍᴇɴᴜ",
                        "description":"👨‍💼 𝐒𝐇𝐎𝐖 𝐌𝐄 𝐒𝐓𝐀𝐋𝐊 𝐌𝐄𝐍𝐔🐭",
                        "id":"Stalk Menu"
                      },
                      {
                        "header":"",
                        "title":"♻️ 𝚌𝚘𝚗𝚟𝚎𝚛𝚝𝚎𝚛 𝚖𝚎𝚗𝚞",
                        "description":"🛷 𝐒𝐇𝐎𝐖 𝐌𝐄 𝐂𝐎𝐍𝐕𝐄𝐑𝐓𝐄𝐑 𝐌𝐄𝐍𝐔🐾",
                        "id":"Converter Menu"
                      }
                    ]}
                  ]}`
                },
              ],
            }),
            contextInfo: {
                  quotedMessage: m.message,
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
          }),
        },
      },
    }, {});

    await Matrix.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id
    });
  }
      if (selectedId == "View All Menu") {
        const str = `hey ${m.pushName} ${pushwish}
╭─────────────┈⊷
│🤖 ʙᴏᴛ ɴᴀᴍᴇ: *🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠*
│⏩ ᴠᴇʀꜱɪᴏɴ: 2.1.0
│🐼 ᴏᴡɴᴇʀ : *🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠*      
│🪀 ɴᴜᴍʙᴇʀ: +919341378016
│🔮 ᴍᴏᴅᴇ: *${mode}*
│🧨 ᴘʀᴇғɪx: [${pref}]
╰─────────────┈⊷ 
╭❮ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 ❯╮
.𝙰𝚃𝚃𝙿
.𝙰𝚃𝚃𝙿2
.𝙰𝚃𝚃𝙿3
.𝙴𝙱𝙸𝙽𝙰𝚁𝚈
.𝙳𝙱𝙸𝙽𝙰𝚁𝚈
.𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
.𝙼𝙿3

╭❮ 𝙰𝙸 ❯╮
.𝙰𝚒
.𝙱𝚞𝚐
.𝚁𝚎𝚙𝚘𝚛𝚝
.𝙶𝚙𝚝
.𝙳𝚊𝚕𝚕𝚎
.𝚁𝚎𝚖𝚒𝚗𝚒
.𝙶𝚎𝚖𝚒𝚗𝚒

╭❮ 𝚃𝙾𝙾𝙻 ❯╮
.𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚘𝚛
.𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
.𝙲𝚑𝚎𝚌𝚔𝚖𝚊𝚒𝚕
.𝚃𝚛𝚝
.𝚃𝚝𝚜

╭❮ 𝙶𝚁𝙾𝚄𝙿 ❯╮
.𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
.𝚂𝚎𝚝𝚙𝚙𝚐𝚌
.𝚂𝚎𝚝𝚗𝚊𝚖𝚎
.𝚂𝚎𝚝𝚍𝚎𝚜𝚌
.𝙶𝚛𝚘𝚞𝚙
.𝙶𝚌𝚜𝚎𝚝𝚝𝚒𝚗𝚐
.𝚆𝚎𝚕𝚌𝚘𝚖𝚎
.𝙰𝚍𝚍
.𝙺𝚒𝚌𝚔
.𝙷𝚒𝚍𝚎𝚃𝚊𝚐
.𝚃𝚊𝚐𝚊𝚕𝚕
.𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
.𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
.𝙿𝚛𝚘𝚖𝚘𝚝𝚎
.𝙳𝚎𝚖𝚘𝚝𝚎
.𝙶𝚎𝚝𝚋𝚒𝚘

╭❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯╮
.𝙰𝚙𝚔
.𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
.𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
.𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝚍𝚕
.𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎
.𝙶𝚍𝚛𝚒𝚟𝚎
.𝙸𝚗𝚜𝚝𝚊
.𝚈𝚝𝚖𝚙3
.𝚈𝚝𝚖𝚙4
.𝙿𝚕𝚊𝚢
.𝚂𝚘𝚗𝚐
.𝚅𝚒𝚍𝚎𝚘
.𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
.𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
.𝚃𝚒𝚔𝚝𝚘𝚔

╭❮ 𝚂𝙴𝙰𝚁𝙲𝙷 ❯╮
.𝙿𝚕𝚊𝚢
.𝚈𝚝𝚜
.𝙸𝚖𝚍𝚋
.𝙶𝚘𝚘𝚐𝚕𝚎
.𝙶𝚒𝚖𝚊𝚐𝚎
.𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
.𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛
.𝚆𝚒𝚔𝚒𝚖𝚎𝚍𝚒𝚊
.𝚈𝚝𝚜𝚎𝚊𝚛𝚌𝚑
.𝚁𝚒𝚗𝚐𝚝𝚘𝚗𝚎
.𝙻𝚢𝚛𝚒𝚌𝚜

╭❮ 𝙼𝙰𝙸𝙽 ❯╮
.𝙿𝚒𝚗𝚐
.𝙰𝚕𝚒𝚟𝚎
.𝙾𝚠𝚗𝚎𝚛
.𝙼𝚎𝚗𝚞
.𝙸𝚗𝚏𝚘𝚋𝚘𝚝

╭❮ 𝙾𝚆𝙽𝙴𝚁 ❯╮
.𝙹𝚘𝚒𝚗
.𝙻𝚎𝚊𝚟𝚎
.𝙱𝚕𝚘𝚌𝚔
.𝚄𝚗𝚋𝚕𝚘𝚌𝚔
.𝚂𝚎𝚝𝚙𝚙𝚋𝚘𝚝
.𝙰𝚗𝚝𝚒𝚌𝚊𝚕𝚕
.𝚂𝚎𝚝𝚜𝚝𝚊𝚝𝚞𝚜
.𝚂𝚎𝚝𝚗𝚊𝚖𝚎𝚋𝚘𝚝
.𝙰𝚞𝚝𝚘𝚃𝚢𝚙𝚒𝚗𝚐
.𝙰𝚕𝚠𝚊𝚢𝚜𝙾𝚗𝚕𝚒𝚗𝚎
.𝙰𝚞𝚝𝚘𝚁𝚎𝚊𝚍
.𝚊𝚞𝚝𝚘𝚜𝚟𝚒𝚎𝚠

╭❮ 𝚂𝚃𝙰𝙻𝙺 ❯╮
.𝚃𝚛𝚞𝚎𝚌𝚊𝚕𝚕𝚎𝚛
.𝙸𝚗𝚜𝚝𝚊𝚂𝚝𝚊𝚕𝚔
.𝙶𝚒𝚝𝚑𝚞𝚋𝚂𝚝𝚊𝚕𝚔

   `;
        let fgg = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: `🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:'🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠'\nitem1.TEL;waid=${
                        m.sender.split("@")[0]
                    }:${
                        m.sender.split("@")[0]
                    }\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        };
       let { key } = await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: { 
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: fgg
});
}
   if ( selectedId == "Downloader Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳 ❯╮
.𝙰𝚙𝚔
.𝙵𝚊𝚌𝚎𝚋𝚘𝚘𝚔
.𝙼𝚎𝚍𝚒𝚊𝚏𝚒𝚛𝚎
.𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝𝚍𝚕
.𝙶𝚒𝚝𝚌𝚕𝚘𝚗𝚎
.𝙶𝚍𝚛𝚒𝚟𝚎
.𝙸𝚗𝚜𝚝𝚊
.𝚈𝚝𝚖𝚙3
.𝚈𝚝𝚖𝚙4
.𝙿𝚕𝚊𝚢
.𝚂𝚘𝚗𝚐
.𝚅𝚒𝚍𝚎𝚘
.𝚈𝚝𝚖𝚙3𝚍𝚘𝚌
.𝚈𝚝𝚖𝚙4𝚍𝚘𝚌
.𝚃𝚒𝚔𝚝𝚘𝚔
`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if ( selectedId == "Group Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝙶𝚁𝙾𝚄𝙿 ❯╮
.𝙻𝚒𝚗𝚔𝙶𝚛𝚘𝚞𝚙
.𝚂𝚎𝚝𝚙𝚙𝚐𝚌
.𝚂𝚎𝚝𝚗𝚊𝚖𝚎
.𝚂𝚎𝚝𝚍𝚎𝚜𝚌
.𝙶𝚛𝚘𝚞𝚙
.𝚆𝚎𝚕𝚌𝚘𝚖𝚎
.𝙰𝚍𝚍
.𝙺𝚒𝚌𝚔
.𝙷𝚒𝚍𝚎𝚃𝚊𝚐
.𝚃𝚊𝚐𝚊𝚕𝚕
.𝙰𝚗𝚝𝚒𝙻𝚒𝚗𝚔
.𝙰𝚗𝚝𝚒𝚃𝚘𝚡𝚒𝚌
.𝙿𝚛𝚘𝚖𝚘𝚝𝚎
.𝙳𝚎𝚖𝚘𝚝𝚎
.𝙶𝚎𝚝𝚋𝚒𝚘

     `
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
    mentionedJid: [m.sender], 
    forwardingScore: 9999,
    isForwarded: true,
  }
}, {
  quoted: m
});
}
   
   if (selectedId == "Main Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝙼𝙰𝙸𝙽 ❯╮
.𝙿𝚒𝚗𝚐
.𝙰𝚕𝚒𝚟𝚎
.𝙾𝚠𝚗𝚎𝚛
.𝙼𝚎𝚗𝚞
.𝙸𝚗𝚏𝚘𝚋𝚘𝚝
`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Owner Menu") {
     const str = `╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝙾𝚆𝙽𝙴𝚁 ❯╮
.𝙹𝚘𝚒𝚗
.𝙻𝚎𝚊𝚟𝚎
.𝙱𝚕𝚘𝚌𝚔
.𝚄𝚗𝚋𝚕𝚘𝚌𝚔
.𝙱𝚌𝚐𝚛𝚘𝚞𝚙
.𝙱𝚌𝚊𝚕𝚕
.𝚂𝚎𝚝𝚙𝚙𝚋𝚘𝚝
.𝙰𝚗𝚝𝚒𝚌𝚊𝚕𝚕
.𝚂𝚎𝚝𝚜𝚝𝚊𝚝𝚞𝚜
.𝚂𝚎𝚝𝚗𝚊𝚖𝚎𝚋𝚘𝚝
.𝙰𝚞𝚝𝚘𝚃𝚢𝚙𝚒𝚗𝚐
.𝙰𝚕𝚠𝚊𝚢𝚜𝙾𝚗𝚕𝚒𝚗𝚎
.𝙰𝚞𝚝𝚘𝚁𝚎𝚊𝚍
.𝚊𝚞𝚝𝚘𝚜𝚟𝚒𝚎𝚠
`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Search Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝚂𝙴𝙰𝚁𝙲𝙷 ❯╮
.𝙿𝚕𝚊𝚢
.𝚈𝚝𝚜
.𝙸𝚖𝚍𝚋
.𝙶𝚘𝚘𝚐𝚕𝚎
.𝙶𝚒𝚖𝚊𝚐𝚎
.𝙿𝚒𝚗𝚝𝚎𝚛𝚎𝚜𝚝
.𝚆𝚊𝚕𝚕𝚙𝚊𝚙𝚎𝚛
.𝚆𝚒𝚔𝚒𝚖𝚎𝚍𝚒𝚊
.𝚈𝚝𝚜𝚎𝚊𝚛𝚌𝚑
.𝚁𝚒𝚗𝚐𝚝𝚘𝚗𝚎
.𝙻𝚢𝚛𝚒𝚌𝚜
`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   if (selectedId == "Stalk Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝚂𝚃𝙰𝙻𝙺 ❯╮
.𝙽𝚘𝚠𝚊
.𝚃𝚛𝚞𝚎𝚌𝚊𝚕𝚕𝚎𝚛
.𝙸𝚗𝚜𝚝𝚊𝚂𝚝𝚊𝚕𝚔
.𝙶𝚒𝚝𝚑𝚞𝚋𝚂𝚝𝚊𝚕𝚔
`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Tool Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝚃𝙾𝙾𝙻 ❯╮
.𝙲𝚊𝚕𝚌𝚞𝚕𝚊𝚝𝚘𝚛
.𝚃𝚎𝚖𝚙𝚖𝚊𝚒𝚕
.𝙲𝚑𝚎𝚌𝚔𝚖𝚊𝚒𝚕
.𝙸𝚗𝚏𝚘
.𝚃𝚛𝚝
.𝚃𝚝𝚜
`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Ai Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝙰𝙸 ❯╮
.𝙰𝚒
.𝙱𝚞𝚐
.𝚁𝚎𝚙𝚘𝚛𝚝
.𝙶𝚙𝚝
.𝙳𝚊𝚕𝚕𝚎
.𝚁𝚎𝚖𝚒𝚗𝚒
.𝙶𝚎𝚖𝚒𝚗𝚒
`
await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
   
   if (selectedId == "Converter Menu") {
     const str =`╭───❮ *s ᴇ ʀ ᴠ ᴇ ʀ* ❯
 𝚃𝙾𝚃𝙰𝙻 𝚁𝙰𝙼: ${formatBytes(totalMemoryBytes)}
 𝙵𝚁𝙴𝙴 𝚁𝙰𝙼: ${formatBytes(freeMemoryBytes)}

╭❮ 𝙲𝙾𝙽𝚅𝙴𝚁𝚃𝙴𝚁 ❯╮
.𝙰𝚃𝚃𝙿
.𝙰𝚃𝚃𝙿2
.𝙰𝚃𝚃𝙿3
.𝙴𝙱𝙸𝙽𝙰𝚁𝚈
.𝙳𝙱𝙸𝙽𝙰𝚁𝚈
.𝙴𝙼𝙾𝙹𝙸𝙼𝙸𝚇
.𝙼𝙿3

     `
     await Matrix.sendMessage(m.from, {
  image: fs.readFileSync('./src/romek.jpg'), 
  caption: str, 
  contextInfo: {
                  mentionedJid: [m.sender], 
                  forwardingScore: 999,
                  isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363321472746562@newsletter',
                  newsletterName: "🐼𝐑𝐎𝐌𝐄𝐊 𝐗𝐃🐠",
                  serverMessageId: 143
                }
              }
}, {
  quoted: m
});
}
};

export default test;
