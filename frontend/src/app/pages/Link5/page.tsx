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
  const response = await fetch("http://localhost:3000/api/usuarios")
  const data: IUsuario[] = await response.json()

  return data
}

const obtenerTipoCriterio = async () => {
  const response = await fetch("http://localhost:3000/api/tipoCriterios")
  const data: ICriterio[] = await response.json()

  return data
}

const obtenerValorCriterio = async () => {
  const response = await fetch("http://localhost:3000/api/valorCriterios")
  const data: ICriterio[] = await response.json()

  return data
}

async function Link5() {
  const usuarios = await obtenerUsuario()
  const tiposCriterio = await obtenerTipoCriterio()
  const valoresCriterio = await obtenerValorCriterio()

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-950">

      {/* Dashboard Section */}
      <div className="mb-8">
        <Dashboard
          usuarios={usuarios}
          tiposCriterio={tiposCriterio}
          valoresCriterio={valoresCriterio}
        />
      </div>

      {/* Management Section */}
      <div className="w-3/4 h-full flex flex-col justify-center items-center gap-5 px-3 py-6 m-auto">
        <Usuario usuarios={usuarios} />
        <Criterios criterios={tiposCriterio} />
        <Criterios criterios={valoresCriterio} />
      </div>
    </section>
  )
}

export default Link5