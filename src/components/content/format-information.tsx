import Components from '..'
import { BinaryCode } from '../qr/binary-code'
import { QRCodeDecoder } from '../qr/qr-code-decoder'
import { QRCodeMask } from '../qr/qr-mask'

export const maskMatrix = new Array(6).fill(0).map(() => new Array(6).fill(0))

export const FormatInformation = () => {
  const maskFunctions = [
    {
      order: 0,
      description: '000',
      code: [[0, 0, 0]],
      function: (j: number, i: number) => ((i * j) % 2) + ((i * j) % 3) === 0,
    },
    {
      order: 1,
      description: '001',
      code: [[0, 0, 1]],
      function: (j: number, i: number) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0,
    },
    {
      order: 2,
      description: '010',
      code: [[0, 1, 0]],
      function: (j: number, i: number) => (((i * j) % 3) + i + j) % 2 === 0,
    },
    {
      order: 3,
      description: '011',
      code: [[0, 1, 1]],
      function: (j: number, i: number) => (((i * j) % 3) + i * j) % 2 === 0,
    },
    {
      order: 4,
      description: '100',
      code: [[1, 0, 0]],
      function: (j: number, i: number) => i % 2 === 0,
    },
    {
      order: 5,
      description: '101',
      code: [[1, 0, 1]],
      function: (j: number, i: number) => (i + j) % 2 === 0,
    },
    {
      order: 6,
      description: '110',
      code: [[1, 1, 0]],
      function: (j: number, i: number) => (i + j) % 3 === 0,
    },
    {
      order: 7,
      description: '111',
      code: [[1, 1, 1]],
      function: (j: number, i: number) => j % 3 === 0,
    },
  ]

  return (
    <>
      <Components.h3>5、格式信息（Format Information）</Components.h3>
      <Components.p>
        格式信息是二维码中用于存储纠错级别和掩码模式的关键信息。它通常位于二维码的左上角和右下角，包含了二维码的纠错级别（L、M、Q、H）和掩码模式（0-7）。这些信息对于正确解码二维码至关重要，因为它们帮助扫描设备理解如何处理二维码中的数据。
      </Components.p>

      <QRCodeDecoder features={['formatInformation']} />

      <Components.p>
        <Components.strong>掩码模式（Mask Patterns）</Components.strong>
      </Components.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#bbb] rounded p-4">
        {maskFunctions.map((mask) => (
          <div className="border border-[#666] p-4 rounded" key={mask.order}>
            <div key={mask.order} className="flex flex-col space-y-2 items-center">
              <BinaryCode value={mask.code} />
              <BinaryCode
                value={maskMatrix.map((row, i) =>
                  row.map((_, j) => {
                    return mask.function(j, i) ? 1 : 0
                  })
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <QRCodeMask />

      <Components.p>
        QR码生成时，为了保证二维码具有良好的可读性和识别性，需自动选择
        <Components.strong>最优掩码模式</Components.strong>
        ，步骤如下：
      </Components.p>

      <Components.ul>
        <Components.li>
          <Components.p>对每种掩码模式（0~7）生成临时QR码。</Components.p>
        </Components.li>
        <Components.li>
          <Components.p>计算惩罚分数（Penalty Score），评估模块分布质量。</Components.p>
        </Components.li>
        <Components.li>
          <Components.p>选择分数最低的掩码模式。</Components.p>
        </Components.li>
      </Components.ul>

      <Components.p>惩罚规则：</Components.p>

      <Components.ul>
        <Components.li>
          <Components.p>
            <Components.strong>连续模块：</Components.strong>
            逐行逐列检查二维码矩阵，连续5个相同色块
            <Components.strong>+3分</Components.strong>，超过5个每增加一个
            <Components.strong>+1分</Components.strong>。
          </Components.p>
        </Components.li>

        <Components.li>
          <Components.p>
            <Components.strong>连续模块：</Components.strong>
            逐行逐列检查二维码矩阵，连续5个相同色块
            <Components.strong>+3分</Components.strong>，超过5个每增加一个
            <Components.strong>+1分</Components.strong>。
          </Components.p>
        </Components.li>

        <Components.li>
          <Components.p>
            <Components.strong>大块区域：</Components.strong>
            每出现一个2x2的色块
            <Components.strong>+3分</Components.strong>。
          </Components.p>
        </Components.li>

        <Components.li>
          <Components.p>
            <Components.strong>类似定位标识：</Components.strong>
            如果二维码中出现与定位标识相似的模式（1011101色块），每次发现这样的模式，惩罚分
            <Components.strong>+40分</Components.strong>。
          </Components.p>
        </Components.li>

        <Components.li>
          <Components.p>
            <Components.strong>模块比例：</Components.strong>
            计算二维码中黑色模块所占比例与 50% 的绝对值差，将差值除以 5 并向下取整，再乘以 10
            得到惩罚分。
          </Components.p>
        </Components.li>
      </Components.ul>
    </>
  )
}
