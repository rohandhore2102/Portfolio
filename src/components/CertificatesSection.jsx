import React, { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../App";
import { X } from "lucide-react";

function CertificatesSection() {
  const { darkMode } = React.useContext(ThemeContext);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedCert, setSelectedCert] = useState(null);

  const certificates = [
    {
      title: "Oracle Cloud Infrastructure AI Foundations",
      issuer: "Oracle",
      date: "Aug 2025",
      preview: "/img/Oracle-ai.webp",
      fullImage: "/img/Oracle-ai.webp",
    },
    {
      title: "Communication Skills",
      issuer: "TCS",
      date: "June 2023",
      preview: "/img/TCS-CS.webp",
      fullImage: "/img/TCS-CS.webp",
    },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Certificate Modal
  const CertificateModal = ({ isOpen, onClose, certificate }) => {
    if (!isOpen || !certificate) return null;

    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`relative rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden ${
              darkMode ? "bg-gray-900" : "bg-white"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`p-4 border-b flex justify-between items-center ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg md:text-xl font-bold truncate ${
                    darkMode ? "text-gray-100" : "text-gray-900"
                  }`}
                >
                  {certificate.title}
                </h3>
                <p
                  className={`text-sm truncate ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {certificate.issuer} • {certificate.date}
                </p>
              </div>
              <button
                className={`p-2 rounded-full transition-colors ${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>

            {/* Certificate Image */}
            <div
              className={`w-full h-[calc(90vh-80px)] flex items-center justify-center p-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-50"
              }`}
            >
              <img
                src={certificate.fullImage || certificate.preview}
                alt={certificate.title}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <motion.section
      id="certificates"
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
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <div className="h-1 w-20 mx-auto rounded bg-indigo-500"></div>
            <p
              className={`mt-6 max-w-2xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Professional certifications that validate my expertise and
              continuous learning in technology and skills.
            </p>
          </div>

          {/* Certificates Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {certificates.map((certificate, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => setSelectedCert(certificate)}
                className={`group cursor-pointer rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  darkMode
                    ? "bg-gray-900 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                {/* Certificate Preview */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={certificate.preview}
                    alt={certificate.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </div>

                {/* Certificate Info */}
                <div className="p-4">
                  <h3
                    className={`font-semibold text-sm mb-1 line-clamp-2 ${
                      darkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {certificate.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-xs ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {certificate.issuer}
                    </p>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {certificate.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <CertificateModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />

      {/* Line Clamp Utility */}
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </motion.section>
  );
}

export default CertificatesSection;
