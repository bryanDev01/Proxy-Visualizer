"use client"

import { IUsuario } from "@/app/pages/Link5/page"
import { Delete, Edit, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Eliminar_Alerta from "./ui/Eliminar_Alerta"

function Usuario({ usuarios }: { usuarios: IUsuario[] }) {
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleEliminar, setVisibleEliminar] = useState<boolean>(false)
  const [usuarioData, setUsuarioData] = useState<IUsuario | null>(null)
  const [userId, setUserID] = useState<number | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const hiddeEliminar = () => {
    setVisibleEliminar(false)
  }

  return (
    <section className="w-full py-3 px-6 m-auto">
      <ul className=" flex flex-col items-start justify-center">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className=" flex items-center justify-between gap-6">
            <div className=" flex gap-4 items-center text-slate-200">
              <p className=" text-base font-semibold">{usuario.nombre} {usuario.apellido}</p>
              <p className=" text-base font-semibold">{usuario.ci}</p>
              <p className=" text-base font-semibold">{usuario.rol}</p>
            </div>
            <div className=" flex gap-2 justify-center items-center">
              <button onClick={async () => {
                setVisible(true)
                const res = await fetch(`http://localhost:3000/api/usuarios/${usuario.id}`)
                const data = await res.json()
                setUsuarioData(data)
              }}><Edit className=" fill-green-400" /></button>
              <button onClick={() => {
                setVisibleEliminar(true)
                setUserID(usuario.id)
              }
              }><Delete className=" fill-red-600" /></button>
            </div>
          </li>
        ))}
      </ul>

      {/* Delete Modal Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out z-50 ${
          visibleEliminar ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setVisibleEliminar(false)}
      >
        <Eliminar_Alerta 
          className={`transition-all duration-300 ease-in-out ${
            visibleEliminar ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} 
          onHiddeEliminar={hiddeEliminar} 
          id={userId} 
        />
      </div>

      {/* Form Modal Overlay */}
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
            <h2 className="text-white font-bold text-xl mb-4">Formulario de Usuario</h2>

            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium" htmlFor="ci">CI</label>
                <input
                  placeholder="Tu CI..."
                  className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  type="text"
                  id="ci"
                  value={usuarioData?.ci?.toString() || ""}
                  onChange={(e) => setUsuarioData(prev => prev ? { ...prev, ci: parseInt(e.target.value) || 0 } : null)}
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium" htmlFor="nombre">Nombre</label>
                <input
                  placeholder="Tu nombre..."
                  className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  type="text"
                  id="nombre"
                  value={usuarioData?.nombre || ""}
                  onChange={(e) => setUsuarioData(prev => prev ? { ...prev, nombre: e.target.value } : null)}
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium" htmlFor="apellido">Apellido</label>
                <input
                  placeholder="Tu apellido..."
                  className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  type="text"
                  id="apellido"
                  value={usuarioData?.apellido || ""}
                  onChange={(e) => setUsuarioData(prev => prev ? { ...prev, apellido: e.target.value } : null)}
                />
              </div>

              <div>
                <label className="text-white text-sm font-medium" htmlFor="password">Contraseña</label>
                <div className="relative">
                  <input
                    placeholder="Tu contraseña..."
                    className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={usuarioData?.contra || ""}
                    onChange={(e) => setUsuarioData(prev => prev ? { ...prev, contra: e.target.value } : null)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-medium" htmlFor="rol">Rol</label>
                <select
                  className="w-full bg-gray-800 rounded-md border border-gray-700 text-white px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  id="rol"
                  value={usuarioData?.rol || ""}
                  onChange={(e) => setUsuarioData(prev => prev ? { ...prev, rol: e.target.value } : null)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Administrador">Administrador</option>
                  <option value="ESI">ESI</option>
                  <option value="ESI Superior">ESI Superior</option>
                  <option value="Director">Director</option>
                  <option value="Director General">Director General</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </div>
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

export default Usuario