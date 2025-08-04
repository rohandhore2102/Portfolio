import React, { useEffect, useState, useRef } from "react";
import { Code } from "lucide-react";
import { ThemeContext } from "../App";

function SkillsSection() {
  const { darkMode } = React.useContext(ThemeContext);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  
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
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  const frontendSkills = [
    { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "REST APIs", logo: "https://img.icons8.com/external-flat-juicy-fish/60/external-api-coding-and-development-flat-flat-juicy-fish.png" },
  { name: "React", logo: "/img/React.webp" },

  // Frameworks
  { name: "Spring Boot", logo: "/img/spring-boot.webp" },
  { name: "Spring MVC", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
  { name: "Spring Security", logo: "/img/spring-security.webp" },
  { name: "Hibernate", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-plain.svg" },
  { name: "Microservices", logo: "https://img.icons8.com/color/48/services--v1.png" 
},
  { name: "JPA", logo: "https://img.icons8.com/fluency/48/database.png" 
},
{ name: "Flutter", logo: "/img/icon_flutter.webp" },

  // Datebase
  { name: "PostgreSQL", logo: "/img/Postgresql_elephant.webp" },
  { name: "MongoDB", logo: "/img/Mongologo.webp" },
  { name: "Redis", logo: "/img/Redis-logo.webp" },
  
  
  // Cloud & DevOps
  { name: "AWS", logo: "/img/AWS icon.webp" },
  { name: "NGINX", logo: "/img/nginx.webp" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  {name: "CI/CD",logo: "https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png"},
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  {name: "Firebase",logo: "img/firebase.webp"},

  // Tools & Technologies
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Android Studio", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg" },
  { name: "Generative AI Tools", logo: "https://img.icons8.com/fluency/48/artificial-intelligence.png" },
 
  ];
  
  return (
    <section 
      id="skills" 
      ref={ref}
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Tech Stack</span>
          </h2>
          <div className={`h-1 w-20 mx-auto rounded ${darkMode ? 'bg-indigo-500' : 'bg-indigo-500'}`}></div>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {frontendSkills.map((skill, index) => (
            <div 
              key={index}
              className={`
                flex flex-col items-center p-4 rounded-lg shadow-md 
                transition-all duration-300 transform hover:scale-105 h-full
                ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'}
                ${visible ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}
              `}
              style={{ 
                
                minHeight: '120px' // Ensures consistent height
              }}
            >
              <div className="flex items-center justify-center w-12 h-12 mb-3">
                <img 
                  src={skill.logo} 
                  alt={skill.name} 
                  
                  className="w-full h-full object-contain" 
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.parentNode.querySelector('svg')?.classList.remove('hidden');
                  }}
                />
                <Code size={24} className="hidden text-indigo-500" />
              </div>
              <span className="font-medium text-sm sm:text-base text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;