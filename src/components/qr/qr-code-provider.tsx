'use client'

import React, { useMemo, useState } from 'react'
import { Position } from './utils'
import { QRCode } from '@/lib/qr'

interface QRCodeContextState {
  qr: QRCode
  value: string
  onChange: (value: string) => void
  QRCodeCells: number[][]
  isInSpecialRegion: (type: string, position: Position) => boolean

  xorMask?: boolean
  changeXorMask?: (value: boolean) => void
}

const QRCodeContext = React.createContext<QRCodeContextState | null>(null)

export const QRCodeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [QRCodeValue, setQRCodeValue] = useState('Hello world!'.repeat(1))
  const [xorMask, setXorMask] = useState(false)

  const qr = useMemo(() => {
    return new QRCode(QRCodeValue)
  }, [QRCodeValue])

  const cells = useMemo(() => {
    return qr.cells
  }, [qr])

  console.log(qr.qr.mask)
  // @ts-ignore
  const value: QRCodeContextState = {
    qr,
    QRCodeCells: cells,
    value: QRCodeValue,
    onChange: (value: string) => {
      setQRCodeValue(value)
    },
    xorMask,
    changeXorMask: (value: boolean) => {
      setXorMask(value)
    },
  }
  return <QRCodeContext.Provider value={value}>{children}</QRCodeContext.Provider>
}

export const useQRCode = () => {
  const context = React.useContext(QRCodeContext)
  if (context === null) {
    throw new Error('useQRCode must be used in <QRCodeProvider />')
  }
  return context
}
