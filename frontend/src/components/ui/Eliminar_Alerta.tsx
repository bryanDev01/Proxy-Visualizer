import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

function Eliminar_Alerta({ className, onHiddeEliminar, id, ruta }: { className: string, onHiddeEliminar: () => void, id: number | null, ruta?: string }) {
  const router = useRouter()

  return (
    <div
      className={cn("fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-gray-900 rounded-lg p-6 shadow-2xl border border-gray-700 min-w-[400px]">
        <div className="flex items-center gap-4 mb-4">
          <div className="shrink-0 rounded-full bg-red-500/20 p-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Confirmar Eliminación</h3>
            <p className="text-gray-400 text-sm">Esta acción no se puede deshacer</p>
          </div>
        </div>

        <p className="text-gray-300 mb-6">
          ¿Estás seguro de que quieres eliminar este usuario? Esta acción eliminará permanentemente 
          todos los datos asociados y no se podrá recuperar.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-600 text-white rounded-md px-4 py-2 hover:bg-gray-700 transition-all duration-200 font-medium"
            onClick={onHiddeEliminar}
          >
            Cancelar
          </button>
          <button
            className="bg-red-600 text-white rounded-md px-4 py-2 hover:bg-red-700 transition-all duration-200 font-medium"
            onClick={async() => {
              const rutaCorrecta = ruta ? ruta : "usuarios"
              console.log("Rutaaaaaa",rutaCorrecta)
              try {
                const response = await fetch(`http://localhost:3001/api/${rutaCorrecta}/${id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json"
                  }
                })
                
                if (response.ok) {
                  console.log("Usuario eliminado exitosamente")
                  onHiddeEliminar()
                  router.refresh()
                } else {
                  console.error("Error al eliminar usuario")
                }
              } catch (error) {
                console.error("Error:", error)
              }
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Eliminar_Alerta