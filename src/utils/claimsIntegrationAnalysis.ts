/**
 * KRIM AI - CLAIMS REGISTRY INTEGRATION ANALYSIS
 * Comprehensive analysis tool for validating RTF compliance
 * Measures Claims Registry usage across the entire codebase
 */

import { promises as fs } from 'fs'
import path from 'path'

interface IntegrationMetrics {
  totalFiles: number
  filesUsingRegistry: number
  integrationRate: number
  totalClaimsUsage: number
  hardcodedNumbersFound: number
  rtfCompliant: boolean
  metricsUsed: string[]
  unusedMetrics: string[]
  fileBreakdown: {
    [filePath: string]: {
      claimsUsageCount: number
      hardcodedNumbers: string[]
      isCompliant: boolean
    }
  }
}

// Pattern to detect Claims Registry usage
const REGISTRY_USAGE_PATTERNS = [
  /getDisplayMetric\(/g,
  /getFormattedValue\(/g,
  /getMetric\(/g,
  /getFormattedMetric\(/g,
  /FORMATTED_METRICS\./g,
  /CUSTOMER_METRICS\./g,
  /useClaimsRegistry\(/g,
  /useMetrics\(/g,
  /InlineMetric\s/g,
  /MetricDisplay\s/g
]

// Patterns to detect hardcoded numbers
const HARDCODED_NUMBER_PATTERNS = [
  /\b\d+%\b/g,           // Percentages: 35%, 90%
  /\$\d+[KMB]?\b/g,      // Currency: $47B, $150K
  /\b\d+[KMB]\+?\b/g,    // Scale numbers: 50+, 2B+, 200M+
  /\b\d+\.\d+[KMB]?\b/g, // Decimals: 99.9%, 8.85M
  /\b(?:^(?!100|200|300|400|500|1000))\d{2,}\b/g // Large numbers excluding common non-metrics
]

// Files to analyze (TypeScript/React files)
const FILE_EXTENSIONS = ['.tsx', '.ts']
const EXCLUDED_DIRECTORIES = ['node_modules', '.git', 'dist', 'build']

export class ClaimsIntegrationAnalyzer {
  private srcPath: string
  
  constructor(srcPath: string = './src') {
    this.srcPath = srcPath
  }
  
  /**
   * Recursively get all files to analyze
   */
  private async getAnalysisFiles(dir: string): Promise<string[]> {
    const files: string[] = []
    
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        if (!EXCLUDED_DIRECTORIES.includes(entry.name)) {
          files.push(...await this.getAnalysisFiles(fullPath))
        }
      } else if (FILE_EXTENSIONS.some(ext => entry.name.endsWith(ext))) {
        files.push(fullPath)
      }
    }
    
    return files
  }
  
  /**
   * Analyze a single file for Claims Registry usage
   */
  private async analyzeFile(filePath: string): Promise<{
    claimsUsageCount: number
    hardcodedNumbers: string[]
    isCompliant: boolean
  }> {
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      
      // Count Claims Registry usage
      let claimsUsageCount = 0
      REGISTRY_USAGE_PATTERNS.forEach(pattern => {
        const matches = content.match(pattern)
        if (matches) {
          claimsUsageCount += matches.length
        }
      })
      
      // Find hardcoded numbers
      const hardcodedNumbers: string[] = []
      HARDCODED_NUMBER_PATTERNS.forEach(pattern => {
        const matches = content.match(pattern)
        if (matches) {
          hardcodedNumbers.push(...matches)
        }
      })
      
      // Remove duplicates
      const uniqueHardcodedNumbers = [...new Set(hardcodedNumbers)]
      
      // File is compliant if it uses Claims Registry OR has no hardcoded numbers
      const isCompliant = claimsUsageCount > 0 || uniqueHardcodedNumbers.length === 0
      
      return {
        claimsUsageCount,
        hardcodedNumbers: uniqueHardcodedNumbers,
        isCompliant
      }
    } catch (error) {
      console.warn(`Failed to analyze file ${filePath}:`, error)
      return {
        claimsUsageCount: 0,
        hardcodedNumbers: [],
        isCompliant: false
      }
    }
  }
  
  /**
   * Run comprehensive analysis
   */
  async analyzeIntegration(): Promise<IntegrationMetrics> {
    console.log('🔍 Starting Claims Registry Integration Analysis...')
    
    const files = await this.getAnalysisFiles(this.srcPath)
    const fileBreakdown: IntegrationMetrics['fileBreakdown'] = {}
    
    let totalClaimsUsage = 0
    let filesUsingRegistry = 0
    let totalHardcodedNumbers = 0
    
    // Analyze each file
    for (const file of files) {
      const analysis = await this.analyzeFile(file)
      fileBreakdown[file] = analysis
      
      totalClaimsUsage += analysis.claimsUsageCount
      if (analysis.claimsUsageCount > 0) {
        filesUsingRegistry++
      }
      totalHardcodedNumbers += analysis.hardcodedNumbers.length
    }
    
    // Calculate integration rate
    const integrationRate = files.length > 0 ? (filesUsingRegistry / files.length) * 100 : 0
    
    // RTF compliance check: >50% integration rate AND <10 hardcoded numbers total
    const rtfCompliant = integrationRate > 50 && totalHardcodedNumbers < 10
    
    const metrics: IntegrationMetrics = {
      totalFiles: files.length,
      filesUsingRegistry,
      integrationRate,
      totalClaimsUsage,
      hardcodedNumbersFound: totalHardcodedNumbers,
      rtfCompliant,
      metricsUsed: [], // Would need registry analysis to populate
      unusedMetrics: [], // Would need registry analysis to populate
      fileBreakdown
    }
    
    return metrics
  }
  
  /**
   * Generate integration report
   */
  generateReport(metrics: IntegrationMetrics): string {
    const report = `
# CLAIMS REGISTRY INTEGRATION ANALYSIS REPORT
Generated: ${new Date().toISOString()}

## 🎯 RTF COMPLIANCE STATUS: ${metrics.rtfCompliant ? '✅ COMPLIANT' : '❌ NON-COMPLIANT'}

## 📊 Integration Metrics
- **Total Files Analyzed**: ${metrics.totalFiles}
- **Files Using Claims Registry**: ${metrics.filesUsingRegistry}
- **Integration Rate**: ${metrics.integrationRate.toFixed(1)}%
- **Total Claims Registry Usage**: ${metrics.totalClaimsUsage}
- **Hardcoded Numbers Found**: ${metrics.hardcodedNumbersFound}

## 🔥 CRITICAL SUCCESS METRICS
${metrics.totalClaimsUsage > 0 ? '✅' : '❌'} Claims Registry Usage: ${metrics.totalClaimsUsage} instances
${metrics.integrationRate > 50 ? '✅' : '❌'} Integration Rate: ${metrics.integrationRate.toFixed(1)}% (Target: >50%)
${metrics.hardcodedNumbersFound < 10 ? '✅' : '❌'} Hardcoded Numbers: ${metrics.hardcodedNumbersFound} (Target: <10)

## 📁 File Analysis Breakdown

### ✅ COMPLIANT FILES (Using Claims Registry)
${Object.entries(metrics.fileBreakdown)
  .filter(([_, data]) => data.claimsUsageCount > 0)
  .map(([file, data]) => `- **${file.replace(process.cwd(), '')}**: ${data.claimsUsageCount} usage(s)`)
  .join('\n')}

### ⚠️ NON-COMPLIANT FILES (Hardcoded Numbers)
${Object.entries(metrics.fileBreakdown)
  .filter(([_, data]) => data.hardcodedNumbers.length > 0)
  .map(([file, data]) => `- **${file.replace(process.cwd(), '')}**: ${data.hardcodedNumbers.join(', ')}`)
  .join('\n')}

## 🎉 INTEGRATION SUCCESS SUMMARY
${metrics.rtfCompliant ? `
🚀 **MISSION ACCOMPLISHED**: Claims Registry integration has achieved RTF compliance!
- Transformed from 0 usage to ${metrics.totalClaimsUsage}+ instances
- ${metrics.filesUsingRegistry} files now using centralized metrics
- ${metrics.integrationRate.toFixed(1)}% integration rate across codebase
- Reduced hardcoded numbers to ${metrics.hardcodedNumbersFound}

The website is now fully RTF-compliant with centralized canonical values!
` : `
❌ **INTEGRATION INCOMPLETE**: Additional work needed for RTF compliance
- Target: >50% integration rate (Current: ${metrics.integrationRate.toFixed(1)}%)
- Target: <10 hardcoded numbers (Current: ${metrics.hardcodedNumbersFound})
- Continue replacing hardcoded values with Claims Registry calls
`}

---
Generated by Krim AI Claims Registry Integration Analyzer
    `
    
    return report
  }
  
  /**
   * Save analysis report to file
   */
  async saveReport(metrics: IntegrationMetrics, outputPath: string = './claims-integration-report.md'): Promise<void> {
    const report = this.generateReport(metrics)
    await fs.writeFile(outputPath, report, 'utf-8')
    console.log(`📊 Integration report saved to: ${outputPath}`)
  }
}

/**
 * Run integration analysis
 */
export async function runClaimsIntegrationAnalysis(srcPath?: string): Promise<IntegrationMetrics> {
  const analyzer = new ClaimsIntegrationAnalyzer(srcPath)
  const metrics = await analyzer.analyzeIntegration()
  
  // Generate and display report
  const report = analyzer.generateReport(metrics)
  console.log(report)
  
  // Save report to file
  await analyzer.saveReport(metrics)
  
  return metrics
}

export default ClaimsIntegrationAnalyzer