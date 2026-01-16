import { motion } from 'framer-motion'

        {/* Portfolio Risk Heat Map - Simplified */}
        <motion.div
          className="relative flex flex-col"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="h-full bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-purple-400/40 rounded-lg backdrop-blur-sm relative overflow-hidden">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-purple-400/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-purple-400/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-purple-400/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-purple-400/60" />
            
            <div className="p-2 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <h3 className="text-xs font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                  PORTFOLIO RISK
                </h3>
                <span className="text-[9px] text-white/40 ml-auto">30-DAY</span>
              </div>
              
              {/* Risk Cards Grid */}
              <div className="grid grid-cols-2 gap-1.5 flex-1">
                {[
                  { 
                    segment: '30-60 Days', 
                    amount: '$2.1M', 
                    percentage: '52%',
                    change: '+3.2%',
                    trend: 'up',
                    color: 'border-yellow-400/40 bg-yellow-500/10'
                  },
                  { 
                    segment: '61-90 Days', 
                    amount: '$1.6M', 
                    percentage: '26%',
                    change: '-1.8%',
                    trend: 'down',
                    color: 'border-orange-400/50 bg-orange-500/10'
                  },
                  { 
                    segment: '90+ Days', 
                    amount: '$890K', 
                    percentage: '14%',
                    change: '+2.1%',
                    trend: 'up',
                    color: 'border-red-400/60 bg-red-500/10'
                  },
                  { 
                    segment: 'Legal', 
                    amount: '$445K', 
                    percentage: '8%',
                    change: '-0.5%',
                    trend: 'down',
                    color: 'border-red-500/70 bg-red-600/15'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.segment}
                    className={`relative p-2 rounded border ${item.color} group cursor-pointer h-full`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Header with change */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-[10px] font-bold text-white leading-tight">
                        {item.segment}
                      </div>
                      <div className={`text-[8px] font-bold px-1 py-0.5 rounded ${
                        item.trend === 'up' 
                          ? 'bg-red-500/20 text-red-300' 
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {item.change}
                      </div>
                    </div>
                    
                    {/* Amount */}
                    <div className="text-sm font-bold text-white mb-1">
                      {item.amount}
                    </div>
                    
                    {/* Bottom row */}
                    <div className="flex items-center justify-between mt-auto pt-1">
                      <span className="text-[9px] text-white/50">of portfolio</span>
                      <span className="text-[11px] font-bold text-white">
                        {item.percentage}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Summary */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-400/20">
                <span className="text-[9px] text-purple-300">Total: $5.04M</span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse" />
                  <span className="text-[9px] text-yellow-300 font-medium">Needs Review</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>