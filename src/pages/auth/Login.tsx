import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Compass } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('mqsantos@gmail.com')
  const [password, setPassword] = useState('Skip@Pass')
  const [error, setError] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await signIn(email, password)
    if (res.error) {
      setError('Invalid credentials')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-8 bg-card p-8 rounded-xl shadow-elevation border border-border">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-primary/5 p-3 rounded-full mb-2">
            <Compass className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-editorial font-medium">North Star</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
            Strategy Execution
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          <Button
            type="submit"
            className="w-full h-11 text-base bg-primary hover:bg-primary/90 transition-colors"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}
