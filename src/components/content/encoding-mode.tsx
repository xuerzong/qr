import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'
import { useQRCode } from '../qr/qr-code-provider'

const decodingModeBitss: Record<string, string> = {
  '0001': '数字模式',
  '0010': '字母数字模式',
  '0100': '字节模式',
  '0111': 'ECI 模式',
  '1000': 'Kanji 模式',
}

export const EncodingMode = () => {
  const { qr } = useQRCode()
  return (
    <>
      <Components.h3>编码模式</Components.h3>
      <Components.p>
        二维码的解码模式指的是二维码在被扫描时所采用的解码方式。不同的解码模式可以影响二维码的解析速度和准确性。常见的解码模式包括自动模式、手动模式等，适用于不同的应用场景。
      </Components.p>
      <Components.ul>
        <Components.li>
          <Components.p>
            <Components.strong>数字模式（0001）：</Components.strong>
            仅包含数字（0-9），每3个数字占用 10 位。储存效率较高，适用于纯数字信息的二维码。
          </Components.p>
        </Components.li>

        <Components.li>
          <Components.p>
            <Components.strong>字母数字模式（0010）：</Components.strong>
            包含数字（0-9）、大写字母（A-Z）和一些特殊字符（空格、$、%、\*、+、-、.、/），2个字符占用
            11 位。储存效率中等，适用于包含字母和数字的二维码。
          </Components.p>
        </Components.li>

        <Components.li>
          <Components.p>
            <Components.strong>字节模式（0100）：</Components.strong>
            使用 ISO-8859-1 字符集（Latin-1），每个字符占用 8 位。
            适用于存储多种语言字符和符号，具有较高的灵活性和兼容性。
          </Components.p>
        </Components.li>
      </Components.ul>
      <Components.p>
        这些是最常用的编码模式（还有Kanji模式、ECI -
        拓展通道解释等等），二维码生成时会根据输入内容自动选择最合适的编码模式。
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
        paths={['decodingModeBits', 'readOrder']}
      />
      <Components.p>
        当前编码模式为
        <Components.strong>
          {decodingModeBitss[qr.decodingModeBits]}（{qr.decodingModeBits}）
        </Components.strong>
        。
      </Components.p>
    </>
  )
}
