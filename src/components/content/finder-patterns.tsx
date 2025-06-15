import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'

export const FinderPatterns = () => {
  return (
    <>
      <Components.h3>1、定位标记（Finder Patterns）</Components.h3>
      <Components.p>
        二维码的定位标记通常是三个“回”字形的正方图案，分别位于二维码的左上角、右上角和左下角。这些定位图案的作用是
        <Components.strong>帮助扫描设备快速准确地识别二维码的位置和方向</Components.strong>
        ，无论二维码在图像中是正放、倒置、倾斜还是旋转，扫描设备都能通过定位图案迅速找到二维码的边界和角落，从而进行后续的解码操作。
      </Components.p>
      <QRCodeDecoder features={['finderPatterns']} />
    </>
  )
}
