import { useState, useEffect } from 'react'
import { Navigate, Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import {
  Compass,
  LayoutGrid,
  Target,
  Flag,
  CheckSquare,
  ListTodo,
  Search,
  Bell,
  HelpCircle,
  RefreshCcw,
  Settings,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { createProject, getObjectives } from '@/services/api'

const navItems = [
  { title: 'True North', icon: Compass, url: '/' },
  { title: 'X-Matrix', icon: LayoutGrid, url: '/matrix' },
  { title: 'KPI Hierarchy', icon: Target, url: '/okrs' },
  { title: 'Objectives', icon: Flag, url: '/plan' },
  { title: 'Projects', icon: ListTodo, url: '/projects' },
  { title: 'PDCA Tracker', icon: CheckSquare, url: '/pdca' },
]

export default function Layout() {
  const { user, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [isNewInitiativeOpen, setIsNewInitiativeOpen] = useState(false)
  const [objectives, setObjectives] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: '',
    objective_id: '',
    problem_statement: '',
    goal_statement: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isNewInitiativeOpen && objectives.length === 0) {
      getObjectives().then(setObjectives).catch(console.error)
    }
  }, [isNewInitiativeOpen, objectives.length])

  const handleCreateInitiative = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const project = await createProject({
        ...formData,
        status: 'draft',
      })
      setIsNewInitiativeOpen(false)
      setFormData({ title: '', objective_id: '', problem_statement: '', goal_statement: '' })
      navigate(`/projects/${project.id}`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border bg-[#F8F9FA]">
        <SidebarHeader className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-2 rounded shadow-sm">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-editorial font-medium leading-none text-primary">
                North Star
              </h1>
              <p className="text-[9px] text-muted-foreground uppercase tracking-wider mt-1 font-semibold">
                Strategy Execution
              </p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-4 py-2">
          <SidebarMenu className="gap-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.url ||
                (item.url !== '/' && location.pathname.startsWith(item.url + '/'))
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      'h-10 px-3 rounded-md transition-all text-sm font-medium',
                      isActive
                        ? 'bg-white text-primary shadow-sm border border-border/50 border-l-4 border-l-primary'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-transparent border-l-4 border-l-transparent',
                    )}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-6 space-y-4">
          <Dialog open={isNewInitiativeOpen} onOpenChange={setIsNewInitiativeOpen}>
            <DialogTrigger asChild>
              <Button className="w-full justify-center bg-[#2A3547] text-white hover:bg-[#1E2633] shadow-md font-medium tracking-wide h-12">
                New Initiative
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateInitiative}>
                <DialogHeader>
                  <DialogTitle className="font-editorial text-2xl text-primary">
                    Create New Initiative
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Expand EMEA Market"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Strategic Objective</Label>
                    <Select
                      required
                      value={formData.objective_id}
                      onValueChange={(val) => setFormData({ ...formData, objective_id: val })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select parent objective..." />
                      </SelectTrigger>
                      <SelectContent>
                        {objectives.map((obj) => (
                          <SelectItem key={obj.id} value={obj.id}>
                            {obj.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="problem">Problem Statement</Label>
                    <Textarea
                      id="problem"
                      required
                      rows={3}
                      value={formData.problem_statement}
                      onChange={(e) =>
                        setFormData({ ...formData, problem_statement: e.target.value })
                      }
                      placeholder="What gap or problem does this initiative address?"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal">Goal Statement</Label>
                    <Textarea
                      id="goal"
                      required
                      rows={3}
                      value={formData.goal_statement}
                      onChange={(e) => setFormData({ ...formData, goal_statement: e.target.value })}
                      placeholder="What is the expected outcome or impact?"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsNewInitiativeOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Initiative'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <div className="space-y-1 pt-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground h-8 text-xs font-medium hover:text-primary hover:bg-transparent"
              size="sm"
            >
              <HelpCircle className="h-4 w-4 mr-3" /> Help Center
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground h-8 text-xs font-medium hover:text-primary hover:bg-transparent"
              size="sm"
            >
              <RefreshCcw className="h-4 w-4 mr-3" /> Sync Status
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-[#F4F6F5] flex flex-col min-h-screen overflow-hidden">
        <header className="h-[64px] flex items-center justify-between px-6 bg-[#F8F9FA] border-b border-border sticky top-0 z-30">
          <div className="flex items-center gap-8">
            <h2 className="text-lg font-medium text-primary">Hoshin Kanri: North Star</h2>
            <nav className="hidden md:flex items-center gap-6 h-full pt-1">
              <Link
                to="/"
                className={cn(
                  'text-sm font-medium h-[63px] flex items-center border-b-2',
                  location.pathname === '/'
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground hover:text-primary border-transparent',
                )}
              >
                Dashboard
              </Link>
              <Link
                to="/plan"
                className={cn(
                  'text-sm font-medium h-[63px] flex items-center border-b-2',
                  location.pathname.startsWith('/plan') || location.pathname.startsWith('/okrs')
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground hover:text-primary border-transparent',
                )}
              >
                Strategy
              </Link>
              <Link
                to="/pdca"
                className={cn(
                  'text-sm font-medium h-[63px] flex items-center border-b-2',
                  location.pathname.startsWith('/pdca') || location.pathname.startsWith('/projects')
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground hover:text-primary border-transparent',
                )}
              >
                Execution
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search strategy..."
                className="pl-9 bg-secondary/40 border-border/50 focus-visible:ring-1 text-sm shadow-none h-9 rounded-md"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3 ml-2 cursor-pointer hover:bg-secondary/40 p-1.5 rounded-md transition-colors">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium leading-none">
                  {user.name || 'Strategic Leader'}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{user.email}</p>
              </div>
              <Avatar className="h-8 w-8 border border-border shadow-sm">
                <AvatarImage
                  src={
                    user.avatar
                      ? pb.files.getUrl(user, user.avatar)
                      : `https://img.usecurling.com/ppl/thumbnail?seed=${user.id}`
                  }
                />
                <AvatarFallback>{(user.name || 'U').charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="p-8 mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
