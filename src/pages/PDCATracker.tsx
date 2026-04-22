import { useEffect, useState } from 'react'
import { getTasks, updateTask } from '@/services/api'
import { useRealtime } from '@/hooks/use-realtime'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, Plus, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const STAGES = [
  { id: 'plan', label: 'Plan' },
  { id: 'do', label: 'Do' },
  { id: 'check', label: 'Check' },
  { id: 'act', label: 'Act' },
]

export default function PDCATracker() {
  const [tasks, setTasks] = useState<any[]>([])

  const loadData = async () => {
    const res = await getTasks()
    setTasks(res)
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('pdca_tasks', loadData)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('taskId', id)
  }

  const handleDrop = async (e: React.DragEvent, stage: string) => {
    e.preventDefault()
    const taskId = e.dataTransfer.getData('taskId')
    if (taskId) {
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, stage } : t)))
      await updateTask(taskId, { stage })
    }
  }

  const getPriorityAccent = (p: string) => {
    if (p === 'high') return 'bg-red-500'
    if (p === 'medium') return 'bg-yellow-500'
    return 'bg-emerald-600'
  }

  const renderBadge = (task: any) => {
    if (task.priority === 'high')
      return (
        <Badge className="bg-red-50 text-red-600 hover:bg-red-50 border-none rounded-sm px-2 py-0 font-bold text-[10px] tracking-wider">
          ! HIGH
        </Badge>
      )
    if (task.stage === 'do' || task.priority === 'medium')
      return (
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-none rounded-sm px-2 py-0 font-bold text-[10px] tracking-wider">
          ⚡ ACTIVE
        </Badge>
      )
    if (task.stage === 'check')
      return <span className="text-[10px] text-muted-foreground font-medium">85% Evaluated</span>
    if (task.priority === 'low')
      return (
        <Badge className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-none rounded-sm px-2 py-0 font-bold text-[10px] tracking-wider">
          ⚠ MEDIUM
        </Badge>
      )
    return null
  }

  return (
    <div className="h-full flex flex-col animate-fade-in space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-editorial text-primary mb-3">PDCA Tracker</h1>
          <p className="text-muted-foreground italic font-editorial text-lg">
            Iterative cycle for continuous improvement across all strategic operational nodes.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Team
            </label>
            <Select defaultValue="strategic_ops">
              <SelectTrigger className="w-[180px] bg-white border-border/60 shadow-sm h-10">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="strategic_ops">Strategic Ops</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Owner
            </label>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-white border-border/60 shadow-sm h-10">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[8px] text-primary-foreground">
                      All
                    </div>
                    All Owners
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 pt-5">
            <Button
              variant="outline"
              className="bg-white border-border/60 shadow-sm h-10 px-4 text-muted-foreground"
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 min-h-0 items-start">
        {STAGES.map((stage) => {
          const stageTasks = tasks.filter((t) => t.stage === stage.id)
          return (
            <div
              key={stage.id}
              className="flex flex-col h-full"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className="flex justify-between items-end mb-4 border-b border-border/60 pb-3 px-1">
                <h3 className="font-editorial text-2xl italic text-primary flex items-center gap-3">
                  {stage.label}{' '}
                  <span className="text-sm not-italic font-sans text-muted-foreground font-medium">
                    {stageTasks.length}
                  </span>
                </h3>
                {stage.id === 'plan' && (
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground cursor-pointer" />
                )}
                {stage.id === 'do' && <Plus className="h-5 w-5 text-primary cursor-pointer" />}
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pb-8">
                {stageTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="bg-white p-5 rounded-sm shadow-sm border border-border/40 cursor-grab active:cursor-grabbing relative hover:shadow-md transition-shadow group"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityAccent(task.priority)}`}
                    />
                    <div className="pl-1 flex flex-col min-h-[100px]">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
                        <span>{task.expand?.project_id?.title?.split(':')[0] || 'EXPANSION'}</span>
                        <span className="text-border">›</span>
                        <span>MARKET SHARE KPI</span>
                      </p>
                      <h4 className="text-[17px] font-editorial font-medium leading-snug mb-6 text-primary group-hover:text-primary/80 transition-colors flex-1">
                        {task.title}
                      </h4>
                      <div className="flex justify-between items-center mt-auto">
                        <Avatar className="h-7 w-7 ring-2 ring-white shadow-sm">
                          <AvatarImage
                            src={`https://img.usecurling.com/ppl/thumbnail?seed=${task.owner_id || task.id}`}
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        {renderBadge(task)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
