'use client'

import React, { useMemo, useState } from 'react'
import { QRCode } from '@/lib/qr'
import { useDebounce } from 'use-debounce'
import { qrcodegen } from '@/lib/qr/codegen'

export const qrCodeEcls = ['L', 'M', 'Q', 'H'] as const
type QRCodeEcl = (typeof qrCodeEcls)[number]
const qrCodeEclValues: Record<QRCodeEcl, qrcodegen.QrCode.Ecc> = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH,
}

interface QRCodeContextState {
  qr: QRCode

  value: string
  onChange: (value: string) => void

  xorMask: boolean
  changeXorMask: (value: boolean) => void

  ecl: QRCodeEcl
  changeEcl: (value: QRCodeEcl) => void
}

const QRCodeContext = React.createContext<QRCodeContextState | null>(null)

export const QRCodeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [QRCodeValue, setQRCodeValue] = useState('Hello world!'.repeat(1))
  const [xorMask, setXorMask] = useState(false)
  const [ecl, setEcl] = useState<QRCodeEcl>('L')
  const [debounceQRCodeValue] = useDebounce(QRCodeValue, 500)
  const qr = useMemo(() => {
    return new QRCode(debounceQRCodeValue, ecl)
  }, [debounceQRCodeValue, ecl])

  console.log(qr.qr.mask, 'qr.qr.mask')

  const cells = useMemo(() => {
    return qr.cells
  }, [qr])

  // @ts-ignore
  const value: QRCodeContextState = {
    qr,

    value: QRCodeValue,
    onChange: (value: string) => {
      setQRCodeValue(value)
    },

    xorMask,
    changeXorMask: (value: boolean) => {
      setXorMask(value)
    },

    ecl,
    changeEcl: (value: QRCodeEcl) => {
      setEcl(value)
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
