'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Team = () => {
  const teamMembers = [
    {
      name: "Dev Tiwari",
      role: "Team Lead, AI/ML Engineer",
      bio: "Leads with clarity and vision. Builds scalable ML systems and mentors the team to deliver reliably.",
      strengths: ["Leadership", "Machine Learning", "AI", "Team Management"],
      image: "/1731466259882[1].jpg",
      links: { 
        github: "https://github.com/devtiwari9943", 
        linkedin: "https://linkedin.com/in/dev-tiwari-a0872031a", 
        email: "devtiwari9943@gmail.com", 
        portfolio: "#" 
      },
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Sarthak Singhaniya",
      role: "Architect, HR, AI/ML Engineer",
      bio: "Oversees system design, team dynamics, and AI/ML strategy. Ensures technical excellence and team growth.",
      strengths: ["System Architecture", "Team Building", "AI/ML Strategy"],
      image: "/IMG20241204110307[1].jpg",
      links: { 
        github: "https://github.com/sarthaksinghaniya", 
        linkedin: "https://www.linkedin.com/in/sarthak-singhaniya-a4ab9a323", 
        email: "sarthaksinghaniya789@gmail.com",
        portfolio: "https://sarthaksinghaniya.netlify.app" 
      },
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Shubhang Mishra",
      role: "Full Stack Developer",
      bio: "Connects backend and frontend with clean, maintainable code and a problem‑solving mindset.",
      strengths: ["Backend + Frontend", "Problem Solving", "Clean Code"],
      image: "/WhatsApp Image 2025-08-27 at 15.25.53_1706f5b1.jpg",
      links: { 
        github: "https://github.com/Shubhang1022", 
        linkedin: "https://www.linkedin.com/in/shubhang-mishra-8a1996328", 
        email: "mishrashanu233@gmail.com", 
        portfolio: "#" 
      },
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      name: "Vishal Verma",
      role: "Frontend Developer",
      bio: "Crafts responsive, user‑friendly interfaces with attention to detail and usability.",
      strengths: ["UI/UX", "Responsive Design", "Frontend Frameworks"],
      image: "/WhatsApp Image 2025-08-27 at 16.14.25_42c3464f.jpg",
      links: { 
        github: "https://github.com/vishal122333", 
        linkedin: "https://www.linkedin.com/in/vishal-verma-730056305", 
        email: "vishalofficial700@gmail.com", 
        portfolio: "#" 
      },
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      name: "Vaishnavi Choudhary",
      role: "Backend Developer",
      bio: "Builds reliable server‑side logic with clean APIs and solid database foundations.",
      strengths: ["Database Management", "APIs", "Server‑side Logic"],
      image: "/WhatsApp Image 2025-08-27 at 16.11.49_bbb1b54f.jpg",
      links: { 
        github: "https://github.com/vaishnavi933", 
        linkedin: "https://www.linkedin.com/in/vaishnavi-choudhary-2a1a40340", 
        email: "vaishnavichoudhary0212@gmail.com", 
        portfolio: "#" 
      },
      gradient: "from-green-500 to-teal-500"
    },
    {
      name: "Yashashvi Mishra",
      role: "Frontend Developer, Visionary",
      bio: "Adds creative direction and ensures ideas translate into intuitive UI experiences.",
      strengths: ["Creative Ideas", "Visionary Thinking", "UI Development", "Innovation"],
      image: "/WhatsApp%20Image%202025-08-27%20at%2017.49.01_2affbb4d.jpg",
      links: { 
        github: "https://github.com/Yashashvi-Mishra", 
        linkedin: "https://www.linkedin.com/in/yashashvi-mishra-b1a4702a1", 
        email: "yashashvi02112004@gmail.com", 
        portfolio: "#" 
      },
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Meet Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Team</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The brilliant minds behind HANUBELL. Each member brings unique expertise and 
            passion to create extraordinary digital experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="group relative bg-white rounded-3xl p-6 shadow-lg transition-all duration-300 border border-gray-100 hover:shadow-xl hover:ring-2 hover:ring-opacity-50"
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10 blur-md`}></div>
              
              {/* Profile Image */}
              <div className="relative mb-8">
                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-0.5 overflow-hidden">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <div className={`w-full h-full transform ${member.name === 'Sarthak Singhaniya' ? 'scale-110 -translate-y-1' : ''}`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-full object-cover ${member.name === 'Sarthak Singhaniya' ? 'object-top' : 'object-center'}`}
                        style={member.name === 'Sarthak Singhaniya' ? { objectPosition: '60% 15%' } : {}}
                      />
                    </div>
                  </div>
                </div>
                <div className={`absolute inset-0 w-28 h-28 mx-auto rounded-full bg-gradient-to-r ${member.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300 -z-10`}></div>
              </div>

              {/* Member Info */}
              <div className="text-center mb-5">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className={`text-sm font-semibold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-2`}>
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">{member.bio}</p>
                {(member as any).strengths && Array.isArray((member as any).strengths) && (
                  <div className="flex flex-wrap justify-center gap-2">
                    {(member as any).strengths.map((s: string) => (
                      <span key={s} className="px-2.5 py-1 rounded-full text-xs bg-gray-50 text-gray-700 border border-gray-100">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                {member.links.portfolio && (
                  <motion.a
                    href={member.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    aria-label={`${member.name} Portfolio`}
                    title="View Portfolio"
                  >
                    <ExternalLink size={16} />
                  </motion.a>
                )}
                <motion.a
                  href={member.links.github}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label={`${member.name} GitHub`}
                >
                  <Github size={18} />
                </motion.a>
                <motion.a
                  href={member.links.linkedin}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href={`mailto:${member.links.email}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  aria-label={`Email ${member.name}`}
                >
                  <Mail size={18} />
                </motion.a>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
            </motion.div>
          ))}
        </div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to Join Our Team?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for innovation 
              and excellence. Let's build something amazing together.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
            >
              Get In Touch
              <ExternalLink size={18} className="ml-2" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
