import { pool } from "../db.js"

export const obtenerUsuarios = async(req, res) => {
    const result = await pool.query('SELECT * FROM usuario')

    res.json(result.rows)
}

export const obtenerUsuario = async(req, res) => {

}

export const crearUsuario = async(req, res) => {

}

export const actualizarUsuario = async(req, res) => {

}

export const eliminarUsuario = async(req, res) => {

}