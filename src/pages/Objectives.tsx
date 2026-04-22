import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getObjectives } from '@/services/api'
import { useRealtime } from '@/hooks/use-realtime'

export default function Objectives() {
  const [objectives, setObjectives] = useState<any[]>([])

  const loadData = async () => {
    const res = await getObjectives()
    setObjectives(res.filter((o) => o.type === 'breakthrough'))
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('objectives', loadData)

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-editorial font-medium mb-4">Strategic Horizons</h1>
          <p className="text-muted-foreground leading-relaxed">
            Visualizing the 3-5 year breakthrough transformations required to realize our True North
            vision.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          New Objective
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {objectives.map((obj) => (
          <Card
            key={obj.id}
            className="p-8 border-border/50 shadow-sm relative overflow-hidden group"
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${obj.progress > 80 ? 'from-primary to-accent' : obj.progress > 40 ? 'from-accent to-secondary' : 'from-destructive to-secondary'}`}
            />

            <div className="flex justify-between items-start mb-8">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-secondary"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeDasharray={`${obj.progress * 2.83} 283`}
                    className="text-accent transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="absolute text-sm font-medium">{obj.progress}%</span>
              </div>
              <span
                className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${obj.status === 'completed' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}`}
              >
                {obj.horizon || 'Horizon'}
              </span>
            </div>

            <h2 className="text-2xl font-editorial font-medium mb-4 pr-4">{obj.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 min-h-[60px]">
              {obj.description}
            </p>

            <div>
              <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-widest mb-4">
                Linked Annual Goals
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /> Audit 100%
                  of Tier-1 Energy Mix
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" /> Pilot
                  Biodegradable Fleet Packaging
                </li>
              </ul>
            </div>
          </Card>
        ))}

        {/* Add New Card Placeholder */}
        <Card className="p-8 border border-dashed border-border/80 shadow-none bg-transparent flex flex-col items-center justify-center text-center cursor-pointer hover:bg-secondary/20 transition-colors min-h-[400px]">
          <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center mb-6 text-muted-foreground">
            <span className="text-xl">+</span>
          </div>
          <h2 className="text-xl font-editorial font-medium mb-2">Propose New Horizon</h2>
          <p className="text-sm text-muted-foreground max-w-[200px]">
            Identify the next breakthrough for 2026-2030 planning cycle.
          </p>
        </Card>
      </div>
    </div>
  )
}
