import Components from './components'
import { AlignmentPatterns } from './components/content/alignment-patterns'
import { DarkModule } from './components/content/dark-module'
import { DataArea } from './components/content/data-area'
import { EncodingMode } from './components/content/encoding-mode'
import { FinderPatterns } from './components/content/finder-patterns'
import { FormatInformation } from './components/content/format-information'
import { Separators } from './components/content/separators'
import { TimingPatterns } from './components/content/timing-patterns'
import { VersionInformation } from './components/content/version-information'
import { QRCodeEditor } from './components/qr/qr-code-editor'
import { QRCodeProvider } from './components/qr/qr-code-provider'

export const App = () => {
  return (
    <QRCodeProvider>
      <main className="max-w-screen-md mx-auto">
        <Components.h1>二维码解剖学</Components.h1>

        <Components.h2>背景介绍</Components.h2>
        <Components.p>
          二维码（Quick Response Code，常缩写为 QR
          Code），是一种在二维方向上存储和表达信息的矩阵式条码，由日本电装公司（Denso Wave）于 1994
          年发明。相较于传统一维条形码只能在水平方向存储数据，二维码突破限制，在水平和垂直方向均可存储信息，大大提升了数据存储密度与容量。
          二维码是Web开发中的常见需求，无论是用户身份验证、支付跳转还是链接分享，我们都依赖它实现高效的数据传递。
          本次分享将深入探讨二维码的基本原理、组成部分以及生成和解码的过程，帮助大家更好地理解和应用二维码技术。
        </Components.p>

        <Components.h2>二维码的基本原理</Components.h2>
        <QRCodeEditor />
        <Components.p>
          二维码的基本原理是将信息编码为一个由黑白模块（小方块）组成的矩阵，这些模块可以被扫描设备（如手机摄像头）识别并解码。二维码的设计使其能够在不同的角度和光照条件下被快速识别，具有较强的容错能力。
          二维码的工作原理可以分为以下几个步骤：
        </Components.p>
        <Components.ul>
          <Components.li>
            <Components.p>
              <Components.strong>信息编码</Components.strong>
              将要存储的信息转换为二进制数据，并根据二维码的编码规则进行处理。
            </Components.p>
          </Components.li>

          <Components.li>
            <Components.p>
              <Components.strong>数据模块化</Components.strong>
              将二进制数据分割成多个模块（小方块），每个模块可以是黑色或白色，表示二进制的 1 或 0。
            </Components.p>
          </Components.li>

          <Components.li>
            <Components.p>
              <Components.strong>纠错编码</Components.strong>
              使用 Reed-Solomon
              算法对数据进行纠错编码，添加冗余信息，以便在二维码部分损坏时仍能恢复原始数据。
            </Components.p>
          </Components.li>

          <Components.li>
            <Components.p>
              <Components.strong>二维码生成</Components.strong>
              将编码后的数据按照特定的格式排列成一个矩阵，形成最终的二维码图案。
            </Components.p>
          </Components.li>
        </Components.ul>

        <section>
          <Components.h2>二维码组成</Components.h2>
          <FinderPatterns />
          <AlignmentPatterns />
          <Separators />
          <TimingPatterns />
          <FormatInformation />
          <VersionInformation />
          <DarkModule />
          <DataArea />
        </section>

        <section>
          <Components.h2>二维码解剖</Components.h2>
          <EncodingMode />
        </section>
      </main>
    </QRCodeProvider>
  )
}
