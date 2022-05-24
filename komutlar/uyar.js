
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ms = require('ms');
const ayarlar = require("../ayarlar.json");
const moment = require('moment');
module.exports.run = async (client, message, args) => {

const permError = new MessageEmbed()
    .setColor('RED')
    .setTitle('Başarısız')
    .setAuthor(message.author.tag, message.author.avatarURL({ size:1024, dynamic:true, format: "png"}))
    .setDescription(`Bu Komutu Kullanmak İçin <@&${ayarlar.personelID}> Yetkisine Sahip Olmalısın!`) 
  
if (!message.member.roles.cache.has(ayarlar.anahtarID , ayarlar.ustekipID , ayarlar.personelID)) return message.channel.send(permError);
  
const mutelog = message.guild.channels.cache.find(c => c.id === ayarlar.muteLogKanalID)

let member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
if (!member) return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, lütfen bir kullanıcı etiketle !`))
          
let mute = message.mentions.members.first() || message.guild.members.cache.find(r => r.id === args[0]);
if (!mute) { new MessageEmbed().setColor('0x800d0d').setDescription(`${message.author}, lütfen uyarı atmam gereken kullanıcı belirt!`);
} else {
if (mute.roles.highest.position >= message.member.roles.highest.position) 
              {
return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`Bu Kullanıcı Senden Üst/Aynı Pozisyonda.`));
} else {

let sebep = args[1]
let sebep2 = args.join(' ').slice(args[0].length+args[1].length + 1)
if(!sebep) return message.channel.send(new MessageEmbed().setColor('0x800d0d').setDescription(`Lütfen Bir sebep belirtiniz.`))  
                
                 
message.react('✅')          
message.channel.send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp().setDescription(`${message.author} tarafından ${member} **${sebep} ${sebep2}** sebebiyle uyarıldı`));
mutelog.send(
new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL ({ dynamic: true}))
.setColor('ffdb55')
.setTitle(`
<:kullaniciunlem:976935859855167528> **__Bir Kullanıcı Uyarıldı!__**`)
.setDescription(`
\n 
> **Kullanıcı:** <@${member.id}> (\`${member.id}\`) 
> **Yetkili:** <@${message.author.id}> 
> **Sebep:** \`${sebep} ${sebep2}\` 
> **Tarih:** (\`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\`) \n
<:unlem:976935860245254185> **__Sunucu kurallarına uymamaya devam ederseniz sunucudan atılabilirsiniz!__**
        
`))
message.react('✅')
} 
        
}};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["uyar"],
    permLevel: 0,
    name: "uyar"
  }
  
  exports.help = {
    name: "uyar"
  };
  
  