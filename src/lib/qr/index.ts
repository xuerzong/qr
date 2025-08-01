import { qrcodegen } from './codegen'
import { chunk } from '../utils/array'
import { alphanumericChars } from '../alphanumeric'
export interface PathSegment {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface Position {
  i: number
  j: number
}

interface PathPoint {
  x: number
  y: number
}

interface TraversalRecord {
  position: Position
  order: number
  direction: number
  value: number
  xorMaskValue: number
}

export const qrCodeEcls = ['L', 'M', 'Q', 'H'] as const
type QRCodeEcl = (typeof qrCodeEcls)[number]
const qrCodeEclValues: Record<QRCodeEcl, qrcodegen.QrCode.Ecc> = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH,
}

export class QRCode {
  static isBytesMode = (value: string): boolean => {
    return value === '0100'
  }

  static isNumericMode = (value: string): boolean => {
    return value === '0001'
  }

  static isAlphanumericMode = (value: string): boolean => {
    return value === '0010'
  }

  static bytes2Char = (
    bytes: string,
    mode: 'Bytes' | 'Numeric' | 'Alphanumeric' | 'Unknown'
  ): string => {
    switch (mode) {
      case 'Bytes':
        return String.fromCharCode(parseInt(bytes, 2))
      case 'Numeric':
        return parseInt(bytes, 2).toString() // ASCII码偏移
      case 'Alphanumeric':
        const value = parseInt(bytes, 2)
        const firstCharIndex = Math.floor(value / 45)
        const lastCharIndex = value % 45
        return bytes.length < 11
          ? alphanumericChars[lastCharIndex]
          : `${alphanumericChars[firstCharIndex]}${alphanumericChars[lastCharIndex]}`
      default:
        return ''
    }
  }

  qr: qrcodegen.QrCode
  cells: number[][] = []
  public cellSize = 20
  traversalRecord: TraversalRecord[]
  value: string

  constructor(value: string, ecl: QRCodeEcl = 'L') {
    this.qr = qrcodegen.QrCode.encodeText(value, qrCodeEclValues[ecl])
    this.cells = this.qr.getModules().map((row) => row.map((cell) => (cell ? 1 : 0)))
    this.traversalRecord = this.getTraversalRecord()
    this.value = value
  }

  get size() {
    return this.qr.size
  }

  get decodingModeBits(): string {
    return this.traversalRecord
      .slice(0, 4)
      .map((i) => i.xorMaskValue)
      .join('')
  }

  get decodingMode(): 'Bytes' | 'Numeric' | 'Alphanumeric' | 'Unknown' {
    if (QRCode.isBytesMode(this.decodingModeBits)) {
      return 'Bytes'
    }

    if (QRCode.isNumericMode(this.decodingModeBits)) {
      return 'Numeric'
    }

    if (QRCode.isAlphanumericMode(this.decodingModeBits)) {
      return 'Alphanumeric'
    }

    return 'Unknown'
  }

  get decodingLength(): string {
    if (this.decodingMode === 'Bytes') {
      return this.traversalRecord
        .slice(4, 12)
        .map((i) => i.xorMaskValue)
        .join('')
    }

    if (this.decodingMode === 'Numeric') {
      return this.traversalRecord
        .slice(4, 14)
        .map((i) => i.xorMaskValue)
        .join('')
    }

    if (this.decodingMode === 'Alphanumeric') {
      return this.traversalRecord
        .slice(4, 13)
        .map((i) => i.xorMaskValue)
        .join('')
    }

    return ''
  }

  get decodingBytes(): string[] {
    if (this.decodingMode === 'Bytes') {
      return chunk(this.traversalRecord.slice(12), 8)
        .slice(0, this.value.length)
        .map((d) => d.map((point) => point.xorMaskValue))
        .map((d) => d.join(''))
    }

    if (this.decodingMode === 'Numeric') {
      const bytePoints = chunk(this.traversalRecord.slice(14), 10)

      const isFull = this.value.length % 3 === 0

      if (isFull) {
        return bytePoints
          .slice(0, Math.ceil(this.value.length / 3))
          .map((d) => d.map((point) => point.xorMaskValue))
          .map((d) => d.join(''))
      } else {
        const fullBytes = bytePoints.slice(0, Math.floor(this.value.length / 3))
        const lastByteLengths = [4, 7, 10]
        const lastByte = bytePoints[Math.floor(this.value.length / 3)].slice(
          0,
          lastByteLengths[(this.value.length % 3) - 1]
        )
        return [...fullBytes, lastByte]
          .map((d) => d.map((point) => point.xorMaskValue))
          .map((d) => d.join(''))
      }
    }

    if (this.decodingMode === 'Alphanumeric') {
      const bytePoints = chunk(this.traversalRecord.slice(13), 11)
      const isFull = this.value.length % 2 === 0

      if (isFull) {
        return bytePoints
          .slice(0, Math.ceil(this.value.length / 2))
          .map((d) => d.map((point) => point.xorMaskValue))
          .map((d) => d.join(''))
      } else {
        const fullBytes = bytePoints.slice(0, Math.floor(this.value.length / 2))
        const lastByteLengths = [6, 11]
        const lastByte = bytePoints[Math.floor(this.value.length / 2)].slice(
          0,
          lastByteLengths[(this.value.length % 2) - 1]
        )
        return [...fullBytes, lastByte]
          .map((d) => d.map((point) => point.xorMaskValue))
          .map((d) => d.join(''))
      }
    }

    return [] as string[]
  }

  get decodedContent(): string {
    const bytePoints = chunk(this.traversalRecord.slice(12), 8).slice(0, this.value.length)
    return bytePoints
      .map((points) => {
        return points
          .map((point) => point.xorMaskValue)
          .reduce((acc, cur) => (acc << 1) | cur, 0)
          .toString(2)
          .padStart(8, '0')
      })
      .map((byte) => String.fromCharCode(parseInt(byte, 2)))
      .join('')
  }

  get decodingLengthDecimal(): number {
    return parseInt(this.decodingLength, 2)
  }

  get xorMaskCells(): number[][] {
    return this.cells.map((row, i) =>
      row.map((cell, j) => {
        const invert = this.getXorMaskInvert({ i, j })
        return invert ? cell ^ 1 : cell
      })
    )
  }

  get formatInformationBits(): string {
    let bits: string[] = []

    // 前7位
    for (let i = this.qr.size - 1; i > this.qr.size - 8; i--) {
      bits.push(this.cells[i][8].toString())
    }
    // 副本后8位
    for (let j = this.qr.size - 1; j > this.qr.size - 9; j--) {
      bits.push(this.cells[8][j].toString())
    }

    return bits.join('')
  }

  generateReadPaths(): PathSegment[] {
    const points = this.traversalRecord
    const paths: PathSegment[] = []

    const getCenterPoint = ({ i, j }: Position): PathPoint => ({
      x: j * this.cellSize + this.cellSize / 2,
      y: i * this.cellSize + this.cellSize / 2,
    })

    for (let i = 0; i < points.length - 1; i++) {
      const currentPoint = points[i]
      const nextPoint = points[i + 1]
      const p1 = getCenterPoint(currentPoint.position)
      const p2 = getCenterPoint(nextPoint.position)
      paths.push({
        x1: p1.x,
        x2: p2.x,
        y1: p1.y,
        y2: p2.y,
      })
    }

    return paths
  }

  generateEncodingModePaths(): PathSegment[] {
    return this.getRectPaths(this.traversalRecord.slice(0, 4))
  }

  generateDecodingLengthPaths(): PathSegment[] {
    if (this.decodingMode === 'Bytes') {
      return this.getRectPaths(this.traversalRecord.slice(4, 12))
    }

    if (this.decodingMode === 'Numeric') {
      return this.getRectPaths(this.traversalRecord.slice(4, 14))
    }

    if (this.decodingMode === 'Alphanumeric') {
      return this.getRectPaths(this.traversalRecord.slice(4, 13))
    }

    return []
  }

  generateDecodingContentPath(): PathSegment[] {
    let bytePoints: TraversalRecord[][] = []
    if (this.decodingMode === 'Bytes') {
      bytePoints = chunk(this.traversalRecord.slice(12), 8).slice(0, this.value.length)
    }

    if (this.decodingMode === 'Numeric') {
      bytePoints = chunk(this.traversalRecord.slice(14), 10).slice(
        0,
        Math.ceil(this.value.length / 3)
      )
      const isFull = this.value.length % 3 === 0
      if (!isFull) {
        const lastByteLengths = [4, 7, 10]
        bytePoints[bytePoints.length - 1] = bytePoints[bytePoints.length - 1].slice(
          0,
          lastByteLengths[(this.value.length % 3) - 1]
        )
      }
    }

    if (this.decodingMode === 'Alphanumeric') {
      bytePoints = chunk(this.traversalRecord.slice(13), 11).slice(
        0,
        Math.ceil(this.value.length / 2)
      )
      const isFull = this.value.length % 2 === 0
      if (!isFull) {
        const lastByteLengths = [6, 11]
        bytePoints[bytePoints.length - 1] = bytePoints[bytePoints.length - 1].slice(
          0,
          lastByteLengths[(this.value.length % 2) - 1]
        )
      }
    }
    let paths: PathSegment[] = []
    bytePoints.forEach((points) => {
      paths.push(...this.getRectPaths(points))
    })
    return paths
  }

  generateMaskNoPath(): PathSegment[] {
    const points: TraversalRecord[] = [
      { i: 8, j: 2 },
      { i: 8, j: 3 },
      { i: 8, j: 4 },
    ].map((p, pIndex) => ({
      position: p,
      order: pIndex,
      direction: 1,
      value: this.cells[p.i][p.j],
      xorMaskValue: this.xorMaskCells[p.i][p.j],
    }))
    return this.getRectPaths(points)
  }

  getTraversalRecord(): TraversalRecord[] {
    const size = this.qr.size
    const traversalHistory: TraversalRecord[] = []

    let currentCells: Position[] = [
      { i: size - 1, j: size - 1 },
      { i: size - 1, j: size - 2 },
    ]

    let order = 0

    let direction = 1
    let processedCells = 0
    const totalCells = size * size

    const getNextCells = (current: Position[], iStep: number, jStep: number): Position[] => {
      const next = current.map(({ i, j }) => ({
        i: i - iStep,
        j: j - jStep,
      }))

      const [right, left] = next

      // separators
      if (right.j === 6) {
        return next.map(({ i, j }) => ({
          i,
          j: j - 1,
        }))
      }

      return next
    }

    const recordTraversal = (cell: Position) => {
      if (cell.i < 0 || cell.i > size || cell.j < 0 || cell.j > size) {
        return
      }
      const cellValue = this.cells[cell.i][cell.j]
      const xorMaskValue = this.xorMaskCells[cell.i][cell.j]
      traversalHistory.push({
        position: cell,
        order,
        direction,
        value: cellValue,
        xorMaskValue: xorMaskValue,
      })
      order += 1
    }

    currentCells.forEach(recordTraversal)

    while (processedCells < totalCells) {
      let iStep = direction
      let jStep = 0

      if (
        (direction === 1 && currentCells[0].i === 0) ||
        (direction === -1 && currentCells[0].i === size - 1)
      ) {
        direction *= -1
        jStep = 2
        iStep = 0
      }

      let nextCells = getNextCells(currentCells, iStep, jStep)

      while (
        processedCells < totalCells &&
        (this.isSpecialRegion(nextCells[0]) || this.isSpecialRegion(nextCells[1]))
      ) {
        if (!this.isSpecialRegion(nextCells[0])) {
          recordTraversal(nextCells[0])
        }

        if (!this.isSpecialRegion(nextCells[1])) {
          recordTraversal(nextCells[1])
        }

        processedCells += 2

        iStep = direction
        jStep = 0

        if (
          (direction === 1 && nextCells[0].i === 0) ||
          (direction === -1 && nextCells[0].i === size - 1)
        ) {
          direction *= -1
          jStep = 2
          iStep = 0
        }

        nextCells = getNextCells(nextCells, iStep, jStep)
      }

      nextCells.forEach(recordTraversal)

      currentCells = nextCells
      processedCells += 2
    }

    return traversalHistory
  }

  isSpecialRegion({ i, j }: Position): boolean {
    return (
      this.isFinders({ i, j }) ||
      this.isSeparators({ i, j }) ||
      this.isTimingPatterns({ i, j }) ||
      this.isFormatInformation({ i, j }) ||
      this.isDarkModule({ i, j }) ||
      this.isAlignmentPatterns({ i, j })
    )
  }

  isFinders({ i, j }: Position): boolean {
    const size = this.qr.size
    return (i < 7 && j < 7) || (i < 7 && j >= size - 7) || (i >= size - 7 && j < 7)
  }

  isSeparators({ i, j }: Position): boolean {
    const size = this.qr.size
    return (
      (i === 7 && j <= 7) ||
      (j === 7 && i <= 7) ||
      (i >= size - 7 && j === 7) ||
      (i === size - 8 && j <= 7) ||
      (i === 7 && j >= size - 7) ||
      (j === size - 8 && i <= 7)
    )
  }

  isTimingPatterns({ i, j }: Position): boolean {
    const size = this.qr.size
    return (i === 6 && j >= 7 && j < size - 7) || (j === 6 && i >= 7 && i < size - 7)
  }

  isFormatInformation({ i, j }: Position): boolean {
    const size = this.qr.size
    return (
      (j <= 8 && i === 8) ||
      (j >= size - 8 && i === 8) ||
      (i <= 7 && j === 8) ||
      (i >= size - 7 && j === 8)
    )
  }

  isDarkModule({ i, j }: Position): boolean {
    const size = this.qr.size
    return j === 8 && i === size - 8
  }

  isAlignmentPatterns({ i, j }: Position): boolean {
    const version = this.qr.version
    if (this.qr.version < 2) {
      return false
    }
    const size = this.qr.size
    const alignmentPatternPositions = this.calculateAlignmentPatternPositions()

    // 检查每个对齐图案位置
    for (const pos of alignmentPatternPositions) {
      const ai = pos[0]
      const aj = pos[1]

      // 跳过三个定位图案所在位置
      if (
        (ai === 6 && aj === 6) ||
        (ai === 6 && aj === version * 4 + 10) ||
        (ai === version * 4 + 10 && aj === 6)
      ) {
        continue
      }

      // 检查点(i,j)是否在当前对齐图案的5x5区域内
      if (i >= ai - 2 && i <= ai + 2 && j >= aj - 2 && j <= aj + 2) {
        return true
      }
    }

    return false
  }

  getRectPaths(points: TraversalRecord[]): PathSegment[] {
    const paths: PathSegment[] = []
    const pathsMap = new Map<string, number>()

    points.forEach((point, index) => {
      const edges = [
        {
          x1: point.position.j * this.cellSize + this.cellSize,
          x2: point.position.j * this.cellSize + this.cellSize,
          y1: point.position.i * this.cellSize,
          y2: point.position.i * this.cellSize + this.cellSize,
        },
        {
          x1: point.position.j * this.cellSize,
          x2: point.position.j * this.cellSize,
          y1: point.position.i * this.cellSize,
          y2: point.position.i * this.cellSize + this.cellSize,
        },
        {
          x1: point.position.j * this.cellSize + this.cellSize,
          x2: point.position.j * this.cellSize,
          y1: point.position.i * this.cellSize,
          y2: point.position.i * this.cellSize,
        },
        {
          x1: point.position.j * this.cellSize,
          x2: point.position.j * this.cellSize + this.cellSize,
          y1: point.position.i * this.cellSize + this.cellSize,
          y2: point.position.i * this.cellSize + this.cellSize,
        },
      ]
      edges.forEach((edge) => {
        const pathId = [
          ...[edge.x1, edge.x2].sort((a, b) => a - b),
          ...[edge.y1, edge.y2].sort((a, b) => a - b),
        ].join('-')
        pathsMap.set(pathId, (pathsMap.get(pathId) || 0) + 1)
      })
    })

    Array.from(pathsMap.entries()).forEach(([pathId, count]) => {
      if (count === 1) {
        const [x1, x2, y1, y2] = pathId.split('-').map(Number)
        paths.push({ x1, y1, x2, y2 })
      }
    })

    return paths
  }

  getXorMaskInvert({ i, j }: Position) {
    const mask = this.qr.mask
    let invert = false
    switch (mask) {
      case 0:
        invert = (i + j) % 2 === 0
        break
      case 1:
        invert = i % 2 === 0
        break
      case 2:
        invert = j % 3 === 0
        break
      case 3:
        invert = (i + j) % 3 === 0
        break
      case 4:
        invert = (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
        break
      case 5:
        invert = ((i * j) % 2) + ((i * j) % 3) === 0
        break
      case 6:
        invert = (((i * j) % 2) + ((i * j) % 3)) % 2 == 0
        break
      case 7:
        invert = (((i + j) % 2) + ((i * j) % 3)) % 2 === 0
        break
      default:
        throw new Error('Unreachable')
    }
    return invert && !this.isSpecialRegion({ i, j })
  }

  generateMaskCells(): number[][] {
    const cells = new Array(this.qr.size).fill(0).map(() => new Array(this.qr.size).fill(0))
    for (let i = 0; i < this.qr.size; i++) {
      for (let j = 0; j < this.qr.size; j++) {
        let invert = this.getXorMaskInvert({ i, j })
        cells[i][j] = invert ? 1 : 0
      }
    }
    return cells
  }

  calculateAlignmentPatternPositions() {
    const version = this.qr.version
    if (version < 2) {
      return []
    }

    // 对齐图案的间距（根据版本确定）
    const numPositions = Math.floor(version / 7) + 2
    const firstPosition = 6
    const lastPosition = version * 4 + 10

    // 计算间距
    let step
    if (version === 32) {
      step = 26 // 版本32是特殊情况
    } else {
      step = Math.ceil((lastPosition - firstPosition) / (numPositions - 1))
    }

    // 生成位置数组
    const positions = [firstPosition]
    let pos = lastPosition
    positions.push(pos)

    // 计算中间位置
    for (let i = numPositions - 3; i >= 0; i--) {
      pos -= step
      positions.splice(1, 0, pos)
    }

    // 生成所有对齐图案的坐标对
    const result: number[][] = []
    for (const i of positions) {
      for (const j of positions) {
        result.push([i, j])
      }
    }

    return result
  }
}
