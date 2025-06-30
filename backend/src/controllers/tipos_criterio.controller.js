import { pool } from "../db.js"

export const obtenerTipoCriterio = async(req, res) => {
    const { id } = req.params

    const result = await pool.query("SELECT * FROM tipo_criterio WHERE id = $1;", [id])

    res.json(result.rows[0])
}

export const obtenerTiposCriterio = async(req, res) => {
    const result = await pool.query("SELECT * FROM tipo_criterio")

    res.json(result.rows)
}

export const crearTipoCriterio = async(req, res) => {
    const { tipo, cantidad } = req.body

    const result = await pool.query("INSERT INTO tipo_criterio (tipo, cantidad) VALUES ($1, $2) RETURNING*;", [tipo, cantidad])

    res.json(result.rows)
}

export const actualizarTipoCriterio = async(req, res) => {
    const { id } = req.params
    const { tipo, cantidad } = req.body

    const result = await pool.query("UPDATE tipo_criterio SET tipo = COALESCE($1, tipo), cantidad = COALESCE($2, cantidad) WHERE id = $3;", [tipo, cantidad, id])
    const response = await pool.query("SELECT * FROM tipo_criterio;")

    if(result.rowCount === 0) {
        res.status(404).json({message: "Tipo Criterio Not Found"})
    }
    
    res.json(response.rows)
}

export const eliminarTipoCriterio = async(req, res) => {
    const { id } = req.params

    const result = await pool.query("DELETE FROM tipo_criterio WHERE id = $1;", [id])

    if(result.rowCount === 0) {
        res.status(404).json({message: "Tipo Criterio Not Found"})
    }

    res.sendStatus(204)
}