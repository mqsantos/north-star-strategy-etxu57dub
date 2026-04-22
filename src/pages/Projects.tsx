import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getProjects } from '@/services/api'
import { useRealtime } from '@/hooks/use-realtime'
import { format } from 'date-fns'
import { FolderKanban, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([])

  const loadData = async () => {
    const res = await getProjects()
    setProjects(res)
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('projects', loadData)

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-editorial font-medium mb-2 text-primary">
            Strategic Initiatives
          </h1>
          <p className="text-muted-foreground text-sm">
            Projects aligned to deliver breakthrough objectives.
          </p>
        </div>
        <Button className="bg-[#2A3547] text-white hover:bg-[#1E2633]">
          <Plus className="h-4 w-4 mr-2" /> New Project
        </Button>
      </div>

      <div className="grid gap-4">
        {projects.map((proj) => (
          <Card
            key={proj.id}
            className="p-6 border-border/50 shadow-sm hover:border-primary/30 transition-colors group flex items-center justify-between relative bg-white"
          >
            <Link to={`/projects/${proj.id}`} className="absolute inset-0" />
            <div className="flex items-start gap-6 w-full relative pointer-events-none">
              <div className="bg-[#F4F6F5] p-3 rounded-lg text-primary group-hover:bg-[#2A3547] group-hover:text-white transition-colors shrink-0">
                <FolderKanban className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-medium text-primary">{proj.title}</h3>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${proj.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-secondary text-muted-foreground'}`}
                  >
                    {proj.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1 max-w-2xl">
                  {proj.problem_statement || 'No problem statement defined yet.'}
                </p>
                <div className="flex gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 font-medium text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />{' '}
                    {proj.expand?.objective_id?.title || 'Unlinked'}
                  </span>
                  <span>Updated {format(new Date(proj.updated), 'MMM d, yyyy')}</span>
                </div>
              </div>
              <div className="hidden md:block shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto text-primary hover:bg-[#F4F6F5]"
                  asChild
                >
                  <Link to={`/projects/${proj.id}`}>View Charter →</Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
