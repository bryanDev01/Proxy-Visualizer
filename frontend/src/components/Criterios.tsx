"use client";

import { ICriterio } from "@/app/pages/Link5/page";
import { Delete, Edit } from "lucide-react";
import { FormEvent, useState } from "react";
import Eliminar_Alerta from "./ui/Eliminar_Alerta";

function Criterios({ criterios }: { criterios: ICriterio[] }) {
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleEliminar, setVisibleEliminar] = useState<boolean>(false);
  const [tipoCriterioData, setTipoCriterioData] = useState<ICriterio | null>(
    null
  );
  const [valorCriterioData, setValorCriterioData] = useState<ICriterio | null>(
    null
  );
  const [rutaActual, setRutaActual] = useState<string>("");
  const [tipoID, setTipoID] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isEdit =
      (rutaActual === "valorCriterios"
        ? valorCriterioData?.id
        : tipoCriterioData?.id) !== 0;
    const url = isEdit
      ? `http://localhost:3001/api/${rutaActual}/${
          rutaActual === "valorCriterios"
            ? valorCriterioData?.id
            : tipoCriterioData?.id
        }`
      : `http://localhost:3001/api/${rutaActual}`;
    const method = isEdit ? "PATCH" : "POST";
    const body =
      rutaActual === "valorCriterios"
        ? JSON.stringify({
            tipo: valorCriterioData?.tipo,
            criterio: valorCriterioData?.criterio,
          })
        : JSON.stringify({
            tipo: tipoCriterioData?.tipo,
            cantidad: tipoCriterioData?.cantidad,
          });
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body,
      });
      if (res.ok) {
        setVisible(false);
        window.location.reload();
      } else {
        alert("Error al guardar criterio");
      }
    } catch (err) {
      alert("Error de red");
    }
  }

  const hiddeEliminar = () => {
    setVisibleEliminar(false);
  };

  // Nueva función para abrir modal de crear tipo
  const handleOpenCreateTipo = () => {
    setTipoCriterioData({ id: 0, tipo: "", cantidad: 0 });
    setValorCriterioData(null);
    setRutaActual("tipoCriterios");
    setVisible(true);
  };
  // Nueva función para abrir modal de crear valor
  const handleOpenCreateValor = () => {
    setValorCriterioData({ id: 0, tipo: "", criterio: "" });
    setTipoCriterioData(null);
    setRutaActual("valorCriterios");
    setVisible(true);
  };

  return (
    <section>
      {/* Botón de agregar tipo o valor */}
      <div className="flex justify-end mb-4">
        {Array.isArray(criterios) &&
        criterios.length > 0 &&
        criterios[0].cantidad !== undefined ? (
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            onClick={handleOpenCreateTipo}
            type="button"
          >
            <span className="text-xl">+</span>
            Agregar Tipo
          </button>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            onClick={handleOpenCreateValor}
            type="button"
          >
            <span className="text-xl">+</span>
            Agregar Valor
          </button>
        )}
      </div>

      {/* Botones de agregar eliminados, solo renderizar la lista */}
      {criterios.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No hay criterios disponibles</p>
        </div>
      ) : (
        <div className="space-y-3">
          {criterios.map((criterio) => (
            <div
              key={criterio.id}
              className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600 p-4 hover:bg-gray-700/70 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-slate-200 w-3/4">
                  <div className="flex flex-col w-1/3">
                    <span className="text-sm text-gray-400 font-medium">
                      Tipo
                    </span>
                    <p className="text-base font-semibold">{criterio.tipo}</p>
                  </div>
                  <div className="flex flex-col 1/3">
                    <span className="text-sm text-gray-400 font-medium">
                      {criterio.criterio ? "Criterio" : "Cantidad"}
                    </span>
                    <p className="text-base font-semibold">
                      {criterio.cantidad
                        ? criterio.cantidad
                        : criterio.criterio}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 w-1/4 justify-end">
                  <button
                    onClick={async () => {
                      setVisible(true);
                      const route = criterio.criterio
                        ? "valorCriterios"
                        : "tipoCriterios";
                      const res = await fetch(
                        `http://localhost:3001/api/${route}/${criterio.id}`
                      );
                      const data = await res.json();
                      route === "valorCriterios"
                        ? setValorCriterioData(data)
                        : setTipoCriterioData(data);
                      setRutaActual(route);
                    }}
                    className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 fill-green-400" />
                  </button>
                  <button
                    onClick={() => {
                      const route = criterio.criterio
                        ? "valorCriterios"
                        : "tipoCriterios";
                      setVisibleEliminar(true);
                      setTipoID(criterio.id);
                      setRutaActual(route);
                    }}
                    className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-all duration-200"
                  >
                    <Delete className="w-4 h-4 fill-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out z-[9999] ${
          visibleEliminar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisibleEliminar(false)}
      >
        <Eliminar_Alerta
          className={`transition-all duration-300 ease-in-out ${
            visibleEliminar ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onHiddeEliminar={hiddeEliminar}
          id={tipoID}
          ruta={rutaActual}
        />
      </div>

      {/* Modal Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out z-[9999] ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setVisible(false)}
      >
        {/* Modal Content */}
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <form
            className="flex flex-col bg-gray-900 rounded-lg p-6 shadow-2xl border border-gray-700 min-w-[400px]"
            onSubmit={handleSubmit}
          >
            <h2 className="text-white font-bold text-xl mb-4">
              {rutaActual === "valorCriterios"
                ? "Formulario de Valores"
                : "Formulario de Tipos"}
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  className="text-white text-sm font-medium"
                  htmlFor="tipo"
                >
                  Tipo
                </label>
                <input
                  placeholder="Tipo ..."
                  className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  type="text"
                  id="tipo"
                  value={
                    valorCriterioData?.tipo || tipoCriterioData?.tipo || ""
                  }
                  onChange={(e) => {
                    rutaActual === "valorCriterios"
                      ? setValorCriterioData((prev) =>
                          prev ? { ...prev, tipo: e.target.value } : null
                        )
                      : setTipoCriterioData((prev) =>
                          prev ? { ...prev, tipo: e.target.value } : null
                        );
                  }}
                />
              </div>
              {rutaActual === "valorCriterios" ? (
                <div>
                  <label
                    className="text-white text-sm font-medium"
                    htmlFor="criterio"
                  >
                    Criterio
                  </label>
                  <input
                    placeholder="Criterio ..."
                    className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    id="criterio"
                    value={valorCriterioData?.criterio || ""}
                    onChange={(e) =>
                      setValorCriterioData((prev) =>
                        prev ? { ...prev, criterio: e.target.value } : null
                      )
                    }
                  />
                </div>
              ) : (
                <div>
                  <label
                    className="text-white text-sm font-medium"
                    htmlFor="cantidad"
                  >
                    Cantidad
                  </label>
                  <input
                    placeholder="Cantidad ..."
                    className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    id="cantidad"
                    value={tipoCriterioData?.cantidad || ""}
                    onChange={(e) =>
                      setTipoCriterioData((prev) =>
                        prev
                          ? { ...prev, cantidad: parseInt(e.target.value) }
                          : null
                      )
                    }
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="bg-gray-600 text-white rounded-md px-4 py-2 hover:bg-gray-700 transition-all duration-200 font-medium"
                onClick={() => setVisible(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-all duration-200 font-medium"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Criterios;
