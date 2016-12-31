var express = require("express");
var hbs = require("hbs");
var fs = require("fs");

var app = express();

hbs.registerPartials(__dirname + "/views/partials")
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile("server.log", log + '\n', (err) => {
		console.log("Cant write the file because " + err);
	})	
	next();
});

hbs.registerHelper("getCurrentYear", () =>{
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase() + "!!";
})


app.get('/', (req, res) => {
	res.render('index.hbs', {
		pageTitle : "Page Title Hbs",
		wellcomeMessage: "Fuck you"
	});
});

app.use(express.static(__dirname + '/public'))



app.get('/about', (req, res) => {
		res.send({
		name:"teste",
		age: 21,
		hobbies: [
			{
				hobbie1: "dance",
				hobbie2: "sing",
				hobbie3: "programmer"
			}
		]
	})
});

app.get('/help', (req, res) => {

});

app.listen(3000, () => {
	console.log("Server is up at 3000 port")
});
