module.exports = {
    name: "help", // Nombre del comando.
    aliases: [], // Alias del comandos.
    description: "Muestra el panel de ayuda del bot.", // Descripción del bot.
    usage: "help [COMANDO]", // Uso del comando. (sin prefix)
    requeriments: {
        userPerms: [], // Permisos que requiere el usuario para ejecutar el comando.
        botPerms: [], // Permisos que requiere el bot para ejecutar el comando.
        channelTypes: ["GUILD_TEXT", "DM"] // Tipos de canales donde se puede ejecutar el comando.
    },
    run: async (client, message, args) => {
        try {
            
        } catch (error) {
            await message.reply("`⛔` | Se generó un error inesperado. `(Intenta más tarde)`");
            console.log("[ERROR] ".cyan + `${error.stack}`.red);
        }
    }
};