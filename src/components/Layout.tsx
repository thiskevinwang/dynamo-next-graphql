import * as React from "react"
import Link from "next/link"
import styled from "styled-components"

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <header>
        <Nav>
          <ul>
            <li>
              <Link href={"/"}>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href={"/create"}>
                <a>Create</a>
              </Link>
            </li>
          </ul>
        </Nav>
      </header>
      {children}
    </>
  )
}

const Nav = styled.nav`
  display: flex;
  ul {
    list-style: none;
    li {
      padding-left: 1rem;
      padding-right: 1rem;
      float: left;
    }
  }
`
