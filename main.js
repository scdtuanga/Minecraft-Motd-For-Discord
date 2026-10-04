const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const token = ""; // token bot discord
const serverIP = ""; // server IP của server Minecraft
const serverPort = 25653; // server port của server Minecraft

client.once('clientReady', () => {
  console.log(`✅ Bot đã đăng nhập: ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'status') {
    try {
      const res = await fetch(`https://mcapi.us/server/status?ip=${serverIP}&port=${serverPort}`);
      const data = await res.json();

      const motd = data.motd || "Không có MOTD";
      const pingText = (typeof data.ping === 'number' && data.ping > 0) ? `${data.ping}ms` : "Không xác định";
      const playersNow = data.players?.now || 0;
      const playersMax = data.players?.max || 0;
      const version = data.server?.name || "Không rõ";
      const playerList = data.players?.sample?.map(p => p.name).join(', ') || "Không có dữ liệu";

      const embed = new EmbedBuilder()
        .setTitle('🟢 Minecraft Server Online')
        .setDescription(
          `🌐 **Server IP:** ${serverIP}\n`
          + `🧩 **Version:** ${version}\n`
          + `👥 **Players:** ${playersNow}/${playersMax}\n`
          + `📡 **Ping:** ${pingText}\n\n`
          + `🎮 **Online Players:**\n${playerList}\n\n`
          + `💬 **MOTD:**\n${motd}`
        )
        .setColor(0x00ff00)
        .setThumbnail('https://www.freepnglogos.com/uploads/minecraft-logo-17.png')
        .setImage(`https://mcapi.us/server/image?ip=${serverIP}`)
        .setFooter({ text: `Last updated • ${new Date().toLocaleString('vi-VN')}` });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('❌ Lỗi khi lấy dữ liệu server:', error);
      await interaction.reply('⚠️ Không thể lấy thông tin server. Vui lòng thử lại sau.');
    }
  }
});

client.login(token);