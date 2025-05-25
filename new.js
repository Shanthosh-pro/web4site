import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { FaUser, FaEnvelope, FaLaptopCode, FaPalette, FaHome } from "react-icons/fa";

// ========== Global Styles ==========
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    background: linear-gradient(120deg, #2d2a4a 0%, #6d83f2 100%);
    color: #fff;
    min-height: 100vh;
    overflow-x: hidden;
  }
`;

// ========== Styled Components ==========
const Container = styled.div`
  max-width: 900px;
  margin: 60px auto 0 auto;
  padding: 32px;
  background: rgba(255,255,255,0.07);
  border-radius: 32px;
  box-shadow: 0 16px 40px rgba(60,60,100,0.15);
  position: relative;
  z-index: 1;
`;

const Section = styled.section`
  margin-bottom: 56px;
  transition: transform 0.4s cubic-bezier(.68,-0.55,.27,1.55);
  &:hover {
    transform: scale(1.025) rotate(-1deg);
    box-shadow: 0 8px 40px rgba(60,60,100,0.20);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #f9d923;
  margin-bottom: 12px;
  letter-spacing: 2px;
  font-weight: 800;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 24px;
`;

const Card = styled.div`
  background: #fff;
  color: #2d2a4a;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(60,60,100,0.10);
  flex: 1 1 260px;
  padding: 32px;
  min-width: 260px;
  max-width: 340px;
  transition: box-shadow 0.3s, background 0.3s, color 0.3s;
  &:hover {
    box-shadow: 0 8px 32px rgba(60,60,100,0.20);
    background: linear-gradient(120deg, #f9d923 0%, #f7f7f7 100%);
    color: #2d2a4a;
  }
`;

const FloatingNav = styled.nav`
  position: fixed;
  bottom: 36px;
  right: 36px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CircleButton = styled.button`
  background: ${({active}) => (active ? "#f9d923" : "#2d2a4a")};
  color: ${({active}) => (active ? "#2d2a4a" : "#fff")};
  border: none;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  font-size: 2rem;
  box-shadow: 0 4px 24px rgba(60,60,100,0.20);
  margin-bottom: 12px;
  cursor: pointer;
  outline: none;
  transition: background 0.3s, color 0.3s;
  &:hover {
    background: #f9d923;
    color: #2d2a4a;
  }
`;

// ========== Toast Notification ==========
const fadeInOut = keyframes`
  0% {opacity: 0; transform: translateY(20px);}
  10% {opacity: 1; transform: translateY(0);}
  90% {opacity: 1; transform: translateY(0);}
  100% {opacity: 0; transform: translateY(20px);}
`;

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  right: 36px;
  background: #f9d923;
  color: #2d2a4a;
  padding: 16px 24px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(60,60,100,0.2);
  font-weight: 700;
  font-size: 1.1rem;
  animation: ${fadeInOut} 3s ease forwards;
  z-index: 200;
  user-select: none;
`;

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Toast visible for 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return <ToastWrapper role="alert">{message}</ToastWrapper>;
}

// ========== Navigation Items ==========
const navItems = [
  { icon: <FaHome />, label: "Home", section: "home" },
  { icon: <FaUser />, label: "About", section: "about" },
  { icon: <FaLaptopCode />, label: "Projects", section: "projects" },
  { icon: <FaPalette />, label: "Skills", section: "skills" },
  { icon: <FaEnvelope />, label: "Contact", section: "contact" }
];

// ========== Helper ==========
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ========== Main App ==========
export default function App() {
  const [active, setActive] = useState("home");
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Show toast with a message
  function showFeelGoodMessage(message) {
    setToastMessage(message);
    setShowToast(true);
  }

  // Close toast handler
  function closeToast() {
    setShowToast(false);
    setToastMessage("");
  }

  // Contact click handler
  function handleContactClick(type) {
    if (type === "email") {
      showFeelGoodMessage("Thanks for reaching out! I'll get back to you soon. 😊");
      setTimeout(() => {
        window.location.href = "mailto:your.email@example.com";
      }, 600); // Give user a moment to see the toast
    } else if (type === "linkedin") {
      showFeelGoodMessage("Great! Let's connect on LinkedIn. 🚀");
      setTimeout(() => {
        window.open("https://linkedin.com/in/yourprofile", "_blank");
      }, 600);
    } else if (type === "twitter") {
      showFeelGoodMessage("Thanks for following! Stay tuned for updates. 🐦");
      setTimeout(() => {
        window.open("https://twitter.com/yourhandle", "_blank");
      }, 600);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Section id="home">
          <SectionTitle>👋 Hello, I’m Your Name</SectionTitle>
          <p style={{fontSize: "1.3rem", color: "#f7f7f7"}}>
            A creative developer & designer with a passion for unique digital experiences.
            <br />
            <span style={{color: "#f9d923"}}>Welcome to my personal playground.</span>
          </p>
        </Section>
        <Section id="about">
          <SectionTitle>About Me</SectionTitle>
          <CardGrid>
            <Card>
              <b>🌱 Background</b>
              <p>With a background in both design and development, I blend logic with creativity to craft memorable web experiences.</p>
            </Card>
            <Card>
              <b>🎯 Mission</b>
              <p>To build digital products that feel alive, intuitive, and truly unique—never cookie-cutter.</p>
            </Card>
          </CardGrid>
        </Section>
        <Section id="projects">
          <SectionTitle>Projects</SectionTitle>
          <CardGrid>
            <Card>
              <b>Project One</b>
              <p>A modern portfolio site with animated transitions and custom UI elements.</p>
            </Card>
            <Card>
              <b>Project Two</b>
              <p>Data visualisation dashboard with Material-inspired design and real-time updates.</p>
            </Card>
            <Card>
              <b>Project Three</b>
              <p>Mobile app for creative journaling, featuring unique gesture-based navigation.</p>
            </Card>
          </CardGrid>
        </Section>
        <Section id="skills">
          <SectionTitle>Skills</SectionTitle>
          <CardGrid>
            <Card>
              <b>Frontend</b>
              <p>React, Next.js, Vue, Svelte, HTML5, CSS3, Styled-Components, GSAP</p>
            </Card>
            <Card>
              <b>Design</b>
              <p>Figma, Adobe XD, Material Design, Motion Design, UX/UI</p>
            </Card>
            <Card>
              <b>Backend & Tools</b>
              <p>Node.js, Express, MongoDB, Firebase, Git, CI/CD</p>
            </Card>
          </CardGrid>
        </Section>
        <Section id="contact">
          <SectionTitle>Contact</SectionTitle>
          <CardGrid>
            <Card
              as="button"
              onClick={() => handleContactClick("email")}
              style={{ cursor: "pointer", border: "none", background: "transparent", textAlign: "left" }}
              aria-label="Send Email"
            >
              <b>Email</b>
              <p>your.email@example.com</p>
            </Card>
            <Card
              as="button"
              onClick={() => handleContactClick("linkedin")}
              style={{ cursor: "pointer", border: "none", background: "transparent", textAlign: "left" }}
              aria-label="Open LinkedIn Profile"
            >
              <b>LinkedIn</b>
              <p>linkedin.com/in/yourprofile</p>
            </Card>
            <Card
              as="button"
              onClick={() => handleContactClick("twitter")}
              style={{ cursor: "pointer", border: "none", background: "transparent", textAlign: "left" }}
              aria-label="Open Twitter Profile"
            >
              <b>Twitter/X</b>
              <p>@yourhandle</p>
            </Card>
          </CardGrid>
        </Section>
      </Container>
      <FloatingNav>
        {navItems.map(item => (
          <CircleButton
            key={item.section}
            active={active === item.section}
            aria-label={item.label}
            onClick={() => {
              setActive(item.section);
              scrollToSection(item.section);
            }}
          >
            {item.icon}
          </CircleButton>
        ))}
      </FloatingNav>
      {showToast && <Toast message={toastMessage} onClose={closeToast} />}
    </>
  );
}
