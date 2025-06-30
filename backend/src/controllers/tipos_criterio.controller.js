import { supabaseClient } from "../db.js";

// Obtener todos los tipos de criterio
export const obtenerTiposCriterio = async (req, res) => {
  try {
    const { data, error } = await supabaseClient
      .from("tipo_criterio")
      .select("*");

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener tipos de criterio" });
  }
};

// Obtener tipo de criterio por ID
export const obtenerTipoCriterio = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabaseClient
      .from("tipo_criterio")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el tipo de criterio" });
  }
};

// Crear nuevo tipo de criterio
export const crearTipoCriterio = async (req, res) => {
  const { tipo, cantidad } = req.body;

  try {
    const { data, error } = await supabaseClient
      .from("tipo_criterio")
      .insert([{ tipo, cantidad }])
      .select();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el tipo de criterio" });
  }
};

// Actualizar tipo de criterio parcialmente
export const actualizarTipoCriterio = async (req, res) => {
  const { id } = req.params;
  const { tipo, cantidad } = req.body;

  try {
    const { data, error } = await supabaseClient
      .from("tipo_criterio")
      .update({ tipo, cantidad })
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Tipo criterio no encontrado" });
    }

    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el tipo de criterio" });
  }
};

// Eliminar tipo de criterio
export const eliminarTipoCriterio = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabaseClient
      .from("tipo_criterio")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el tipo de criterio" });
  }
};