import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'

export const DarkModule = () => {
  return (
    <>
      <Components.h3>暗模块（Dark Module）</Components.h3>
      <Components.p>
        二维码中的暗模块是指二维码中用于存储数据的黑色方块。这些模块通过特定的排列组合来表示不同的信息，是二维码的核心部分。暗模块的设计和布局直接影响二维码的可读性和解码效率。
      </Components.p>
      <QRCodeDecoder features={['darkModule']} />
    </>
  )
}
