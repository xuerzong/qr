import { useEffect, useState } from 'react'

interface ClientOnlyProps {
  fallback?: React.ReactNode
}

export const ClientOnly: React.FC<React.PropsWithChildren<ClientOnlyProps>> = ({
  children,
  fallback = null,
}) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return fallback
  }

  return <>{children}</> // 在客户端渲染时返回子组件
}
