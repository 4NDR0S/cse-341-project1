const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId; // Corregir nombre (ObjectId en vez de ObjecId)

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('users').find().toArray(); // Usar await para toArray
        res.setHeader('Content-Type', 'application/json'); // Corregir tipo MIME
        res.status(200).json(result); // Devolver el resultado directamente
    } catch (err) {
        res.status(500).json({ error: 'Hubo un error al obtener los usuarios' });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id); // Corregir nombre de la clase ObjectId
        const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId }).toArray(); // Usar await para toArray

        if (result.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.setHeader('Content-Type', 'application/json'); // Corregir tipo MIME
        res.status(200).json(result[0]); // Devolver el primer (y único) usuario
    } catch (err) {
        res.status(500).json({ error: 'Hubo un error al obtener el usuario' });
    }
};

module.exports = {
    getAll,
    getSingle
};