import Components from '..'
import { ClientOnly } from '../client-only'
import { QRCodeDecoder } from '../qr/qr-code-decoder'
import { useQRCode } from '../qr/qr-code-provider'

export const DecodingContent = () => {
  const { qr } = useQRCode()
  return (
    <>
      <Components.h2>解码内容</Components.h2>
      <Components.p>
        二维码的解码内容包括多个方面，如定位标记、纠错级别、版本信息、数据编码等。了解这些内容有助于更好地理解二维码的结构和功能。
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
        paths={['content', 'readOrder']}
      />

      <ClientOnly>
        <Components.table>
          <Components.thead>
            <Components.tr>
              <Components.th>编号</Components.th>
              <Components.th>二进制</Components.th>
              <Components.th>字符</Components.th>
            </Components.tr>
          </Components.thead>

          <Components.tbody>
            {qr.decodingBytes.map((byte, byteIndex) => (
              <Components.tr key={byteIndex}>
                <Components.td>{byteIndex}</Components.td>
                <Components.td>{byte}</Components.td>
                <Components.td>{String.fromCharCode(parseInt(byte, 2))}</Components.td>
              </Components.tr>
            ))}
          </Components.tbody>
        </Components.table>
      </ClientOnly>

      <Components.p>完整内容：{qr.decodedContent}</Components.p>
    </>
  )
}
