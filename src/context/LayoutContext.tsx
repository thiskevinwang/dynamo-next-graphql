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
 * only for "/channels/[channelName]"
 */
export const LayoutContextProvider: FC<Props> = ({ children, mainRef }) => {
  const router = useRouter()
  const isChannelsRoute = router.route === "/channels/[channelName]"
  const main = mainRef?.current

  // scroll to bottom on route change
  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (main && isChannelsRoute) {
        main.scrollTo(0, main.scrollHeight)
      }
    }

    router.events.on("routeChangeComplete", handleRouteChangeComplete)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete)
    }
  }, [main, isChannelsRoute])

  // scroll to bottom on mount
  useEffect(() => {
    if (main && isChannelsRoute) {
      main.scrollTo(0, main.scrollHeight)
    }
  }, [main?.scrollHeight, isChannelsRoute])

  return (
    <LayoutContext.Provider value={{ mainRef: mainRef }}>
      {children}
    </LayoutContext.Provider>
  )
}
