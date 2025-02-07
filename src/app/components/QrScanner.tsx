// src/app/components/QrScanner.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface QrScannerProps {
  endpoint: string;
}

const QrScanner: React.FC<QrScannerProps> = ({ endpoint }) => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const qrCodeRegionId = 'qr-reader';

  useEffect(() => {
    async function loadScanner() {
      try {
        if (typeof window !== 'undefined') {
          // Importa a biblioteca html5-qrcode somente no cliente
          const { Html5QrcodeScanner } = await import('html5-qrcode');
          const config = { fps: 10, qrbox: 250 };
          const verbose = false;
          const scanner = new Html5QrcodeScanner(qrCodeRegionId, config, verbose);

          // Função chamada ao ler com sucesso um QR Code
          const onScanSuccess = (decodedText: string, decodedResult: unknown) => {
            const now = new Date();
            const hora = now.getHours();
            // Se for antes do meio-dia, é "entrada"; caso contrário, "saída"
            const tipo = hora < 12 ? 'entrada' : 'saída';
            const dataHora = now.toLocaleString();

            setResult(`Registrado ${tipo} às ${dataHora}`);
            setError('');

            const dados = { qr: decodedText, tipo, dataHora };

            fetch(endpoint, {
              method: 'POST',
              mode: 'no-cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(dados)
            })
              .then(() => {
                console.log('Registro enviado com sucesso.');
              })
              .catch((err) => {
                console.error('Erro ao enviar registro:', err);
                setError('Erro ao enviar o registro. Tente novamente.');
              });
          };

          // Função para erros na leitura (apenas loga)
          const onScanFailure = (errorMessage: string) => {
            console.warn(`Falha na leitura do QR Code: ${errorMessage}`);
          };

          scanner.render(onScanSuccess, onScanFailure);
          setLoading(false);
        }
      } catch (err) {
        console.error('Erro ao carregar o scanner:', err);
        setError('Erro ao iniciar o scanner.');
        setLoading(false);
      }
    }

    loadScanner();
  }, [endpoint]);

  // Função para reiniciar o scanner (simplesmente recarrega a página)
  const resetScanner = () => {
    setResult('');
    setError('');
    window.location.reload();
  };

  return (
    <div>
      {loading && <p>Carregando scanner...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div id={qrCodeRegionId} style={{ margin: '0 auto' }}></div>
      {result && (
        <div>
          <p>{result}</p>
          <button onClick={resetScanner}>Reiniciar Scanner</button>
        </div>
      )}
    </div>
  );
};

export default QrScanner;
