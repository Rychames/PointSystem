import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!

export async function GET() {
  const token = jwt.sign(
    { 
      userId: 'user-id', // Substitua por ID real do usuário
      exp: Math.floor(Date.now() / 1000) + 86400 // Expira em 24h
    },
    SECRET
  )
  return NextResponse.json({ token })
}