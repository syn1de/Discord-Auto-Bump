require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const bumpChannels = process.env.BUMP_CHANNELS.split(',');

    async function bump(channel) {
        try {
            await channel.sendSlash('302050872383242240', 'bump');
            console.count('Bumped!');
        } catch (error) {
            console.error(`Error bumping channel ${channel.id}:`, error);
        }
    }

    async function loop() {
        for (const channelId of bumpChannels) {
            try {
                const channel = await client.channels.fetch(channelId);
                if (channel) {
                    await bump(channel);
                } else {
                    console.log(`Channel ${channelId} not found!`);
                }
            } catch (error) {
                console.error(`Error fetching channel ${channelId}:`, error);
            }
        }

        const minInterval = 5 * 60 * 1000; 
        const maxInterval = 10 * 60 * 1000; 
        const interval = Math.random() * (maxInterval - minInterval) + minInterval;

        setTimeout(loop, interval);
    }

    loop();
});

client.login(process.env.TOKEN);
