import Components from '..'
import { QRCodeDecoder } from '@/components/qr/qr-code-decoder'
import { useQRCode } from '@/components/qr/qr-code-provider'

export const AlignmentPatterns = () => {
  const { qr } = useQRCode()

  const version = qr.qr.version

  return (
    <>
      <Components.h3>对齐标记（Alignment Patterns）</Components.h3>

      {version >= 2 ? (
        <>
          <Components.p>
            对齐标记是二维码中用于提高解码精度的辅助图案。它们通常位于二维码的中心位置，帮助扫描设备在不同的角度和距离下更准确地识别二维码的结构。
            对齐标记的数量和位置会随着二维码版本的增加而变化，从版本 2
            开始，每个版本都会增加一个对齐标记，以适应更复杂的二维码结构。
          </Components.p>
          <QRCodeDecoder features={['alignmentPatterns']} />
        </>
      ) : (
        <Components.p>
          对齐标记从版本 2 开始引入，当前二维码版本为 {version}，因此没有对齐标记。
        </Components.p>
      )}
    </>
  )
}
