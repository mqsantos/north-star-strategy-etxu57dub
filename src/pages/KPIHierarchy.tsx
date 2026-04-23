import { Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function KPIHierarchy() {
  const navigate = useNavigate()

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col relative animate-fade-in bg-white border border-border mt-2 shadow-sm">
      {/* Map View Area */}
      <div className="flex-1 relative overflow-auto custom-scrollbar">
        <div className="min-w-[1000px] flex items-start gap-[80px] pt-16 pl-12 pb-24">
          {/* L0 Column */}
          <div className="relative">
            <Card
              className="w-[280px] p-8 border border-border/60 shadow-sm bg-[#FAFAFA] relative z-10 h-[340px] flex flex-col justify-between cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => navigate('/plan')}
            >
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase mb-6 text-primary">
                  Level 0
                </p>
                <h3 className="text-2xl font-editorial mb-4 group-hover:text-primary/80 transition-colors">
                  Sustainable Enterprise Value
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Core objective for FY24 growth and operational stability.
                </p>
              </div>
              <p className="text-4xl font-light text-primary">94.2</p>
            </Card>

            {/* SVG Connector Lines from L0 to L1 */}
            <svg
              className="absolute top-0 left-[280px] w-[80px] h-[400px] z-0 overflow-visible"
              style={{ pointerEvents: 'none' }}
            >
              <path
                d="M 0,170 C 40,170 40,80 80,80"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <path
                d="M 0,170 C 40,170 40,220 80,220"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <path
                d="M 0,170 C 40,170 40,360 80,360"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* L1 Column */}
          <div className="flex flex-col gap-8 relative mt-[-20px]">
            <Card
              className="w-[250px] p-6 border border-border/60 shadow-sm bg-white relative z-10 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => navigate('/plan')}
            >
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4">
                Revenue & Growth
              </p>
              <h4 className="text-[15px] font-bold mb-6 text-primary group-hover:text-primary/80 transition-colors">
                Net Revenue Retention
              </h4>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-light">112%</span>
                <span className="text-[10px] font-bold text-[#3E5C3E] uppercase pb-1 tracking-widest">
                  On Track
                </span>
              </div>
            </Card>

            <Card
              className="w-[250px] p-6 border border-border/60 shadow-sm bg-white relative z-10 mt-4 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => navigate('/plan')}
            >
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4">
                Efficiency
              </p>
              <h4 className="text-[15px] font-bold mb-6 text-primary group-hover:text-primary/80 transition-colors">
                OpEx / Revenue Ratio
              </h4>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-light">42.8%</span>
                <span className="text-[10px] font-bold text-destructive uppercase pb-1 tracking-widest">
                  At Risk
                </span>
              </div>
            </Card>

            <Card
              className="w-[250px] p-6 border border-border/60 shadow-sm bg-white relative z-10 mt-4 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => navigate('/plan')}
            >
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-border/80" />
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4">
                Future Value
              </p>
              <h4 className="text-[15px] font-bold mb-6 text-primary group-hover:text-primary/80 transition-colors">
                R&D Velocity Index
              </h4>
              <div className="flex items-end gap-3">
                <span className="text-2xl font-light">7.4</span>
                <span className="text-[10px] font-bold text-[#A07A40] uppercase pb-1 tracking-widest">
                  Watch
                </span>
              </div>
            </Card>

            {/* SVG Connector Lines from L1 to L2 */}
            <svg
              className="absolute top-[80px] left-[250px] w-[80px] h-[300px] z-0 overflow-visible"
              style={{ pointerEvents: 'none' }}
            >
              <path
                d="M 0,0 C 40,0 40,40 80,40"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <path
                d="M 0,0 C 40,0 40,160 80,160"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>
            <svg
              className="absolute top-[240px] left-[250px] w-[80px] h-[100px] z-0 overflow-visible"
              style={{ pointerEvents: 'none' }}
            >
              <path
                d="M 0,0 C 40,0 40,80 80,80"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* L2 Column */}
          <div className="flex flex-col gap-6 relative mt-[60px]">
            <Card
              className="w-[250px] p-6 border border-border/60 shadow-sm bg-[#FAFAFA] relative z-10 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => navigate('/projects')}
            >
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-2">
                <span className="text-primary text-sm">✣</span> Marketing
              </p>
              <h4 className="text-[14px] font-bold mb-6 text-primary leading-tight group-hover:text-primary/80 transition-colors">
                MQL Conversion
                <br />
                Rate
              </h4>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-[22px] font-light">3.4%</span>
              </div>
              <div className="h-[3px] w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-[#D1D5DB]" style={{ width: '35%' }} />
              </div>
            </Card>

            <Card
              className="w-[250px] p-6 border border-border/60 shadow-sm bg-[#FAFAFA] relative z-10 mt-2 cursor-pointer hover:border-primary/40 hover:shadow-md transition-all group"
              onClick={() => navigate('/projects')}
            >
              <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-2">
                <span className="text-primary text-sm">🏛</span> Sales EX
              </p>
              <h4 className="text-[14px] font-bold mb-6 text-primary leading-tight group-hover:text-primary/80 transition-colors">
                Average Deal
                <br />
                Cycle
              </h4>
              <div className="flex items-end gap-3 mb-3">
                <span className="text-[22px] font-light">48d</span>
              </div>
              <div className="h-[3px] w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-[#D1D5DB]" style={{ width: '45%' }} />
              </div>
            </Card>

            {/* SVG Connector to Add New */}
            <svg
              className="absolute top-[220px] left-[250px] w-[80px] h-[60px] z-0 overflow-visible"
              style={{ pointerEvents: 'none' }}
            >
              <path
                d="M 0,0 C 40,0 40,40 80,40"
                fill="none"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* L3 Column (Add node) */}
          <div className="flex flex-col relative mt-[230px]">
            <Card
              className="w-[240px] p-6 border border-dashed border-[#D1D5DB] shadow-sm bg-white relative z-10 rounded-b-none text-center group cursor-pointer hover:bg-secondary/20 transition-colors h-[140px] flex flex-col items-center justify-center"
              onClick={() => navigate('/projects')}
            >
              <p className="text-[10px] text-primary/60 uppercase tracking-widest mb-1 flex items-center gap-2 justify-center font-bold">
                <Plus className="h-3 w-3" /> Add
              </p>
              <p className="text-[11px] text-primary/80 uppercase tracking-widest font-bold group-hover:text-primary transition-colors">
                Contributing
                <br />
                KPI
              </p>
            </Card>
            <div className="w-[240px] p-6 text-center border-x border-b border-border/40 bg-[#FAFAFA] rounded-b-md">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-1">
                Project {'>'} KPI
              </p>
              <p className="text-[13px] font-medium text-primary">CRM Optimization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="bg-white border-t border-border px-8 py-5 flex justify-between items-center z-20 absolute bottom-0 left-0 right-0">
        <div className="flex items-center gap-10 text-[10px] font-bold tracking-widest uppercase text-primary">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" /> On Target
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground" /> Underperforming
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D1D5DB]" /> No Data / Inactive
          </div>
        </div>

        <div className="flex items-center bg-transparent rounded-[3px] border border-border p-1">
          <button className="px-5 py-2 text-[10px] font-bold tracking-widest uppercase bg-secondary/50 text-primary rounded-[2px] flex items-center gap-2">
            Map View
          </button>
          <button className="px-5 py-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            List View
          </button>
          <button className="px-5 py-2 text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            Timeline
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="absolute bottom-24 right-8 w-14 h-14 bg-white rounded-full shadow-lg border border-border flex items-center justify-center hover:scale-105 transition-transform z-30 group">
        <Plus className="h-6 w-6 text-primary group-hover:text-primary/80" />
      </button>
    </div>
  )
}
