"use client"

import { ICriterio } from "@/app/pages/Link5/page"
import { Delete, Edit } from "lucide-react"
import { useState } from "react"
import Eliminar_Alerta from "./ui/Eliminar_Alerta"

function Criterios({ criterios }: { criterios: ICriterio[] }) {
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleEliminar, setVisibleEliminar] = useState<boolean>(false)
  const [tipoCriterioData, setTipoCriterioData] = useState<ICriterio | null>(null)
  const [valorCriterioData, setValorCriterioData] = useState<ICriterio | null>(null)
  const [rutaActual, setRutaActual] = useState<string>("")
  const [tipoID, setTipoID] = useState<number | null>(null)

  const hiddeEliminar = () => {
    setVisibleEliminar(false)
  }

  return (
    <section>
      <ul className=" flex flex-col items-start justify-center">
        {criterios.map((criterio) => (
          <li key={criterio.id} className="flex items-center justify-between gap-6 " >
            <div className=" flex items-center gap-4 text-slate-200">
              <p className=" text-base font-semibold">{criterio.tipo}</p>
              <p className=" text-base font-semibold">{criterio.cantidad ? criterio.cantidad : criterio.criterio}</p>
            </div>
            <div className=" flex gap-2 justify-center items-center">
              <button onClick={async () => {
                setVisible(true)
                const route = criterio.criterio ? "valorCriterios" : "tipoCriterios"
                const res = await fetch(`http://localhost:3000/api/${route}/${criterio.id}`)
                console.log("Ruta", route)
                const data = await res.json()
                console.log("Esta es la respuesta", data)
                route === "valorCriterios" ? setValorCriterioData(data) : setTipoCriterioData(data)
                setRutaActual(route)
              }}><Edit className=" fill-green-400" /></button>
              <button onClick={() => {
                setVisibleEliminar(true)
                setTipoID(criterio.id)
              }
              }><Delete className=" fill-red-600" /></button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Modal Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out z-50 ${visibleEliminar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setVisibleEliminar(false)}
      >
        <Eliminar_Alerta
          className={`transition-all duration-300 ease-in-out ${visibleEliminar ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          onHiddeEliminar={hiddeEliminar}
          id={tipoID}
        />
      </div>


      {/* Modal Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out z-50 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setVisible(false)}
      >
        {/* Modal Content */}
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <form className="flex flex-col bg-gray-900 rounded-lg p-6 shadow-2xl border border-gray-700 min-w-[400px]">
            <h2 className="text-white font-bold text-xl mb-4">{rutaActual === "valorCriterios" ? "Formulario de Valores" : "Formulario de Tipos"}</h2>
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium" htmlFor="tipo">Tipo</label>
                <input
                  placeholder="Tipo ..."
                  className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  type="text"
                  id="tipo"
                  value={valorCriterioData?.tipo || tipoCriterioData?.tipo || ""}
                  onChange={(e) => setValorCriterioData(prev => prev ? { ...prev, tipo: e.target.value } : null)}
                />
              </div>
              {rutaActual === "valorCriterios" ?
                <div>
                  <label className="text-white text-sm font-medium" htmlFor="criterio">Criterio</label>
                  <input
                    placeholder="Criterio ..."
                    className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    id="criterio"
                    value={valorCriterioData?.criterio || ""}
                    onChange={(e) => setValorCriterioData(prev => prev ? { ...prev, criterio: e.target.value } : null)}
                  />
                </div>

                :
                <div>
                  <label className="text-white text-sm font-medium" htmlFor="cantidad">Cantidad</label>
                  <input
                    placeholder="Cantidad ..."
                    className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type="text"
                    id="cantidad"
                    value={tipoCriterioData?.cantidad || ""}
                    onChange={(e) => setTipoCriterioData(prev => prev ? { ...prev, cantidad: parseInt(e.target.value) } : null)}
                  />
                </div>}
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
  )
}

export default Criterios