import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Lenis } from '@studio-freight/react-lenis';

// Assuming you have these images in your public folder
import logoImage from './images/logo.png';
import heroImage from './images/robot.png';
import strategyImage from './images/handshake.png';
import insightsImage from './images/photo.jpeg';
import dashboardImage from './images/pin1.jpg';
import ctaImage from './images/wall.avif';
import { Link } from 'react-router-dom';

function App() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <Lenis root>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
        {/* Navbar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="flex justify-between items-center p-6 lg:px-12 bg-gray-900 shadow-lg fixed w-full z-50"
        >
          <div className="flex items-center space-x-4">
            <img src={logoImage} alt="Logo" className="w-auto h-10" />
            <h1 className="text-2xl font-bold text-blue-400">EXECUSENSE</h1>
          </div>
          <div className="hidden md:flex space-x-8">
            {['Home', 'Services', 'About', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <Link to={'/user'}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Get Started
          </motion.button>
          </Link>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative h-screen flex items-center justify-center overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10" />
          <div className="relative z-20 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-4 text-white"
            >
              Empowering Executive Decisions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              Unleash the power of AI-driven insights for strategic leadership
            </motion.p>
            <Link to={'/user'}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white text-xl font-semibold py-4 px-8 rounded-md shadow-lg transition-all duration-300 ease-in-out"
            >
              Discover ExecuSense AI™
            </motion.button></Link>
          </div>
        </motion.div>

        {/* Services Section */}
        <div className="py-24 px-4 bg-gray-800">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">
            Our Services
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { img: strategyImage, title: 'Strategic Decision Support', desc: 'AI-powered insights for informed decision-making' },
              { img: insightsImage, title: 'Employee Satisfaction Insights', desc: 'Analyze and improve workplace engagement' },
              { img: dashboardImage, title: 'Real-Time Leadership Dashboard', desc: 'Comprehensive overview of key performance indicators' },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:shadow-2xl"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <motion.div
                  className="p-6"
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-blue-400">{service.title}</h3>
                  <p className="text-gray-400">{service.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="py-24 px-4 bg-gray-900"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-blue-400">
              ExecuSense AI™: Redefining Executive Intelligence
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              ExecuSense AI™ empowers executives with data-driven insights for strategic decisions, real-time performance monitoring,
              risk forecasting, and employee engagement analysis. Our platform optimizes agility and precision to drive
              organizational growth and resilience in today's dynamic business landscape.
            </p>
             <Link to={'/user'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Learn More About Our Technology
            </motion.button>
               </Link>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="relative py-24">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: `url(${ctaImage})`,
              backgroundSize: 'cover',
            }}
            className="absolute inset-0 z-0"
          />
          <div className="absolute inset-0 bg-blue-900 opacity-75 z-10" />
          <div className="relative z-20 max-w-4xl mx-auto text-center px-4">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-8 text-white"
            >
              Transform Your Executive Decision-Making
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-12 text-gray-200"
            >
              Gain the edge in every decision with real-time insights, predictive intelligence, and seamless
              oversight. ExecuSense AI™ is here to elevate your leadership and drive impactful outcomes.
            </motion.p>
             <Link to={'/user'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 text-xl font-semibold py-3 px-8 rounded-md shadow-lg transition-all duration-300 ease-in-out"
            >
              Schedule a Consultation
            </motion.button>
               </Link>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="py-24 px-4 bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/2 p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                    Stay Informed
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Subscribe to our newsletter for the latest insights in AI-driven executive decision-making.
                  </p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 mb-4 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700"
                  >
                    Subscribe
                  </motion.button>
                </div>
                <div className="md:w-1/2 bg-blue-600 p-8 flex items-center justify-center">
                  <motion.div
                    className="text-4xl font-bold text-white text-center"
                  >
                    Join the AI Revolution in Executive Leadership
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">ExecuSense</h3>
              <p className="text-gray-400">Empowering executives with AI-driven insights.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Services', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Resources</h4>
              <ul className="space-y-2">
                {['Blog', 'Case Studies', 'Whitepaper', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Connect</h4>
              <ul className="space-y-2">
                {['LinkedIn', 'Twitter', 'Facebook', 
                 'Instagram'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 ExecuSense. All rights reserved.</p>
            <p>Powered by LIGMA Technologies</p>
          </div>
        </footer>
      </div>
    </Lenis>
  );
}

export default App;
