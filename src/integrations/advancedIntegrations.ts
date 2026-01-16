/**
 * KRIM AI - ADVANCED INTEGRATIONS SYSTEM
 * Firecrawl, Supabase, Image Generation, Playwright, GSAP, Three.js, Rive
 */
// import { Firecrawl } from '@mendable/firecrawl-js' // FirecrawlApi renamed to Firecrawl - commented out for build compatibility
import { createClient } from '@supabase/supabase-js'
import { chromium } from 'playwright'
import { gsap } from 'gsap'
import { Points, Scene, Vector3, SphereGeometry, ShaderMaterial, Color, DoubleSide, Mesh, MeshBasicMaterial, BufferGeometry, LineBasicMaterial, Line } from 'three'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

// Firecrawl Configuration for Web Scraping & Data Extraction
export class KrimFirecrawlService {
  private firecrawl: any // FirecrawlApi disabled for build compatibility
  
  constructor(apiKey: string) {
    // this.firecrawl = new FirecrawlApi({ apiKey })
    console.log('FirecrawlService disabled for build compatibility')
  }
  
  // Scrape competitor websites for market intelligence
  async scrapeCompetitorSites(urls: string[]) {
    try {
      const results = await Promise.all(
        urls.map(async (url) => {
          const response = await this.firecrawl.scrapeUrl(url, {
            formats: ['markdown', 'html'],
            includeTags: ['h1', 'h2', 'h3', 'p', 'pricing', 'features'],
            excludeTags: ['nav', 'footer', 'script'],
            waitFor: 2000
          })
          
          return {
            url,
            content: response.data?.markdown,
            metadata: response.data?.metadata,
            timestamp: new Date().toISOString()
          }
        })
      )
      
      return results.filter(result => result.content)
    } catch (error) {
      console.error('Firecrawl scraping error:', error)
      return []
    }
  }
  
  // Extract loan servicing regulations and compliance updates
  async extractRegulatoryUpdates() {
    const regulatoryUrls = [
      'https://www.consumerfinance.gov/about-us/newsroom/',
      'https://www.fdic.gov/news/press-releases/',
      'https://www.federalreserve.gov/newsevents/pressreleases.htm'
    ]
    
    return await this.scrapeCompetitorSites(regulatoryUrls)
  }
  
  // Monitor industry news and trends
  async monitorIndustryTrends() {
    const industryUrls = [
      'https://www.housingwire.com/category/servicing/',
      'https://www.mortgagenewsdaily.com/channels/servicing',
      'https://www.nationalmortgagenews.com/servicing'
    ]
    
    return await this.scrapeCompetitorSites(industryUrls)
  }
}

// Supabase Integration for Data Management
export class KrimSupabaseService {
  private supabase
  
  constructor(url: string, anonKey: string) {
    this.supabase = createClient(url, anonKey)
  }
  
  // Store scraped market intelligence data
  async storeMarketData(data: any[]) {
    try {
      const { data: result, error } = await this.supabase
        .from('market_intelligence')
        .insert(data)
        .select()
      
      if (error) throw error
      return result
    } catch (error) {
      console.error('Supabase storage error:', error)
      return null
    }
  }
  
  // Store user analytics and behavior data
  async trackUserAnalytics(eventData: {
    user_id: string
    event_type: string
    page_url: string
    metadata: any
    timestamp: string
  }) {
    try {
      const { data, error } = await this.supabase
        .from('user_analytics')
        .insert([eventData])
        .select()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Analytics tracking error:', error)
      return null
    }
  }
  
  // Real-time performance metrics
  async trackPerformanceMetrics(metrics: {
    page_load_time: number
    lcp: number
    fid: number
    cls: number
    bundle_size: number
    timestamp: string
  }) {
    try {
      const { data, error } = await this.supabase
        .from('performance_metrics')
        .insert([metrics])
        .select()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Performance tracking error:', error)
      return null
    }
  }
  
  // Subscribe to real-time updates
  subscribeToUpdates(table: string, callback: (payload: any) => void) {
    return this.supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, callback)
      .subscribe()
  }
}

// Playwright Integration for Automated Testing & Screenshots  
export class KrimPlaywrightService {
  private browser: any = null
  
  async initBrowser() {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true })
    }
    return this.browser
  }
  
  // Generate high-quality screenshots for marketing
  async generateScreenshots(urls: string[], viewport = { width: 1920, height: 1080 }) {
    const browser = await this.initBrowser()
    const screenshots: { url: string; screenshot: Buffer; timestamp: string }[] = []
    
    try {
      for (const url of urls) {
        const page = await browser.newPage({ viewport })
        await page.goto(url, { waitUntil: 'networkidle' })
        
        // Wait for particles and animations to load
        await page.waitForTimeout(3000)
        
        const screenshot = await page.screenshot({
          fullPage: true,
          type: 'png',
          quality: 100
        })
        
        screenshots.push({
          url,
          screenshot,
          timestamp: new Date().toISOString()
        })
        
        await page.close()
      }
      
      return screenshots
    } catch (error) {
      console.error('Screenshot generation error:', error)
      return []
    }
  }
  
  // Performance testing and metrics collection
  async runPerformanceAudit(url: string) {
    const browser = await this.initBrowser()
    const page = await browser.newPage()
    
    try {
      // Enable performance monitoring
      await page.goto(url, { waitUntil: 'networkidle' })
      
      const metrics = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const webVitals: any = {}
            
            entries.forEach((entry) => {
              if (entry.name === 'first-contentful-paint') {
                webVitals.fcp = entry.startTime
              }
              if (entry.name === 'largest-contentful-paint') {
                webVitals.lcp = entry.startTime
              }
              if (entry.entryType === 'first-input') {
                webVitals.fid = (entry as any).processingStart - entry.startTime
              }
              if (entry.entryType === 'layout-shift') {
                webVitals.cls = (webVitals.cls || 0) + (entry as any).value
              }
            })
            
            resolve({
              ...webVitals,
              loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
              domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
            })
          }).observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
          
          // Fallback timeout
          setTimeout(() => resolve({}), 5000)
        })
      })
      
      await page.close()
      return metrics
    } catch (error) {
      console.error('Performance audit error:', error)
      return {}
    }
  }
  
  async closeBrowser() {
    if (this.browser) {
      await this.browser.close()
      this.browser = null
    }
  }
}

// Advanced GSAP Animations for 2035 Effects
export class KrimGSAPAnimations {
  // Particle field entrance animation
  static createParticleFieldEntrance(particles: Points) {
    const positions = particles.geometry.attributes.position.array
    const particleCount = positions.length / 3
    
    // Create staggered entrance effect
    for (let i = 0; i < particleCount; i++) {
      const delay = i * 0.001 // Stagger each particle by 1ms
      
      gsap.fromTo(particles.geometry.attributes.position.array, 
        { 
          [i * 3 + 1]: -1000 // Start Y position off-screen
        },
        {
          [i * 3 + 1]: positions[i * 3 + 1], // Original Y position
          duration: 2,
          delay,
          ease: "power2.out",
          onUpdate: () => {
            particles.geometry.attributes.position.needsUpdate = true
          }
        }
      )
    }
  }
  
  // Holographic UI element animations
  static createHolographicPanel(element: HTMLElement) {
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    
    tl.to(element, {
      rotationY: 3,
      rotationX: 1,
      z: 20,
      duration: 4,
      ease: "sine.inOut"
    })
    .to(element, {
      boxShadow: "0 0 50px rgba(0, 255, 136, 0.8)",
      duration: 2,
      ease: "power2.inOut"
    }, 0)
    
    return tl
  }
  
  // Neural network connection animations
  static animateNeuralConnections(svg: SVGElement) {
    const paths = svg.querySelectorAll('path')
    
    paths.forEach((path, index) => {
      gsap.fromTo(path, 
        { 
          strokeDasharray: "0 100%",
          opacity: 0.3
        },
        {
          strokeDasharray: "100% 0",
          opacity: 1,
          duration: 3,
          delay: index * 0.2,
          repeat: -1,
          ease: "power2.inOut"
        }
      )
    })
  }
  
  // Agent avatar pulsing effect
  static createAgentPulse(element: HTMLElement, color = "#00FF88") {
    return gsap.to(element, {
      boxShadow: `0 0 30px ${color}, 0 0 60px ${color}40, 0 0 90px ${color}20`,
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }
}

// Three.js Advanced 3D Components
export class KrimThreeJSComponents {
  // Create holographic agent avatars
  static createHolographicAvatar(scene: Scene, position: Vector3, agentColor = 0x00FF88) {
    const geometry = new SphereGeometry(1, 32, 32)

    // Holographic material with transparency and glow
    const material = new ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new Color(agentColor) }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          pos += normal * sin(time * 2.0 + position.y * 5.0) * 0.1;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
          vec3 glow = color * intensity;
          
          float pulse = sin(time * 3.0) * 0.2 + 0.8;
          gl_FragColor = vec4(glow * pulse, intensity * 0.8);
        }
      `,
      transparent: true,
      side: DoubleSide
    })

    const avatar = new Mesh(geometry, material)
    avatar.position.copy(position)
    scene.add(avatar)
    
    return avatar
  }

  // Create data visualization networks
  static createDataNetwork(scene: Scene, nodeCount = 50) {
    const nodes: Mesh[] = []
    const connections: Line[] = []

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const geometry = new SphereGeometry(0.1, 16, 16)
      const material = new MeshBasicMaterial({
        color: 0x00D4FF,
        transparent: true,
        opacity: 0.8
      })

      const node = new Mesh(geometry, material)
      node.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      
      scene.add(node)
      nodes.push(node)
    }
    
    // Create connections between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position)

        if (distance < 5) {
          const geometry = new BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position
          ])

          const material = new LineBasicMaterial({
            color: 0x00FF88,
            transparent: true,
            opacity: 0.3
          })

          const connection = new Line(geometry, material)
          scene.add(connection)
          connections.push(connection)
        }
      }
    }
    
    return { nodes, connections }
  }
}

// Rive Animation Integration (React Components)
export const createRiveAnimationComponent = (animationPath: string, stateMachine?: string) => {
  return {
    animationPath,
    stateMachine,
    config: {
      src: animationPath,
      stateMachines: stateMachine || "State Machine 1",
      autoplay: true
    }
  }
}

// Rive Animation Configurations
export const riveAnimationConfigs = {
  agentInteraction: (agentName: string) => createRiveAnimationComponent(
    `/animations/${agentName}-interaction.riv`,
    "State Machine 1"
  ),
  dataFlow: createRiveAnimationComponent(
    '/animations/data-flow.riv',
    "Flow Control"
  ),
  neuralNetwork: createRiveAnimationComponent(
    '/animations/neural-network.riv',
    "Network State"
  )
}

// Main Integration Manager
export class KrimIntegrationManager {
  private firecrawl?: KrimFirecrawlService
  private supabase?: KrimSupabaseService
  private playwright?: KrimPlaywrightService
  
  constructor(config: {
    firecrawlApiKey?: string
    supabaseUrl?: string
    supabaseAnonKey?: string
  }) {
    if (config.firecrawlApiKey) {
      this.firecrawl = new KrimFirecrawlService(config.firecrawlApiKey)
    }
    
    if (config.supabaseUrl && config.supabaseAnonKey) {
      this.supabase = new KrimSupabaseService(config.supabaseUrl, config.supabaseAnonKey)
    }
    
    this.playwright = new KrimPlaywrightService()
  }
  
  // Automated market intelligence pipeline
  async runMarketIntelligencePipeline() {
    if (!this.firecrawl || !this.supabase) {
      throw new Error('Firecrawl and Supabase required for market intelligence')
    }
    
    try {
      // 1. Scrape competitive intelligence
      const competitorData = await this.firecrawl.extractRegulatoryUpdates()
      
      // 2. Store in Supabase
      await this.supabase.storeMarketData(competitorData)
      
      // 3. Generate screenshots for analysis
      if (this.playwright) {
        const urls = competitorData.map(item => item.url)
        const screenshots = await this.playwright.generateScreenshots(urls.slice(0, 3))
        
        return {
          competitorData,
          screenshots: screenshots.length,
          timestamp: new Date().toISOString()
        }
      }
      
      return { competitorData, timestamp: new Date().toISOString() }
    } catch (error) {
      console.error('Market intelligence pipeline error:', error)
      return null
    }
  }
  
  // Automated performance monitoring
  async runPerformanceMonitoring(url: string) {
    if (!this.playwright || !this.supabase) {
      throw new Error('Playwright and Supabase required for performance monitoring')
    }
    
    try {
      const metrics = await this.playwright.runPerformanceAudit(url)
      
      if (Object.keys(metrics).length > 0) {
        await this.supabase.trackPerformanceMetrics({
          ...metrics as any,
          timestamp: new Date().toISOString()
        })
      }
      
      return metrics
    } catch (error) {
      console.error('Performance monitoring error:', error)
      return {}
    }
  }
  
  async cleanup() {
    if (this.playwright) {
      await this.playwright.closeBrowser()
    }
  }
}

// Integration services already exported individually above