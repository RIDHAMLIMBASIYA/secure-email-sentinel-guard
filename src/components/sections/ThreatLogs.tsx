import { useState } from 'react'
import { AlertTriangle, Download, Filter, Search, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ThreatLog {
  id: string
  timestamp: string
  sender: string
  type: string
  severity: 'Low' | 'Medium' | 'High' | 'Critical'
  status: 'Blocked' | 'Quarantined' | 'Allowed'
  confidence: number
}

export function ThreatLogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const mockLogs: ThreatLog[] = [
    {
      id: 'TL001',
      timestamp: '2024-01-15 14:30:22',
      sender: 'phishing@malicious-site.com',
      type: 'Phishing',
      severity: 'Critical',
      status: 'Blocked',
      confidence: 98.5
    },
    {
      id: 'TL002',
      timestamp: '2024-01-15 14:25:10',
      sender: 'malware@suspicious.net',
      type: 'Malware',
      severity: 'High',
      status: 'Quarantined',
      confidence: 94.2
    },
    {
      id: 'TL003',
      timestamp: '2024-01-15 14:20:45',
      sender: 'spam@promotions.biz',
      type: 'Spam',
      severity: 'Medium',
      status: 'Blocked',
      confidence: 87.3
    },
    {
      id: 'TL004',
      timestamp: '2024-01-15 14:15:33',
      sender: 'fake@bank-clone.org',
      type: 'Phishing',
      severity: 'High',
      status: 'Blocked',
      confidence: 96.1
    },
    {
      id: 'TL005',
      timestamp: '2024-01-15 14:10:18',
      sender: 'suspicious@unknown.ru',
      type: 'Malware',
      severity: 'Critical',
      status: 'Blocked',
      confidence: 99.2
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-destructive text-destructive-foreground'
      case 'High': return 'bg-warning text-warning-foreground'
      case 'Medium': return 'bg-muted text-muted-foreground'
      case 'Low': return 'bg-secondary text-secondary-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Blocked': return 'bg-destructive text-destructive-foreground'
      case 'Quarantined': return 'bg-warning text-warning-foreground'
      case 'Allowed': return 'bg-success text-success-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const filteredLogs = mockLogs.filter(log => {
    const matchesSearch = log.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = severityFilter === 'all' || log.severity.toLowerCase() === severityFilter
    const matchesType = typeFilter === 'all' || log.type.toLowerCase() === typeFilter
    
    return matchesSearch && matchesSeverity && matchesType
  })

  const exportLogs = () => {
    const csv = [
      ['ID', 'Timestamp', 'Sender', 'Type', 'Severity', 'Status', 'Confidence'],
      ...filteredLogs.map(log => [
        log.id,
        log.timestamp,
        log.sender,
        log.type,
        log.severity,
        log.status,
        log.confidence.toString()
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `threat-logs-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Threat Logs</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Security incident history and analysis</p>
        </div>
        <Button onClick={exportLogs} variant="outline" className="flex items-center space-x-2 w-full sm:w-auto">
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Threat Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="phishing">Phishing</SelectItem>
                <SelectItem value="malware">Malware</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center space-x-2 w-full sm:w-auto">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Threats', value: mockLogs.length, color: 'text-primary' },
          { label: 'Blocked', value: mockLogs.filter(l => l.status === 'Blocked').length, color: 'text-destructive' },
          { label: 'Quarantined', value: mockLogs.filter(l => l.status === 'Quarantined').length, color: 'text-warning' },
          { label: 'Avg. Confidence', value: `${(mockLogs.reduce((acc, l) => acc + l.confidence, 0) / mockLogs.length).toFixed(1)}%`, color: 'text-success' }
        ].map((stat, index) => (
          <Card key={index} className="cyber-card">
            <CardContent className="p-4">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Logs Table */}
      <Card className="cyber-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span>Security Incidents</span>
          </CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {mockLogs.length} threat logs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[80px]">ID</TableHead>
                  <TableHead className="min-w-[140px]">Timestamp</TableHead>
                  <TableHead className="min-w-[200px]">Sender</TableHead>
                  <TableHead className="min-w-[80px]">Type</TableHead>
                  <TableHead className="min-w-[80px]">Severity</TableHead>
                  <TableHead className="min-w-[100px]">Status</TableHead>
                  <TableHead className="min-w-[100px]">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs sm:text-sm">{log.id}</TableCell>
                    <TableCell className="text-xs sm:text-sm">{log.timestamp}</TableCell>
                    <TableCell className="text-xs sm:text-sm font-mono">
                      <div className="truncate max-w-[150px] sm:max-w-[200px]" title={log.sender}>
                        {log.sender}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{log.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(log.severity)}>
                        {log.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-mono">
                      {log.confidence.toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}