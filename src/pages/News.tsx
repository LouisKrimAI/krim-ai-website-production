import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCursorGlow } from '../hooks/useCursorGlow'
import DepthCard from '../components/molecules/DepthCard'
import Button from '../components/Button'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Newspaper, Calendar, User, Tag } from '@phosphor-icons/react'

export default function News() {
  const navigate = useNavigate()
  const mousePosition = useCursorGlow()
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'product' | 'company' | 'industry'>('all')

  const newsArticles = [
    {
      id: 1,
      category: 'product',
      title: 'Krim AI Launches Revolutionary Multi-Agentic OS for Credit Servicing',
      excerpt: 'Introducing the world\'s first autonomous AI infrastructure that transforms $47B cost centers into AI-native profit drivers.',
      date: '2025-01-15',
      author: 'Krim AI Team',
      image: '/images/news/product-launch.jpg',
      tags: ['Product Launch', 'AI Innovation', 'Credit Servicing']
    },
    {
      id: 2,
      category: 'company',
      title: 'Krim AI Achieves SOC 2 Certification',
      excerpt: 'Our commitment to enterprise-grade security reaches new heights with SOC 2 compliance.',
      date: '2025-01-10',
      author: 'Security Team',
      image: '/images/news/soc2-certification.jpg',
      tags: ['Security', 'Compliance', 'Certification']
    },
    {
      id: 3,
      category: 'industry',
      title: 'The Future of AI in Debt Collection: A Comprehensive Analysis',
      excerpt: 'Exploring how artificial intelligence is reshaping the credit servicing industry and creating new opportunities for financial institutions.',
      date: '2025-01-05',
      author: 'Research Team',
      image: '/images/news/ai-future.jpg',
      tags: ['Industry Insights', 'AI Technology', 'Analysis']
    },
    {
      id: 4,
      category: 'product',
      title: 'Introducing 12 Specialized AI Agents for Complete Debt Collection Automation',
      excerpt: 'Meet our AI workforce: from Pre-Due reminders to legal escalations, each agent is purpose-built for optimal performance.',
      date: '2024-12-20',
      author: 'Product Team',
      image: '/images/news/ai-agents.jpg',
      tags: ['AI Agents', 'Automation', 'Product Update']
    },
    {
      id: 5,
      category: 'company',
      title: 'Krim AI Surpasses 200M+ AI Calls Milestone',
      excerpt: 'A major milestone in our journey to transform credit servicing at scale with zero violations.',
      date: '2024-12-15',
      author: 'Krim AI Team',
      image: '/images/news/milestone.jpg',
      tags: ['Milestone', 'Growth', 'Achievement']
    },
    {
      id: 6,
      category: 'industry',
      title: 'FDCPA Compliance in the Age of AI: Best Practices',
      excerpt: 'How AI-powered debt collection can maintain perfect regulatory compliance while improving efficiency.',
      date: '2024-12-10',
      author: 'Compliance Team',
      image: '/images/news/compliance.jpg',
      tags: ['Compliance', 'FDCPA', 'Best Practices']
    }
  ]

  const categories = [
    { id: 'all', label: 'All News' },
    { id: 'product', label: 'Product Updates' },
    { id: 'company', label: 'Company News' },
    { id: 'industry', label: 'Industry Insights' }
  ]

  const filteredArticles = selectedCategory === 'all'
    ? newsArticles
    : newsArticles.filter(article => article.category === selectedCategory)

  return (
    <div className="min-h-screen bg-krim-deep-space relative isolate">
      {/* Cursor glow effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 255, 136, 0.15), transparent 40%)`
        }}
      />

      {/* Background layer */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-krim-mint/[0.02] via-transparent to-krim-cyan/[0.02]" />
        <div className="absolute inset-0 bg-grid bg-[size:60px_60px] opacity-[0.02]" />
      </div>

      {/* Content wrapper with proper z-index layering */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-krim-mint/50 transition-all duration-300 group"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:text-krim-mint transition-colors" />
          </button>
        </div>

        {/* Hero Section */}
        <section className="relative pt-12 pb-20 px-6 text-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-krim-mint/5 via-transparent to-krim-cyan/5" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-2xl bg-krim-mint/10 border border-krim-mint/20">
                  <Newspaper className="w-12 h-12 text-krim-mint" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                <span className="text-white">News & </span>
                <span className="text-krim-mint">Blogs</span>
              </h1>

              <p className="text-xl text-white max-w-3xl mx-auto">
                Latest updates, insights, and stories from Krim AI.
                Stay informed about product launches, industry trends, and company milestones.
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-krim-mint text-black shadow-lg shadow-krim-mint/20'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* News Articles Grid */}
        <section className="relative pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <DepthCard
                    depth="medium"
                    borderGlow
                    className="h-full flex flex-col overflow-hidden group cursor-pointer"
                  >
                    {/* Article Image Placeholder */}
                    <div className="w-full h-48 bg-gradient-to-br from-krim-mint/20 to-krim-cyan/20 flex items-center justify-center">
                      <Newspaper className="w-16 h-16 text-krim-mint/50" />
                    </div>

                    {/* Article Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-krim-mint/10 text-krim-mint border border-krim-mint/20">
                          {categories.find(c => c.id === article.category)?.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-krim-mint transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-white text-sm mb-4 flex-1">
                        {article.excerpt}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-white mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-krim-mint" />
                          <span>{new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-krim-mint" />
                          <span>{article.author}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-white/5 text-white border border-white/10"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Button */}
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full group-hover:bg-krim-mint group-hover:text-black transition-all"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </DepthCard>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {filteredArticles.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <Newspaper className="w-16 h-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-white">Check back later for updates in this category.</p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="relative pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <DepthCard depth="medium" borderGlow className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Stay Updated
                </h2>
                <p className="text-white mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get the latest news, product updates,
                  and industry insights delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white focus:outline-none focus:border-krim-mint transition-colors"
                  />
                  <Button variant="primary" size="md">
                    Subscribe
                  </Button>
                </div>
              </DepthCard>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
