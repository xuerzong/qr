'use client'

import { QRCodeDecoder } from './qr-code-decoder'
import { useQRCode } from './qr-code-provider'

export const QRCodeEditor: React.FC = () => {
  const { value, onChange } = useQRCode()
  return (
    <div className="flex flex-col items-center space-y-4 sticky top-6 z-10">
      <div className="flex flex-col space-y-2 w-full p-6 bg-[#eee] rounded">
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-medium">字符串</label>
          <input
            className="bg-white border rounded px-4 py-4 text-sm focus:outline-none outline-none"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
            }}
            placeholder="请输入"
          />
        </div>
      </div>
    </div>
  )
}
