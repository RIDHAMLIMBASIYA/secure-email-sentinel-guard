import { Shield, Mail, Lock, BarChart3, AlertTriangle, History, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { id: 'dashboard', name: 'Security Dashboard', icon: BarChart3 },
  { id: 'phishing', name: 'Phishing Detection', icon: AlertTriangle },
  { id: 'encryption', name: 'Email Encryption', icon: Lock },
  { id: 'threats', name: 'Threat Logs', icon: History },
  { id: 'settings', name: 'Settings', icon: Settings },
]

export function Sidebar({ activeSection, onSectionChange, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 z-50 w-64 h-[calc(100vh-4rem)] bg-card border-r border-border transform transition-transform duration-300 ease-in-out md:relative md:top-0 md:translate-x-0 md:z-auto",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Security Status</p>
                <p className="text-xs text-success">All Systems Operational</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start space-x-3 h-11",
                  activeSection === item.id && "bg-cyber-gradient cyber-glow"
                )}
                onClick={() => {
                  onSectionChange(item.id)
                  onClose()
                }}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Button>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Security Level</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div className="bg-cyber-gradient h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Enterprise Grade</p>
          </div>
        </div>
      </aside>
    </>
  )
}