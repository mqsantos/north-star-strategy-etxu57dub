import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getObjectives, getActivities, getTasks, getKpis } from '@/services/api'
import { useRealtime } from '@/hooks/use-realtime'
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts'
import { ArrowUpRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'

const data = [
  { value: 60 },
  { value: 62 },
  { value: 58 },
  { value: 65 },
  { value: 64 },
  { value: 70 },
  { value: 72 },
  { value: 68 },
  { value: 75 },
  { value: 78 },
  { value: 84.2 },
]

export default function Dashboard() {
  const [objectives, setObjectives] = useState<any[]>([])
  const [activities, setActivities] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])

  const loadData = async () => {
    const [objRes, actRes, taskRes] = await Promise.all([
      getObjectives(),
      getActivities(),
      getTasks(),
    ])
    setObjectives(objRes.filter((o) => o.type === 'breakthrough').slice(0, 2))
    setActivities(actRes)
    setTasks(taskRes.filter((t) => t.stage !== 'completed').slice(0, 3))
  }

  useEffect(() => {
    loadData()
  }, [])
  useRealtime('activities', loadData)
  useRealtime('pdca_tasks', loadData)
  useRealtime('objectives', loadData)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-8">
        {/* Hero Section */}
        <Card className="p-10 border-border/50 shadow-elevation bg-gradient-to-br from-card to-secondary/20 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
              Primary Strategic Indicator
            </p>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-5xl md:text-7xl font-editorial font-medium text-primary tracking-tight leading-tight">
                  Market
                  <br />
                  Penetration Index
                </h1>
              </div>
              <div className="text-right">
                <div className="text-5xl font-light text-accent">84.2%</div>
                <div className="flex items-center justify-end text-sm text-muted-foreground mt-2 gap-1">
                  <ArrowUpRight className="h-4 w-4 text-accent" />
                  <span>+2.4% vs prev. cycle</span>
                </div>
              </div>
            </div>

            <div className="h-32 mt-8 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((obj) => (
            <Card
              key={obj.id}
              className="p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer border-border/50"
            >
              <div className="flex justify-between items-start mb-6">
                <span
                  className={`text-xs px-2.5 py-1 rounded-sm font-medium ${obj.status === 'on_track' ? 'status-success' : 'status-error'}`}
                >
                  {obj.status === 'on_track' ? 'On Track' : 'At Risk'}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-xl font-editorial font-medium mb-3">{obj.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-8 min-h-[40px]">
                {obj.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Completion</span>
                  <span>{obj.progress}%</span>
                </div>
                <Progress
                  value={obj.progress}
                  className={`h-1 ${obj.status === 'at_risk' ? '[&>div]:bg-destructive' : '[&>div]:bg-accent'}`}
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Alignment Map */}
        <Card className="p-8 border-border/50 shadow-sm">
          <h3 className="text-xl font-editorial font-medium mb-8">Strategic Alignment Map</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Financial', 'Customer', 'Internal', 'Learning'].map((pillar, i) => (
              <div key={pillar} className="space-y-4">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {pillar}
                </p>
                <div>
                  <p className="text-xl font-medium">
                    {i === 0 ? '92%' : i === 1 ? '74' : i === 2 ? '14d' : '12.5%'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {i === 0
                      ? 'Net Margin'
                      : i === 1
                        ? 'NPS Score'
                        : i === 2
                          ? 'Cycle Time'
                          : 'R&D Ratio'}
                  </p>
                </div>
                <div
                  className={`h-0.5 w-full ${i === 0 || i === 2 ? 'bg-primary' : 'bg-accent'}`}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-8">
        {/* PDCA Reviews */}
        <Card className="p-6 border-border/50 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-editorial font-medium">PDCA Reviews</h3>
            <span className="bg-primary text-primary-foreground text-xs px-2.5 py-1 rounded-full">
              {tasks.length} Pending
            </span>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex gap-4 p-4 rounded-lg bg-secondary/30 border border-transparent hover:border-border transition-colors"
              >
                <div className="mt-1">
                  {task.stage === 'check' ? (
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  ) : task.stage === 'act' ? (
                    <Clock className="h-5 w-5 text-primary" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {task.expand?.project_id?.title} › {task.stage.toUpperCase()}
                  </p>
                  <p className="text-sm font-medium">{task.title}</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="w-full mt-4 text-sm">
            View Full Backlog →
          </Button>
        </Card>

        {/* Live Feed */}
        <Card className="p-6 border-border/50 shadow-sm bg-secondary/10">
          <h3 className="text-xl font-editorial font-medium mb-6">Live Strategy Feed</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {activities.map((act) => (
              <div key={act.id} className="relative flex items-start gap-4">
                <div className="absolute left-0 ml-5 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary/20 z-10" />
                <Avatar className="h-10 w-10 border-2 border-background z-10 ml-0.5">
                  <AvatarImage
                    src={`https://img.usecurling.com/ppl/thumbnail?seed=${act.expand?.user_id?.id}`}
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 pt-1">
                  <p className="text-sm leading-relaxed">
                    <span className="font-medium text-foreground">{act.expand?.user_id?.name}</span>{' '}
                    {act.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {formatDistanceToNow(new Date(act.created))} ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
