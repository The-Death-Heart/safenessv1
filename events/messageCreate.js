const channelTypesName = { "GUILD_TEXT": "CANAL DE TEXTO", "DM": "CANAL PRIVADO" };

module.exports = {
    name: "messageCreate",
    run: async (client, message) => {
        try {
            if(message.content.startsWith(client.configs.prefix) && !message.author.bot) {
                const args = message.content.slice(client.configs.prefix.length).trim().split(/ +/g);
                const cmd = args.shift().toLowerCase();
                const command = client.commands.get(cmd) || client.commands.find((cmd) => cmd?.aliases?.includes(cmd));
                
                if(command) {
                    if(message.guild) {
                        if(command.requeriments.channelTypes.includes(message.channel.type)) {
                            if(message.guild.me.permissions.has(command.requeriments.botPerms)) {
                                if(message.member.permissions.has(command.requeriments.userPerms)) {
                                    await message.channel.sendTyping();
                                    command.run(client, message, args);
                                } else return await message.reply({content: "`❌` | No tienes los permisos necesarios para ejecutar el comando.", embeds: [
                                    {
                                        color: "DARK_BUT_NOT_BLACK",
                                        description: "**REQUERIDOS:** " + command.requeriments.userPerms.map((i) => "`" + i + "`").join(", ") + ""
                                    }
                                ]});
                            } else return await message.reply({content: "`❌` | No tengo los permisos necesarios para ejecutar el comando.", embeds: [
                                {
                                    color: "DARK_BUT_NOT_BLACK",
                                    description: "**REQUERIDOS:** " + command.requeriments.botPerms.map((i) => "`" + i + "`").join(", ") + ""
                                }
                            ]});
                        } else return await message.reply({content: "`❌` | El comando no se puede usar en este tipo de canal.", embeds: [
                            {
                                color: "DARK_BUT_NOT_BLACK",
                                description: "**PERMITIDOS:** " + command.requeriments.channelTypes.map((c) => "`" + channelTypesName[c] + "`").join(", ") + ""
                            }
                        ]});
                    } else {
                        if(command.requeriments.channelTypes.includes(message.channel.type)) {
                            await message.channel.sendTyping();
                            command.run(client, message, args);
                        } else return await message.reply({content: "`❌` | El comando no se puede usar en este tipo de canal.", embeds: [
                            {
                                color: "DARK_BUT_NOT_BLACK",
                                description: "**PERMITIDOS:** " + command.requeriments.channelTypes.map((c) => "`" + channelTypesName[c] + "`").join(", ") + ""
                            }
                        ]});
                    }
                } else return await message.reply("`❌` | No se encontro el comando.");
            }
        } catch (error) {
            console.log("[ERROR] ".cyan + `${error.stack}`.red)
        }
    }
}