import { useMemo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const stats = useMemo(
    () => [
      { label: "Usuarios", value: 9, icon: "👤", trend: "+2.4%" },
      { label: "Items", value: 5, icon: "📦", trend: "+1.1%" },
      { label: "Clientes", value: 3, icon: "👥", trend: "+0.8%" },
    ],
    []
  );

  return (
    <div style={styles.app}>
      {/* NAVBAR */}
      <header style={styles.nav}>
        <div style={styles.brand}>
          <span style={styles.brandDot} />
          Full Stack ERP System
        </div>

        <div style={styles.statusPill}>
          <span style={styles.statusDot} />
          API Online
        </div>
      </header>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>
            Sistema Empresarial de Nueva Generación
          </h1>

          <p style={styles.subtitle}>
            Backend Node.js + Express + MySQL + Docker + Frontend React (Vite)
          </p>

          <div style={styles.badges}>
            <span style={styles.badge}>⚡ High Performance</span>
            <span style={styles.badge}>🔐 Secure JWT Auth</span>
            <span style={styles.badge}>📊 Scalable Architecture</span>
          </div>
        </div>

        <div style={styles.heroImageWrapper}>
          <img src={heroImg} style={styles.heroImg} />
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsGrid}>
        {stats.map((s, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardTop}>
              <span style={styles.cardIcon}>{s.icon}</span>
              <span style={styles.trend}>{s.trend}</span>
            </div>

            <div style={styles.value}>{s.value}</div>
            <div style={styles.label}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ARCHITECTURE */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Arquitectura del Sistema</h2>

        <div style={styles.grid2}>
          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>Backend</h3>
            <ul style={styles.list}>
              <li>Node.js + Express (REST API)</li>
              <li>JWT Authentication</li>
              <li>MySQL (Cloud / Railway)</li>
              <li>Dockerized Deployment</li>
            </ul>
          </div>

          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>Frontend</h3>

            <div style={styles.logoRow}>
              <img src={reactLogo} style={styles.logo} />
              <img src={viteLogo} style={styles.logo} />
            </div>

            <ul style={styles.list}>
              <li>React + Vite (SPA)</li>
              <li>Responsive UI System</li>
              <li>API Ready Architecture</li>
              <li>Component-based Design</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Próximas Funcionalidades</h2>

        <div style={styles.featuresGrid}>
          {[
            "Login con JWT + Refresh Tokens",
            "Dashboard Admin en tiempo real",
            "CRUD completo desde UI",
            "Sistema de roles (Admin / User)",
            "Bloqueo de usuarios dinámico",
            "Reportes y métricas avanzadas",
          ].map((f, i) => (
            <div key={i} style={styles.featureCard}>
              {f}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div>🚀 SENATI • Full Stack ERP System</div>
        <div style={{ opacity: 0.6, marginTop: 6 }}>
          Designed for scalable enterprise applications
        </div>
      </footer>
    </div>
  );
}

/* =======================
   DESIGN SYSTEM
======================= */

const styles = {
  app: {
    background: "radial-gradient(circle at top, #0b1220, #070a12)",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, Arial",
    padding: "24px",
  },

  /* NAV */
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "rgba(17, 24, 39, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "14px",
    marginBottom: "30px",
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },

  brandDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 10px #22c55e",
  },

  statusPill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#22c55e",
    background: "rgba(34,197,94,0.1)",
    padding: "6px 12px",
    borderRadius: "999px",
  },

  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
  },

  /* HERO */
  hero: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "30px",
    alignItems: "center",
    marginBottom: "40px",
  },

  heroContent: {},

  title: {
    fontSize: "42px",
    lineHeight: "1.1",
    marginBottom: "12px",
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: "16px",
    marginBottom: "20px",
  },

  badges: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  badge: {
    fontSize: "12px",
    padding: "6px 10px",
    background: "rgba(59,130,246,0.12)",
    border: "1px solid rgba(59,130,246,0.25)",
    borderRadius: "999px",
  },

  heroImageWrapper: {
    display: "flex",
    justifyContent: "center",
  },

  heroImg: {
    width: "220px",
    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))",
  },

  /* STATS */
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "40px",
  },

  card: {
    background: "rgba(17,24,39,0.7)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "18px",
    backdropFilter: "blur(10px)",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },

  cardIcon: {
    fontSize: "18px",
  },

  trend: {
    fontSize: "12px",
    color: "#22c55e",
  },

  value: {
    fontSize: "28px",
    fontWeight: "700",
  },

  label: {
    color: "#9ca3af",
    fontSize: "13px",
  },

  /* SECTIONS */
  section: {
    marginBottom: "50px",
  },

  sectionTitle: {
    fontSize: "22px",
    marginBottom: "16px",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
  },

  panel: {
    background: "rgba(17,24,39,0.7)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "18px",
  },

  panelTitle: {
    marginBottom: "10px",
  },

  list: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    fontSize: "14px",
  },

  logoRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },

  logo: {
    width: "34px",
  },

  /* FEATURES */
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "12px",
  },

  featureCard: {
    background: "rgba(59,130,246,0.08)",
    border: "1px solid rgba(59,130,246,0.15)",
    padding: "14px",
    borderRadius: "12px",
    fontSize: "14px",
  },

  /* FOOTER */
  footer: {
    textAlign: "center",
    marginTop: "60px",
    padding: "20px",
    color: "#6b7280",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
};

export default App;