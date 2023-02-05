import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className="styles signed in status">
        <p
          // className={`nojs-show ${
          //   !session && loading ? styles.loading : styles.loaded
          // }`}
        >
          {!session && (
            <>
              <span className="{styles.notSignedInText}">
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className="{styles.buttonPrimary}"
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className="{styles.avatar}"
                />
              )}
              <span className="{styles.signedInText}">
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className="{styles.button}"
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className="{styles.navItems}">
          <li className="{styles.navItem}">
            <Link href="/">Home</Link>
          </li>
          <li className="styles.navItem}">
            <Link href="/client">Client</Link>
          </li>
          <li className="styles.navItem}">
            <Link href="/server">Server</Link>
          </li>
          <li className="styles.navItem}">
            <Link href="/protected">Protected</Link>
          </li>
          <li className="styles.navItem}">
            <Link href="/api-example">API</Link>
          </li>
          <li className="styles.navItem}">
            <Link href="/admin">Admin</Link>
          </li>
          <li className="styles.navItem}">
            <Link href="/me">Me</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

