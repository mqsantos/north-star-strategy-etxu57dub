import { Navigate, Outlet, useLocation, Link } from 'react-router-dom'
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
  Settings,
  HelpCircle,
  RefreshCcw,
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

const navItems = [
  { title: 'True North', icon: Compass, url: '/' },
  { title: 'X-Matrix', icon: LayoutGrid, url: '/matrix' },
  { title: 'KPI Hierarchy', icon: Target, url: '/kpis' },
  { title: 'Objectives', icon: Flag, url: '/objectives' },
  { title: 'Projects', icon: CheckSquare, url: '/projects' },
  { title: 'PDCA Tracker', icon: ListTodo, url: '/pdca' },
]

export default function Layout() {
  const { user, loading, signOut } = useAuth()
  const location = useLocation()

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!user) return <Navigate to="/login" replace />

  const currentRoute = navItems.find((item) => item.url === location.pathname)?.title || 'Dashboard'

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-border">
        <SidebarHeader className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-editorial font-medium leading-none">North Star</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                Strategy Execution
              </p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-3 py-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.url}
                  className="h-10 px-3 data-[active=true]:bg-accent/10 data-[active=true]:text-primary"
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-6 space-y-4">
          <Button
            className="w-full justify-start bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
            size="lg"
          >
            + New Initiative
          </Button>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground h-9"
              size="sm"
            >
              <HelpCircle className="h-4 w-4 mr-2" /> Help Center
            </Button>
            <Button variant="ghost" className="w-full justify-start text-accent h-9" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" /> Sync Status
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground h-9"
              size="sm"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 glass sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <h2 className="text-lg font-editorial font-medium">Hoshin Kanri: North Star</h2>
            <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
              <Link
                to="/"
                className={
                  location.pathname === '/'
                    ? 'text-primary font-medium border-b-2 border-primary py-5'
                    : 'py-5 hover:text-primary transition-colors'
                }
              >
                Dashboard
              </Link>
              <Link
                to="/matrix"
                className={
                  location.pathname === '/matrix'
                    ? 'text-primary font-medium border-b-2 border-primary py-5'
                    : 'py-5 hover:text-primary transition-colors'
                }
              >
                Strategy
              </Link>
              <Link
                to="/pdca"
                className={
                  location.pathname === '/pdca'
                    ? 'text-primary font-medium border-b-2 border-primary py-5'
                    : 'py-5 hover:text-primary transition-colors'
                }
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
                className="pl-9 bg-transparent border-none focus-visible:ring-0 text-sm shadow-none"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-full"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-full relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2.5 h-1.5 w-1.5 bg-destructive rounded-full" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-full"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8 cursor-pointer ml-2 border border-border">
              <AvatarImage src={`https://img.usecurling.com/ppl/thumbnail?seed=${user.id}`} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto animate-fade-in">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
