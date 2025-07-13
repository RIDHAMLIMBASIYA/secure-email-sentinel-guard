import { Activity, Shield, AlertTriangle, Lock, TrendingUp, Mail } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function Dashboard() {
  const stats = [
    {
      title: "Emails Scanned",
      value: "12,847",
      change: "+23%",
      icon: Mail,
      color: "text-primary"
    },
    {
      title: "Threats Blocked",
      value: "847",
      change: "+12%",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    {
      title: "Messages Encrypted",
      value: "3,241",
      change: "+8%",
      icon: Lock,
      color: "text-success"
    },
    {
      title: "Security Score",
      value: "98.5%",
      change: "+2%",
      icon: Shield,
      color: "text-primary"
    }
  ]

  const recentThreats = [
    { id: 1, type: "Phishing", severity: "High", time: "2 min ago", source: "external@phishsite.com" },
    { id: 2, type: "Malware", severity: "Critical", time: "15 min ago", source: "malicious@badactor.net" },
    { id: 3, type: "Spam", severity: "Medium", time: "1 hour ago", source: "spam@promotions.biz" },
    { id: 4, type: "Phishing", severity: "High", time: "2 hours ago", source: "fake@bankclone.org" }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-destructive text-destructive-foreground'
      case 'High': return 'bg-warning text-warning-foreground'
      case 'Medium': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Dashboard</h1>
          <p className="text-muted-foreground">Real-time network security monitoring and analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="h-4 w-4 text-success animate-pulse" />
          <span className="text-sm text-success font-medium">Live Monitoring</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="cyber-card hover:cyber-glow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-success">{stat.change}</span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Threats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Recent Threats</span>
            </CardTitle>
            <CardDescription>Latest security incidents detected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentThreats.map((threat) => (
                <div key={threat.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-foreground">{threat.type}</span>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{threat.source}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{threat.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-success" />
              <span>System Status</span>
            </CardTitle>
            <CardDescription>Security system health overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Phishing Detection", status: "Active", uptime: "99.9%" },
                { name: "Email Encryption", status: "Active", uptime: "100%" },
                { name: "Threat Intelligence", status: "Active", uptime: "99.8%" },
                { name: "Real-time Scanning", status: "Active", uptime: "99.9%" }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="threat-indicator bg-success"></div>
                    <span className="font-medium text-foreground">{service.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-success font-medium">{service.status}</div>
                    <div className="text-xs text-muted-foreground">{service.uptime}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}