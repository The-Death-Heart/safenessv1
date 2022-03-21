const { Schema, model } = require("mongoose.js");

const guildSchema = new Schema({
    guildId: {
        type: String,
        unique: true
    }
});


module.exports = model("guilds", guildSchema);