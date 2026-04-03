import { useState } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import BodyModel from '../components/BodyModel'
import './Dashboard.css'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const donutData = {
  labels: ['Push', 'Pull', 'Legs', 'Core'],
  datasets: [{
    data: [35, 28, 25, 12],
    backgroundColor: [
      'rgba(143, 245, 255, 0.8)',
      'rgba(46, 253, 124, 0.8)',
      'rgba(255, 113, 98, 0.8)',
      'rgba(173, 170, 171, 0.4)',
    ],
    borderWidth: 0,
    cutout: '72%',
  }],
}

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#201f21',
      borderColor: 'rgba(72, 72, 73, 0.15)',
      borderWidth: 1,
      titleFont: { family: 'Inter', weight: '600' },
      bodyFont: { family: 'Inter' },
      cornerRadius: 12,
      padding: 12,
    },
  },
}

const barData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Volume (lbs)',
    data: [12400, 0, 14200, 8800, 11600, 15800, 0],
    backgroundColor: (ctx) => {
      const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 200)
      gradient.addColorStop(0, 'rgba(143, 245, 255, 0.8)')
      gradient.addColorStop(1, 'rgba(143, 245, 255, 0.1)')
      return gradient
    },
    borderRadius: 8,
    borderSkipped: false,
  }],
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#201f21',
      borderColor: 'rgba(72, 72, 73, 0.15)',
      borderWidth: 1,
      titleFont: { family: 'Inter', weight: '600' },
      bodyFont: { family: 'Inter' },
      cornerRadius: 12,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#767576', font: { family: 'Inter', size: 11 } },
      border: { display: false },
    },
    y: {
      grid: { color: 'rgba(72, 72, 73, 0.1)' },
      ticks: { display: false },
      border: { display: false },
    },
  },
}

const stats = [
  { label: 'Workouts This Week', value: '4', icon: 'fitness_center', color: 'primary' },
  { label: 'Current Streak', value: '14', icon: 'local_fire_department', color: 'tertiary', unit: 'days' },
  { label: 'Total Volume', value: '62.8K', icon: 'monitoring', color: 'secondary', unit: 'lbs' },
]

const recentActivity = [
  {
    title: 'Hypertrophy Chest & Back',
    time: 'Yesterday',
    duration: '1h 12m',
    volume: '14,200 lbs',
    icon: 'fitness_center',
  },
  {
    title: 'Zone 2 Metabolic Conditioning',
    time: '2 days ago',
    duration: '45m',
    volume: '480 kcal',
    icon: 'directions_run',
  },
]

export default function Dashboard() {
  return (
    <div className="app-layout" id="dashboard-page">
      <Sidebar />
      <main className="main-content">
        {/* Header */}
        <div className="page-header animate-fade-in">
          <div>
            <h1 className="page-title" style={{ fontSize: 'var(--font-headline-lg)' }}>Dashboard</h1>
            <p className="page-subtitle">Your neurological recovery is at <span className="stat-value-secondary" style={{ fontSize: 'inherit', fontWeight: 700 }}>84%</span> today. Optimal for a heavy leg session.</p>
          </div>
          <div className="header-tabs">
            <button className="tab-btn tab-btn--active">Overview</button>
            <button className="tab-btn">Biomechanics</button>
            <button className="tab-btn">Nutrition</button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row animate-fade-in-up delay-1">
          {stats.map(s => (
            <div className="stat-card glass-card" key={s.label} id={`stat-${s.label.toLowerCase().replace(/\s/g, '-')}`}>
              <div className={`stat-icon badge-${s.color}`}>
                <span className="material-icons-outlined">{s.icon}</span>
              </div>
              <div className="stat-info">
                <span className="label-sm">{s.label}</span>
                <div className="stat-number">
                  <span className={`stat-value stat-value-${s.color}`} style={{ fontSize: '2rem' }}>{s.value}</span>
                  {s.unit && <span className="stat-unit">{s.unit}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="dash-grid">
          {/* Kinetic Heatmap */}
          <div className="heatmap-card glass-card animate-fade-in-up delay-2" id="kinetic-heatmap">
            <div className="heatmap-header">
              <h3>Kinetic Heatmap</h3>
              <div className="heatmap-meta">
                <span className="badge badge-primary">Active Fatigue Sensor v2.4</span>
                <span className="badge badge-secondary">
                  <span className="material-icons-outlined" style={{ fontSize: 12 }}>radar</span>
                  Scanning
                </span>
              </div>
            </div>
            <div className="heatmap-body">
              <BodyModel
                height="380px"
                muscleHighlights={{
                  chest: 'active',
                  shoulders: 'overstrain',
                  core: 'recovery',
                  quads: 'active',
                  calves: 'recovery',
                }}
              />
              <div className="heatmap-overlay-label heatmap-label-top">
                <span className="label-sm" style={{ color: 'var(--color-tertiary)' }}>LAT OVERSTRAIN: 94%</span>
              </div>
            </div>
            <p className="heatmap-sync label-sm">
              <span className="material-icons-outlined" style={{ fontSize: 14 }}>sync</span>
              Neural Load Syncing...
            </p>
          </div>

          {/* Right column */}
          <div className="dash-right">
            {/* Recent Activity */}
            <div className="activity-card glass-card animate-fade-in-up delay-3" id="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivity.map(a => (
                  <div className="activity-item" key={a.title}>
                    <div className="activity-icon">
                      <span className="material-icons-outlined">{a.icon}</span>
                    </div>
                    <div className="activity-info">
                      <span className="activity-title">{a.title}</span>
                      <span className="activity-meta">{a.time} • {a.duration} • {a.volume}</span>
                    </div>
                    <span className="material-icons-outlined activity-arrow">chevron_right</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Charts row */}
            <div className="charts-row">
              {/* Donut */}
              <div className="chart-card glass-card animate-fade-in-up delay-4" id="volume-distribution-chart">
                <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)' }}>Volume Split</h3>
                <div className="donut-wrap">
                  <Doughnut data={donutData} options={donutOptions} />
                </div>
                <div className="donut-legend">
                  {donutData.labels.map((l, i) => (
                    <div className="donut-legend-item" key={l}>
                      <span className="donut-dot" style={{ background: donutData.datasets[0].backgroundColor[i] }}></span>
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bar */}
              <div className="chart-card glass-card animate-fade-in-up delay-5" id="weekly-activity-chart">
                <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-3)' }}>Weekly Activity</h3>
                <div className="bar-wrap">
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight Banner */}
        <div className="insight-banner glass-card animate-fade-in-up delay-6" id="insight-banner">
          <span className="material-icons-outlined insight-icon" style={{ color: 'var(--color-secondary)' }}>trending_up</span>
          <div className="insight-text">
            <strong>Your Squat depth improved by 12% in your last session.</strong>
            <span>Biomechanical analysis shows increased hip mobility. Maintain current warm-up protocol for continued progress.</span>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
