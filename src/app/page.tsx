'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Team from '@/components/Team';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Team />
      <Projects />
      <Contact />
      <Chatbot />
    </main>
  );
}
