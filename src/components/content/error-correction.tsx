import Components from '..'

export const ErrorCorrection = () => {
  return (
    <>
      <Components.h3>纠错算法</Components.h3>
      <Components.p>
        二维码的纠错码是通过 Reed-Solomon
        算法生成的，它们可以在二维码部分损坏或被遮挡时，仍然能够恢复出原始数据。二维码的纠错能力分为四个等级：L、M、Q
        和 H，分别对应不同的纠错能力。
      </Components.p>
      <Components.p>
        纠错码的存在使得二维码在实际应用中更加可靠，即使在打印质量不佳或环境恶劣的情况下，二维码仍然能够被正确识别和解码。
      </Components.p>

      <Components.p>
        <Components.strong>Reed-Solomon算法</Components.strong>
      </Components.p>

      <Components.p>
        Reed-Solomon
        算法是一种基于有限域的纠错编码技术，广泛应用于二维码等数据传输和存储领域。它通过将数据分成多个块，并在每个块中添加冗余信息，使得即使部分数据损坏，也能通过剩余的数据恢复原始信息。
      </Components.p>
    </>
  )
}
