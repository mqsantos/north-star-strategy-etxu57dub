import { Navigate, Outlet, useLocation, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import {
  Compass,
  LayoutGrid,
  Target,
  CheckSquare,
  ListTodo,
  Search,
  Bell,
  HelpCircle,
  RefreshCcw,
  BarChart2,
  ArrowUp,
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
  { title: 'Strategic Plan', icon: Compass, url: '/plan' },
  { title: 'X-Matrix', icon: LayoutGrid, url: '/matrix' },
  { title: 'OKR Hierarchy', icon: Target, url: '/okrs' },
  { title: 'KPI Dashboard', icon: BarChart2, url: '/' },
  { title: 'PDCA Kanban', icon: CheckSquare, url: '/pdca' },
  { title: 'Project Library', icon: ListTodo, url: '/projects' },
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
      <Sidebar className="border-r border-border bg-white">
        <SidebarHeader className="p-8 pb-4">
          <Link to="/" className="flex items-center gap-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-sm shadow-sm">
              <ArrowUp className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-editorial font-medium leading-none text-primary">
                North Star
              </h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1.5 font-semibold">
                Strategy Execution
              </p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-4 py-6">
          <SidebarMenu className="gap-2">
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.url}
                  className="h-11 px-4 rounded-md data-[active=true]:bg-background data-[active=true]:text-primary data-[active=true]:shadow-sm data-[active=true]:border data-[active=true]:border-border/50 text-muted-foreground hover:text-foreground transition-all"
                >
                  <Link to={item.url} className="flex items-center gap-4">
                    <item.icon className="h-4 w-4" />
                    <span className="font-medium text-sm">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-6 space-y-6">
          <Button
            className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm font-semibold tracking-wide"
            size="lg"
          >
            + New Initiative
          </Button>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground h-9 text-xs font-semibold"
              size="sm"
            >
              <HelpCircle className="h-4 w-4 mr-3" /> Help Center
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground h-9 text-xs font-semibold"
              size="sm"
            >
              <RefreshCcw className="h-4 w-4 mr-3" /> Sync Status
            </Button>
          </div>

          <div className="flex items-center gap-3 pt-6 border-t border-border/60">
            <Avatar className="h-10 w-10 border border-border shadow-sm">
              <AvatarImage
                src={`https://img.usecurling.com/ppl/thumbnail?seed=${user?.id || '1'}`}
              />
              <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div
              className="flex flex-col overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              onClick={signOut}
            >
              <span className="text-sm font-bold truncate text-primary">
                {user?.name || 'Arthur Sterling'}
              </span>
              <span className="text-xs text-muted-foreground truncate">Chief Officer</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background flex flex-col min-h-screen overflow-hidden">
        <header className="h-[72px] flex items-center justify-between px-8 bg-white border-b border-border sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-editorial font-medium text-primary">
              {currentRoute === 'KPI Dashboard'
                ? 'Strategic Health Review'
                : currentRoute === 'OKR Hierarchy'
                  ? 'Strategy Deployment Hierarchy'
                  : currentRoute}
            </h2>
            {(currentRoute === 'KPI Dashboard' || currentRoute === 'OKR Hierarchy') && (
              <>
                <div className="w-px h-6 bg-border mx-2" />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                  Q3 Performance Cycle
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-64 hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search metrics..."
                className="pl-9 bg-secondary/30 border-none focus-visible:ring-0 text-sm shadow-none h-9 rounded-sm"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-full h-8 w-8"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-full relative h-8 w-8"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full border-2 border-white" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto animate-fade-in">
          <div className="max-w-[1200px] mx-auto">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
