'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, FileText, Brain, History, ArrowUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const handleGetStarted = () => {
    navigate('/signin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">LegalAI Docs</div>
          {/* <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-800">Features</a>
          </div> */}
          <Button onClick={handleGetStarted}>Get Started</Button>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <a href="#features" className="block text-gray-600 hover:text-gray-800">Features</a>
          </div>
        )}
      </header>

      <main>
        <section className="container mx-auto px-4 py-5 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            {...fadeIn}
          >
            AI-Powered Legal Document Management
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Streamline your law firm's workflow with our intelligent document management system. Save time, reduce errors, and focus on what matters most.
          </motion.p>
          <motion.div 
            className="space-x-4"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" onClick={handleGetStarted}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={handleGetStarted}>
              Get Started for Free
            </Button>
          </motion.div>
        </section>

        <section id="features" className="bg-gray-50 pt-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {[
                { icon: <FileText className="h-10 w-10 text-blue-500" />, title: "Smart Document Organization", description: "AI-powered categorization and tagging for easy retrieval." },
                { icon: <Brain className="h-10 w-10 text-green-500" />, title: "Intelligent Search", description: "Natural language processing for intuitive document search." },
                { icon: <History className="h-10 w-10 text-purple-500" />, title: "Automated Document Generation", description: "Create legal documents with AI assistance and built-in version control." },
                { icon: <ArrowUpDown className="h-10 w-10 text-indigo-500" />, title: "Workflow Automation", description: "Custom workflows to streamline your document processes." },
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">LegalAI Docs</h3>
              <p className="text-gray-400">Empowering law firms with AI-driven document management solutions.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            © {new Date().getFullYear()} LegalAI Docs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}