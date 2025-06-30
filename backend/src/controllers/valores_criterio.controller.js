import { pool } from "../db.js";

export const obtenerValorCriterio = async(req, res) => {
  const { id } = req.params

  const result = await pool.query("SELECT * FROM valor_criterio WHERE id = $1", [id])

  res.json(result.rows[0])
}

export const obtenerValorCriterios = async (req, res) => {
  const result = await pool.query("SELECT * FROM valor_criterio;");

  res.json(result.rows);
};

export const crearValorCriterio = async (req, res) => {
  const { tipo, criterio } = req.body;

  const result = await pool.query(
    "INSERT INTO valor_criterio (tipo, criterio) VALUES ($1, $2) RETURNING*;",
    [tipo, criterio]
  );

  res.json(result.rows);
};

export const actualizarValorCriterio = async (req, res) => {
  const { id } = req.params;
  const { tipo, criterio } = req.body;
  
  const result = await pool.query("UPDATE valor_criterio SET tipo = COALESCE($1, tipo), criterio = COALESCE($2, criterio) WHERE id = $3;", [tipo, criterio, id])
  const response = await pool.query("SELECT * FROM valor_criterio;")

  if(result.rowCount === 0) {
    res.status(404).json({ message: "Valor Criterio Not Found"})
  }

  res.json(response.rows)
};

export const eliminarValorCriterio = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("DELETE FROM valor_criterio WHERE id = $1;", [
    id,
  ]);

  if (result.rowCount === 0) {
    res.status(404).json({ message: "Valor Criterio Not Found" });
  }

  res.sendStatus(204);
};
