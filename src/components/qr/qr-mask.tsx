'use client'

import { ClientOnly } from '../client-only'
import { useQRCode } from './qr-code-provider'
import { useCallback, useMemo } from 'react'

const featureColors: Record<string, string> = {
  finders: 'rgba(239, 68, 68, 0.6)', // red
  separators: 'rgba(34, 197, 94, 0.6)', // green
  timingPatterns: 'rgba(59, 130, 246, 0.6)', // blue
  formatInformation: 'rgba(234, 179, 8, 0.6)', // yellow
  darkModule: 'red', // red
}

interface QRCodeMarkProps {}

export const QRCodeMaskComponent: React.FC<QRCodeMarkProps> = ({}) => {
  if (typeof window === 'undefined') {
    return null
  }
  const { qr } = useQRCode()

  const maskCells = useMemo(() => {
    return qr.generateMaskCells()
  }, [qr])

  const getProperties = useCallback(
    (x: number, y: number) => {
      let feature = ''

      if (qr.isFinders({ i: y, j: x })) {
        feature = 'finderPatterns'
      } else if (qr.isDarkModule({ i: y, j: x })) {
        feature = 'darkModule'
      } else if (qr.isSeparators({ i: y, j: x })) {
        feature = 'separators'
      } else if (qr.isTimingPatterns({ i: y, j: x })) {
        feature = 'timingPatterns'
      } else if (qr.isFormatInformation({ i: y, j: x })) {
        feature = 'formatInformation'
      } else if (qr.isAlignmentPatterns({ i: y, j: x })) {
        feature = 'alignmentPatterns'
      }

      return {
        fill: featureColors[feature] || 'transparent',
      }
    },
    [qr]
  )

  const encodingModePaths = useMemo(() => {
    return qr.generateEncodingModePaths()
  }, [qr])

  return (
    <div className="relative flex items-center justify-center cursor-pointer">
      <div className="inline-block p-6 my-4 bg-white rounded">
        <svg
          viewBox={`${-qr.cellSize / 2} ${-qr.cellSize / 2} ${
            qr.size * qr.cellSize + qr.cellSize
          } ${qr.size * qr.cellSize + qr.cellSize}`}
          width={qr.size * qr.cellSize}
          height={qr.size * qr.cellSize}
        >
          {qr.cells.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * qr.cellSize}
                y={rowIndex * qr.cellSize}
                width={qr.cellSize}
                height={qr.cellSize}
                fill={col ? 'rgba(0, 0, 0, 0.2)' : 'white'}
              />
            ))
          )}
          {qr.cells.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * qr.cellSize}
                y={rowIndex * qr.cellSize}
                width={qr.cellSize}
                height={qr.cellSize}
                {...(getProperties(colIndex, rowIndex) || {})}
              />
            ))
          )}
          {maskCells.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * qr.cellSize}
                y={rowIndex * qr.cellSize}
                width={qr.cellSize}
                height={qr.cellSize}
                fill={col ? 'black' : 'transparent'}
              />
            ))
          )}
        </svg>
      </div>
    </div>
  )
}

export const QRCodeMask = () => {
  return (
    <ClientOnly fallback={null}>
      <QRCodeMaskComponent />
    </ClientOnly>
  )
}
