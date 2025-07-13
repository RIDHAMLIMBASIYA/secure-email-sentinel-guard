import { Shield, Moon, Sun, Menu, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from './ThemeProvider'

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-2 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyber-gradient rounded-lg cyber-glow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground">
                NSM Platform
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Network Security & Management
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden lg:flex items-center space-x-2 px-2 sm:px-3 py-1 bg-muted rounded-full">
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-success animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-foreground">System Active</span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="cyber-glow"
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}