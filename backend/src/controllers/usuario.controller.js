// import { pool } from "../db.js";

import { supabaseClient } from "../db.js";

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const { data, error } = await supabaseClient
      .from("usuario")
      .select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// Obtener usuario por ID
export const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabaseClient
      .from("usuario")
      .select("*")
      .eq("id", id)
      .single(); // Retorna un solo objeto si existe

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Crear nuevo usuario
export const crearUsuario = async (req, res) => {
  const { ci, nombre, apellido, contra, rol } = req.body;

  try {
    const { data, error } = await supabaseClient
      .from("usuario")
      .insert([
        { ci, nombre, apellido, contra, rol }
      ])
      .select(); // Devuelve el registro insertado

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Actualizar usuario por ID
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { ci, nombre, apellido, contra, rol } = req.body;

  try {
    const { data, error } = await supabaseClient
      .from("usuario")
      .update({ ci, nombre, apellido, contra, rol })
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar usuario por ID
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabaseClient
      .from("usuario")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.sendStatus(204); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};
