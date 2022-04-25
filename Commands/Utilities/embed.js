const {CommandInteraction, MessageEmbed } = require("discord.js")

module.exports = {
    name: "embed",
    description: "Erstelle einen custom Embed.",
    options: [
        {
            name: "generate",
            description: "Erstelle ein Embed",
            type: "SUB_COMMAND",
            options: [
                { name: "colour", description: "Gib eine Farbe an.", type: "STRING"},
                { name: "title", description: "Gib einen Titel an.", type: "STRING"},
                { name: "url", description: "Gib eine URL an.", type: "STRING"},
                { name: "author", description: "Gib einen Author an.", type: "STRING"},
                { name: "description", description: "Gib eine Beschreibung an", type: "STRING"},
                { name: "thumbnail", description: "Gib ein Thumbnail an.", type: "STRING"},
                { name: "image", description: "Gib ein Bild an.", type: "STRING"},
                { name: "timestamp", description: "Timestamp an?", type: "BOOLEAN"},
                { name: "footer", description: "Gib einen Footer an.", type: "STRING"},
                { name: "fields", description: "name^value^inline (true or false)^^", type: "STRING" }
            ]
        },
        {
            name: "help",
            description: "Wie benutzt man den Command?",
            type: "SUB_COMMAND"
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;
        const subCommand = options.getSubcommand();

        switch(subCommand) {
            case "generate":
                const eFields     = [[], [], []];
                const splitFields = [];

                
                const colour      = options.getString("colour");
                const title       = options.getString("title");
                const url         = options.getString("url");
                const author      = options.getString("author");
                const description = options.getString("description");
                const thumbnail   = options.getString("thumbnail");
                const image       = options.getString("image");
                const timestamp   = options.getBoolean("timestamp");
                const footer      = options.getString("footer");
                let   fields      = options.getString("fields");

                const embed       = new MessageEmbed();

                if(url && url.includes("http"))             embed.setURL(url);
                if(thumbnail && thumbnail.includes("http")) embed.setThumbnail(thumbnail);
                if(image && image.includes("http"))         embed.setImage(image);
                if(colour)                                  embed.setColor(colour.toUpperCase());
                if(title)                                   embed.setTitle(title);
                if(author)                                  embed.setAuthor(author);
                if(description)                             embed.setDescription(description);
                if(timestamp)                               embed.setTimestamp();
                if(footer)                                  embed.setFooter(footer);
                if(fields) {
                    fields = fields.split("^");
                    fields.forEach(e => {
                        if(e.length > 0) {
                            splitFields.push(e.trim())
                        }
                    });
            
                    let x = 0;
                    for (let i = 0; i < splitFields.length; i++) {
                        if(x == 3) x = 0;
                        eFields[x].push(splitFields[i]);
                        x++;
                    }
                        
                    for (let i = 0; i < eFields[0].length; i++) {
                        embed.addField(`${eFields[0][i]}`, `${eFields[1][i]}`, JSON.parse(eFields[2][i].toLowerCase()));
                    }
                }

                if(!embed.title && !embed.description && !embed.fields[0]) {
                    embed.setDescription("You have not provided valid options!")
                }
                interaction.reply({embeds: [embed]});
            break;
            case "help":
                const help = new MessageEmbed()
                    .setTitle("/Embed Help")
                    .setColor("GREEN")
                    .setDescription("To send an embed you must provide at least a title, a description or a field.\n\nMost of the commands are fairly self explanitory except the fields command.\nIn order to send fields you must follow the following format:\n\n`name^value^inline^^`\n\nFor example, sending `Name^Wilson^True^^ Age^18^True^^ Interests^Airsoft, Gaming and Coding^False^^` would send:")
                    .addFields(
                        {name: "Name", value: "Wilson", inline: true},
                        {name: "Age", value: "18", inline: true},
                        {name: "Interests", value: "Airsoft, Gaming and Coding", inline: false}
                    )    
                interaction.reply({embeds: [help]})
            break;
        }
    }
}