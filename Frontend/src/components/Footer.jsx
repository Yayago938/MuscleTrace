import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-content">
        <span className="footer-copy">© 2024 MuscleTrace. Kinetic Precision.</span>
        <div className="footer-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/support">Support</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
