import Components from '..'

export const ErrorCorrection = () => {
  return (
    <>
      <Components.h3>纠错算法</Components.h3>
      <Components.p>
        纠错码的存在使得二维码在实际应用中更加可靠。二维码的纠错码是通过 Reed-Solomon
        算法生成的，它们可以在二维码部分损坏或被遮挡时，仍然能够恢复出原始数据。
      </Components.p>
      <Components.p>
        二维码的纠错能力分为四个等级：L、M、Q 和
        H，分别对应不同的纠错能力。等级越高，二维码能够容忍的损坏程度越大，但同时也会占用更多的空间来存储冗余信息。
      </Components.p>
      <Components.ul>
        <Components.li>
          <Components.p>低级别（L）：可恢复高达 7% 的数据。</Components.p>
        </Components.li>

        <Components.li>
          <Components.p>中级别（M）：可恢复高达 15% 的数据。</Components.p>
        </Components.li>

        <Components.li>
          <Components.p>四分之一级别（Q）：可恢复高达 25% 的数据。</Components.p>
        </Components.li>

        <Components.li>
          <Components.p>高级别（H）：可恢复高达 30% 的数据。</Components.p>
        </Components.li>
      </Components.ul>
      <Components.p>
        <Components.strong>Reed-Solomon算法</Components.strong>
      </Components.p>
      <Components.p>
        可以参考：
        <a href="https://www.nayuki.io/page/reed-solomon-error-correcting-code-decoder">
          https://www.nayuki.io/page/reed-solomon-error-correcting-code-decoder
        </a>
      </Components.p>
    </>
  )
}
