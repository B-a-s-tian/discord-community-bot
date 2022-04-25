const { CommandInteraction, Client, MessageEmbed  } = require("discord.js");
const { connection } = require("mongoose");
require("../../Events/Client/ready");

module.exports = {
    name: "status",
    description: "Zeigt dir den Status vom Bot.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const Response = new MessageEmbed()
        .setColor("BLUE")
        .setDescription(`**Bot:** \`🟢 ONLINE\` - \`${client.ws.ping}ms\`\n **Uptime:** <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
        **Datenbank**: \`${switchTo(connection.readyState)}\``)
        
        interaction.reply({embeds: [Response]})
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `🔴 DISCONNECTED`
        break;
        case 1 : status = `🟢 CONNECTED`
        break;
        case 2 : status = `🟠 CONNECTING`
        break;
        case 3 : status = `🟣 DISCONNECTING`
        break;
    }
    return status;
}