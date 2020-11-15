const fs = require('fs');

const Plugin = function ({ client, folder }) {
    if (!client || !folder) return;

    return class {
        main (Discord) {
            // Your code here..
            client.on('message', msg => {
                let logFile = new Date().toDateString();
                let logTxt = this.gMessage(msg);
                if (!fs.existsSync(folder + '/' + logFile + '.txt')) return fs.writeFileSync(folder + '/' + logFile + '.txt', logTxt + '\n', 'utf8');
                else fs.appendFileSync(folder + '/' + logFile + '.txt', logTxt + '\n', 'utf8');
            })
        }

        gMessage (msg) {
            let string = "";
            let date = new Date().toLocaleString();
            string += `MESSAGE | ${date} | ${msg.content} | GUILD_{${msg.guild.id}} CHANNEL_[${msg.channel.id}] USER_(${msg.author.id})`;
            return string;
        }
    }
}

module.exports = Plugin;

/*

Usage:
    Discord.use(require('./plugins/logger')({ client, folder: `${__dirname}/logs` }));

Disclaimer:
    Make sure the 'logs' folder exists.

*/
