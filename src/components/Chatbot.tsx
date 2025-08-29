'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, MessageCircle, Smile, Image as ImageIcon, File, Paperclip, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import emoji picker to avoid SSR issues
const EmojiPicker = dynamic(
  () => import('emoji-picker-react'),
  { ssr: false }
);

interface Media {
  type: 'image' | 'file';
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read';
  reactions?: string[];
  isEdited?: boolean;
  media?: Media;
}

// Knowledge base for HANUBELL
const HANUBELL_KNOWLEDGE = {
  greetings: [
    "👋 Hello! I'm Hanu-Bai, your HANUBELL assistant. How can I help you today?",
    "🌟 Hi there! I'm here to assist you with HANUBELL. What would you like to know?",
    "💫 Greetings! I'm Hanu-Bai, ready to help with all things HANUBELL!"
  ],
  about: [
    "🚀 HANUBELL is a creative agency specializing in web development, design, and digital solutions. We help businesses establish a strong online presence.",
    "💡 We're a team of passionate developers and designers dedicated to creating beautiful, functional websites and applications.",
    "✨ At HANUBELL, we transform ideas into digital experiences that make an impact."
  ],
  services: [
    "🛠️ We offer a range of services including: \n• Web Development \n• UI/UX Design \n• Mobile App Development \n• Digital Marketing",
    "🎨 Our services include custom website development, e-commerce solutions, and brand identity design.",
    "⚡ From concept to launch, we provide end-to-end digital solutions tailored to your needs."
  ],
  team: [
    "👥 Our amazing team consists of 6 talented individuals:\n\n1. Alex Johnson - Full Stack Developer\n2. Sarah Chen - UI/UX Designer\n3. Michael Brown - Project Manager\n4. Emily Davis - Frontend Developer\n5. David Kim - Backend Developer\n6. Jessica Lee - Digital Marketer\n\nWould you like to know more about any team member? 😊",
    "🌟 Meet our team of creative professionals passionate about building amazing digital experiences.",
    "💻 The HANUBELL team is dedicated to delivering exceptional results with their diverse skills and expertise."
  ],
  contact: [
    "📧 You can reach us at: email@hanubell.com\n📞 Call us at: (123) 456-7890\n📍 Visit us at: 123 Tech Street, Silicon Valley",
    "💌 Contact us through our website's contact form or email us directly at email@hanubell.com",
    "📱 For inquiries, please email us at email@hanubell.com or visit our contact page."
  ],
  projects: [
    "💼 We've worked on various projects including:\n• E-commerce platforms\n• Web applications\n• Mobile apps\n• Digital marketing campaigns",
    "🎯 Our portfolio includes projects in industries like healthcare, education, and e-commerce.",
    "✨ Check out our projects section to see some of our recent work and case studies!"
  ],
  teamMembers: {
    'alex': {
      name: 'Alex Johnson',
      role: 'Full Stack Developer',
      bio: '💻 Full Stack Developer with 8+ years of experience in building scalable web applications. Specializes in React, Node.js, and cloud technologies.',
      funFact: '⚡ Loves solving complex problems and contributing to open source projects.'
    },
    'sarah': {
      name: 'Sarah Chen',
      role: 'UI/UX Designer',
      bio: '🎨 Creative UI/UX Designer with a passion for creating intuitive and beautiful user experiences. Expert in Figma and user research.',
      funFact: '🎨 Spends weekends painting and exploring new design trends.'
    },
    'michael': {
      name: 'Michael Brown',
      role: 'Project Manager',
      bio: '📊 Seasoned Project Manager with 10+ years of experience in agile development and team leadership. Ensures projects are delivered on time and within scope.',
      funFact: '🏆 Holds multiple certifications in Agile and Scrum methodologies.'
    },
    'emily': {
      name: 'Emily Davis',
      role: 'Frontend Developer',
      bio: '✨ Frontend Developer specializing in React and modern JavaScript. Passionate about creating responsive and accessible web applications.',
      funFact: '🌱 Enjoys mentoring junior developers and writing technical blogs.'
    },
    'david': {
      name: 'David Kim',
      role: 'Backend Developer',
      bio: '🔧 Backend Developer with expertise in Node.js, Python, and database design. Focuses on building robust and scalable APIs.',
      funFact: '🎮 When not coding, you can find him playing chess or video games.'
    },
    'jessica': {
      name: 'Jessica Lee',
      role: 'Digital Marketer',
      bio: '📈 Digital Marketing Specialist with a focus on SEO, content strategy, and social media marketing. Helps businesses grow their online presence.',
      funFact: '✈️ Loves traveling and exploring different cultures.'
    }
  },
  default: [
    "🤔 I'm not sure I understand. Could you rephrase that?",
    "🧠 I'm still learning! Could you try asking something else?",
    "💡 I'm not sure about that. Maybe I can help with something else related to HANUBELL?"
  ]
};

const Chatbot = () => {
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: HANUBELL_KNOWLEDGE.greetings[0],
      isBot: true,
      timestamp: new Date(),
      status: 'read',
      reactions: []
    }
  ]);

  // Handle file selection and validation
  const handleFiles = (files: File[]) => {
    const validFiles: File[] = [];
    const newPreviewUrls: Record<string, string> = {};
    
    Array.from(files).forEach(file => {
      // Check file type
      const validTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain'
      ];
      
      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        alert(`File type not supported: ${file.name}`);
        return;
      }
      
      if (file.size > maxSize) {
        alert(`File too large (max 5MB): ${file.name}`);
        return;
      }
      
      validFiles.push(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        newPreviewUrls[file.name] = URL.createObjectURL(file);
      }
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
    setPreviewUrls(prev => ({ ...prev, ...newPreviewUrls }));
  };

  // Remove a file from selection
  const removeFile = (index: number) => {
    const file = selectedFiles[index];
    if (file && previewUrls[file.name]) {
      URL.revokeObjectURL(previewUrls[file.name]);
      const newPreviewUrls = { ...previewUrls };
      delete newPreviewUrls[file.name];
      setPreviewUrls(newPreviewUrls);
    }
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Clear all selected files
  const clearAllFiles = () => {
    // Clean up object URLs
    Object.values(previewUrls).forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls({});
    setSelectedFiles([]);
  };
  
  // Handle file selection via input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
      // Reset the input value to allow selecting the same file again
      if (e.target) e.target.value = '';
    }
  };
  
  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  // Handle drag leave
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get file icon based on file type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <File className="w-5 h-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <File className="w-5 h-5 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <File className="w-5 h-5 text-green-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <ImageIcon className="w-5 h-5 text-purple-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  // Scroll to a specific section of the page
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Add highlight effect
      element.classList.add('highlight-section');
      setTimeout(() => {
        element.classList.remove('highlight-section');
      }, 2000);
    }
  };

  // Get appropriate response based on user input
  const getBotResponse = (userInput: string): { text: string; action?: () => void } => {
    const input = userInput.toLowerCase().trim();
    const randomResponse = (responses: string[]) => 
      responses[Math.floor(Math.random() * responses.length)];
    
    // Check for team member queries
    const teamMemberMatch = input.match(/(alex|sarah|michael|emily|david|jessica)/i);
    if (teamMemberMatch) {
      const memberKey = teamMemberMatch[0].toLowerCase();
      const member = HANUBELL_KNOWLEDGE.teamMembers[memberKey as keyof typeof HANUBELL_KNOWLEDGE.teamMembers];
      if (member) {
        return {
          text: `👤 **${member.name}**\n💼 ${member.role}\n\n${member.bio}\n\n✨ Fun Fact: ${member.funFact}`,
          action: () => scrollToSection('team')
        };
      }
    }
    
    // Check for greetings
    if (/^(hi|hello|hey|greetings?|yo)/i.test(input)) {
      return { text: randomResponse(HANUBELL_KNOWLEDGE.greetings) };
    }
    
    // Check for about queries
    if (/(what.*hanubell|who.*hanubell|about.*hanubell|hanubell.*about)/i.test(input)) {
      return {
        text: randomResponse(HANUBELL_KNOWLEDGE.about),
        action: () => scrollToSection('about')
      };
    }
    
    // Check for services queries
    if (/(service|what.*do|offer|provide|can you|help with)/i.test(input)) {
      return {
        text: randomResponse(HANUBELL_KNOWLEDGE.services),
        action: () => scrollToSection('services')
      };
    }
    
    // Check for team queries
    if (/(team|who.*work|developer|designer|staff|member|colleague)/i.test(input)) {
      // If asking about a specific role
      const roleMatch = input.match(/(developer|designer|manager|marketer|frontend|backend|full stack)/i);
      if (roleMatch) {
        const role = roleMatch[0].toLowerCase();
        const members = Object.values(HANUBELL_KNOWLEDGE.teamMembers).filter(member => 
          member.role.toLowerCase().includes(role)
        );
        
        if (members.length > 0) {
          const memberList = members.map(m => `• ${m.name} - ${m.role}`).join('\n');
          return {
            text: `👥 Here are our ${role} team members:\n\n${memberList}\n\nAsk me about any of them to learn more!`,
            action: () => scrollToSection('team')
          };
        }
      }
      
      return {
        text: randomResponse(HANUBELL_KNOWLEDGE.team),
        action: () => scrollToSection('team')
      };
    }
    
    // Check for contact queries
    if (/(contact|email|phone|number|reach|get in touch)/i.test(input)) {
      return {
        text: randomResponse(HANUBELL_KNOWLEDGE.contact),
        action: () => scrollToSection('contact')
      };
    }
    
    // Check for projects/portfolio queries
    if (/(project|portfolio|work|showcase|example|case study)/i.test(input)) {
      return {
        text: randomResponse(HANUBELL_KNOWLEDGE.projects),
        action: () => scrollToSection('projects')
      };
    }
    
    // Default response
    return {
      text: HANUBELL_KNOWLEDGE.default[
        Math.floor(Math.random() * HANUBELL_KNOWLEDGE.default.length)
      ]
    };
  };

  // Handle sending message
  const handleSendMessage = () => {
    if ((!inputMessage.trim() && selectedFiles.length === 0) || isTyping) return;

    const userMessage = inputMessage.trim();
    const newMessages: Message[] = [];
    
    // Add user's text message if exists
    if (userMessage) {
      newMessages.push({
        id: Date.now(),
        text: userMessage,
        isBot: false,
        timestamp: new Date(),
        status: 'sent'
      });
      
      // Clear input after sending
      setInputMessage('');
    }

    // Add file messages if any
    if (selectedFiles.length > 0) {
      selectedFiles.forEach(file => {
        newMessages.push({
          id: Date.now() + Math.random(),
          text: `File: ${file.name}`,
          isBot: false,
          timestamp: new Date(),
          status: 'sending',
          media: {
            type: file.type.startsWith('image/') ? 'image' : 'file',
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            mimeType: file.type
          }
        });
      });
      
      // Clear files after sending
      setSelectedFiles([]);
      setPreviewUrls({});
    }

    // Update messages with user's message
    setMessages(prev => [...prev, ...newMessages]);
    setShowEmojiPicker(false);

    // Only show typing indicator for text messages
    if (userMessage) {
      setIsTyping(true);
      
      // Simulate typing delay
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        
        setMessages(prev => [
          ...prev,
          {
            id: Date.now(),
            text: botResponse.text,
            isBot: true,
            timestamp: new Date(),
            status: 'read'
          }
        ]);
        
        // Execute any associated action (like scrolling)
        if (botResponse.action) {
          // Small delay before scrolling to ensure message is rendered
          setTimeout(() => botResponse.action!(), 100);
        }
        
        setIsTyping(false);
      }, 1000);
    }
  };

  // Handle key press in input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Format message with proper line breaks, links, and emojis
  const formatMessage = (text: string) => {
    if (!text) return '';
    
    // Convert URLs to clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {part}
          </a>
        );
      }
      return part.split('\n').map((line, j) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < part.split('\n').length - 1 && <br />}
        </span>
      ));
    });
  };

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      // Clean up preview URLs
      Object.values(previewUrls).forEach(url => URL.revokeObjectURL(url));
      
      // Clean up any message media URLs
      messages.forEach(msg => {
        if (msg.media && msg.media.url.startsWith('blob:')) {
          URL.revokeObjectURL(msg.media.url);
        }
      });
    };
  }, [previewUrls, messages]);

  // Scroll to bottom when messages or selected files change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedFiles]);

  // Handle click outside to close popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg flex items-center justify-center focus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute bottom-20 right-0 w-96 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
            style={{ height: '600px' }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot size={20} />
                <h3 className="font-semibold">Hanu-Bai</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Container */}
            <div 
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md rounded-2xl px-4 py-2 ${
                      message.isBot
                        ? 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-tr-none'
                    }`}
                  >
                    {message.media && (
                      <div className="mb-2 rounded-lg overflow-hidden">
                        {message.media.type === 'image' ? (
                          <img
                            src={message.media.url}
                            alt={message.media.name}
                            className="max-w-full h-auto rounded-lg"
                          />
                        ) : (
                          <a
                            href={message.media.url}
                            download={message.media.name}
                            className="flex items-center p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
                          >
                            <File className="w-5 h-5 mr-2" />
                            <div className="truncate flex-1">
                              <div className="font-medium text-sm">{message.media.name}</div>
                              <div className="text-xs text-gray-500">
                                {formatFileSize(message.media.size)}
                              </div>
                            </div>
                            <ExternalLink className="w-4 h-4 ml-2 text-gray-400" />
                          </a>
                        )}
                      </div>
                    )}
                    <div className="text-sm">{formatMessage(message.text)}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.status === 'sending' && (
                        <span className="text-xs opacity-70">Sending...</span>
                      )}
                      {message.status === 'sent' && (
                        <span className="text-xs opacity-70">✓</span>
                      )}
                      {message.status === 'read' && (
                        <span className="text-xs opacity-70">✓✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-white border-t border-gray-100">
              {/* File upload preview */}
              {selectedFiles.length > 0 && (
                <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
                    </span>
                    <button
                      type="button"
                      onClick={clearAllFiles}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200"
                      >
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          {file.type.startsWith('image/') ? (
                            <img
                              src={previewUrls[file.name]}
                              alt={file.name}
                              className="w-8 h-8 object-cover rounded"
                            />
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
                              {getFileIcon(file.name)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isDragging ? 'Drop files here...' : 'Type your message...'}
                    className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                  />
                  {isDragging && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full border-2 border-dashed border-purple-500 pointer-events-none">
                      <span className="text-purple-500 font-medium">Drop files here</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-500 hover:text-purple-500 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Paperclip size={20} />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                    />
                  </button>
                  
                  <div className="relative" ref={emojiPickerRef}>
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 text-gray-500 hover:text-purple-500 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Smile size={20} />
                    </button>
                    
                    {showEmojiPicker && (
                      <div className="absolute bottom-12 right-0">
                        <EmojiPicker
                          onEmojiClick={(emojiData) => {
                            setInputMessage(prev => prev + emojiData.emoji);
                            setShowEmojiPicker(false);
                          }}
                          width={300}
                          height={350}
                        />
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() && selectedFiles.length === 0}
                    className="p-2 text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-full hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>

              {/* Quick Replies */}
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  { text: 'About Us', query: 'Tell me about HANUBELL', section: 'about' },
                  { text: 'Services', query: 'What services do you offer?', section: 'services' },
                  { text: 'Our Team', query: 'Who works at HANUBELL?', section: 'team' },
                  { text: 'Contact', query: 'How can I contact you?', section: 'contact' },
                  { text: 'Projects', query: 'Show me your projects', section: 'projects' }
                ].map((action) => (
                  <motion.button
                    key={action.text}
                    onClick={() => {
                      setInputMessage(action.query);
                      // Auto-send the message and scroll to section
                      setTimeout(() => {
                        handleSendMessage();
                        if (action.section) {
                          setTimeout(() => scrollToSection(action.section), 500);
                        }
                      }, 100);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
