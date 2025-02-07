import ClientQrScanner from '@/app/components/ClientQrScanner'

export default function GeradorPage() {
  return (
    <main className="min-h-screen p-24 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Registro de Ponto
      </h1>
      <ClientQrScanner />
    </main>
  )
}