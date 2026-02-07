import Header from './Header'
import { guestlinks } from '../../constants/links'

export default function GuestHeader() {
  return (
    <Header textColor={'white'} links={guestlinks}>
      <button>log in</button>
      <button>sign up</button>
    </Header>
  )
}
