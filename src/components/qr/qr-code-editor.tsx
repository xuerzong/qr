'use client'

import { useQRCode } from './qr-code-provider'
import * as Switch from '@radix-ui/react-switch'

export const QRCodeEditor: React.FC = () => {
  const { value, onChange, xorMask, changeXorMask } = useQRCode()
  return (
    <div className="flex flex-col items-center space-y-4 sticky top-6 z-10">
      <div className="flex flex-col space-y-4 w-full p-6 bg-[#eee] rounded">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium">字符串</label>
          <input
            className="bg-white border rounded px-2 py-2 text-sm focus:outline-none outline-none"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
            }}
            placeholder="请输入"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium">掩码模式</label>
          <Switch.Root
            checked={!!xorMask}
            onCheckedChange={(checked) => {
              changeXorMask?.(checked)
            }}
            className="relative h-[25px] w-[42px] border border-[#333] cursor-default rounded-full bg-[#333] outline-none data-[state=checked]:bg-[#16a34a]"
          >
            <Switch.Thumb className="block size-[21px] translate-x-0 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </div>
      </div>
    </div>
  )
}
