module.exports = {
    name: "ready",
    run: async (client) => {
        try {
            console.log("[BOT] ".cyan + "Todo Listo Como -> " + `${client.user.tag}`.green);
        } catch (error) {
            console.log("[ERROR] ".cyan + `${error.stack}`.red)
        }
    }
};