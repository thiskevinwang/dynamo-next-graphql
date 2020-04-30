import * as React from "react"
import Link from "next/link"

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <header>
        <nav>
          <Link href={"/"}>
            <a>Home</a>
          </Link>
        </nav>
      </header>
      {children}
    </>
  )
}
