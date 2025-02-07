// app/page.tsx
'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-24 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Sistema de Registro de Ponto
      </h1>
      
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Opções</h2>
          
          <div className="space-y-4">
            <Link 
              href="/gerador"
              className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg
                       hover:bg-blue-700 transition-colors duration-200"
            >
              Acessar Registro Diário
            </Link>
            
            <p className="mt-8 text-gray-600">
              Para visualizar a planilha completa de registros:{' '}
              <a 
                href="SUA_URL_DA_PLANILHA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Clique aqui
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}