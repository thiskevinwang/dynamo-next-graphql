import { FC, useEffect, createContext, MutableRefObject } from "react"
import { useRouter } from "next/router"

interface LayoutContextShape {
  mainRef?:
    | MutableRefObject<HTMLElement | null>
    | ((instance: HTMLElement | null) => void)
    | null
}

export const LayoutContext = createContext<LayoutContextShape>({
  mainRef: undefined,
})

interface Props {
  mainRef?: any
}

/**
 * @todo refactor
 * This helps scroll a message-list to the bottom
 */
export const LayoutContextProvider: FC<Props> = ({ children, mainRef }) => {
  const router = useRouter()
  const main = mainRef?.current

  // scroll to bottom on route change
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (main) {
        main.scrollTo(0, main.scrollHeight)
      }
    }
    router.events.on("routeChangeComplete", handleRouteChangeComplete)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [main])

  // scroll to bottom on mount
  useEffect(() => {
    if (main) {
      main.scrollTo(0, main.scrollHeight)
    }
  }, [main?.scrollHeight])

  return (
    <LayoutContext.Provider value={{ mainRef: mainRef }}>
      {children}
    </LayoutContext.Provider>
  )
}
