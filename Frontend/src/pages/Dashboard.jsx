import Header from '../components/dashboard/Header'
import TodaySessionCard from '../components/dashboard/TodaySessionCard'
import StreakCard from '../components/dashboard/StreakCard'
import ExercisesViewedCard from '../components/dashboard/ExercisesViewedCard'
import SavedLibraryCard from '../components/dashboard/SavedLibraryCard'
import StudioPeersCard from '../components/dashboard/StudioPeersCard'

export function Dashboard() {
  return (
    <main className="flex-1 px-8 py-8 max-w-5xl relative">
        <div className="absolute inset-x-0 top-0 h-64 bg-haze pointer-events-none" />
        <div className="relative">
          <Header name="Yash" />
          <div className="flex flex-col sm:flex-row gap-5 mb-5">
            <TodaySessionCard />
            <StreakCard days={18} />
          </div>
          <div className="flex flex-col sm:flex-row gap-5">
            <ExercisesViewedCard />
            <SavedLibraryCard />
            <StudioPeersCard />
          </div>
        </div>
    </main>
  )
}

