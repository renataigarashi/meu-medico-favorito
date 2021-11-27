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

//  const messageError = (res, error) => {
//      res.status(500).send({ message: error.message });
// } Como o codigo de erro no catch se repete pode fazer uma reutilizacao de codigo

module.exports = { 
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor    
}