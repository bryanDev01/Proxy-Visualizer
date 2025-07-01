"use client"

import { IUsuario, ICriterio } from "@/app/pages/Link5/page"
import { Users, Target, BarChart3, TrendingUp, UserCheck, Shield, Activity, Database } from "lucide-react"

interface DashboardProps {
  usuarios: IUsuario[]
  tiposCriterio: ICriterio[]
  valoresCriterio: ICriterio[]
}

function Dashboard({ usuarios, tiposCriterio, valoresCriterio }: DashboardProps) {
  // Calcular estadísticas
  const totalUsuarios = usuarios.length
  const totalTiposCriterio = tiposCriterio.length
  const totalValoresCriterio = valoresCriterio.length
  
  // Contar roles de usuarios
  const rolesCount = usuarios.reduce((acc, usuario) => {
    acc[usuario.rol] = (acc[usuario.rol] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Obtener los 3 roles más comunes
  const topRoles = Object.entries(rolesCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)

  // Calcular estadísticas de criterios
  const criteriosConCantidad = tiposCriterio.filter(c => c.cantidad && c.cantidad > 0)
  const totalCantidad = criteriosConCantidad.reduce((sum, c) => sum + (c.cantidad || 0), 0)
  const promedioCantidad = criteriosConCantidad.length > 0 ? totalCantidad / criteriosConCantidad.length : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-700 to-gray-950 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard de Gestión</h1>
        <p className="text-gray-400">Visualización de datos del sistema</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Usuarios */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Usuarios</p>
              <p className="text-white text-3xl font-bold">{totalUsuarios}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Users className="text-white w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tipos de Criterio */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Tipos de Criterio</p>
              <p className="text-white text-3xl font-bold">{totalTiposCriterio}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <Target className="text-white w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Valores de Criterio */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Valores de Criterio</p>
              <p className="text-white text-3xl font-bold">{totalValoresCriterio}</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <BarChart3 className="text-white w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Promedio Cantidad */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Promedio Cantidad</p>
              <p className="text-white text-3xl font-bold">{promedioCantidad.toFixed(1)}</p>
            </div>
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usuarios por Rol */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Distribución de Usuarios por Rol</h2>
            <UserCheck className="text-gray-400 w-5 h-5" />
          </div>
          <div className="space-y-4">
            {topRoles.map(([rol, count], index) => (
              <div key={rol} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' : 
                    index === 1 ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-gray-300 font-medium">{rol}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-green-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${(count / totalUsuarios) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-bold">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Actividad Reciente</h2>
            <Activity className="text-gray-400 w-5 h-5" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <Users className="text-green-400 w-4 h-4" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Usuarios registrados</p>
                <p className="text-gray-400 text-xs">{totalUsuarios} usuarios activos</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Target className="text-blue-400 w-4 h-4" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Criterios configurados</p>
                <p className="text-gray-400 text-xs">{totalTiposCriterio} tipos disponibles</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <Database className="text-purple-400 w-4 h-4" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Valores registrados</p>
                <p className="text-gray-400 text-xs">{totalValoresCriterio} valores totales</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Usuarios Recientes */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Usuarios Recientes</h2>
            <Shield className="text-gray-400 w-5 h-5" />
          </div>
          <div className="space-y-3">
            {usuarios.slice(0, 5).map((usuario) => (
              <div key={usuario.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {usuario.nombre.charAt(0)}{usuario.apellido.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{usuario.nombre} {usuario.apellido}</p>
                    <p className="text-gray-400 text-sm">CI: {usuario.ci}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  usuario.rol === 'Administrador' ? 'bg-red-500/20 text-red-400' :
                  usuario.rol === 'Director' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {usuario.rol}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Criterios por Tipo */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Criterios por Tipo</h2>
            <BarChart3 className="text-gray-400 w-5 h-5" />
          </div>
          <div className="space-y-4">
            {tiposCriterio.slice(0, 5).map((criterio, index) => (
              <div key={criterio.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    index % 3 === 0 ? 'bg-blue-500' : 
                    index % 3 === 1 ? 'bg-green-500' : 'bg-purple-500'
                  }`}></div>
                  <span className="text-gray-300">{criterio.tipo}</span>
                </div>
                <span className="text-white font-bold">{criterio.cantidad || 0}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 