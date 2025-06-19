'use client'

import { useCallback, useMemo } from 'react'
import { useQRCode } from './qr-code-provider'
import { ClientOnly } from '../client-only'

const featureColors: Record<string, string> = {
  finderPatterns: 'rgba(239, 68, 68, 0.6)', // red
  separators: 'rgba(34, 197, 94, 0.6)', // green
  timingPatterns: 'rgba(59, 130, 246, 0.6)', // blue
  formatInformation: 'rgba(234, 179, 8, 0.6)', // yellow
  darkModule: 'rgba(255, 0, 0, 0.6)', // red
  alignmentPatterns: 'rgba(239, 68, 68, 0.6)', // red
}

interface QRCodeDecoderProps {
  features?: string[]
  paths?: string[]
  image?: string
}

const QRCodeDecoderComponent: React.FC<QRCodeDecoderProps> = ({
  features = [],
  paths = [],
  image = '',
}) => {
  const { qr, xorMask } = useQRCode()

  const targetCells = useMemo(() => {
    if (!xorMask) {
      return qr.cells
    }
    return qr.xorMaskCells
  }, [qr, xorMask])

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

      if (features.includes(feature)) {
        return {
          fill: featureColors[feature] || 'transparent',
        }
      }

      return {
        fill: 'transparent',
      }
    },
    [features, qr]
  )

  const readPaths = useMemo(() => {
    return qr.generateReadPaths()
  }, [qr])

  const encodingModePaths = useMemo(() => {
    return qr.generateEncodingModePaths()
  }, [qr])

  const decodingLengthPaths = useMemo(() => {
    return qr.generateDecodingLengthPaths()
  }, [qr])

  const byteContentPaths = useMemo(() => {
    return qr.generateDecodingContentPath()
  }, [qr])

  const maskNoPaths = useMemo(() => {
    return qr.generateMaskNoPath()
  }, [qr])

  const imageSize = 6 * qr.cellSize

  const imagePosition = useMemo(() => {
    const centerX = (qr.size * qr.cellSize) / 2 - imageSize / 2
    const centerY = (qr.size * qr.cellSize) / 2 - imageSize / 2
    return {
      x: centerX,
      y: centerY,
    }
  }, [qr, imageSize])

  return (
    <div className="relative flex items-center justify-center cursor-pointer">
      <div className="inline-block p-6 my-4 bg-white rounded">
        <svg
          viewBox={`${-qr.cellSize / 2} ${-qr.cellSize / 2} ${
            qr.size * qr.cellSize + qr.cellSize
          } ${qr.size * qr.cellSize + qr.cellSize}`}
          width={targetCells[0].length * qr.cellSize}
          height={targetCells.length * qr.cellSize}
        >
          {targetCells.map((row, rowIndex) =>
            row.map((col, colIndex) => (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * qr.cellSize}
                y={rowIndex * qr.cellSize}
                width={qr.cellSize}
                height={qr.cellSize}
                fill={col ? 'black' : 'white'}
              />
            ))
          )}

          {targetCells.map((row, rowIndex) =>
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

          {paths.includes('readOrder') &&
            readPaths.map((path, index) => (
              <line
                key={index}
                {...path}
                stroke="orange"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            ))}

          {paths.includes('decodingModeBits') &&
            encodingModePaths.map((path, index) => (
              <line
                key={`encoding-${index}`}
                {...path}
                stroke="blue"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}

          {paths.includes('decodingLength') &&
            decodingLengthPaths.map((path, index) => (
              <line
                key={`decoding-${index}`}
                {...path}
                stroke="green"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}

          {paths.includes('content') &&
            byteContentPaths.map((path, index) => (
              <line
                key={`decoding-${index}`}
                {...path}
                stroke="purple"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}

          {paths.includes('maskNo') &&
            maskNoPaths.map((path, index) => (
              <line
                key={`mask-${index}`}
                {...path}
                stroke="red"
                strokeWidth="4"
                strokeLinecap="round"
              />
            ))}

          {image && (
            <>
              <rect
                {...imagePosition}
                width={imageSize}
                height={imageSize}
                fill="white"
                stroke="black"
                strokeWidth="2"
              />
              <image href={image} {...imagePosition} width={imageSize} height={imageSize} />
            </>
          )}
        </svg>
      </div>
    </div>
  )
}

export const QRCodeDecoder: React.FC<QRCodeDecoderProps> = (props) => {
  return (
    <ClientOnly fallback={null}>
      <QRCodeDecoderComponent {...props} />
    </ClientOnly>
  )
}
