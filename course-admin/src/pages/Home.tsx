import { Link } from "react-router-dom"
import { useAuth } from "../auth/useAuth"

const Home = () => {
  const { isAuthenticated, isTeacher, login } = useAuth()

  return (
    <section className="home-hero">
      <div className="hero-copy">
        <p className="eyebrow">Course Tracker · Entra ID demo</p>
        <h1>Rätt åtkomst<br />för rätt person.</h1>
        <p className="hero-description">
          En enkel kursportal som visar hur rollbaserad åtkomstkontroll fungerar i en modern webbapplikation.
        </p>
        {isAuthenticated ? (
          <Link className="primary-action" to="/courses">
            {isTeacher ? "Hantera kurser" : "Visa kurser"}
            <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <button className="primary-action" onClick={login}>
            Logga in med Entra ID <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      <aside className="role-preview" aria-label="Exempel på roller">
        <div className="preview-topline">
          <span className="live-dot" /> RBAC aktivt
        </div>
        <div className="role-card teacher-card">
          <div className="role-icon">T</div>
          <div>
            <strong>Teacher</strong>
            <p>Skapa, redigera och administrera kurser.</p>
          </div>
          <span className="permission">Full access</span>
        </div>
        <div className="role-card student-card">
          <div className="role-icon">S</div>
          <div>
            <strong>Student</strong>
            <p>Se kursöversikt och detaljer.</p>
          </div>
          <span className="permission">Read only</span>
        </div>
      </aside>
    </section>
  )
}

export default Home
