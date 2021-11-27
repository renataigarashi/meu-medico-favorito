const Doctor = require("../models/Doctors");

const createDoctor = async (req, res) => {
    const { name, crm, specialty, clinic, phone, favorite } = req.body;
    try {
        const doctor = await Doctor.create({ name, crm, specialty, clinic, phone, favorite })
        console.log(`Seu médico ${doctor.name} foi cadastrado`);
        res.status(201).send(doctor);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}    

const getAllDoctors = async (req, res) => {
    const favorite = req.query.favorite; //por boa pratica, o que pode ser undefined nao desestrutura
    try{
        const where = favorite ? { where: { favorite } } : {}
        const doctors = await Doctor.findAll(
            {
                where,
                order: [['id', 'DESC']] //ordenando por id ['id'] // [['id', 'DESC']] ordenando por id descendente
            });
        //se tem medico e o array > 0
        if (doctors && doctors.length > 0) {
            res.status(200).send(doctors)
        } else {
            res.status(204).send();
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
        //messageError(res, error); reutilizacao de codigo
    }
}

const getDoctorById = async (req, res) => {
    try{ 
        const doctorId = req.params.id;
        const doctor = await Doctor.findOne({
            where: { id: doctorId }
        })
        if (doctor){
            res.status(200).send(doctor);
        } else {
            res.status(404).send({ message: `Medico de id ${doctorId} não foi encontrado na base` })
        }
    } catch(error) {
        res.status(500).send({ message: error.message });
    }
}

const updateDoctor = async (req,res) => {
    try {
        const doctorId = req.params.id;
        const { name, crm, specialty, clinic, phone, favorite } =  req.body; //Coloca o req.body, que restringe o que ta vindo do body

        const rowsUpdated = await Doctor.update({name, crm, specialty, clinic, phone, favorite }, {
            where: { id: doctorId}
        })
        if (rowsUpdated && rowsUpdated[0] > 0) {
            res.status(200).send( {
                message: `Medico alterado com sucesso` })
        } else {
            res.status(404).send ({message: "Medico não encontrado para alterar"})
        }
    } catch(error) {
        res.status(500).send( {message: error.message} );
    }
}


/*

COLOCANDO CADA FUNÇÃO EM SEPARADO
const updateDoctorInDB = async ({ name, specialty, phone, crm, favorite, doctorId, clinic }) => {
    const rowsUpdated = await Doctor.update({ name, crm, specialty, clinic, phone, favorite }, {
        where: { id: doctorId }
    })
    return (rowsUpdated && rowsUpdated[0] > 0) ? true : false
}

const sendErrorMessage = error => {
    res.status(500).send({ message: error.message })
}

const updateDoctor = async (req, res) => {
    const doctorId = req.params.id
    const { name, crm, specialty, clinic, phone, favorite } = req.body
    try {
        const doctorUpdated = await updateDoctorInDB({ name, specialty, phone, crm, favorite, doctorId, clinic })
        doctorUpdated
            ? res.status(200).send({ message: "Medico alterado com sucesso" })
            : res.status(404).send({ message: "Medico nao encontrado para alterar" })
    } catch (error) {
        sendErrorMessage(error)
    }
}

*/

//  const messageError = (res, error) => {
//      res.status(500).send({ message: error.message });
// } Como o codigo de erro no catch se repete pode fazer uma reutilizacao de codigo

const updateFavorite = async (req, res) => {
    const doctorId = req.params.id
    const favorite = req.body.favorite
    try {
        const rowsUpdated = await Doctor.update({ favorite }, { where: { id: doctorId } });
        if (rowsUpdated && rowsUpdated > 0) {
            res.status(200).send({ message: `${rowsUpdated[0]} medico(s) com informação de favorito atualizada com sucesso` })
        } else {
            res.status(404).send({ message: `Medico com id ${doctorId} não encontrado para atualizar informação de favorito` })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const deleteDoctor = async (req, res) => {
    const doctorId = req.params.id;

    try{
        const rowDeleted = await Doctor.destroy({where: {id: doctorId}} );
        if (rowDeleted) {
            res.status(200).send({ message: `${rowDeleted} médico de id ${doctorId} deletado com sucesso`})
        } else {
            res.status(404).send({ message: `Médico de id ${doctorId} não encontrado`})
        }
    } catch(error){
        res.status(500).send({ message: error.message })
    }
}

module.exports = { 
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    updateFavorite, 
    deleteDoctor
}


/*
EXPLICACOES DESTRUCTURING
const meuJson = { name, specialty, clinic, phone, favorite }
    console.log('Json original:')
    console.log(meuJson)
    console.log('Novo json:')
    console.log({
        ...meuJson,
        name: 'Vanessa Jansen',
        endereco: 'Rua das amoras 123',
        animal: 'cachorro'
    })
    // sem os ...meuJson:
    {
        meuJson: {
            name: 'Ana Grey da Silva',
                specialty: 'Veterinaria',
                    clinic: 'Hospital do Coração',
                        phone: '11991122336',
                            favorite: false
        },
        name: 'Vanessa Jansen',
        endereco: 'Rua das amoras 123',
        animal: 'cachorro'
    }
    // com os ...meuJson
    { 
        name: 'Vanessa Jansen',
        specialty: 'Veterinaria',
        clinic: 'Hospital do Coração',
        phone: '11991122336',
        favorite: false,
        endereco: 'Rua das amoras 123',
        animal: 'cachorro'
    }

*/