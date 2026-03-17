import { useState } from "react";

const Logo = () => (
  <div style={styles.logoRow}>
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#2563EB"/>
      <path d="M8 10h10M8 16h16M8 22h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
    <span style={styles.logoName}>Agenda</span>
  </div>
);

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      step: "1 of 3",
      title: "Add and track assignments",
      desc: "Keep all your assignments organized at one glance",
    },
    {
      step: "2 of 3",
      title: "Monitor your deadlines",
      desc: "Get notified before due dates so you're never caught off guard",
    },
    {
      step: "3 of 3",
      title: "View your progress",
      desc: "See how much you've completed and what's still pending",
    },
  ];

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .nav-link:hover { color: #2563EB !important; }
        .social-icon:hover { color: #2563EB !important; }
        .footer-link:hover { color: #2563EB !important; }
      `}</style>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <Logo />
        <div style={styles.navLinks}>
          <a href="#" className="nav-link" style={styles.navLink}>Home</a>
          <a href="#about" className="nav-link" style={styles.navLink}>About</a>
          <a href="#contact" className="nav-link" style={styles.navLink}>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>
            Stay on top of your assignments — without stress.
          </h1>
          <p style={styles.heroSubtitle}>
            Track deadlines, monitor progress, and keep up with class updates in one simple place.
          </p>
          <a href="/signup" style={styles.ctaBtn}>Get Started</a>
          <p style={styles.heroNote}>No pressure. No clutter. Just clarity.</p>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.heroIllustration}>
            <div style={styles.illustrationCard}>
              <div style={styles.illustrationBar} />
              <div style={{...styles.illustrationBar, width: "70%", background: "#10b981"}} />
              <div style={{...styles.illustrationBar, width: "85%"}} />
              <div style={{...styles.illustrationBar, width: "50%", background: "#f59e0b"}} />
            </div>
            <div style={styles.illustrationBadge}>
              <span style={styles.badgeDot} />
              4 due soon
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Everything you need, in one place</h2>
        <p style={styles.sectionSubtitle}>Add assignments, follow deadlines, and keep track of what matters — without clutter</p>
        <div style={styles.featureCards}>
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#EFF6FF"/>
                  <path d="M8 10h10M8 16h16M8 22h6" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              ),
              label: "Add Assignments",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#EFF6FF"/>
                  <circle cx="16" cy="16" r="7" stroke="#2563EB" strokeWidth="2"/>
                  <path d="M16 12v4l2.5 2.5" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              label: "Track Deadlines",
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#EFF6FF"/>
                  <path d="M8 22l4-5 4 3 4-7 4 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              label: "View Progress",
            },
          ].map(({ icon, label }, i) => (
            <div key={i} style={styles.featureCard}>
              {i < 2 && <div style={styles.featureArrow}>→</div>}
              <div style={styles.featureIcon}>{icon}</div>
              <p style={styles.featureLabel}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How it works</h2>
        <p style={styles.sectionSubtitle}>3 simple steps on how to stay organized</p>
        <div style={styles.slideshowWrapper}>
          <div style={styles.slideLeft}>
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentSlide(i)}
                style={{
                  ...styles.slideDot,
                  background: i === currentSlide ? "#2563EB" : "#E5E7EB",
                  width: i === currentSlide ? "40px" : "12px",
                }}
              />
            ))}
          </div>
          <div style={styles.slideContent}>
            <p style={styles.slideStep}>Step {slides[currentSlide].step}</p>
            <h3 style={styles.slideTitle}>{slides[currentSlide].title}</h3>
            <p style={styles.slideDesc}>{slides[currentSlide].desc}</p>
            <div style={styles.slideNav}>
              <button
                style={styles.slideBtn}
                onClick={() => setCurrentSlide(v => Math.max(0, v - 1))}
                disabled={currentSlide === 0}
              >
                ← Previous
              </button>
              <button
                style={{...styles.slideBtn, ...styles.slideBtnPrimary}}
                onClick={() => setCurrentSlide(v => Math.min(slides.length - 1, v + 1))}
                disabled={currentSlide === slides.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={styles.ctaBanner}>
        <h2 style={styles.ctaBannerTitle}>Ready to get organized?</h2>
        <p style={styles.ctaBannerSubtitle}>Join students who are staying on top of their assignments</p>
        <a href="/signup" style={styles.ctaBannerBtn}>Make Your Account</a>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer} id="contact">
        <div style={styles.footerGrid}>
          {/* Brand */}
          <div>
            <Logo />
            <p style={styles.footerTagline}>Stay on top of your assignments without stress.</p>
          </div>

          {/* Quick Links */}
          <div>
            <p style={styles.footerHeading}>Quick Links</p>
            {["Home", "About", "Courses", "Dashboard"].map(l => (
              <a key={l} href="#" className="footer-link" style={styles.footerLink}>{l}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={styles.footerHeading}>Contact Us</p>
            <p style={styles.footerText}>📧webdev28@cs3.knust.edu.gh</p>
            <p style={styles.footerText}>📞 000 000 0000</p>
            <p style={styles.footerText}>📍 KNUST, Ghana</p>
          </div>

          {/* Follow + Newsletter */}
          <div>
            <p style={styles.footerHeading}>Follow Us</p>
            <div style={styles.socialIcons}>
              {["f", "t", "in", "yt"].map(s => (
                <span key={s} className="social-icon" style={styles.socialIcon}>{s}</span>
              ))}
            </div>
            <p style={{...styles.footerHeading, marginTop: "16px"}}>Newsletter</p>
            <div style={styles.newsletterRow}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={styles.newsletterInput}
              />
              <button style={styles.newsletterBtn}>Join</button>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.footerCopy}>© 2025 Agenda. All rights reserved.</p>
          <div style={styles.footerBottomLinks}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <a key={l} href="#" className="footer-link" style={styles.footerSmallLink}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#ffffff",
    color: "#111827",
  },

  // NAVBAR
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 64px",
    borderBottom: "1px solid #F3F4F6",
    background: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoName: {
    fontFamily: "'Fraunces', serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#2563EB",
    letterSpacing: "-0.3px",
  },
  navLinks: {
    display: "flex",
    gap: "32px",
  },
  navLink: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    textDecoration: "none",
    transition: "color 0.15s",
  },

  // HERO
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "80px 64px",
    gap: "40px",
    background: "#F8FAFF",
  },
  heroLeft: {
    flex: 1,
    maxWidth: "520px",
    animation: "fadeUp 0.5s ease both",
  },
  heroTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "42px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: "1.2",
    marginBottom: "16px",
    letterSpacing: "-1px",
  },
  heroSubtitle: {
    fontSize: "16px",
    color: "#6B7280",
    lineHeight: "1.6",
    marginBottom: "28px",
  },
  ctaBtn: {
    display: "inline-block",
    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 2px 12px rgba(37,99,235,0.30)",
    marginBottom: "16px",
  },
  heroNote: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginTop: "8px",
  },
  heroRight: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  heroIllustration: {
    position: "relative",
    animation: "float 3s ease-in-out infinite",
  },
  illustrationCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 8px 40px rgba(37,99,235,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "260px",
  },
  illustrationBar: {
    height: "12px",
    borderRadius: "6px",
    background: "#2563EB",
    width: "100%",
  },
  illustrationBadge: {
    position: "absolute",
    bottom: "-16px",
    right: "-16px",
    background: "#fff",
    borderRadius: "10px",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#f59e0b",
    display: "inline-block",
  },

  // FEATURES
  features: {
    padding: "80px 64px",
    textAlign: "center",
    background: "#fff",
  },
  sectionTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "30px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
    letterSpacing: "-0.5px",
  },
  sectionSubtitle: {
    fontSize: "15px",
    color: "#6B7280",
    marginBottom: "48px",
  },
  featureCards: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0px",
    flexWrap: "wrap",
  },
  featureCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    padding: "32px 24px",
    position: "relative",
  },
  featureArrow: {
    position: "absolute",
    right: "-16px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "20px",
    color: "#D1D5DB",
    zIndex: 1,
  },
  featureIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "#EFF6FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  featureLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },

  // HOW IT WORKS
  howItWorks: {
    padding: "80px 64px",
    background: "#F8FAFF",
    textAlign: "center",
  },
  slideshowWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "32px",
    marginTop: "40px",
    background: "#fff",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    margin: "40px auto 0",
    boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
  },
  slideLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
  },
  slideDot: {
    height: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  slideContent: {
    flex: 1,
    textAlign: "left",
  },
  slideStep: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#2563EB",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  slideTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "8px",
  },
  slideDesc: {
    fontSize: "14px",
    color: "#6B7280",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  slideNav: {
    display: "flex",
    gap: "10px",
  },
  slideBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1.5px solid #E5E7EB",
    background: "#fff",
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  slideBtnPrimary: {
    background: "#2563EB",
    color: "#fff",
    border: "none",
    boxShadow: "0 2px 8px rgba(37,99,235,0.25)",
  },

  // CTA BANNER
  ctaBanner: {
    background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
    padding: "80px 64px",
    textAlign: "center",
  },
  ctaBannerTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "32px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "8px",
  },
  ctaBannerSubtitle: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "28px",
  },
  ctaBannerBtn: {
    display: "inline-block",
    background: "#fff",
    color: "#2563EB",
    padding: "12px 28px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    textDecoration: "none",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
  },

  // FOOTER
  footer: {
    background: "#111827",
    padding: "60px 64px 32px",
    color: "#fff",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "40px",
    marginBottom: "40px",
  },
  footerTagline: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginTop: "12px",
    lineHeight: "1.6",
  },
  footerHeading: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  footerLink: {
    display: "block",
    fontSize: "13px",
    color: "#9CA3AF",
    textDecoration: "none",
    marginBottom: "8px",
    transition: "color 0.15s",
  },
  footerText: {
    fontSize: "13px",
    color: "#9CA3AF",
    marginBottom: "8px",
  },
  socialIcons: {
    display: "flex",
    gap: "12px",
    marginBottom: "8px",
  },
  socialIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#1F2937",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "700",
    color: "#9CA3AF",
    cursor: "pointer",
    transition: "color 0.15s",
  },
  newsletterRow: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  },
  newsletterInput: {
    flex: 1,
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #374151",
    background: "#1F2937",
    color: "#fff",
    fontSize: "13px",
    fontFamily: "'DM Sans', sans-serif",
  },
  newsletterBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },
  footerBottom: {
    borderTop: "1px solid #1F2937",
    paddingTop: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  footerCopy: {
    fontSize: "12px",
    color: "#6B7280",
  },
  footerBottomLinks: {
    display: "flex",
    gap: "20px",
  },
  footerSmallLink: {
    fontSize: "12px",
    color: "#6B7280",
    textDecoration: "none",
    transition: "color 0.15s",
  },
};
