import React from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { ThemeContext } from "../App";

function ProjectsSection() {
  const { darkMode } = React.useContext(ThemeContext);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const projects = [
    {
      title: "Ellora Tea",
      description: "A creative portfolio for Ellora Tea showcasing their product.",
      technologies: ["React", "TailwindCss", "Expressjs", "AWS"],
      image: "/img/ElloraTea.webp",
      demoLink: "https://elloratea.vercel.app/",  
      
    },
    {
      title: "Room Logix App",
      description: "A  android application for managing tenant rents and light bills",
      technologies: ["Flutter | Dart"],
      image: "/img/Rental.webp",
      demoLink: "https://roomlogixshowcase.vercel.app/",  
      
    },
    {
      title: "College Notes",
      description: "A creative Notes making App with smooth animations and interactive elements.",
      technologies: ["Java", "XML", "Firebase", "Android Studio"],
      image: "img/NotesApp.webp",
      demoLink: "https://collegenotes-showcase.vercel.app/",  
    },
    {
      title: "Hotel Management System",
      description: "A responsive Hotel Management System, User-Friendly and More features",
      technologies: ["Spring Boot", "Thymeleaf", "REST API", "Hibernate"],
      image: "/img/HotelManagement.webp",
      demoLink: "https://github.com/rohandhore2012/Hotel_Management-Springboot",  
  
    },
    {
      title: "Invoice Generator",
      description: "A invoics generator software for generating invoices for your business",
      technologies: ["Java", "MySQL", "JavaFX"],
      image: "/img/invoice.webp",
      demoLink: "https://github.com/rohandhore2012/InvoiceGenerator",  

    },
    
    {
      title: "Url Shortener",
      description: "A creative Notes making App with smooth animations and interactive elements.",
      technologies: ["Java", "Spring Boot", "React", "Hibernate"],
      image: "img/url-shortener.webp",
      demoLink: "https://github.com/rohandhore2012/URL_Shortener-Springaboot",  
    },
  
    
    
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id="projects"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={`py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={itemVariants}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className={`h-1 w-20 mx-auto rounded bg-indigo-500`}></div>
            <p
              className={`mt-6 max-w-2xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Here are some of my recent projects showcasing my skills and
              experience. Each project reflects my passion for creating engaging
              user experiences.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ProjectCard
                  project={project}
                  darkMode={darkMode}
                  visible={true}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ProjectsSection;