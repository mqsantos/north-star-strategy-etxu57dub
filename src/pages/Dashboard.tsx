import { Card } from '@/components/ui/card'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { BarChart3, Settings2, History, Network } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const chartData = [
  { month: 'Sep 23', actual: 85, plan: 82 },
  { month: 'Oct 23', actual: 88, plan: 84 },
  { month: 'Nov 23', actual: 84, plan: 86 },
  { month: 'Dec 23', actual: 92, plan: 89 },
  { month: 'Jan 24', actual: 95, plan: 91 },
  { month: 'Feb 24', actual: 102, plan: 94 },
  { month: 'Mar 24', actual: 108, plan: 96 },
  { month: 'Apr 24', actual: 105, plan: 99 },
  { month: 'May 24', actual: 112, plan: 102 },
  { month: 'Jun 24', actual: 125, plan: 105 },
  { month: 'Jul 24', actual: 135, plan: 109 },
  { month: 'Sep 24', actual: 142, plan: 112 },
]

function CircularProgress({ value }: { value: number }) {
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex items-center justify-center w-56 h-56">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="112"
          cy="112"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-secondary"
        />
        <circle
          cx="112"
          cy="112"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="text-primary transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-5xl font-light font-editorial text-primary">{value}%</span>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
          Overall Index
        </span>
      </div>
    </div>
  )
}

const metrics = [
  {
    title: 'Net Revenue Retention',
    value: '104.2%',
    target: '102.0%',
    var: '+2.2% Var',
    status: 'On Track',
    progress: 92,
    trend: [20, 25, 22, 30, 28, 35, 45, 40, 50, 48, 60],
  },
  {
    title: 'MQL Conversion',
    value: '18.5%',
    target: '22.0%',
    var: '-3.5% Var',
    status: 'Watch',
    progress: 64,
    trend: [50, 48, 45, 40, 35, 32, 30, 35, 38, 36, 35],
  },
  {
    title: 'OpEx Ratio',
    value: '0.42',
    target: '0.35',
    var: '+0.07 Var',
    status: 'At Risk',
    progress: 112,
    trend: [20, 22, 25, 28, 25, 30, 35, 38, 35, 42, 45],
  },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* SDI Card */}
      <Card
        className="p-8 border-none shadow-sm flex flex-col md:flex-row items-center gap-12 bg-white cursor-pointer hover:shadow-md transition-shadow group"
        onClick={() => navigate('/okrs')}
      >
        <CircularProgress value={82} />
        <div className="flex-1 py-4">
          <h3 className="text-2xl font-editorial mb-4 group-hover:text-primary/80 transition-colors">
            Strategy Deployment Index (SDI)
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-8 text-[15px]">
            Organizational health remains robust. We've seen a{' '}
            <strong className="text-foreground font-semibold">+4.2% lift</strong> since Q2,
            primarily driven by accelerated delivery in the "Customer Core" pillar. Variance in
            operational overhead is being managed through the new PDCA cycle initiated in July.
          </p>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">
                Last Quarter
              </p>
              <p className="text-2xl font-light">78.6%</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">
                Forecasted Q4
              </p>
              <p className="text-2xl font-light">85.0%</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">
                Critical Bottlenecks
              </p>
              <p className="text-2xl font-light text-destructive">2 Items</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <Card
            key={i}
            className="p-6 border-none shadow-sm bg-white flex flex-col cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all group"
            onClick={() => navigate('/okrs')}
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-[17px] font-editorial group-hover:text-primary/80 transition-colors">
                {m.title}
              </h4>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-[3px] font-bold tracking-wider uppercase ${
                  m.status === 'On Track'
                    ? 'bg-[#EAF2EA] text-[#3E5C3E]'
                    : m.status === 'Watch'
                      ? 'bg-[#FFF8E6] text-[#A07A40]'
                      : 'bg-[#FFF0F0] text-[#A04040]'
                }`}
              >
                {m.status}
              </span>
            </div>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-light">{m.value}</span>
              <div className="mb-1">
                <p className="text-[10px] text-muted-foreground">Target: {m.target}</p>
                <p
                  className={`text-[10px] font-bold ${m.status === 'At Risk' ? 'text-destructive' : m.status === 'Watch' ? 'text-[#A07A40]' : 'text-[#3E5C3E]'}`}
                >
                  {m.var}
                </p>
              </div>
            </div>

            <div className="h-16 mb-6 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={m.trend.map((v, idx) => ({ value: v, index: idx }))}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={
                      m.status === 'On Track'
                        ? '#7A8F7A'
                        : m.status === 'Watch'
                          ? '#C2A370'
                          : '#A04040'
                    }
                    strokeWidth={2.5}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-2 font-bold tracking-widest uppercase">
                <span>Q3 Progress</span>
                <span>{m.progress}%</span>
              </div>
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-1000"
                  style={{
                    width: `${Math.min(m.progress, 100)}%`,
                    backgroundColor:
                      m.status === 'On Track'
                        ? '#7A8F7A'
                        : m.status === 'Watch'
                          ? '#C2A370'
                          : '#A04040',
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Deep Dive Section */}
      <Card className="border-none shadow-sm bg-white overflow-hidden mt-2">
        <div className="px-8 py-5 border-b border-border flex justify-between items-center bg-[#FAFAFA]">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-[3px]">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-editorial">Deep Dive: Net Revenue Retention (NRR)</h3>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-[10px] font-bold tracking-widest uppercase h-8 rounded-sm bg-white"
            >
              Export PDF
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/okrs')}
              className="bg-primary text-primary-foreground text-[10px] font-bold tracking-widest uppercase h-8 rounded-sm hover:bg-primary/90"
            >
              View in Hierarchy
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 p-8 border-r border-border">
            <div className="flex items-center gap-8 mb-12 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 font-medium">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Actual Performance
              </div>
              <div className="flex items-center gap-2 font-medium">
                <div className="w-4 h-0.5 border-t-[2.5px] border-dashed border-muted-foreground/60" />{' '}
                Strategic Plan
              </div>
              <div className="ml-auto text-[11px] font-bold tracking-widest uppercase flex items-center gap-1.5 cursor-pointer hover:text-primary">
                Last 12 Months <span className="text-[8px] mt-0.5">▼</span>
              </div>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#888', fontWeight: 500 }}
                    dy={15}
                  />
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '4px',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="plan"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-full lg:w-[380px] p-8 bg-[#FAFAFA]">
            <h4 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-6">
              Owner's Commentary
            </h4>
            <div className="flex gap-4 mb-10">
              <Avatar className="h-10 w-10 border border-border shadow-sm">
                <AvatarImage src="https://img.usecurling.com/ppl/thumbnail?gender=female&seed=12" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold text-foreground">Sarah Chen</p>
                <p className="text-[13px] text-muted-foreground italic mt-2 leading-relaxed font-serif">
                  "Retention is exceeding plan due to the high adoption of our 'Enterprise Catalyst'
                  module. Churn is concentrated in the SME tier, which we are addressing via
                  automated lifecycle touchpoints."
                </p>
              </div>
            </div>

            <h4 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4">
              Strategic Links
            </h4>
            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-3.5 bg-white border border-border rounded-[4px] cursor-pointer hover:border-primary hover:shadow-md transition-all shadow-sm group"
                onClick={() => navigate('/pdca')}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/50 p-1.5 rounded-sm group-hover:bg-primary/10 transition-colors">
                    <Settings2 className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    Root Cause Analysis
                  </span>
                </div>
                <span className="text-muted-foreground text-xs font-bold group-hover:translate-x-1 transition-transform">
                  ›
                </span>
              </div>
              <div
                className="flex items-center justify-between p-3.5 bg-white border border-border rounded-[4px] cursor-pointer hover:border-primary hover:shadow-md transition-all shadow-sm group"
                onClick={() => navigate('/plan')}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/50 p-1.5 rounded-sm group-hover:bg-primary/10 transition-colors">
                    <Network className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    Parent OKR: Scalable Growth
                  </span>
                </div>
                <span className="text-muted-foreground text-xs font-bold group-hover:translate-x-1 transition-transform">
                  ›
                </span>
              </div>
              <div
                className="flex items-center justify-between p-3.5 bg-white border border-border rounded-[4px] cursor-pointer hover:border-primary hover:shadow-md transition-all shadow-sm group"
                onClick={() => navigate('/matrix')}
              >
                <div className="flex items-center gap-3">
                  <div className="bg-secondary/50 p-1.5 rounded-sm group-hover:bg-primary/10 transition-colors">
                    <History className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    Performance History
                  </span>
                </div>
                <span className="text-muted-foreground text-xs font-bold group-hover:translate-x-1 transition-transform">
                  ›
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
