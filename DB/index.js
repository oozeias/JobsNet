const express = require('express');
const app = express();
const User = require('./db/User');
const {
    Op
} = require("sequelize");



app.use(express.static(__dirname + '/principal'));

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.post('/add', async function (req, res) {
    cpf_matches = await User.findOne({
       cpf: req.body.cpf
    })
    console.log(cpf_matches);

    if (cpf_matches) {
        res.json({
            error: 1
        })
    } else {
        User.create({
            nome: req.body.nome,
            cargo: req.body.cargo,
            dataNasc: req.body.dataNasc,
            estadoCivil: req.body.estadoCivil,
            sexo: req.body.sexo,
            cep: req.body.cep,
            rua: req.body.rua,
            numero: req.body.numero,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            email: req.body.email,
            celular: req.body.celular,
            tel1: req.body.tel1,
            tel2: req.body.tel2,
            identidade: req.body.identidade,
            cpf: req.body.cpf,
        }).then(() => {
            res.redirect(301, "/submitted.html")
        }).catch((erro) => {
            res.status(500)
        })
    }
})
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Servidor rodando na url http://localhost:8081`)
});