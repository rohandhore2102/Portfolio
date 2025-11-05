import React, { useState, useEffect } from "react";
import { ArrowUp, DownloadIcon } from "lucide-react";
import HeroSection from "./components/Hero";
import Navbar from "./components/Navbar";
import AboutSection from "./components/About";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CertificatesSection from "./components/CertificatesSection";
import "./index.css";

// Theme context for dark/light mode
export const ThemeContext = React.createContext();

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [visible, setVisible] = useState(false);

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(mediaQuery.matches);
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? "bg-gray-900 text-gray-100"
            : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar />

        <main>
          {/* Hero should contain <h1> for SEO */}
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <CertificatesSection />
          <ContactSection />
        </main>

        <Footer />

        {/* Scroll to top button */}
        {visible && (
          <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-5 p-3 rounded-full shadow-lg transition-all duration-300 ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-indigo-500 hover:bg-indigo-600"
            } text-white`}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}

        {/* Resume download button */}
        <a
          href="/files/Rohan Resume 06112025.pdf"
          rel="noopener noreferrer"
          target="_blank"
          className={`fixed z-10 flex gap-1 md:gap-3 bottom-24 right-5 px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
            darkMode
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-indigo-500 hover:bg-indigo-600"
          } text-white`}
        >
          CV <DownloadIcon size={20} />
        </a>
      </div>
    </ThemeContext.Provider>
  );
}
