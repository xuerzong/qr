import Components from '..'
import { ClientOnly } from '../client-only'
import { QRCodeDecoder } from '../qr/qr-code-decoder'
import { useQRCode } from '../qr/qr-code-provider'
import { QRCode } from '@/lib/qr'

export const DecodingContent = () => {
  const { qr } = useQRCode()
  return (
    <>
      <Components.h3>解码内容</Components.h3>
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
              <Components.th>结果</Components.th>
            </Components.tr>
          </Components.thead>

          <Components.tbody>
            {qr.decodingBytes.map((bytes, bytesIndex) => (
              <Components.tr key={bytesIndex}>
                <Components.td>{bytesIndex}</Components.td>
                <Components.td>{bytes}</Components.td>
                <Components.td>{QRCode.bytes2Char(bytes, qr.decodingMode)}</Components.td>
              </Components.tr>
            ))}
          </Components.tbody>
        </Components.table>
      </ClientOnly>
    </>
  )
}
