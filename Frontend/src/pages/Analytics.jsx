import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import BodyModel from '../components/BodyModel'
import './Analytics.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const strengthData = {
  labels: months,
  datasets: [
    {
      label: 'Squat (kg)',
      data: [140, 145, 150, 155, 162, 170],
      borderColor: '#8ff5ff',
      backgroundColor: 'rgba(143, 245, 255, 0.08)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#8ff5ff',
      pointBorderColor: '#0e0e0f',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
    {
      label: 'Bench (kg)',
      data: [100, 105, 108, 112, 118, 125],
      borderColor: '#2efd7c',
      backgroundColor: 'rgba(46, 253, 124, 0.05)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#2efd7c',
      pointBorderColor: '#0e0e0f',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
    {
      label: 'Deadlift (kg)',
      data: [180, 185, 190, 198, 205, 220],
      borderColor: '#ff7162',
      backgroundColor: 'rgba(255, 113, 98, 0.05)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#ff7162',
      pointBorderColor: '#0e0e0f',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
    },
  ],
}

const strengthOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        color: '#adaaab',
        font: { family: 'Inter', size: 11, weight: '600' },
        boxWidth: 12,
        boxHeight: 3,
        usePointStyle: false,
        padding: 20,
      },
    },
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
      grid: { color: 'rgba(72, 72, 73, 0.08)' },
      ticks: { color: '#767576', font: { family: 'Inter', size: 11 } },
      border: { display: false },
    },
    y: {
      grid: { color: 'rgba(72, 72, 73, 0.08)' },
      ticks: {
        color: '#767576',
        font: { family: 'Inter', size: 11 },
        callback: (v) => `${v}kg`,
      },
      border: { display: false },
    },
  },
  interaction: { intersect: false, mode: 'index' },
}

const volumeBalance = [
  { group: 'Chest', pct: 85, color: 'var(--color-primary)' },
  { group: 'Back', pct: 72, color: 'var(--color-secondary)' },
  { group: 'Shoulders', pct: 92, color: 'var(--color-tertiary)' },
  { group: 'Arms', pct: 68, color: 'var(--color-primary-dim)' },
  { group: 'Legs', pct: 55, color: 'var(--color-secondary-dim)' },
  { group: 'Core', pct: 40, color: 'var(--color-on-surface-variant)' },
]

export default function Analytics() {
  return (
    <div className="app-layout" id="analytics-page">
      <Sidebar />
      <main className="main-content">
        <div className="page-header animate-fade-in">
          <div>
            <h1 className="page-title" style={{ fontSize: 'var(--font-headline-lg)' }}>Biometric Analytics</h1>
            <p className="page-subtitle">6-month performance trajectory and body composition insights.</p>
          </div>
        </div>

        {/* Strength Progress */}
        <div className="analytics-chart-card glass-card animate-fade-in-up delay-1" id="strength-progress">
          <div className="chart-header">
            <h3>Strength Progress</h3>
            <span className="label-sm">6-Month 1RM Estimated Trajectory</span>
          </div>
          <div className="line-chart-wrap">
            <Line data={strengthData} options={strengthOptions} />
          </div>
        </div>

        {/* Heatmap comparison */}
        <div className="heatmap-compare animate-fade-in-up delay-2" id="volumetric-heatmap">
          <h3>Volumetric Heatmap</h3>
          <div className="heatmap-compare-grid">
            <div className="heatmap-compare-item glass-card">
              <span className="label">Baseline — Jan 01</span>
              <BodyModel
                height="320px"
                muscleHighlights={{
                  chest: 'recovery',
                  core: 'recovery',
                  quads: 'recovery',
                }}
              />
            </div>
            <div className="heatmap-compare-item glass-card">
              <span className="label">Current — Jun 15</span>
              <BodyModel
                height="320px"
                muscleHighlights={{
                  chest: 'active',
                  shoulders: 'overstrain',
                  core: 'active',
                  quads: 'active',
                  biceps: 'active',
                }}
              />
            </div>
          </div>
        </div>

        {/* Volume Balance */}
        <div className="volume-section animate-fade-in-up delay-3" id="volume-balance">
          <div className="volume-card glass-card">
            <h3>Volume Balance</h3>
            <p className="volume-subtitle">Balance score: <span style={{ color: 'var(--color-secondary)' }}>Optimal</span> for Push-Dominant split.</p>
            <div className="volume-bars">
              {volumeBalance.map(v => (
                <div className="volume-bar-item" key={v.group}>
                  <div className="volume-bar-label">
                    <span>{v.group}</span>
                    <span className="volume-bar-pct">{v.pct}%</span>
                  </div>
                  <div className="volume-bar-track">
                    <div
                      className="volume-bar-fill"
                      style={{ width: `${v.pct}%`, background: v.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="insights-col">
            {/* Overtrained */}
            <div className="analytics-insight glass-card insight-warn" id="overtrained-insight">
              <div className="insight-header">
                <span className="material-icons-outlined" style={{ color: 'var(--color-tertiary)' }}>warning</span>
                <h4>Overtrained Group</h4>
              </div>
              <p>Anterior Deltoids showing high fatigue markers. Suggest <strong>48h isolation rest</strong>.</p>
            </div>

            {/* Undertrained */}
            <div className="analytics-insight glass-card insight-info" id="undertrained-insight">
              <div className="insight-header">
                <span className="material-icons-outlined" style={{ color: 'var(--color-primary)' }}>info</span>
                <h4>Undertrained Group</h4>
              </div>
              <p>Posterior Chain volume is <strong>15% below target</strong>. Increase rowing intensity.</p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  )
}
