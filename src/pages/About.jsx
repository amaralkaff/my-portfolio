// src/pages/About.jsx
import { motion } from "framer-motion";

const About = () => {
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
            esports. I'm a game enthusiast turned aspiring programmer, with a
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
            <p>Full Stack JavaScript Immersive Program (Transcript)</p>
          </div>
          <div className="about-experience mb-6">
            <h3 className="text-xl font-semibold">Work Experience</h3>
            <p>Junior Front-End Developer at PT. LEMBAGA SINERGI ANALITIKA</p>
            <ul className="list-disc list-inside">
              <li>
                Coordinate with UI/UX team to implement the web design created
                by UI/UX team.
              </li>
              <li>
                Test the display results on various browsers and ensure the
                feasibility of the display in consuming data from the API on the
                back-end side.
              </li>
            </ul>
          </div>
          <div className="about-skills mb-6">
            <h3 className="text-xl font-semibold">Skills</h3>
            <ul className="list-disc list-inside">
              <li>JavaScript, TypeScript, AutoHotkey, Python</li>
              <li>
                React JS, Redux, React Native, HTML & CSS, Apollo Client,
                Next.js
              </li>
              <li>
                Node JS, Express, Sequelize, PostgreSQL, GraphQL, Apollo Server,
                MongoDB, Redis, Rest API
              </li>
            </ul>
          </div>
          <div className="about-projects mb-6">
            <h3 className="text-xl font-semibold">Projects</h3>
            <p>SLAAM (July 2023 – December 2023)</p>
          </div>
          <div className="about-certifications mb-6">
            <h3 className="text-xl font-semibold">Certifications</h3>
            <p>HackerRank JavaScript (Intermediate) Certificate</p>
            <p>Hacktiv8 Web Developer Program</p>
          </div>
          <div className="about-esports mb-6">
            <h3 className="text-xl font-semibold">eSports Experience</h3>
            <p>Professional eSports Athlete - "AmangLy" at Redrocket.id</p>
            <ul className="list-disc list-inside">
              <li>
                Strategized and executed in-game tactics for RedRocket Galactic
                in Red Bull M.E.O. Season 3.
              </li>
              <li>
                Enhanced team performance through rigorous training and skill
                development for competitive play.
              </li>
              <li>
                Fostered community engagement and team visibility on
                international eSports platforms.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
