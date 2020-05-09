import { FC } from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import styled, { BaseProps } from "styled-components"

type LinkLiProps = {
  isActive?: boolean
}

const ActiveLi = styled.li<LinkLiProps>`
  color: ${(p: BaseProps & LinkLiProps) =>
    p.isActive ? p.theme.textSecondaryActiveSelected : p.theme.textSecondary};
  background: ${(p: BaseProps & LinkLiProps) =>
    p.isActive ? p.theme.backgroundSidebarActive : p.theme.backgroundSidebar};
  :hover {
    background: ${(p: BaseProps & LinkLiProps) =>
      p.isActive
        ? p.theme.backgroundSidebarActive
        : p.theme.backgroundSidebarHover};
  }
`

export const LinkActive: FC<LinkProps> = ({ children, href, as, ...props }) => {
  const router = useRouter()
  const path = router.asPath

  // `passHref` passes the same value as `as`
  const isActive = path === (as ?? href)

  return (
    <Link href={href} as={as} {...props}>
      <ActiveLi isActive={isActive}>{children}</ActiveLi>
    </Link>
  )
}
