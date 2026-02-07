import { useLocation, Link } from 'react-router-dom'

interface HeaderProps {
  textColor?: string
  links: Array<string>
  children: React.ReactNode
}

//this is template for authheader and guestheader

export default function Header({
  textColor = 'black',
  links,
  children
}: HeaderProps) {
  const location = useLocation()

  const isActiveLink = (link: string) => {
    return location.pathname === `/${link}`
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <span>to do</span>
            </Link>
          </li>
          <li>
            {links.map((link, i) => (
              <Link
                className=''
                to={`/${link}`}
                key={i}
              >
                {link}
              </Link>
            ))}
          </li>
          <li>{children}</li>
        </ul>
      </nav>
    </header>
  )
}
