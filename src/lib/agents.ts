export type Metric = { value: string; trend: string }
export type Agent = {
  id: string
  category: 'borrower'|'staff'
  agentName: string
  title: string
  bio: string
  specialization: string
  philosophy: string
  approach: string
  humanStory: { background:string; inspiration:string; vision:string }
  metrics: Record<string, Metric>
  capabilities: string[]
  successStory: { title:string; description:string; impact:string; metric:string }
  testimonial: { quote:string; author:string; title:string; company:string }
}

export const agents: Agent[] = [
  {
    id:'kim-connect', category:'borrower', agentName:'Kim Connect', title:'Relationship Builder (Day 1–7)',
    bio:'Empathetic early outreach AI trained by veteran counselors.', specialization:'Empathetic Early Contact',
    philosophy:'Trust built early unlocks cooperation later.', approach:'Friendly, human, respectful first contact.',
    humanStory:{ background:'From debt counseling to AI empathy at scale.', inspiration:'Proved empathy drives higher response rates.', vision:'No one feels shamed for missing a payment.'},
    metrics:{ 'Right-Party Contact Rate':{value:'88%',trend:'+20%'}, 'Initial Engagement':{value:'95%',trend:'+15%'}},
    capabilities:['Multi-channel outreach','Sentiment analysis','Legally allowed timing','Personalized messaging','Automatic Mini-Miranda'],
    successStory:{ title:'Zero Complaints in Early Stage', description:'Early stage handled with care and professionalism.', impact:'Foundation for cooperative resolution.', metric:'0 complaints'},
    testimonial:{ quote:'Borrowers actually thank us for reaching out.', author:'Michael Rodriguez', title:'Director of Collections', company:'Regional Credit Union'}
  },
  {
    id:'kim-early', category:'borrower', agentName:'Kim Early', title:'Early-Stage Specialist (Day 1–30)',
    bio:'Negotiation-first AI that finds win‑win payment arrangements.', specialization:'Empathetic Negotiation',
    philosophy:'The best resolutions feel fair to everyone.', approach:'Data + psychology = agreements.',
    humanStory:{ background:'Banking + negotiation expertise embedded in AI.', inspiration:'Most defaults are inability, not unwillingness.', vision:'Flexible plans over rigid pressure.'},
    metrics:{ 'Settlement Offers Accepted':{value:'87%',trend:'+23%'}, 'Payment Plan Uptake':{value:'94%',trend:'+31%'}},
    capabilities:['Flexible plans','Real-time negotiation','Waiver/discount logic','Empathy scripts','Follow-ups on PTP'],
    successStory:{ title:'31% Higher Settlements', description:'Tailored terms increased early recoveries.', impact:'Doubled recovery without hostility.', metric:'+31% recovery'},
    testimonial:{ quote:'Customers feel heard, we close more arrangements.', author:'Jennifer Martinez', title:'Chief Collections Officer', company:'National Healthcare Finance'}
  },
  {
    id:'kim-resolve', category:'borrower', agentName:'Kim Resolve', title:'Solution Finder (Day 31–90)',
    bio:'Firm but fair AI for complex mid-stage cases with zero violations.', specialization:'Complex Case Resolution',
    philosophy:'Clarity + decisiveness resolve tough cases.', approach:'Legal‑aware, respectful, precise.',
    humanStory:{ background:'Compliance officer expertise encoded.', inspiration:'Avoid fines and protect customers.', vision:'Tough but lawful, always.'},
    metrics:{ 'Resolution Rate (31–90d)':{value:'74%',trend:'+35%'}, 'Legal Compliance':{value:'100%',trend:'0%'}},
    capabilities:['Escalation handling','Jurisdiction rules','Risk scoring','Legal handoff','Anti-harassment guardrails'],
    successStory:{ title:'100% Compliance Record', description:'Thousands of cases resolved with no violations.', impact:'Millions recovered without legal risk.', metric:'0 violations'},
    testimonial:{ quote:'Best compliance + negotiation in one AI.', author:'Robert Chen', title:'General Counsel', company:'Fortune 500 Bank'}
  },
  {
    id:'kim-recovery', category:'borrower', agentName:'Kim Recovery', title:'Final Mile Expert (Day 90+)',
    bio:'Turns payoff into loyalty with post‑resolution care.', specialization:'Late-Stage Recovery & Post‑Collection',
    philosophy:'Endings matter. Leave people better.', approach:'Compassion and follow‑through.',
    humanStory:{ background:'CX + counseling experience scaled by AI.', inspiration:'Rebuild trust after payoff.', vision:'Debt recovery → relationship recovery.'},
    metrics:{ 'Recovered Accounts Retained':{value:'87%',trend:'+52%'}, 'Post-Collection NPS':{value:'+45',trend:'+30pts'}},
    capabilities:['Check-ins','Resources offers','Feedback loops','Re‑engagement identification','Credit reporting hygiene'],
    successStory:{ title:'156% More Referrals', description:'Promoters emerge after positive resolution.', impact:'Collections → loyalty engine.', metric:'+156% referrals'},
    testimonial:{ quote:'Some recovered become our strongest promoters.', author:'Lisa Park', title:'Chief Customer Officer', company:'Premium Financial'}
  },
  {
    id:'kim-orchestrator', category:'staff', agentName:'Kim Orchestrator', title:'AI Workflow Orchestrator',
    bio:'Coordinates the AI workforce for max efficiency.', specialization:'Automation & Optimization',
    philosophy:'Right agent, right message, right time.', approach:'Real‑time routing & analytics.',
    humanStory:{ background:'Ops management expertise into an AI brain.', inspiration:'Eliminate manual routing waste.', vision:'A maestro for every case.'},
    metrics:{ 'Agent Utilization':{value:'98%',trend:'+10%'}, 'Operational Cost Reduction':{value:'60%',trend:'+60%'}},
    capabilities:['Dynamic assignment','Live monitoring','A/B strategy tests','Adaptive frequency','Client rule ingestion'],
    successStory:{ title:'60% Efficiency Gain', description:'Automation slashed costs, improved outcomes.', impact:'Humans focus on strategy.', metric:'–60% cost'},
    testimonial:{ quote:'Runs like a well‑oiled machine now.', author:'Chloe Nguyen', title:'COO', company:'Midwest Lending Corp'}
  },
  {
    id:'kim-guardian', category:'staff', agentName:'Kim Guardian', title:'Compliance Sentinel',
    bio:'Live compliance & QA monitoring across all interactions.', specialization:'Real‑time Compliance',
    philosophy:'No success without compliance.', approach:'Always‑on rule checking + alerts.',
    humanStory:{ background:'CFPB/legal expertise at scale.', inspiration:'Proactive shield for consumers & firms.', vision:'Zero violations, ever.'},
    metrics:{ 'Regulatory Violations':{value:'0',trend:'0%'}, 'Audit Readiness':{value:'100%',trend:'+25%'}},
    capabilities:['FDCPA/TCPA guards','Mini‑Miranda insertion','Rule updates (CFPB, SCRA, FCRA)','Full audit trail','Client policy checks'],
    successStory:{ title:'Zero Compliance Issues', description:'No infractions post‑deployment.', impact:'Clean exams & fewer QA hours.', metric:'100% clean audits'},
    testimonial:{ quote:'Like a top compliance officer on every call.', author:'Raj Desai', title:'Chief Risk Officer', company:'Atlas Capital'}
  }
]
