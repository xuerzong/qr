import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'

export const Separators = () => {
  return (
    <>
      <Components.h3>3、分隔符（Separators）</Components.h3>
      <Components.p>
        定位标记周围的白色区域，是专门设计的，用于隔离二维码与背景的干扰，确保了扫描设备能够清晰地识别二维码的边界，避免误读或错误解码。
      </Components.p>
      <QRCodeDecoder features={['separators']} />
    </>
  )
}
