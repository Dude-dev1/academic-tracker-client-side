import { useState, useEffect } from "react";
import chat1 from "../assets/chat-1.jpg";
import chat2 from "../assets/chat-2.jpg";
import chat3 from "../assets/chat-3.jpg";
import chat4 from "../assets/chat-4.jpg";
import chat5 from "../assets/chat-5.jpg";

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
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [studentCount, setStudentCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 12;
    const duration = 2000; // 2 seconds
    const interval = 20; // ms
    const increment = end / (duration / interval);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setStudentCount(end);
        clearInterval(timer);
      } else {
        setStudentCount(Math.ceil(start));
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      title: "Add Assignments",
      desc: "Automatically organize all your upcoming tasks and assignments at one glance.",
      detailedDesc: "Input assignment details rapidly such as title, course, due date, and priority level. The system automatically categorizes and sorts everything, ensuring you know exactly what needs your attention first without manual sorting.",
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
           <path d="M9 11l3 3L22 4" />
           <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
         </svg>
      ),
      active: false
    },
    {
      title: "Track Deadlines",
      desc: "Get notified before due dates so you're never caught off guard or missing grades.",
      detailedDesc: "Our built-in notification system alerts you days before a major assignment is due. You can customize visual cues and reminder times to fit your personal workflow and prevent any last-minute cramming sessions.",
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
           <circle cx="12" cy="12" r="10"></circle>
           <polyline points="12 6 12 12 16 14"></polyline>
         </svg>
      ),
      active: true
    },
    {
      title: "View Progress",
      desc: "See how much you've completed and what's still pending for every course.",
      detailedDesc: "Visualize your productivity directly from your dashboard. Track completion rates across different courses and give yourself a psychological boost by watching your pending to-do list shrink and your grades improve.",
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
           <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
         </svg>
      ),
      active: false
    },
    {
      title: "Course Management",
      desc: "Group assignments by classes to easily navigate your entire academic schedule.",
      detailedDesc: "Keep your semesters tightly organized by grouping related assignments under specific course labels. Add syllabus information, store instructor details, and seamlessly monitor your overall grade projections per class.",
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
           <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
         </svg>
      ),
      active: false
    },
    {
      title: "Mobile Optimized",
      desc: "Access your dashboard smoothly on any device, right from your phone.",
      detailedDesc: "Whether you are waiting for the bus or walking in between lectures, check your upcoming tasks effortlessly. Our entirely fluid, responsive design guarantees a smooth, app-like experience on any smartphone or tablet.",
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
           <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line>
         </svg>
      ),
      active: false
    },
    {
      title: "Schedule Planner",
      desc: "Plan your entire week or month in advance using the built-in calendar.",
      detailedDesc: "Integrate all of your personal and academic tasks into a centralized calendar view. Drag and drop assignments to plan your rigorous study sessions effectively and strictly balance your academic workload with personal time.",
      icon: (
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
           <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
         </svg>
      ),
      active: false
    }
  ];

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,wght@0,700;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #FAFBFC; }
        
        /* Utility Classes for Hover Effects */
        .feature-card { transition: all 0.3s ease; }
        .feature-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.08); }
        .btn-hover { transition: all 0.2s ease; }
        .btn-hover:hover { opacity: 0.9; transform: scale(1.02); }
        .nav-link:hover { color: #2563EB !important; }
        
        .diagonal-bg::before {
          content: "";
          position: absolute;
          top: 0; right: 0;
          width: 50%; height: 100%;
          background: #EFF6FF;
          z-index: -1;
          clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%);
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <Logo />
        <div style={styles.navLinks}>
          <a href="#" className="nav-link" style={styles.navLink}>Home</a>
          <a href="#about" className="nav-link" style={styles.navLink}>About</a>
          <a href="/login" className="nav-link" style={styles.navLink}>Login</a>
        </div>
        <div style={styles.navActions}>
          <a href="/signup" style={styles.navBtn} className="btn-hover">Sign Up</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section style={styles.hero} className="diagonal-bg">
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>
            Industry Leading<br/>
            <span style={{color: '#EAB308'}}>Student Planner.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Track deadlines, monitor progress, and keep up with class updates in one simple place. Stay organized effortlessly.
          </p>
          <div style={styles.heroButtons}>
            <a href="/signup" style={styles.primaryBtn} className="btn-hover">Get Started</a>
            <div style={styles.trustBadge}>
               <div style={styles.stars}>★★★★★</div>
               <span style={styles.trustText}>Loved by 12k+ students</span>
            </div>
          </div>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.imageGrid}>
            <div style={{...styles.imgBox, gridColumn: "1 / span 2", gridRow: "1 / span 2", height: "240px", backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
            <div style={{...styles.imgBox, height: "115px", backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400')", backgroundSize: "cover"}}></div>
            <div style={{...styles.imgBox, height: "115px", background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "32px", fontWeight: "bold"}}>
              +{studentCount}k
            </div>
          </div>
        </div>
      </section>

      {/* YOU ASKED SECTION */}
      <section style={styles.aboutSection} id="about">
        <div style={styles.aboutContent}>
          <h2 style={styles.sectionTitle}>You asked, we have answered.</h2>
          <p style={styles.sectionSubtitle}>
            Tired of missing deadlines and constantly asking the group chat for what's due? We built Agenda to solve exactly this problem.
          </p>
          
          <div style={styles.chatGrid}>
            <div style={{...styles.chatCard, transform: 'rotate(-2deg)'}}>
              <img src={chat1} alt="Student asking for assignments" style={styles.chatImg} />
            </div>
            <div style={{...styles.chatCard, transform: 'rotate(1deg)', marginTop: '20px'}}>
              <img src={chat2} alt="Student confused about the assignment website" style={styles.chatImg} />
            </div>
            <div style={{...styles.chatCard, transform: 'rotate(-1deg)'}}>
              <img src={chat3} alt="Student saying approaching deadlines" style={styles.chatImg} />
            </div>
            <div style={{...styles.chatCard, transform: 'rotate(2deg)', marginTop: '15px'}}>
              <img src={chat4} alt="Student asking about next task" style={styles.chatImg} />
            </div>
            <div style={{...styles.chatCard, transform: 'rotate(-3deg)', marginTop: '10px'}}>
              <img src={chat5} alt="Student missed a deadline" style={styles.chatImg} />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / FEATURES */}
      <section style={styles.servicesSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>How it works</h2>
          <p style={styles.sectionSubtitle}>Add assignments, follow deadlines, and keep track of what matters — without clutter.</p>
        </div>
        
        <div style={styles.servicesGrid}>
          {features.map((feature, i) => (
            <div key={i} className="feature-card" style={feature.active ? styles.activeCard : styles.card}>
              <div style={feature.active ? styles.activeIconWrapper : styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 style={feature.active ? styles.activeCardTitle : styles.cardTitle}>{feature.title}</h3>
              <p style={feature.active ? styles.activeCardDesc : styles.cardDesc}>{feature.desc}</p>
              <a 
                href="#modal" 
                onClick={(e) => { e.preventDefault(); setSelectedFeature(feature); }} 
                style={feature.active ? styles.activeCardLink : styles.cardLink}
              >
                Know More →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section style={styles.darkSection}>
        <div style={styles.darkSectionInner}>
          <div style={styles.darkHeader}>
             <h2 style={{...styles.sectionTitle, color: "#fff"}}>What Students Say</h2>
             <p style={{...styles.sectionSubtitle, color: "#9CA3AF"}}>Join thousands of students who have organized their lives with us.</p>
          </div>
          <div style={styles.pricingGrid}>
             {[
               { name: "Sarah L.", role: "Computer Science St.", text: "Agenda completely changed how I handle my coursework. No more missed deadines!" },
               { name: "James T.", role: "Business Major", text: "The clean interface and progress tracking keep me motivated throughout the semester." },
               { name: "Emily R.", role: "Design St.", text: "Finally an app that looks good and works perfectly for managing my crazy schedule." },
             ].map((review, idx) => (
                <div key={idx} style={styles.pricingCard}>
                   <p style={styles.reviewText}>"{review.text}"</p>
                   <div style={styles.reviewerInfo}>
                     <div style={styles.reviewerAvatar}>{review.name[0]}</div>
                     <div>
                       <h4 style={styles.reviewerName}>{review.name}</h4>
                       <span style={styles.reviewerRole}>{review.role}</span>
                     </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer} id="contact">
        <div style={styles.footerGrid}>
          {/* LEFT: Info */}
          <div style={styles.footerColInfo}>
            <Logo />
            <p style={styles.footerDesc}>The modern way to manage student life. Stay on top of your assignments without stress.</p>
          </div>

          {/* MIDDLE: Contact */}
          <div style={styles.footerCol}>
            <h4 style={styles.footerHeading}>Contact Us</h4>
            <p style={styles.footerContactText}>Location: KNUST, Kumasi Ghana</p>
            <p style={styles.footerContactText}>Email: webdev28@cs3.knust.edu.gh</p>
            <p style={styles.footerContactText}>Phone: 000 000 0000</p>
          </div>

          {/* RIGHT: Newsletter */}
          <div style={styles.footerCol}>
            <h4 style={styles.footerHeading}>Newsletter</h4>
            <p style={styles.footerContactText}>Subscribe for the latest updates.</p>
            <form style={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" style={styles.newsletterInput} />
              <button type="submit" style={styles.newsletterBtn} className="btn-hover">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>

      {/* FEATURE MODAL */}
      {selectedFeature && (
        <div style={styles.modalOverlay} onClick={() => setSelectedFeature(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setSelectedFeature(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div style={styles.modalIconWrapper}>
              {selectedFeature.icon}
            </div>
            <h3 style={styles.modalTitle}>{selectedFeature.title}</h3>
            <p style={styles.modalDesc}>{selectedFeature.detailedDesc}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    position: "relative",
    overflow: "hidden"
  },
  
  // NAV
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 80px",
    background: "transparent",
    position: "absolute",
    width: "100%",
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
    fontSize: "22px",
    fontWeight: "700",
    color: "#2563EB",
  },
  navLinks: {
    display: "flex",
    gap: "40px",
  },
  navLink: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
  },
  navBtn: {
    background: "#2563EB",
    color: "#fff",
    padding: "10px 24px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
  },

  // HERO
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "160px 80px 100px",
    position: "relative",
    minHeight: "80vh",
    gap: "60px",
  },
  heroLeft: {
    flex: 1,
    maxWidth: "500px"
  },
  heroTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "56px",
    fontWeight: "800",
    color: "#111827",
    lineHeight: "1.1",
    marginBottom: "24px",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "#6B7280",
    lineHeight: "1.6",
    marginBottom: "40px",
  },
  heroButtons: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  primaryBtn: {
    background: "#2563EB",
    color: "#fff",
    padding: "14px 32px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "16px",
    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
  },
  trustBadge: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginLeft: "10px"
  },
  stars: {
    color: "#FBBF24",
    fontSize: "16px",
    letterSpacing: "4px"
  },
  trustText: {
    fontSize: "14px",
    color: "#6B7280",
    fontWeight: "500"
  },
  heroRight: {
    flex: 1,
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gap: "16px",
    maxWidth: "500px",
    marginLeft: "auto",
  },
  imgBox: {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  // YOU ASKED SECTION
  aboutSection: {
    padding: "50px 40px",
    background: "#fff",
    display: "flex",
    justifyContent: "center",
    textAlign: "center"
  },
  aboutContent: {
    maxWidth: "1200px",
    width: "100%",
  },
  chatGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    marginTop: "40px",
    alignItems: "center"
  },
  chatCard: {
    flex: "1 1 18%",
    minWidth: "200px",
    maxWidth: "260px",
    padding: "10px",
    background: "#f9fafb",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
    transition: "transform 0.3s ease",
  },
  chatImg: {
    width: "100%",
    borderRadius: "8px",
    display: "block",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },

  // SERVICES
  servicesSection: {
    padding: "100px 80px",
    background: "#FAFBFC",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  sectionTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "36px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "16px",
  },
  sectionSubtitle: {
    fontSize: "16px",
    color: "#6B7280",
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: "1.5",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px 30px",
    border: "1px solid #F3F4F6",
  },
  activeCard: {
    background: "linear-gradient(135deg, #2563EB 0%, #1E40AF 100%)",
    borderRadius: "20px",
    padding: "40px 30px",
    border: "1px solid transparent",
    color: "#fff",
    boxShadow: "0 20px 40px rgba(37, 99, 235, 0.2)",
  },
  iconWrapper: {
    width: "60px",
    height: "60px",
    borderRadius: "14px",
    background: "#EFF6FF",
    color: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  activeIconWrapper: {
    width: "60px",
    height: "60px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#111827",
  },
  activeCardTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#fff",
  },
  cardDesc: {
    fontSize: "15px",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
  activeCardDesc: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.9)",
    lineHeight: "1.6",
    marginBottom: "24px",
  },
  cardLink: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2563EB",
    textDecoration: "none",
  },
  activeCardLink: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
    textDecoration: "none",
  },

  // DARK SECTION (REVIEWS)
  darkSection: {
    background: "#111827",
    padding: "160px 80px",
    marginTop: "-60px",
  },
  darkSectionInner: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  darkHeader: {
    textAlign: "center",
    marginBottom: "60px",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  pricingCard: {
    background: "#1F2937",
    borderRadius: "20px",
    padding: "40px",
    border: "1px solid #374151",
    transition: "transform 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  reviewText: {
    color: "#D1D5DB",
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "32px",
    fontStyle: "italic"
  },
  reviewerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  reviewerAvatar: {
    width: "48px",
    height: "48px",
    background: "#2563EB",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
    fontWeight: "700"
  },
  reviewerName: {
    fontSize: "16px",
    color: "#fff",
    fontWeight: "600",
    marginBottom: "4px"
  },
  reviewerRole: {
    fontSize: "14px",
    color: "#9CA3AF"
  },

  // FOOTER
  footer: {
    background: "#030712",
    padding: "80px 80px 40px",
    borderTop: "1px solid #1F2937"
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "60px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  footerColInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  footerDesc: {
    color: "#9CA3AF",
    fontSize: "15px",
    lineHeight: "1.6",
    maxWidth: "280px"
  },
  footerHeading: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "24px"
  },
  footerCol: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  footerContactText: {
    color: "#9CA3AF",
    fontSize: "15px"
  },
  newsletterForm: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "8px"
  },
  newsletterInput: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #374151",
    background: "#111827",
    color: "#fff",
    fontSize: "15px",
    outline: "none"
  },
  newsletterBtn: {
    padding: "12px 16px",
    borderRadius: "8px",
    background: "#2563EB",
    color: "#fff",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px"
  },
  
  // MODAL STYLES
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(17, 24, 39, 0.6)",
    backdropFilter: "blur(4px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
    padding: "20px"
  },
  modalContent: {
    background: "#fff",
    borderRadius: "24px",
    padding: "40px",
    maxWidth: "500px",
    width: "100%",
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    animation: "fadeUp 0.3s ease-out forwards"
  },
  modalClose: {
    position: "absolute",
    top: "20px", right: "20px",
    background: "#F3F4F6",
    border: "none",
    borderRadius: "50%",
    width: "36px", height: "36px",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
    color: "#6B7280",
    transition: "all 0.2s"
  },
  modalIconWrapper: {
    width: "64px", height: "64px",
    borderRadius: "16px",
    background: "#EFF6FF",
    color: "#2563EB",
    display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: "24px"
  },
  modalTitle: {
    fontFamily: "'Fraunces', serif",
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "16px"
  },
  modalDesc: {
    fontSize: "16px",
    color: "#4B5563",
    lineHeight: "1.7"
  }
};
