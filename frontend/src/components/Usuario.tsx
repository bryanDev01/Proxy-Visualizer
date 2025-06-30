"use client"

import { IUsuario } from "@/app/pages/Link5/page"
import { Delete, Edit, Eye, EyeOff } from "lucide-react"
import { FormEvent, useState } from "react"
import Eliminar_Alerta from "./ui/Eliminar_Alerta"
import { useRouter } from "next/navigation"

function Usuario({ usuarios }: { usuarios: IUsuario[] }) {
  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleEliminar, setVisibleEliminar] = useState<boolean>(false)
  const [usuarioData, setUsuarioData] = useState<IUsuario | null>(null)
  const [userId, setUserID] = useState<number | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const isEdit = usuarioData && usuarioData.id !== null;
    const url = isEdit ? `http://localhost:3001/api/usuarios/${usuarioData?.id}` : "http://localhost:3001/api/usuarios";
    const method = isEdit ? "PATCH" : "POST";
    const body = JSON.stringify({
      ci: usuarioData?.ci,
      nombre: usuarioData?.nombre,
      apellido: usuarioData?.apellido,
      contra: usuarioData?.contra,
      rol: usuarioData?.rol
    });
    try {
      console.log(isEdit, url, method, body)
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body
      });
      if (res.ok) {
        setVisible(false);
        router.refresh()
      } else {
        alert("Error al guardar usuario");
      }
    } catch (err) {
      alert("Error de red");
    }
  }
  const hiddeEliminar = () => {
    setVisibleEliminar(false)
  }

  const handleOpenCreate = () => {
    setUsuarioData({ id: 0, ci: 0, nombre: "", apellido: "", contra: "", rol: "" })
    setVisible(true)
  }

  return (
    <section>
      {/* Botón de agregar usuario */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
          onClick={handleOpenCreate}
        >
          <span className="text-xl">+</span>
          Agregar Usuario
        </button>
      </div>

      {usuarios.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No hay usuarios disponibles</p>
        </div>
      ) : (
        <div className="space-y-3">
          {usuarios.map((usuario) => (
            <div 
              key={usuario.id} 
              className="bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600 p-4 hover:bg-gray-700/70 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-slate-200">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 font-medium">Nombre Completo</span>
                    <p className="text-base font-semibold">{usuario.nombre} {usuario.apellido}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 font-medium">CI</span>
                    <p className="text-base font-semibold">{usuario.ci}</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-400 font-medium">Rol</span>
                    <p className="text-base font-semibold">{usuario.rol}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={async () => {
                      setVisible(true)
                      const res = await fetch(`http://localhost:3001/api/usuarios/${usuario.id}`)
                      const data = await res.json()
                      setUsuarioData(data)
                    }}
                    className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded-lg transition-all duration-200"
                  >
                    <Edit className="w-4 h-4 fill-green-400" />
                  </button>
                  <button 
                    onClick={() => {
                      setVisibleEliminar(true)
                      setUserID(usuario.id)
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
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ease-in-out z-[9999] ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setVisible(false)}
      >
        {/* Modal Content */}
        <div
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <form className="flex flex-col bg-gray-900 rounded-lg p-6 shadow-2xl border border-gray-700 min-w-[400px]" onSubmit={handleSubmit}>
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