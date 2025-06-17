import React from 'react'
import { useQRCode } from './qr-code-provider'
import * as Switch from '@radix-ui/react-switch'
import { ChevronDownIcon } from 'lucide-react'

interface FormItemProps {
  label: string
  name?: string
}

const FormItem: React.FC<React.PropsWithChildren<FormItemProps>> = ({ name, label, children }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name} className="text-xs font-medium">
        {label}
      </label>
      {children}
    </div>
  )
}

export const QRCodeEditor: React.FC = () => {
  const { value, onChange, xorMask, changeXorMask, ecl, changeEcl } = useQRCode()
  return (
    <div className="flex flex-col items-center space-y-4 sticky top-6 z-10">
      <div className="flex flex-col space-y-4 w-full p-6 bg-[#eee] rounded">
        <FormItem name="content" label="二维码内容">
          <input
            name="content"
            className="bg-white border border-border rounded px-2 py-2 text-sm focus:outline-none outline-none"
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
            }}
            placeholder="请输入"
          />
        </FormItem>

        <div className="flex space-x-2">
          <FormItem name="xorMask" label="掩码模式">
            <Switch.Root
              checked={!!xorMask}
              onCheckedChange={(checked) => {
                changeXorMask?.(checked)
              }}
              name="xorMask"
              className="relative h-[25px] w-[42px] border border-border cursor-default rounded-full bg-[#333] outline-none data-[state=checked]:bg-[#16a34a]"
            >
              <Switch.Thumb className="block size-[21px] translate-x-0 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]" />
            </Switch.Root>
          </FormItem>

          <FormItem name="ecl" label="纠错级别">
            <div className="relative min-w-[100px]">
              <select
                name="ecl"
                className="w-full bg-white border border-border rounded px-2 py-2 text-sm focus:outline-none outline-none"
                value={ecl}
                onChange={(e) => {
                  const currentEcc = e.target.value as typeof ecl
                  changeEcl(currentEcc)
                }}
              >
                <option value="L">L</option>
                <option value="M">M</option>
                <option value="Q">Q</option>
                <option value="H">H</option>
              </select>

              <ChevronDownIcon className="absolute top-[50%] right-4 translate-y-[-50%] w-4 h-4" />
            </div>
          </FormItem>
        </div>
      </div>
    </div>
  )
}
