import { supabaseClient } from "../db.js";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";

export const exportarDatos = async (req, res) => {
  try {
    // Obtener datos de las tres tablas
    const { data: usuarios, error: errorUsuarios } = await supabaseClient
      .from("usuario")
      .select("*");
    const { data: tipos, error: errorTipos } = await supabaseClient
      .from("tipo_criterio")
      .select("*");
    const { data: valores, error: errorValores } = await supabaseClient
      .from("valor_criterio")
      .select("*");

    if (errorUsuarios || errorTipos || errorValores) {
      return res.status(500).json({ error: "Error al obtener los datos" });
    }

    // Formato de exportación
    const format = req.query.format || "csv";

    if (format === "excel") {
      // Crear workbook y hojas
      const workbook = new ExcelJS.Workbook();
      // Usuarios
      const wsUsuarios = workbook.addWorksheet("Usuarios");
      wsUsuarios.columns = [
        { header: "ID", key: "id" },
        { header: "CI", key: "ci" },
        { header: "Nombre", key: "nombre" },
        { header: "Apellido", key: "apellido" },
        { header: "Contraseña", key: "contra" },
        { header: "Rol", key: "rol" },
      ];
      wsUsuarios.addRows(usuarios);
      // Tipos de Criterio
      const wsTipos = workbook.addWorksheet("TiposCriterio");
      wsTipos.columns = [
        { header: "ID", key: "id" },
        { header: "Tipo", key: "tipo" },
        { header: "Cantidad", key: "cantidad" },
      ];
      wsTipos.addRows(tipos);
      // Valores de Criterio
      const wsValores = workbook.addWorksheet("ValoresCriterio");
      wsValores.columns = [
        { header: "ID", key: "id" },
        { header: "Tipo", key: "tipo" },
        { header: "Criterio", key: "criterio" },
      ];
      wsValores.addRows(valores);

      // Enviar archivo Excel
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=datos_exportados.xlsx"
      );
      await workbook.xlsx.write(res);
      res.end();
      return;
    } else {
      // Unir los datos en un solo objeto para exportar (CSV)
      const exportData = [
        ...usuarios.map((u) => ({ tabla: "usuarios", ...u })),
        ...tipos.map((t) => ({ tabla: "tipos_criterio", ...t })),
        ...valores.map((v) => ({ tabla: "valores_criterio", ...v })),
      ];
      // Convertir a CSV
      const parser = new Parser();
      const csv = parser.parse(exportData);
      res.header("Content-Type", "text/csv");
      res.attachment("datos_exportados.csv");
      return res.send(csv);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al exportar los datos" });
  }
}; 