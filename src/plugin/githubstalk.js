import axios from 'axios';
import config from '../config.cjs';

const githubStalk = async (m, gss) => {
  try {
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix)
      ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
      : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();
    const args = text.split(' ');

    const validCommands = ['githubstalk', 'ghstalk'];

    if (validCommands.includes(cmd)) {
      if (!args[0]) return m.reply('❌ Please provide a GitHub username to stalk.');

      const username = args[0];
      await m.React('⏳');

      try {
        const { data: userData, status } = await axios.get(`https://api.github.com/users/${username}`);
        if (status !== 200) return m.reply(`❌ GitHub user not found.`);

        let response = `👨‍💻 *GitHub Profile: @${userData.login}*\n\n`;
        response += `  ◦ *Name*: ${userData.name || 'N/A'}\n`;
        response += `  ◦ *Username*: @${userData.login}\n`;
        response += `  ◦ *Bio*: ${userData.bio || 'N/A'}\n`;
        response += `  ◦ *ID*: ${userData.id}\n`;
        response += `  ◦ *Node ID*: ${userData.node_id}\n`;
        response += `  ◦ *Avatar*: ${userData.avatar_url}\n`;
        response += `  ◦ *Profile Link*: ${userData.html_url}\n`;
        response += `  ◦ *Type*: ${userData.type}\n`;
        response += `  ◦ *Admin*: ${userData.site_admin ? 'Yes' : 'No'}\n`;
        response += `  ◦ *Company*: ${userData.company || 'N/A'}\n`;
        response += `  ◦ *Blog*: ${userData.blog || 'N/A'}\n`;
        response += `  ◦ *Location*: ${userData.location || 'N/A'}\n`;
        response += `  ◦ *Email*: ${userData.email || 'N/A'}\n`;
        response += `  ◦ *Public Repos*: ${userData.public_repos}\n`;
        response += `  ◦ *Public Gists*: ${userData.public_gists}\n`;
        response += `  ◦ *Followers*: ${userData.followers}\n`;
        response += `  ◦ *Following*: ${userData.following}\n`;
        response += `  ◦ *Created At*: ${userData.created_at}\n`;
        response += `  ◦ *Last Updated*: ${userData.updated_at}`;

        const { data: reposData } = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=5&sort=stargazers_count&direction=desc`
        );

        if (reposData.length > 0) {
          const repos = reposData.map(repo => (
            `\n\n🔹 *${repo.name}*\n` +
            `  ◦ 📄 Description: ${repo.description || 'N/A'}\n` +
            `  ◦ ⭐ Stars: ${repo.stargazers_count}\n` +
            `  ◦ 🍴 Forks: ${repo.forks}\n` +
            `  ◦ 🔗 [View Repo](${repo.html_url})`
          ));
          response += `\n\n📚 *Top Repositories*${repos.join('')}`;
        } else {
          response += `\n\n📂 No public repositories found.`;
        }

        response += `\n\n📡 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴏᴍᴇᴋ-xᴅ`;

        await gss.sendMessage(
          m.from,
          { image: { url: userData.avatar_url }, caption: response },
          { quoted: m }
        );

        await m.React('✅');
      } catch (error) {
        console.error('GitHub API error:', error);
        await m.React('❌');
        await gss.sendMessage(m.from, { text: '❌ Error fetching GitHub data.' }, { quoted: m });
      }
    }
  } catch (err) {
    console.error('Command error:', err);
    m.reply('❌ Error processing command.');
  }
};

export default githubStalk;