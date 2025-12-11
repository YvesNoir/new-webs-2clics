'use client'

import { useState, useEffect } from 'react'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  status: 'new' | 'replied' | 'closed'
  createdAt: string
  property?: {
    id: string
    title: string
  }
}

interface ContactsResponse {
  contacts: Contact[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filter, setFilter] = useState<'all' | 'new' | 'replied' | 'closed'>('all')
  const [total, setTotal] = useState(0)

  const fetchContacts = async (page = 1, status?: string) => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      })

      if (status && status !== 'all') {
        params.append('status', status)
      }

      const response = await fetch(`/api/contacts?${params}`)
      if (response.ok) {
        const data: ContactsResponse = await response.json()
        setContacts(data.contacts)
        setCurrentPage(data.pagination.page)
        setTotalPages(data.pagination.totalPages)
        setTotal(data.pagination.total)
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts(1, filter === 'all' ? undefined : filter)
  }, [filter])

  const handleStatusChange = async (contactId: string, newStatus: 'new' | 'replied' | 'closed') => {
    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        // Actualizar el estado local
        setContacts(prev => prev.map(contact =>
          contact.id === contactId
            ? { ...contact, status: newStatus }
            : contact
        ))
      }
    } catch (error) {
      console.error('Error updating contact status:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full"
    switch (status) {
      case 'new':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'replied':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'closed':
        return `${baseClasses} bg-green-100 text-green-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Nuevo'
      case 'replied': return 'Respondido'
      case 'closed': return 'Cerrado'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Mensajes de Contacto
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Total: {total} mensajes
          </p>
        </div>

        {/* Filtros */}
        <div className="flex space-x-2">
          {(['all', 'new', 'replied', 'closed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                filter === status
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status === 'all' ? 'Todos' : getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de contactos */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center px-4 py-2 text-sm text-gray-600">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Cargando mensajes...
          </div>
        </div>
      ) : contacts.length === 0 ? (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10m0 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0v8a2 2 0 002 2h6a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay mensajes</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'all' ? 'No has recibido ningún mensaje aún.' : `No hay mensajes con estado "${getStatusText(filter)}".`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{contact.name}</h4>
                    <span className={getStatusBadge(contact.status)}>
                      {getStatusText(contact.status)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📧 {contact.email}</p>
                    {contact.phone && <p>📞 {contact.phone}</p>}
                    <p>🕒 {formatDate(contact.createdAt)}</p>
                    {contact.property && (
                      <p>🏠 Consulta sobre: <span className="font-medium">{contact.property.title}</span></p>
                    )}
                  </div>
                </div>

                {/* Cambiar estado */}
                <div className="ml-4">
                  <select
                    value={contact.status}
                    onChange={(e) => handleStatusChange(contact.id, e.target.value as 'new' | 'replied' | 'closed')}
                    className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="new">Nuevo</option>
                    <option value="replied">Respondido</option>
                    <option value="closed">Cerrado</option>
                  </select>
                </div>
              </div>

              {/* Mensaje */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">Mensaje:</h5>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-end space-x-3 mt-4 pt-4 border-t border-gray-100">
                <a
                  href={`mailto:${contact.email}?subject=Re: Consulta inmobiliaria`}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Responder por Email
                </a>
                {contact.phone && (
                  <a
                    href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Responder por WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-200">
          <button
            onClick={() => fetchContacts(currentPage - 1, filter === 'all' ? undefined : filter)}
            disabled={currentPage === 1}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Anterior
          </button>

          <span className="px-3 py-2 text-sm text-gray-700">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => fetchContacts(currentPage + 1, filter === 'all' ? undefined : filter)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}