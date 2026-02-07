import GuestHeader from '../../components/Header/GuestHeader'
import Hero from '../../components/sections/Home/Hero'
import { JoinSection } from '../../components/sections/Home/join/JoinSection'
import { GrowthSection } from '../../components/sections/Home/growth/GrowthSection'
import { MoneySection } from '../../components/sections/Home/money/MoneySection'
import { Reveal } from '../../components/Reveal'

export const WelcomePage = () => {
  return (
    <div className="bg">
      <div className="container">
        <GuestHeader />
        <Reveal>
          <Hero />
        </Reveal>
        <JoinSection />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5rem'
          }}
        >
          <Reveal>
            <GrowthSection />
          </Reveal>
          <Reveal>
            <MoneySection />
          </Reveal>
        </div>
      </div>
    </div>
  )
}
