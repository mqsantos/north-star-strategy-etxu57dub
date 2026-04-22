import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import XMatrix from './pages/XMatrix'
import Objectives from './pages/Objectives'
import PDCATracker from './pages/PDCATracker'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import KPIHierarchy from './pages/KPIHierarchy'
import Login from './pages/auth/Login'
import { AuthProvider } from './hooks/use-auth'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/matrix" element={<XMatrix />} />
            <Route path="/plan" element={<Objectives />} />
            <Route path="/okrs" element={<KPIHierarchy />} />
            <Route path="/pdca" element={<PDCATracker />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
