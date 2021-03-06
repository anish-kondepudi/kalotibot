const Discord = require('discord.js');
const client = new Discord.Client();

const responses = require('./responses.json');
const token = require('./token.json').token;

function log(message) 
{
  console.log(`[${new Date().toLocaleString()}] ${message.author.username} sent: ${message.content}`);
}

client.on('ready', () => {
  let clientUser = client.user;
  clientUser.setActivity('finna mute chat');
  console.log(`Hullo! From ${clientUser.username} (${clientUser.id})`);
})

client.on('guildCreate', guild => {

  let channels = guild.channels.cache;
  let textChannel;

  if (guild.systemChannelID) textChannel = channels.get(guild.systemChannelID)
  else textChannel = channels.find(channel => channel.type == 'text');

  textChannel.send('Ask me questions by mentioning me or by beginning your message with `?`');
});

client.on('message', message => {
  if (message.author.id == client.user.id) return;

  // sometimes user activity gets unset so just reset periodically when someone messages
  client.user.setActivity('finna mute chat');

  const channel = message.channel;
  const messageStr = message.content;

  if (messageStr.startsWith('?') || message.mentions.has(client.user))
  {
    log(message);
    channel.send(responses[Math.floor(Math.random() * responses.length)]);
  }
});

client.login(token);