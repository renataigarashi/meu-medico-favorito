const express = require("express");
const app = express();
require("./models/Doctors");
const doctors = require("./routes/doctors");



app.use(express.json());
const index = require("./routes/index");

app.use(function(req, res, next) {
    res.header("Acess-Control-Allow-Origin", "*") //informo que a minha api pode ser chamada de qualquer lugar, um browser, por ex.
    res.header(
        "Acess-Control-Allow-Header",
        "Origin, X-Request-With, Content-Type, Accept"
    )
    next();
    // como criei uma função dentro do app.use, preciso dar um "next()" para mandar ele seguir para a próxima middleware. 
    // se eu não faço isso, a requisição vai ficar travada aí.
});

//para que o front consiga utilizar as rotas que vamos criar, precisamos dar essa permissao de acesso
app.options("/*", (req, res)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers");
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS, PATCH"
    );
    res.send("send something whatever");
});

app.use("/doctors", doctors);
app.use("/", index);

module.exports = {
    app
}


