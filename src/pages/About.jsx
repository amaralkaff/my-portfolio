// pages/About.jsx
import { motion } from "framer-motion";

const About = () => {
  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.6 } },
    exit: { opacity: 0, transition: { ease: "easeInOut", duration: 0.5 } },
  };

  return (
    <motion.div
      className="about-container bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-8 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <section className="about-section">
        <h1 className="about-title text-4xl font-bold text-center mb-4">
          Abu Ammar
        </h1>
        <h2 className="about-subtitle text-2xl text-center mb-8">
          Software Developer
        </h2>
        <div className="about-summary mb-8">
          <p>
            Returning to the programming world after a thrilling stint in
            esports. I am a game enthusiast turned aspiring programmer, with a
            strong foundation in web development and mobile applications. I
            kick-started my programming journey with the completion of the
            Hacktiv8 bootcamp as a full-stack web developer, eager to leverage
            my technical skills in new and exciting ways.
          </p>
        </div>
        <div className="about-details">
          <div className="about-education mb-6">
            <h3 className="text-xl font-semibold">Education</h3>
            <p>Hacktiv8</p>
            <p>Full Stack JavaScript Immersive Program</p>
          </div>
          <div className="about-experience mb-6">
            <h3 className="text-xl font-semibold">Work Experience</h3>
            <p>Junior Front-End Developer at CV LEMBAGA SINERGI ANALITIKA</p>
          </div>
          <div className="about-skills mb-6">
            <h3 className="text-xl font-semibold">Skills</h3>
            <ul className="list-disc list-inside">
              <li>JavaScript</li>
              <li>React JS, Redux, Vue, Pini</li>
              {/* ... other skills ... */}
            </ul>
          </div>
          <div className="about-projects mb-6">
            <h3 className="text-xl font-semibold">Projects</h3>
            <p>SLAAM</p>
          </div>
          <div className="about-certifications">
            <h3 className="text-xl font-semibold">Certifications</h3>
            <p>HackerRank JavaScript (Intermediate) Certificate</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
