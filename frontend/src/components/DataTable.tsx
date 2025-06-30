"use client"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronUp, Search, Filter } from "lucide-react"

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  title: string
  searchPlaceholder?: string
  itemsPerPage?: number
}

function DataTable({ 
  data, 
  columns, 
  title, 
  searchPlaceholder = "Buscar...",
  itemsPerPage = 10 
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)

  // Filtrar y ordenar datos
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aValue = a[sortColumn]
        const bValue = b[sortColumn]
        
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, sortColumn, sortDirection])

  // Paginación
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-4 h-4" />
            <span className="text-gray-300 text-sm">
              {filteredAndSortedData.length} elementos
            </span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-gray-700 border-b border-gray-600">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-600 transition-colors ${
                    column.sortable ? "cursor-pointer" : "cursor-default"
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && sortColumn === column.key && (
                      sortDirection === "asc" ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition-colors duration-150"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? (
                      column.render(row[column.key], row)
                    ) : (
                      <span className="text-gray-300">{row[column.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-700 border-t border-gray-600">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Mostrando {startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} de {filteredAndSortedData.length} resultados
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                    }`}
                  >
                    {page}
                  </button>
                )
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable 