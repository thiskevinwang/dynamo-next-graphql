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
  transition: background 100ms ease-in-out, color 100ms ease-in-out;

  :hover {
    background: ${(p: BaseProps & LinkLiProps) =>
      p.isActive
        ? p.theme.backgroundSidebarActive
        : p.theme.backgroundSidebarHover};
  }
`
const A = styled.a`
  text-decoration: none;
`

export const LinkActive: FC<LinkProps> = ({ children, href, as, ...props }) => {
  const router = useRouter()
  const path = router.asPath

  // `passHref` passes the same value as `as`
  const isActive = path === (as ?? href)

  return (
    <Link href={href} as={as} {...props}>
      <A>
        <ActiveLi isActive={isActive}>{children}</ActiveLi>
      </A>
    </Link>
  )
}
