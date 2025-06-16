import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'

export const Other = () => {
  return (
    <>
      <Components.h2>其他</Components.h2>

      <Components.p>
        <Components.strong>图片嵌入</Components.strong>
      </Components.p>

      <Components.p>
        二维码可以嵌入图片或图标，这种方式通常用于品牌宣传或个性化设计。嵌入图片时需要注意不要遮挡二维码的关键部分，如定位标记和数据区域，以免影响二维码的可读性。
      </Components.p>

      <QRCodeDecoder image="/image.png" />

      <Components.p>
        <Components.strong>艺术二维码</Components.strong>
      </Components.p>

      <Components.p>
        艺术二维码是将二维码与艺术设计相结合的形式，通常用于广告、宣传和品牌推广。艺术二维码在设计时需要确保二维码的核心功能不受影响，即仍然能够被扫描设备正确识别和解码。
      </Components.p>

      <div className="flex flex-wrap gap-4">
        <img className="w-32 h-32" src="/qr-code.png" />
        <img className="w-32 h-32" src="/qr-code-1.png" />
      </div>
    </>
  )
}
