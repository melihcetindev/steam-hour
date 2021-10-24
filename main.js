const express = require("express");
const app = express();

const fs = require("file-system");
const path = require("path").join(__dirname, "users");
const steamClient = require('./client.js');

const configsArray = [];
const botArray = [];

app.get('/', async (req,res) => {
	configsArray.push({
		username: req.query.username,
		password: req.query.password,
		sharedSecret: "",
		guardCode: req.query.guardCode,
		games: [
			570
		]
	});

	for	(index = 0; index < configsArray.length; index++) {
		const config = configsArray[index];
		
		const bot = steamClient.newBot(config);
		bot.doLogin();
		botArray.push(bot);
	}
	res.json({status: true});
	console.log('Number of bots running: ' + configsArray.length);
	console.log('Currently running ' + botArray.length + ' bot(s)');
});

// fs.readdirSync(path).forEach(function(file) {
//   const user = require("./users/" + file);
//   configsArray.push(user);
// });

app.listen(80);