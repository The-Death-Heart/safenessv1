const fs = require("fs");
const path = require("path");

module.exports = async (client) => {
    try {
        const files = await fs.readdirSync(path.resolve(__dirname + "/../commands/")).filter((files) => files.endsWith('.js'));

        for(file of files) {
            const command = require(path.resolve(__dirname + `/../commands/${file}`));
            client.commands.set(command.name, command);
        }
    } catch (error) {
        console.log("[ERROR] ".cyan + `${error.stack}`.red)
    }
}