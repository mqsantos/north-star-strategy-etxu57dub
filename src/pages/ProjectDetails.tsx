import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProject, getProjectTasks, getKpis } from '@/services/api'
import { useRealtime } from '@/hooks/use-realtime'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Target, AlertCircle, RefreshCcw } from 'lucide-react'

export default function ProjectDetails() {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [kpis, setKpis] = useState<any[]>([])

  const loadData = async () => {
    if (!id) return
    try {
      const proj = await getProject(id)
      setProject(proj)
      const t = await getProjectTasks(id)
      setTasks(t)
      const k = await getKpis()
      setKpis(k.slice(0, 3)) // mock linked kpis
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadData()
  }, [id])

  useRealtime('projects', loadData)
  useRealtime('pdca_tasks', loadData)

  if (!project)
    return (
      <div className="p-8 text-muted-foreground animate-pulse">Loading project definition...</div>
    )

  const formatStage = (stage: string) => {
    switch (stage) {
      case 'plan':
        return { label: 'PLAN', bg: 'bg-[#F4F6F5] text-muted-foreground' }
      case 'do':
        return { label: 'DO', bg: 'bg-[#2A3547] text-white' }
      case 'check':
        return { label: 'CHECK', bg: 'bg-[#F4F6F5] text-muted-foreground' }
      case 'act':
        return { label: 'ACT', bg: 'bg-[#F4F6F5] text-muted-foreground' }
      default:
        return { label: stage, bg: 'bg-[#F4F6F5] text-muted-foreground' }
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-10 animate-fade-in pb-12">
      <div className="flex-1 space-y-10">
        <div>
          <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-3">
            Project Definition • Q4 2023
          </p>
          <h1 className="text-4xl font-editorial text-primary mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg font-editorial italic text-muted-foreground">
            A cross-functional initiative to secure the targeted infrastructure segment.
          </p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-border/50 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-primary font-editorial text-2xl font-bold px-1">!</div>
            <h2 className="text-3xl font-editorial text-primary">Problem Statement</h2>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">
                Contextual Background
              </p>
              <div className="p-5 border border-border/60 rounded-sm bg-background/50 text-sm leading-relaxed text-primary">
                {project.problem_statement ||
                  "Our current market share has plateaued due to localized competition and high cost-of-acquisition models that don't scale with regional regulatory frameworks."}
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">
                Specific Impact
              </p>
              <div className="p-5 border border-border/60 rounded-sm bg-background/50 text-sm leading-relaxed text-primary">
                {project.specific_impact ||
                  'Projected loss of $12M in unrealized pipeline revenue by end of fiscal year.'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-sm border border-border/50 shadow-sm space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-primary" strokeWidth={1.5} />
            <h2 className="text-3xl font-editorial text-primary">Goal Statement</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">
                The Ambition
              </p>
              <div className="p-5 border border-border/60 rounded-sm bg-background/50 text-sm leading-relaxed text-primary h-[120px]">
                {project.ambition ||
                  project.goal_statement ||
                  'Establish a dominant 12% market share within the segment by Q3.'}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">
                  Target Completion
                </p>
                <div className="p-4 border border-border/60 rounded-sm bg-secondary/20 text-sm font-bold text-primary flex items-center h-12">
                  {project.target_completion
                    ? new Date(project.target_completion).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'September 30, 2024'}
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">
                  Budget Allocation
                </p>
                <div className="p-4 border border-emerald-200 rounded-sm bg-[#EAF2EA] text-emerald-900 text-sm font-bold flex items-center h-12">
                  {project.budget_allocation || '$4.5M USD (Strategic Reserve)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-sm border border-border/50 shadow-sm">
          <h2 className="text-3xl font-editorial text-primary mb-2">
            Strategic Alignment & PDCA Steps
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Mapping tactical execution to the Plan-Do-Check-Act lifecycle.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left">
                  <th className="pb-4 font-bold text-[10px] tracking-wider uppercase text-muted-foreground w-28">
                    PDCA Stage
                  </th>
                  <th className="pb-4 font-bold text-[10px] tracking-wider uppercase text-muted-foreground">
                    Strategic Action
                  </th>
                  <th className="pb-4 font-bold text-[10px] tracking-wider uppercase text-muted-foreground w-48">
                    Owner
                  </th>
                  <th className="pb-4 font-bold text-[10px] tracking-wider uppercase text-muted-foreground text-right w-24">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <tr key={task.id} className="group hover:bg-secondary/10 transition-colors">
                      <td className="py-5">
                        <Badge
                          className={`${formatStage(task.stage).bg} rounded-sm px-3 py-1 text-[9px] font-bold tracking-widest border-none shadow-none`}
                        >
                          {formatStage(task.stage).label}
                        </Badge>
                      </td>
                      <td className="py-5 pr-4">
                        <p className="font-medium text-[15px] text-primary mb-1">{task.title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          Regulatory Alignment › Risk Assessment
                        </p>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-7 w-7 bg-primary/10">
                            <AvatarImage
                              src={`https://img.usecurling.com/ppl/thumbnail?seed=${task.owner_id || task.id}`}
                            />
                            <AvatarFallback className="text-[10px] font-bold text-primary">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">
                            {task.expand?.owner_id?.name || 'Jane Doe'}
                          </span>
                        </div>
                      </td>
                      <td className="py-5 text-right font-medium text-[15px]">
                        {task.stage === 'plan' ? '100%' : task.stage === 'do' ? '45%' : '0%'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-muted-foreground font-medium">
                      No tactical steps defined for this initiative yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[320px] shrink-0 space-y-6 pt-16">
        <div className="bg-white p-6 rounded-sm border border-border/50 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Linked Metrics
            </h3>
            <RefreshCcw className="w-3.5 h-3.5 text-muted-foreground" />
          </div>

          <div className="space-y-7">
            {kpis.map((kpi, idx) => (
              <div key={kpi.id || idx}>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-sm font-medium text-primary">{kpi.name}</p>
                  <p className={`text-sm font-bold ${idx === 1 ? 'text-red-600' : 'text-primary'}`}>
                    {idx === 1 ? '$14.2k' : `${kpi.current_value || '4.2'}%`}
                  </p>
                </div>
                <div className="w-full h-[2px] bg-[#F4F6F5] my-2 relative">
                  <div
                    className={`absolute top-0 left-0 h-full ${idx === 1 ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: idx === 1 ? '80%' : '35%' }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] text-muted-foreground">Current</span>
                  <span className="text-[10px] text-primary font-bold">
                    {idx === 1 ? 'Threshold: $9k' : `Target: ${kpi.target_value || '12'}%`}
                  </span>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full text-[10px] font-bold tracking-widest text-primary h-10 mt-6 border-border/60 hover:bg-secondary/30"
            >
              CONFIGURE LIVE SYNC
            </Button>
          </div>
        </div>

        <div className="bg-white border border-border/50 rounded-sm shadow-sm overflow-hidden">
          <div className="h-28 bg-[#2A3547] relative flex items-center justify-center">
            <div className="absolute inset-0 opacity-30 bg-[url('https://img.usecurling.com/p/400/200?q=abstract&color=blue')] bg-cover bg-center mix-blend-overlay" />
            <h3 className="text-2xl font-editorial text-white relative z-10 italic">Vuork</h3>
          </div>
          <div className="p-6">
            <h3 className="text-sm font-bold text-primary mb-3">Strategic Context</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This project directly impacts the 'Global Expansion' pillar of the 2024 Strategy Map.
              Success here unlocks the secondary EMEA phase.
            </p>
          </div>
        </div>

        <div className="bg-[#F8F9FA] p-6 rounded-sm border border-border/50">
          <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-5">
            Project Team
          </h3>
          <div className="flex items-center gap-1.5 mb-4">
            {[1, 2, 3].map((seed) => (
              <Avatar key={seed} className="h-9 w-9 ring-2 ring-[#F8F9FA] shadow-sm">
                <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${seed}`} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ))}
            <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold ring-2 ring-[#F8F9FA] shadow-sm ml-1">
              +12
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground italic">
            Shared with Executive Leadership Group
          </p>
        </div>
      </div>
    </div>
  )
}
