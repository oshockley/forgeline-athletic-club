import { CalendarX2, Clock, User } from 'lucide-react'
import { useId, useMemo } from 'react'
import { Card } from '../components/ui/Card'
import { Container } from '../components/ui/Container'
import { FilterChip } from '../components/ui/FilterChip'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { classTypes } from '../data/classes'
import { dayNames, days, schedule, type Day, type ScheduleEntry, type ScheduleFilters } from '../data/schedule'
import { cn } from '../lib/cn'
import { formatTime } from '../lib/format'

const dayOrder = Object.fromEntries(days.map((d, i) => [d, i])) as Record<Day, number>

const sortedSchedule = [...schedule].sort(
  (a, b) => dayOrder[a.day] - dayOrder[b.day] || a.time.localeCompare(b.time),
)

function Availability({ spots }: { spots: number }) {
  if (spots === 0) {
    return (
      <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted">
        Full · Waitlist
      </span>
    )
  }
  const low = spots <= 3
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        low ? 'bg-accent/15 text-accent' : 'bg-success/10 text-success',
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', low ? 'bg-accent' : 'bg-success')} />
      {spots} {spots === 1 ? 'spot' : 'spots'} left
    </span>
  )
}

function ScheduleCard({ entry }: { entry: ScheduleEntry }) {
  return (
    <Card as="li" className="flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-wider text-muted">{dayNames[entry.day]}</p>
          <p className="font-display text-2xl font-semibold">{formatTime(entry.time)}</p>
        </div>
        <Availability spots={entry.spotsLeft} />
      </div>
      <h3 className="mt-3 text-lg font-semibold">{entry.classType}</h3>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-1.5">
          <User aria-hidden="true" className="size-4" /> {entry.trainer}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock aria-hidden="true" className="size-4" /> {entry.durationMin} min
        </span>
      </p>
    </Card>
  )
}

interface ScheduleProps {
  filters: ScheduleFilters
  onFiltersChange: (filters: ScheduleFilters) => void
}

export function Schedule({ filters, onFiltersChange }: ScheduleProps) {
  const { day: dayFilter, type: typeFilter } = filters
  const setDayFilter = (day: ScheduleFilters['day']) => onFiltersChange({ ...filters, day })
  const onTypeFilterChange = (type: ScheduleFilters['type']) => onFiltersChange({ ...filters, type })
  const dayGroupId = useId()
  const typeGroupId = useId()

  const results = useMemo(
    () =>
      sortedSchedule.filter(
        (e) => (dayFilter === 'All' || e.day === dayFilter) && (typeFilter === 'All' || e.classType === typeFilter),
      ),
    [dayFilter, typeFilter],
  )

  const filtered = dayFilter !== 'All' || typeFilter !== 'All'
  const resetFilters = () => onFiltersChange({ day: 'All', type: 'All' })

  return (
    <section id="schedule" aria-labelledby="schedule-title" className="relative py-section lg:py-section-lg">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 mask-b-from-60% mask-t-from-80%" />
      <Container>
        <SectionHeading
          id="schedule-title"
          eyebrow="Weekly schedule"
          title="Find your next class"
          description="Book through the Forgeline app up to 7 days ahead. Spots open at 6 AM and the popular ones go fast."
        />

        <Reveal className="mt-10 space-y-5 lg:mt-14">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <p id={dayGroupId} className="w-16 shrink-0 font-display text-sm uppercase tracking-eyebrow text-muted">
              Day
            </p>
            <div role="group" aria-labelledby={dayGroupId} className="flex flex-wrap gap-2">
              <FilterChip pressed={dayFilter === 'All'} onClick={() => setDayFilter('All')}>
                All days
              </FilterChip>
              {days.map((day) => (
                <FilterChip
                  key={day}
                  pressed={dayFilter === day}
                  onClick={() => setDayFilter(day)}
                  aria-label={dayNames[day]}
                >
                  {day}
                </FilterChip>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <p id={typeGroupId} className="w-16 shrink-0 font-display text-sm uppercase tracking-eyebrow text-muted">
              Class
            </p>
            <div role="group" aria-labelledby={typeGroupId} className="flex flex-wrap gap-2">
              <FilterChip pressed={typeFilter === 'All'} onClick={() => onTypeFilterChange('All')}>
                All classes
              </FilterChip>
              {classTypes.map((type) => (
                <FilterChip key={type} pressed={typeFilter === type} onClick={() => onTypeFilterChange(type)}>
                  {type}
                </FilterChip>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex min-h-10 items-center justify-between gap-4 border-b border-line pb-4">
          <p aria-live="polite" className="text-sm text-muted">
            Showing <span className="font-semibold text-fg">{results.length}</span> of {schedule.length} classes
          </p>
          {filtered && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-btn text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {results.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-card border border-dashed border-line-strong px-6 py-14 text-center">
            <CalendarX2 aria-hidden="true" className="size-10 text-muted" />
            <p className="mt-4 text-lg font-semibold">No classes match those filters</p>
            <p className="mt-1 text-muted">Try another day, or reset to see the full week.</p>
          </div>
        ) : (
          <>
            {/* Desktop: table */}
            <div className="mt-6 hidden overflow-hidden rounded-card border border-line bg-surface lg:block">
              <table className="w-full text-left">
                <caption className="sr-only">Forgeline Athletic Club weekly class schedule</caption>
                <thead className="border-b border-line bg-surface-2 font-display text-sm uppercase tracking-wider text-muted">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-medium">Day</th>
                    <th scope="col" className="px-6 py-4 font-medium">Time</th>
                    <th scope="col" className="px-6 py-4 font-medium">Class</th>
                    <th scope="col" className="px-6 py-4 font-medium">Coach</th>
                    <th scope="col" className="px-6 py-4 font-medium">Duration</th>
                    <th scope="col" className="px-6 py-4 font-medium">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {results.map((entry) => (
                    <tr key={entry.id} className="transition-colors hover:bg-surface-2">
                      <td className="px-6 py-4 text-muted">{dayNames[entry.day]}</td>
                      <td className="px-6 py-4 font-display text-lg font-medium tabular-nums">
                        {formatTime(entry.time)}
                      </td>
                      <th scope="row" className="px-6 py-4 font-semibold">
                        {entry.classType}
                      </th>
                      <td className="px-6 py-4 text-muted">{entry.trainer}</td>
                      <td className="px-6 py-4 text-muted">{entry.durationMin} min</td>
                      <td className="px-6 py-4">
                        <Availability spots={entry.spotsLeft} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile & tablet: stacked cards */}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:hidden">
              {results.map((entry) => (
                <ScheduleCard key={entry.id} entry={entry} />
              ))}
            </ul>
          </>
        )}
      </Container>
    </section>
  )
}
