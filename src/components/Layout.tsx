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
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={
                    location.pathname === item.url || location.pathname.startsWith(item.url + '/')
                  }
                  className={cn(
                    'h-10 px-3 rounded-md transition-all text-sm font-medium',
                    location.pathname === item.url || location.pathname.startsWith(item.url + '/')
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
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-6 space-y-4">
          <Button className="w-full justify-center bg-[#2A3547] text-white hover:bg-[#1E2633] shadow-md font-medium tracking-wide h-12">
            New Initiative
          </Button>
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
                className="text-muted-foreground hover:text-primary text-sm font-medium h-[63px] flex items-center border-b-2 border-transparent"
              >
                Dashboard
              </Link>
              <Link
                to="/plan"
                className="text-muted-foreground hover:text-primary text-sm font-medium h-[63px] flex items-center border-b-2 border-transparent"
              >
                Strategy
              </Link>
              <Link
                to="/pdca"
                className="text-primary text-sm font-medium h-[63px] flex items-center border-b-2 border-primary"
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
            <Avatar className="h-8 w-8 border border-border shadow-sm ml-2 cursor-pointer">
              <AvatarImage
                src={`https://img.usecurling.com/ppl/thumbnail?seed=${user?.id || '1'}`}
              />
              <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
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
