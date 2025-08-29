'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects = [
      {
      title: "Reviber",
      description: "An AI-powered idea generation and innovation assistant that suggests creative, resource-based solutions in a simple popup-style interface.",
      image: "/WhatsApp Image 2025-08-29 at 15.17.59_fd2e4063.jpg",
      tags: ["React", "AI", "Innovation", "Productivity"],
      gradient: "from-green-500 to-teal-500",
      links: {
        demo: "https://reviber.netlify.app",
        github: "https://github.com/sarthaksinghaniya/reviber"
      },
      status: "Live"
    },
    {
      title: "HANU-YOUTH",
      description: "Empowering global youth by uniting knowledge, innovation, and communities into one hub. Includes research hub, gamified learning, hackathons, UN updates, AI-assistant, and more.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
      tags: ["Next.js", "AI/ML", "Gamification", "Global Youth"],
      gradient: "from-purple-500 to-pink-500",
      links: {
        demo: "https://your-hanu-youth-link.com",   // 🔗 Replace with real link
        github: "https://github.com/sarthaksinghaniya/hanu-youth" // 🔗 Replace with repo
      },
      status: "Development"
    },
    {
      title: "CodeCollab",
      description: "Real-time collaborative coding platform with integrated video chat, code review, and project management features.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      tags: ["Vue.js", "WebRTC", "Socket.io", "Docker"],
      gradient: "from-blue-500 to-cyan-500",
      links: {
        demo: "#",
        github: "#"
      },
      status: "Development"
    },
    {
      title: "SmartHome Hub",
      description: "IoT dashboard for managing smart home devices with voice control, automation rules, and energy monitoring.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      tags: ["React", "Python", "IoT", "Machine Learning"],
      gradient: "from-orange-500 to-red-500",
      links: {
        demo: "#",
        github: "#"
      },
      status: "Live"
    },
    {
      title: "LearnPath",
      description: "Personalized learning platform that adapts to individual learning styles using AI-driven content recommendations.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
      tags: ["Angular", "Python", "TensorFlow", "PostgreSQL"],
      gradient: "from-indigo-500 to-purple-500",
      links: {
        demo: "#",
        github: "#"
      },
      status: "Beta"
    },
    {
      title: "CryptoTracker Pro",
      description: "Advanced cryptocurrency portfolio tracker with real-time analytics, alerts, and DeFi integration.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      tags: ["React", "Web3", "GraphQL", "Redis"],
      gradient: "from-yellow-500 to-orange-500",
      links: {
        demo: "#",
        github: "#"
      },
      status: "Live"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-500';
      case 'Beta': return 'bg-blue-500';
      case 'Development': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of innovative solutions that showcase our expertise 
            in modern web development, mobile apps, and emerging technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-100 hover:shadow-xl hover:ring-2 hover:ring-opacity-50"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10 blur-md`}></div>
              
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium group-hover:bg-gray-100 transition-colors duration-200 border border-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <motion.a
                    href={project.links.demo}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-300"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.links.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all duration-300"
                  >
                    <Github size={16} />
                  </motion.a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
          >
            View All Projects
            <ArrowRight size={20} className="ml-2" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
