import Components from '..'
import { ClientOnly } from '../client-only'
import { QRCodeDecoder } from '../qr/qr-code-decoder'
import { useQRCode } from '../qr/qr-code-provider'
import { QRCode } from '@/lib/qr'

export const DecodingContent = () => {
  const { qr } = useQRCode()
  const decodingMode = qr.decodingMode
  return (
    <>
      <Components.h3>解码内容</Components.h3>
      {decodingMode === 'Bytes' && (
        <Components.p>
          字节编码模式下，二维码的内容是以字节（8位二进制）形式存储的，每个字节对应一个字符。
        </Components.p>
      )}

      {decodingMode === 'Alphanumeric' && (
        <Components.p>
          字母数字编码模式下，二维码的内容是以字母数字（9位二进制）形式存储的，每个字符对应一对字母或数字。其中，字符集包括数字（0-9）、大写字母（A-Z）和一些特殊字符（空格、$、%、\*、+、-、.、/），按照他们在字符集中的顺序进行编码。如果只有1个字符，则对应6位二进制；如果有2个字符，则对应11位二进制。计算方式为：
          <Components.strong>fisrtCharIndex * 45 + secondCharIndex。</Components.strong>
        </Components.p>
      )}

      {decodingMode === 'Numeric' && (
        <Components.p>
          数字编码模式下，二维码的内容是以数字（10位二进制）形式存储的，每3个数字对应10位二进制。如果只有1个数字，则对应4位二进制；如果有2个数字，则对应7位二进制。
        </Components.p>
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
