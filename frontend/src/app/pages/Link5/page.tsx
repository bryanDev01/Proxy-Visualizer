import Criterios from "@/components/Criterios"
import Usuario from "@/components/Usuario"
import Dashboard from "@/components/Dashboard"

export interface IUsuario {
  id: number
  ci: number
  nombre: string
  apellido: string
  contra: string
  rol: string
}

export interface ICriterio {
  id: number
  tipo: string
  cantidad?: number
  criterio?: string
}

const obtenerUsuario = async () => {
  const response = await fetch("http://localhost:3001/api/usuarios")
  const data: IUsuario[] = await response.json()

  return data
}

const obtenerTipoCriterio = async () => {
  const response = await fetch("http://localhost:3001/api/tipoCriterios")
  const data: ICriterio[] = await response.json()

  return data
}

const obtenerValorCriterio = async () => {
  const response = await fetch("http://localhost:3001/api/valorCriterios")
  const data: ICriterio[] = await response.json()

  return data
}

async function Link5() {
  const usuarios = await obtenerUsuario()
  const tiposCriterio = await obtenerTipoCriterio()
  const valoresCriterio = await obtenerValorCriterio()

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-950 p-6">
      {/* Dashboard Section */}
      <div className="mb-8">
        <Dashboard
          usuarios={usuarios}
          tiposCriterio={tiposCriterio}
          valoresCriterio={valoresCriterio}
        />
      </div>

      {/* Management Section */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Usuarios Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Gestión de Usuarios</h2>
            {/* El botón de agregar usuario ya está en el componente Usuario, así que lo quitamos aquí */}
          </div>
          <Usuario usuarios={usuarios} />
        </div>

        {/* Tipos de Criterios Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Tipos de Criterios</h2>
            {/* Botón de agregar tipo */}
            {/* El botón de agregar tipo debe estar en el componente Criterios solo cuando se renderiza para tipos */}
          </div>
          <Criterios criterios={tiposCriterio} />
        </div>

        {/* Valores de Criterios Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Valores de Criterios</h2>
            {/* Botón de agregar valor */}
            {/* El botón de agregar valor debe estar en el componente Criterios solo cuando se renderiza para valores */}
          </div>
          <Criterios criterios={valoresCriterio} />
        </div>
      </div>
    </section>
  )
}

export default Link5