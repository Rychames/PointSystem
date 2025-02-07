'use client'

import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'

type ActionType = 'ENTRADA' | 'SAIDA' | 'ALMOÇO'

export default function ClientQrScanner() {
  const [action, setAction] = useState<ActionType>('ENTRADA')
  const [qrData, setQrData] = useState('')

  const generateQrCode = () => {
    const data = `${window.location.origin}/api/registrar?action=${action}`
    setQrData(data)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-4">
        <button
          onClick={() => setAction('ENTRADA')}
          className={`px-4 py-2 rounded ${action === 'ENTRADA' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Entrada
        </button>
        <button
          onClick={() => setAction('SAIDA')}
          className={`px-4 py-2 rounded ${action === 'SAIDA' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Saída
        </button>
        <button
          onClick={() => setAction('ALMOÇO')}
          className={`px-4 py-2 rounded ${action === 'ALMOÇO' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Almoço
        </button>
      </div>

      <button
        onClick={generateQrCode}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Gerar QR Code
      </button>

      {qrData && (
        <div className="flex flex-col items-center gap-4">
          <QRCodeSVG
            value={qrData}
            size={256}
            fgColor="#1a365d"
          />
          <p className="text-blue-900 font-medium">
            Escaneie para registrar: {action}
          </p>
        </div>
      )}
    </div>
  )
}