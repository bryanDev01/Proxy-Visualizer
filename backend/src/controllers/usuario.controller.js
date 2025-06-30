import { pool } from "../db.js";

export const obtenerUsuarios = async (req, res) => {
  const result = await pool.query("SELECT * FROM usuario");
  res.json(result.rows);
};

export const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM usuario WHERE id = $1;", [id]);
  res.json(result.rows[0]);
};

export const crearUsuario = async (req, res) => {
  const { ci, nombre, apellido, contra, rol } = req.body;

  const result = await pool.query(
    "INSERT INTO usuario (ci, nombre, apellido, contra, rol) VALUES ($1, $2, $3, $4, $5 ) RETURNING*;",
    [ci, nombre, apellido, contra, rol]
  );

  res.json(result.rows);
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { ci, nombre, apellido, contra, rol } = req.body;
  const result = await pool.query(
    "UPDATE usuario SET ci = COALESCE($1, ci), nombre = COALESCE($2, nombre), apellido = COALESCE($3, apellido), contra = COALESCE($4, contra), rol = COALESCE($5, rol) WHERE id = $6;",
    [ci, nombre, apellido, contra, rol, id]
  );
  const response = await pool.query("SELECT * FROM usuario;");

  if (result.rowCount === 0) {
    res.status(404).json({ message: "User Not Found" });
  }

  res.json(response.rows);
};

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("DELETE FROM usuario WHERE id = $1;", [id]);

  if (result.rowCount === 0) {
    res.status(404).json({ message: "User Not Found" });
  }

  res.sendStatus(204);
};
