import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { useState } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileJoinBar } from './components/layout/MobileJoinBar'
import type { ClassType } from './data/classes'
import { initialScheduleFilters } from './data/schedule'
import { Classes } from './sections/Classes'
import { Contact } from './sections/Contact'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { Pricing } from './sections/Pricing'
import { Schedule } from './sections/Schedule'
import { Signup } from './sections/Signup'
import { Testimonials } from './sections/Testimonials'
import { Trainers } from './sections/Trainers'

export default function App() {
  // Shared so "See times" on a class card can pre-filter the schedule.
  const [scheduleFilters, setScheduleFilters] = useState(initialScheduleFilters)

  const showTimesFor = (type: ClassType) => {
    setScheduleFilters({ day: 'All', type })
    document.getElementById('schedule')?.scrollIntoView()
  }

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a
          href="#main"
          className="sr-only z-60 rounded-btn bg-accent px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <Testimonials />
          <Classes onSeeTimes={showTimesFor} />
          <Schedule filters={scheduleFilters} onFiltersChange={setScheduleFilters} />
          <Pricing />
          <Trainers />
          <Gallery />
          <Signup />
          <Contact />
        </main>
        <Footer />
        <MobileJoinBar />
      </LazyMotion>
    </MotionConfig>
  )
}
