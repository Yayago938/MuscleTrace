import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import './Community.css'

const rankings = [
  { rank: 1, name: 'Marcus Thorne', title: 'Elite Pro', volume: '142,500 kg', avatar: 'MT', change: '+3.2%' },
  { rank: 2, name: 'Sarah Jenkins', title: 'Volume Hunter', volume: '128,920 kg', avatar: 'SJ', change: '+1.8%' },
  { rank: 3, name: 'Alex Rivera', title: 'Rising Star', volume: '98,400 kg', avatar: 'AR', isYou: true, change: '+5.1%' },
  { rank: 4, name: 'Elena Kostic', title: 'Precision Athlete', volume: '82,150 kg', avatar: 'EK', change: '-0.3%' },
]

const activityFeed = [
  {
    user: 'Marcus Thorne',
    avatar: 'MT',
    action: 'hit a new PR!',
    time: '2 Hours Ago',
    detail: { type: 'pr', lift: 'Deadlift', value: '220.5 KG' },
  },
  {
    user: 'Sarah Jenkins',
    avatar: 'SJ',
    action: 'completed volume session.',
    time: '5 Hours Ago',
    detail: {
      type: 'text',
      content: 'Crushed the morning leg session. 12 sets of squats finally feeling consistent. Let\'s go! 🚀',
    },
  },
]

const achievements = [
  { title: 'Consistency King', desc: 'Logged 5 days this week', icon: 'military_tech', color: 'secondary', earned: true },
  { title: '30 Day Streak', desc: 'Locked & Loaded', icon: 'whatshot', color: 'tertiary', earned: false },
  { title: 'Volume Master', desc: 'Reach 500k kg this month', icon: 'emoji_events', color: 'primary', earned: false },
]

const partners = [
  { name: 'Jamie_Liftz', status: 'online' },
  { name: 'PowerPhil', status: 'offline' },
]

export default function Community() {
  return (
    <div className="app-layout" id="community-page">
      <Sidebar />
      <main className="main-content">
        <div className="page-header animate-fade-in">
          <div>
            <h1 className="page-title" style={{ fontSize: 'var(--font-headline-lg)' }}>Leaderboard.</h1>
          </div>
          <div className="streak-badge glass-card">
            <span className="label-sm">Your Streak</span>
            <span className="stat-value-secondary" style={{ fontSize: '1.75rem' }}>14</span>
            <span className="label-sm">DAYS</span>
          </div>
        </div>

        <div className="community-grid">
          {/* Left column */}
          <div className="community-left">
            {/* Rankings */}
            <div className="rankings-card glass-card animate-fade-in-up delay-1" id="global-rankings">
              <div className="rankings-header">
                <span className="material-icons-outlined" style={{ color: 'var(--color-primary)' }}>trophy</span>
                <h3>Global Rankings</h3>
              </div>
              <div className="rankings-list">
                {rankings.map(r => (
                  <div className={`rank-row ${r.isYou ? 'rank-row--you' : ''}`} key={r.rank} id={`rank-${r.rank}`}>
                    <span className="rank-num">#{r.rank}</span>
                    <div className="rank-avatar">{r.avatar}</div>
                    <div className="rank-info">
                      <span className="rank-name">
                        {r.name}
                        {r.isYou && <span className="badge badge-primary" style={{ marginLeft: 8 }}>You</span>}
                      </span>
                      <span className="rank-title">{r.title}</span>
                    </div>
                    <div className="rank-volume">
                      <span className="rank-vol-value">{r.volume}</span>
                      <span className={`rank-change ${r.change.startsWith('+') ? 'rank-change--up' : 'rank-change--down'}`}>
                        <span className="material-icons-outlined" style={{ fontSize: 14 }}>
                          {r.change.startsWith('+') ? 'arrow_upward' : 'arrow_downward'}
                        </span>
                        {r.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="feed-card glass-card animate-fade-in-up delay-2" id="activity-feed">
              <div className="feed-header">
                <span className="material-icons-outlined" style={{ color: 'var(--color-primary)' }}>rss_feed</span>
                <h3>Activity Feed</h3>
              </div>
              <div className="feed-list">
                {activityFeed.map((item, i) => (
                  <div className="feed-item" key={i}>
                    <div className="feed-avatar">{item.avatar}</div>
                    <div className="feed-content">
                      <div className="feed-action">
                        <strong>{item.user}</strong> {item.action}
                      </div>
                      <span className="feed-time">{item.time}</span>
                      {item.detail.type === 'pr' && (
                        <div className="feed-pr glass-card" style={{ padding: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                          <span className="label-sm">{item.detail.lift}</span>
                          <span className="stat-value-primary" style={{ fontSize: '1.25rem' }}>{item.detail.value}</span>
                        </div>
                      )}
                      {item.detail.type === 'text' && (
                        <p className="feed-text">{item.detail.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="community-right">
            {/* Achievements */}
            <div className="achievements-card glass-card animate-fade-in-up delay-3" id="achievements">
              <div className="achievements-header">
                <span className="material-icons-outlined" style={{ color: 'var(--color-primary)' }}>military_tech</span>
                <h3>Achievements</h3>
              </div>
              <div className="achievements-list">
                {achievements.map(a => (
                  <div className={`achievement-item ${a.earned ? 'achievement--earned' : 'achievement--locked'}`} key={a.title}>
                    <div className={`achievement-icon badge-${a.color}`}>
                      <span className="material-icons-outlined">{a.icon}</span>
                    </div>
                    <div className="achievement-info">
                      <span className="achievement-name">{a.title}</span>
                      <span className="achievement-desc">{a.desc}</span>
                    </div>
                    {!a.earned && (
                      <span className="material-icons-outlined" style={{ color: 'var(--color-outline)', fontSize: 18 }}>lock</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Index */}
            <div className="pi-card glass-card animate-fade-in-up delay-4" id="performance-index">
              <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-4)' }}>Your Performance Index</h3>
              <div className="pi-value-wrap">
                <span className="pi-value">84.2</span>
                <span className="pi-label">PI</span>
              </div>
              <span className="pi-rank">Global Top 12%</span>
              <div className="pi-change">
                <span className="material-icons-outlined" style={{ fontSize: 16, color: 'var(--color-secondary)' }}>arrow_upward</span>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 700 }}>2.4%</span>
                <span className="label-sm">vs last week</span>
              </div>
            </div>

            {/* Training Partners */}
            <div className="partners-card glass-card animate-fade-in-up delay-5" id="training-partners">
              <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)' }}>Training Partners</h3>
              <div className="partners-list">
                {partners.map(p => (
                  <div className="partner-item" key={p.name}>
                    <div className="partner-avatar">{p.name[0]}</div>
                    <span className="partner-name">{p.name}</span>
                    <span className={`partner-status partner-status--${p.status}`}></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
