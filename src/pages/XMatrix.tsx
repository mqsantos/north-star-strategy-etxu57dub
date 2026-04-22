import { useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Settings2 } from 'lucide-react'

// Simplified representation of a complex X-Matrix for UI demonstration
export default function XMatrix() {
  const [dots, setDots] = useState<Record<string, number>>({
    '1-1': 1,
    '2-2': 2,
    '3-1': 1,
    '1-3': 2,
  })

  const toggleDot = (id: string) => {
    setDots((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % 3 }))
  }

  const renderDot = (val: number) => {
    if (val === 1) return <div className="h-3 w-3 rounded-full bg-accent mx-auto" />
    if (val === 2)
      return <div className="h-3 w-3 rounded-full border-2 border-accent bg-transparent mx-auto" />
    return (
      <div className="h-3 w-3 rounded-full hover:bg-border/50 mx-auto transition-colors cursor-pointer" />
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
            Strategic Alignment
          </p>
          <h1 className="text-3xl font-editorial font-medium">Global X-Matrix: 2024–2025</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-muted-foreground">
              Fiscal Year
            </label>
            <Select defaultValue="fy24">
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fy24">FY 2024</SelectItem>
                <SelectItem value="fy25">FY 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-semibold text-muted-foreground">
              Department
            </label>
            <Select defaultValue="ops">
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ops">Operations & Supply</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="h-9 mt-4">
            <Settings2 className="h-4 w-4 mr-2" /> View Options
          </Button>
        </div>
      </div>

      <Card className="p-12 overflow-x-auto border-border/50 shadow-sm bg-white min-w-[1000px]">
        <div className="grid grid-cols-[300px_400px_300px] gap-8 mx-auto w-max">
          {/* Top Left (Empty / Title) */}
          <div className="flex items-center justify-center bg-secondary/20 rounded-lg border border-border/50 text-muted-foreground italic text-sm font-serif">
            North Star Alignment
          </div>

          {/* Top (Tactics) */}
          <div className="space-y-6 pb-4">
            <h4 className="text-xs font-semibold text-center text-muted-foreground uppercase tracking-widest">
              Tactics
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-4">
                <span className="text-muted-foreground italic">01.</span> Optimize Tier 1 supply
                chain logistics
              </div>
              <div className="flex gap-4">
                <span className="text-muted-foreground italic">02.</span> Implement automated QA
                frameworks
              </div>
              <div className="flex gap-4">
                <span className="text-muted-foreground italic">03.</span> Transition to Renewables
                energy source
              </div>
            </div>
          </div>

          {/* Top Right (Empty) */}
          <div />

          {/* Left (Annual Objectives) */}
          <div className="space-y-8 pr-4 text-right">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Annual Objectives
            </h4>
            <div className="space-y-8">
              <div>
                <p className="font-medium text-sm">15% Reduction in Carbon Footprint</p>
                <p className="text-xs text-muted-foreground italic mt-1">Core ESG Target</p>
              </div>
              <div>
                <p className="font-medium text-sm">99.9% Manufacturing Uptime</p>
                <p className="text-xs text-muted-foreground italic mt-1">Operational Excellence</p>
              </div>
              <div>
                <p className="font-medium text-sm">Expand Market Share by 4%</p>
                <p className="text-xs text-muted-foreground italic mt-1">Revenue Growth</p>
              </div>
            </div>
          </div>

          {/* Center Matrix */}
          <div className="border border-border/50 bg-secondary/5 relative grid grid-cols-3 grid-rows-3">
            {/* Diagonal cross for aesthetics */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Grid cells */}
            {[1, 2, 3].map((row) =>
              [1, 2, 3].map((col) => {
                const id = `${row}-${col}`
                return (
                  <div
                    key={id}
                    className="border border-border/30 flex items-center justify-center p-4 cursor-pointer hover:bg-background/50 transition-colors"
                    onClick={() => toggleDot(id)}
                  >
                    {renderDot(dots[id] || 0)}
                  </div>
                )
              }),
            )}
          </div>

          {/* Right (Targets) */}
          <div className="pl-4 space-y-6 pt-12">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
              Strategic Targets
            </h4>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium mb-2">$1.2B Annual Revenue</p>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-3/4" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">&lt; 0.5% Defect Rate</p>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-full" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">85 Net Promoter Score</p>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left (Empty) */}
          <div />

          {/* Bottom (Breakthroughs) */}
          <div className="pt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                Breakthrough Goals
              </p>
            </div>
            <div />
            <div className="bg-secondary/20 p-4 rounded-lg border border-border/50 text-center">
              <p className="text-sm font-medium">AI-Integrated Production</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
                3 Year Horizon
              </p>
            </div>
            <div className="bg-secondary/20 p-4 rounded-lg border border-border/50 text-center">
              <p className="text-sm font-medium">Direct-to-Consumer Core</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2">
                5 Year Horizon
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
