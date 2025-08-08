import React, { useEffect, useState, useRef } from "react";
import { Code } from "lucide-react";
import { ThemeContext } from "../App";

function SkillsSection() {
  const { darkMode } = React.useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Autoscrolling logic with infinite loop
  useEffect(() => {
    const container = scrollRef.current;
    let scrollInterval;
    if (container && visible && !isDragging) {
      scrollInterval = setInterval(() => {
        const itemWidth = container.scrollWidth / 2; // Since we duplicated the content
        if (container.scrollLeft >= itemWidth) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1; // Adjust for speed
        }
      }, 20); // Adjust for smoothness
    }
    return () => {
      clearInterval(scrollInterval);
    };
  }, [visible, isDragging]);

  // Dragging logic
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX);
    scrollRef.current.scrollLeft = scrollLeft - walk;

    // Handle wrapping during drag
    const container = scrollRef.current;
    const itemWidth = container.scrollWidth / 2;
    if (container.scrollLeft < 0) {
      container.scrollLeft += itemWidth;
    } else if (container.scrollLeft >= itemWidth) {
      container.scrollLeft -= itemWidth;
    }
  };

  const technicalSkills = {
    // ... (Your existing technicalSkills object)
    "Languages": [
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
      { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Dart", logo: "/img/icon_flutter.webp" },
      { name: "SQL", logo: "https://img.icons8.com/fluency/48/database.png" },
    ],
    "Frameworks & Libraries": [
      { name: "Spring Boot", logo: "/img/spring-boot.webp" },
      { name: "Spring MVC", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "Spring Security", logo: "/img/spring-security.webp" },
      { name: "Hibernate", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg" },
      { name: "Microservices", logo: "https://img.icons8.com/color/48/services--v1.png" },
      { name: "JPA", logo: "https://img.icons8.com/fluency/48/database.png" },
      { name: "Flutter", logo: "/img/icon_flutter.webp" },
      { name: "React", logo: "/img/React.webp" },
    ],
    "Cloud & DevOps": [
      { name: "AWS", logo: "/img/AWS icon.webp" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Jenkins (CI/CD)", logo: "https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png" },
      { name: "Firebase", logo: "img/firebase.webp" },
      { name: "GitHub Actions", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "NGINX", logo: "/img/nginx.webp" },
    ],
    "Databases": [
      { name: "PostgreSQL", logo: "/img/Postgresql_elephant.webp" },
      { name: "MongoDB", logo: "/img/Mongologo.webp" },
      { name: "Redis", logo: "/img/Redis-logo.webp" },
      { name: "Hive DB", logo: "/img/Hive_DB.webp" },
    ],
    "Tools & Technologies": [
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Android Studio", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
      { name: "RESTful APIs", logo: "https://img.icons8.com/external-flat-juicy-fish/60/external-api-coding-and-development-flat-flat-juicy-fish.png" },
      { name: "OAuth2", logo: "https://img.icons8.com/color/48/key-security.png" },
      { name: "JWT", logo: "/img/JWT_logo.webp" },
      { name: "Webhooks", logo: "/img/webhook_logo.webp" },
      { name: "Generative AI Tools", logo: "https://img.icons8.com/fluency/48/artificial-intelligence.png" },
    ]
  };

  const skillsList = Object.entries(technicalSkills);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Technical Skills</span>
          </h2>
          <div className={`h-1 w-20 mx-auto rounded ${darkMode ? 'bg-indigo-500' : 'bg-indigo-500'}`}></div>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-8 overflow-x-hidden"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* Render the skills list once */}
          {skillsList.map(([category, skills]) => (
            <div
              key={category}
              className={`flex-shrink-0 w-80 p-6 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {category}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`
                      flex flex-col items-center p-2 rounded 
                      transition-all duration-300 transform hover:scale-105 h-full
                      ${visible ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}
                    `}
                  >
                    <div className="flex items-center justify-center w-10 h-10 mb-1">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentNode.querySelector('svg')?.classList.remove('hidden');
                        }}
                      />
                      <Code size={20} className="hidden text-indigo-500" />
                    </div>
                    <span className={`font-medium text-xs text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Render the skills list a second time for the infinite loop effect */}
          {skillsList.map(([category, skills], index) => (
            <div
              key={`${category}-clone-${index}`}
              className={`flex-shrink-0 w-80 p-6 rounded-lg shadow-md transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {category}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`
                      flex flex-col items-center p-2 rounded 
                      transition-all duration-300 transform hover:scale-105 h-full
                      ${visible ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}
                    `}
                  >
                    <div className="flex items-center justify-center w-10 h-10 mb-1">
                      <img
                        src={skill.logo}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.parentNode.querySelector('svg')?.classList.remove('hidden');
                        }}
                      />
                      <Code size={20} className="hidden text-indigo-500" />
                    </div>
                    <span className={`font-medium text-xs text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;