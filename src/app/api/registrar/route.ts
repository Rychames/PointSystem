import { NextResponse } from 'next/server'
import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: "SEU_EMAIL_DE_SERVICO",
    private_key: "SUA_CHAVE_PRIVADA".replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })
const SPREADSHEET_ID = "ID_DA_SUA_PLANILHA"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action')

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Registros!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toLocaleString('pt-BR'),
          action
        ]]
      }
    })

    return NextResponse.json({ 
      success: true,
      message: `${action} registrado com sucesso!`
    })
    
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro ao registrar na planilha' },
      { status: 500 }
    )
  }
}