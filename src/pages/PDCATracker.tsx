import { useEffect, useState } from 'react'
import { getTasks, updateTask } from '@/services/api'
import { useRealtime } from '@/hooks/use-realtime'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal } from 'lucide-react'

const STAGES = ['plan', 'do', 'check', 'act']

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
      // Optimistic update
      setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, stage } : t)))
      await updateTask(taskId, { stage })
    }
  }

  const getPriorityColor = (p: string) => {
    if (p === 'high') return 'bg-destructive border-destructive'
    if (p === 'medium') return 'bg-yellow-500 border-yellow-500'
    return 'bg-accent border-accent'
  }

  return (
    <div className="space-y-6 h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-editorial font-medium">PDCA Execution</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track tactical execution cycles in real-time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 min-h-0 pb-8">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className="flex flex-col bg-secondary/30 rounded-xl p-4"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground">
                {stage}
              </h3>
              <Badge variant="secondary" className="bg-background/50">
                {tasks.filter((t) => t.stage === stage).length}
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {tasks
                .filter((t) => t.stage === stage)
                .map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="bg-card p-4 rounded-lg shadow-sm border border-border/50 cursor-grab active:cursor-grabbing hover:shadow-md transition-all relative overflow-hidden"
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${getPriorityColor(task.priority)}`}
                    />
                    <div className="pl-2">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold truncate pr-4">
                          {task.expand?.project_id?.title || 'General Task'}
                        </p>
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground shrink-0 cursor-pointer" />
                      </div>
                      <p className="text-sm font-medium leading-snug mb-4">{task.title}</p>
                      <div className="flex justify-between items-center">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`https://img.usecurling.com/ppl/thumbnail?seed=${task.owner_id}`}
                          />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <span className="text-[10px] text-muted-foreground">Today</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
