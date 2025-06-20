import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'
import { useQRCode } from '../qr/qr-code-provider'

export const DecodingLength = () => {
  const { qr } = useQRCode()
  const decodingMode = qr.decodingMode
  return (
    <>
      <Components.h3>解码长度</Components.h3>

      {decodingMode === 'Numeric' && (
        <Components.p>数字编码模式下，原始数据长度由10位二进制表示。</Components.p>
      )}

      {decodingMode === 'Bytes' && (
        <Components.p>字节编码模式下，原始数据长度由8位二进表示。</Components.p>
      )}

      {decodingMode === 'Alphanumeric' && (
        <Components.p>字母数字编码模式下，原始数据长度由9位二进制表示。</Components.p>
      )}

      <QRCodeDecoder
        features={[
          'finderPatterns',
          'alignmentPatterns',
          'timingPatterns',
          'formatInformation',
          'separators',
          'darkModule',
        ]}
        paths={['decodingLength', 'readOrder']}
      />

      <Components.p>
        当前长度字节为
        <Components.strong> {qr.decodingLength} </Components.strong>
        ，对应的十进制为
        <Components.strong> {qr.decodingLengthDecimal} </Components.strong>。
      </Components.p>
    </>
  )
}
