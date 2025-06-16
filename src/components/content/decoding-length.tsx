import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'
import { useQRCode } from '../qr/qr-code-provider'

export const DecodingLength = () => {
  const { qr } = useQRCode()
  return (
    <>
      <Components.h3>解码长度（Decoding Length）</Components.h3>
      <Components.p>
        二维码的解码长度是指二维码中存储的信息量，通常以字节为单位。不同的二维码版本和纠错级别会影响解码长度。了解解码长度对于设计和生成二维码非常重要，以确保二维码能够容纳所需的信息。
      </Components.p>
      <Components.p>
        在实际应用中，解码长度可以通过二维码的版本号和纠错级别来计算。每个版本的二维码都有一个特定的最大容量，而纠错级别则会影响可用容量。
      </Components.p>

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
