const { REST, Routes } = require('discord.js');

const token = "";        // token bot
const clientId = "";     // Application ID từ Developer Portal
const guildId = "";       // Server ID từ Discord

const commands = [
  {
    name: 'status',
    description: 'Xem trạng thái server Minecraft',
  },
];

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('🔄 Đang đăng ký slash command...');
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    console.log('✅ Slash command /status đã được đăng ký!');
  } catch (error) {
    console.error(error);
  }
})();