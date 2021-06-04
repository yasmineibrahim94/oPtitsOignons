require('dotenv').config();

const express = require('express');
const session = require('express-session');
const router = require('./app/router');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const app = express();


app.locals.appName = 'cuisine';

const port = process.env.PORT || 5000;

// swagger documentation
const expressSwagger = require('express-swagger-generator')(app);
let options = require('./swagger-config.json');
options.basedir = __dirname; // __dirname désigne le dossier du point d'entrée
options.swaggerDefinition.host = `api-cuisine.herokuapp.com` || `localhost:${port}`;
expressSwagger(options);

// **mise en place et configuration de la session

app.use(cookieParser())

app.use(session({
    name: 'session',
    resave: false,
    saveUninitialized: false,
    secret: 'enisiuc',
    cookie: {
        secure: false,
        maxAge: 120 * 120 * 1000,
        sameSite: "none"
    }
}));

// **rendre disponible dans toutes les vues, l'éventuel utilisateur connecté
app.use((req, res, next) => {
    // si un utilisateur est connecté
    if (req.session.user) {
        // on le rend disponible dans les views
        res.locals.user = req.session.user;
    }
    next();
});

//TODO Dossier static ?
//app.use(express.static(__dirname + '/static'));

// le parser JSON qui récupère le payload quand il y en a un et le transforme en objet JS disponible sous request.body
app.use(express.json());
app.use(cors({

    origin: ("http://localhost:8080"),
    exposedHeaders: ['set-cookie'],
    credentials: true,

}));
app.use("/api", router);



app.listen(port, () => {
    console.log(
        `Listening on ${process.env.PROTOCOL}://${process.env.DOMAINNAME}:${port}`
    );
});
