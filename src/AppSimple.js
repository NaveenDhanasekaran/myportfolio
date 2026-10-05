import React from 'react';
import './App.css';

function AppSimple() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">NAVEEN</div>
        <ul className="nav-links">
          <li><a href="#home" onClick={() => scrollToSection('home')}>HOME</a></li>
          <li><a href="#skills" onClick={() => scrollToSection('skills')}>SKILLS</a></li>
          <li><a href="#experience" onClick={() => scrollToSection('experience')}>EXPERIENCE</a></li>
          <li><a href="#projects" onClick={() => scrollToSection('projects')}>PROJECTS</a></li>
        </ul>
        <button className="hire-btn" onClick={() => scrollToSection('projects')}>
          AVAILABLE FOR FREELANCE
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-left">
          <div className="hero-date">01/04 — SCROLL ↓</div>
        </div>
        
        <div className="hero-center">
          <h1 className="hero-title">
            NAVEEN
          </h1>
        </div>

        <div className="hero-right">
          <p className="hero-description">
            FREELANCE AI ENGINEER & FULL-STACK DEVELOPER BUILDING INNOVATIVE WEB APPS, 
            GENAI CHATBOTS, AND INTELLIGENT AUTOMATION SOLUTIONS
          </p>
        </div>

        <div className="scroll-indicator-center">
          <div className="scroll-circle">
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <h2 className="section-title">Core Expertise</h2>
        <div className="skills-grid">
          {[
            {
              title: "Full-Stack Web Development",
              description: "Building responsive web applications with React, Node.js, and modern frameworks. End-to-end development from concept to deployment."
            },
            {
              title: "UI/UX Design",
              description: "Creating modern, intuitive interfaces with focus on user experience. Clean designs that convert visitors into customers."
            },
            {
              title: "GenAI Chatbots",
              description: "Developing conversational AI systems for instant customer support and engagement. Intelligent automation that understands context."
            },
            {
              title: "ML Automation",
              description: "Building intelligent workflows and data pipelines. Automating complex processes with machine learning models."
            },
            {
              title: "Computer Vision & NLP",
              description: "Implementing advanced CV and NLP models for real-world applications. From image recognition to natural language understanding."
            },
            {
              title: "E-commerce & Trading Platforms",
              description: "Developing robust e-commerce solutions and trading platforms. Secure payment gateways, analytics, and scalable architecture."
            }
          ].map((skill, index) => (
            <div key={index} className="skill-card">
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <h2 className="section-title">Freelance Projects</h2>
        <div className="timeline">
          {[
            {
              company: "The Term Time (UK)",
              duration: "2 Years",
              description: "Prototyped and developed CV/NLP models for educational applications. Integrated machine learning models into production web applications."
            },
            {
              company: "Vei Technology",
              duration: "Contract",
              description: "Developed machine learning models and analytics pipelines. Built data processing systems for business intelligence."
            },
            {
              company: "Multiple Freelance Clients",
              duration: "Ongoing",
              description: "Delivered web applications, AI solutions, and business websites. From e-commerce platforms to GenAI chatbots and automation tools."
            }
          ].map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <h3>{exp.company}</h3>
                <p className="duration">{exp.duration}</p>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2 className="section-title">Featured Work</h2>
        <div className="projects-grid">
          {[
            {
              title: "Location-Intelligent Retail App",
              description: "Smart product discovery platform with AI-powered recommendations. Real-time location-based suggestions for enhanced shopping experience.",
              icon: "🛍️"
            },
            {
              title: "Healthcare Platform",
              description: "Comprehensive medical services hub with responsive design. Patient management, appointment scheduling, and telemedicine features.",
              icon: "🏥"
            },
            {
              title: "Pipe Manufacturing Website",
              description: "Modern business showcase with product catalogs and specifications. Professional design highlighting industrial capabilities.",
              icon: "🏭"
            },
            {
              title: "Trading Platform",
              description: "Professional trading interface with robust features. Real-time data, secure transactions, and advanced analytics dashboard.",
              icon: "📈"
            },
            {
              title: "GenAI Chatbot Systems",
              description: "Intelligent conversational AI for instant website support. Context-aware responses and seamless customer engagement.",
              icon: "💬"
            },
            {
              title: "Export-Import Corporate Site",
              description: "Comprehensive trade portal with services and product catalogs. Multi-language support and international business features.",
              icon: "🌐"
            },
            {
              title: "Cake Shop E-Commerce",
              description: "Full-featured online bakery with customization options. Browse, customize, and order with integrated payment gateway and analytics.",
              icon: "🎂"
            },
            {
              title: "Modern Web Application",
              description: "Clean architecture with optimized UX. Fast, responsive, and built with modern best practices for maximum performance.",
              icon: "⚡"
            },
            {
              title: "AI Interviewer",
              description: "Voice-based interview system with TTS/STT capabilities. Regional language support and automatic analysis. Coming soon!",
              icon: "🎤",
              comingSoon: true
            }
          ].map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-image">
                <span>{project.icon}</span>
                {project.comingSoon && <div className="coming-soon">COMING SOON</div>}
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AppSimple;
