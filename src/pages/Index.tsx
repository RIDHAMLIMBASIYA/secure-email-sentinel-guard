import { useState } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Dashboard } from '@/components/sections/Dashboard'
import { PhishingDetection } from '@/components/sections/PhishingDetection'
import { EmailEncryption } from '@/components/sections/EmailEncryption'
import { ThreatLogs } from '@/components/sections/ThreatLogs'
import { Settings, Shield, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'phishing':
        return <PhishingDetection />
      case 'encryption':
        return <EmailEncryption />
      case 'threats':
        return <ThreatLogs />
      case 'settings':
        return <SettingsSection />
      default:
        return <Dashboard />
    }
  }

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="min-h-screen bg-background text-foreground">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <main className="flex-1 p-6 md:ml-0">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Settings component
function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">System configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Security Configuration</span>
            </CardTitle>
            <CardDescription>
              Configure security policies and threat detection settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Real-time Scanning</span>
                <div className="threat-indicator bg-success"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Phishing Detection</span>
                <div className="threat-indicator bg-success"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email Encryption</span>
                <div className="threat-indicator bg-success"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-warning" />
              <span>Performance Metrics</span>
            </CardTitle>
            <CardDescription>
              System performance and resource utilization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">CPU Usage</span>
                <span className="text-sm font-mono">23%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Memory Usage</span>
                <span className="text-sm font-mono">67%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Network I/O</span>
                <span className="text-sm font-mono">1.2 GB/s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Index;
