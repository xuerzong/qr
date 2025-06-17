import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'

export const TimingPatterns = () => {
  return (
    <>
      <Components.h3>时序线（Timing Patterns）</Components.h3>
      <Components.p>
        时序线是二维码中用于帮助扫描设备确定数据模块位置的辅助图案。版本越高，时序线的数量越多。它们通常位于二维码的顶部和左侧，形成一条连续的线条，帮助设备在解码过程中保持正确的行列对齐。
      </Components.p>
      <QRCodeDecoder features={['timingPatterns']} />
    </>
  )
}
