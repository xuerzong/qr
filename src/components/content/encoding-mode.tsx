import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'

export const EncodingMode = () => {
  return (
    <>
      <Components.h3>编码模式（Decoding Mode）</Components.h3>
      <Components.p>
        二维码的解码模式指的是二维码在被扫描时所采用的解码方式。不同的解码模式可以影响二维码的解析速度和准确性。常见的解码模式包括自动模式、手动模式等，适用于不同的应用场景。
        <Components.ul>
          <Components.li>
            <Components.p>
              <Components.strong>数字模式：</Components.strong>仅包含数字（0-9），每个数字占用 10
              位。
            </Components.p>
          </Components.li>

          <Components.li>
            <Components.p>
              <Components.strong>字母数字模式：</Components.strong>
              包含数字（0-9）、大写字母（A-Z）和一些特殊字符（空格、$、%、\*、+、-、.、/），每个字符占用
              11 位 位。
            </Components.p>
          </Components.li>

          <Components.li>
            <Components.p>
              <Components.strong>字节模式：</Components.strong>
              使用 ISO-8859-1 字符集（Latin-1），每个字符占用 8 位。
            </Components.p>
          </Components.li>

          <Components.li>
            <Components.p>
              <Components.strong>ECI 模式：</Components.strong>
              用于存储汉字等多字节字符，使用 UTF-8 编码，每个字符占用 13 位。
            </Components.p>
          </Components.li>

          <Components.li>
            <Components.p>
              <Components.strong>Kanji 模式：</Components.strong>
              专门用于存储日文汉字，使用 Shift JIS 编码，每个字符占用 13 位。
            </Components.p>
          </Components.li>
        </Components.ul>
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
        paths={['decodingMode']}
      />
    </>
  )
}
