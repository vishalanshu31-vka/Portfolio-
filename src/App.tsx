import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { AcademicJourney } from './components/AcademicJourney';
import { Skills } from './components/Skills';
import { CurrentlyLearning } from './components/CurrentlyLearning';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Achievements } from './components/Achievements';
import { Contact } from './components/Contact';
import { FinalCinematicSection } from './components/FinalCinematicSection';
import { Footer } from './components/Footer';
import { IntroSequence } from './components/IntroSequence';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';
import { RedSparkleTrail } from './components/RedSparkleTrail';
import { ProjectItem, CertificateItem } from './types';
import { soundEffects } from './utils/soundEffects';

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  useEffect(() => {
    soundEffects.init();
    try {
      const alreadyShown = sessionStorage.getItem('vka_intro_completed');
      if (alreadyShown === 'true') {
        setShowIntro(false);
      }
    } catch {}
  }, []);

  const handleFinishIntro = () => {
    try {
      sessionStorage.setItem('vka_intro_completed', 'true');
    } catch {}
    setShowIntro(false);
  };

  const handleReplayIntro = () => {
    setShowIntro(true);
  };

  // Scroll Spy to track active section
  useEffect(() => {
    const sections = [
      'home',
      'about',
      'academic',
      'skills',
      'learning',
      'projects',
      'certifications',
      'achievements',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030305] text-[#e2e8f0] relative selection:bg-red-600/30 selection:text-red-200">
      {/* Global Interactive Red Sparkle Cursor Trail */}
      <RedSparkleTrail />

      {/* Cinematic Intro Sequence Overlay */}
      <AnimatePresence>
        {showIntro && (
          <IntroSequence
            onComplete={handleFinishIntro}
            onSkip={handleFinishIntro}
          />
        )}
      </AnimatePresence>

      {/* Main Navigation Bar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onReplayIntro={handleReplayIntro}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <Hero
        onOpenResume={() => setIsResumeOpen(true)}
        onExploreWork={() => scrollToSection('projects')}
        onEnterWorld={() => scrollToSection('about')}
      />

      {/* About Section */}
      <About />

      {/* Academic Journey Section */}
      <AcademicJourney />

      {/* Skills Section */}
      <Skills />

      {/* Currently Learning Section */}
      <CurrentlyLearning />

      {/* Projects Section */}
      <Projects onSelectProject={(project) => setSelectedProject(project)} />

      {/* Certifications Section */}
      <Certifications onSelectCertificate={(cert) => setSelectedCertificate(cert)} />

      {/* Achievements Section */}
      <Achievements />

      {/* Contact Section */}
      <Contact />

      {/* Final Cinematic Call To Action */}
      <FinalCinematicSection onBackToTop={() => scrollToSection('home')} />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
