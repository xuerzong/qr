import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'
import { useQRCode } from '../qr/qr-code-provider'

export const DataArea = () => {
  return (
    <>
      <Components.h3>7、数据区域（Data Area）</Components.h3>
      <Components.p>
        二维码的主体部分，包含了实际存储的信息。数据区域由多个小方块组成，这些方块可以是黑色或白色，代表不同的数据位。二维码的设计允许在有限的空间内存储大量信息，适用于各种应用场景，如商品信息、网址链接等。
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
      />
    </>
  )
}
