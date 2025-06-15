import Components from '..'
import { QRCodeDecoder } from '../qr/qr-code-decoder'

export const VersionInformation = () => {
  return (
    <>
      <Components.h3>5、版本信息（Version Information）</Components.h3>
      <Components.p>
        二维码的版本信息位于二维码的右下角，包含了二维码的版本号和纠错级别等信息。这些信息对于扫描设备在解码过程中非常重要，能够帮助设备正确地解析二维码内容。
      </Components.p>
      <QRCodeDecoder features={['versionInformation']} />
    </>
  )
}
