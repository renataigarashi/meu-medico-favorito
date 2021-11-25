require('dotenv').config();
const { app } = require("./src/app");
// const port = 3000;
const port = process.env.PORT || 3000; //puxa porta do env ou usa a 3000

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

