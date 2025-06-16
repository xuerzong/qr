import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'

export const ReadingOrder = () => {
  return (
    <>
      <Components.h3>阅读顺序</Components.h3>
      <Components.p>
        二维码阅读顺序从右下角开始，以Z字逐行扫描，跳过所有的特殊功能区域。
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
        paths={['readOrder']}
      />
    </>
  )
}
