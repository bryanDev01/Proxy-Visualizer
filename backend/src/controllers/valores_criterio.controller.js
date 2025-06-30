import { supabaseClient } from "../db.js";

// Obtener todos los valores de criterio
export const obtenerValorCriterios = async (req, res) => {
  try {
    const { data, error } = await supabaseClient
      .from("valor_criterio")
      .select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener valores de criterio" });
  }
};

// Obtener valor de criterio por ID
export const obtenerValorCriterio = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabaseClient
      .from("valor_criterio")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el valor del criterio" });
  }
};

// Crear nuevo valor de criterio
export const crearValorCriterio = async (req, res) => {
  const { tipo, criterio } = req.body;

  try {
    const { data, error } = await supabaseClient
      .from("valor_criterio")
      .insert([{ tipo, criterio }])
      .select();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el valor del criterio" });
  }
};

// Actualizar valor de criterio parcialmente
export const actualizarValorCriterio = async (req, res) => {
  const { id } = req.params;
  const { tipo, criterio } = req.body;

  try {
    const { data, error } = await supabaseClient
      .from("valor_criterio")
      .update({ tipo, criterio })
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Valor criterio no encontrado" });
    }

    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el valor del criterio" });
  }
};

// Eliminar valor de criterio
export const eliminarValorCriterio = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabaseClient
      .from("valor_criterio")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el valor del criterio" });
  }
};