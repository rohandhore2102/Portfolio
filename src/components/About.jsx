import React, { useEffect, useRef } from "react";
import AboutCard from "./AboutCard";
import { Briefcase, Github, Mail, User } from "lucide-react";
import { ThemeContext } from "../App";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function AboutSection() {
  const { darkMode } = React.useContext(ThemeContext);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const dividerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  const buttonRef = useRef(null);

  // Add card to ref array
  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Only animate if the elements exist
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            markers: false // Set to true for debugging
          }
        });
      }

      if (dividerRef.current) {
        gsap.from(dividerRef.current, {
          scaleX: 0,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }

      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        });
      }

      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            toggleActions: "play none none none"
          }
        });
      }

      if (cardsRef.current.length > 0) {
        cardsRef.current.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current[0],
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });
        });
      }

      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: buttonRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      }
    }, sectionRef);

    return () => {
      // Proper cleanup
      ctx.revert();
      cardsRef.current = []; // Clear cards refs on unmount
    };
  }, [darkMode]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="text-center mb-16">
            <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <div ref={dividerRef} className={`h-1 w-20 mx-auto rounded ${darkMode ? 'bg-indigo-500' : 'bg-indigo-500'}`}></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div ref={imageRef} className={` rounded-2xl overflow-hidden border-8 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                <img 
                  src="/img/profile.webp" 
                  alt="About Me" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            <div ref={contentRef}>
              <h3 className="text-3xl font-bold mb-4">
                Full-Stack Web & Android Developer
              </h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm a passionate Full-Stack Web & Android Developer with hands-on experience in building robust applications using Java, Spring Boot, and REST APIs. Skilled in both frontend and backend development, I work with frameworks like Spring MVC, Hibernate, and Microservices architecture. I’m also well-versed in Android app development and have a solid grasp of DevOps practices using AWS, Docker, and GitHub.
              </p>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I combine clean code practices with modern design principles to create seamless user experiences. Always eager to learn, I continuously explore new technologies and development techniques to stay ahead in the ever-evolving tech landscape.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <AboutCard ref={addToCardsRef} icon={<User size={20} />} title="Name" value="Rohan Dhore" darkMode={darkMode} />
                <AboutCard ref={addToCardsRef} icon={<Mail size={20} />} title="Email" value="rohandhore2102@gmail.com" darkMode={darkMode} />
                <AboutCard ref={addToCardsRef} icon={<Briefcase size={20} />} title="Experience" value="1.5+ Years" darkMode={darkMode} />
                <AboutCard ref={addToCardsRef} icon={<Github size={20} />} title="Projects" value="5+ Completed" darkMode={darkMode} />
              </div>
              
              <button 
                ref={buttonRef}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-6 py-3 font-medium rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                }`}
              >
                Let's Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;