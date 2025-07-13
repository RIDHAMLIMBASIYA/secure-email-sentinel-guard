import { useState } from 'react'
import { AlertTriangle, Mail, Scan, Shield, Upload, Clipboard } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'

interface AnalysisResult {
  isPhishing: boolean
  confidence: number
  riskFactors: string[]
  analysis: {
    urlSafety: number
    contentAnalysis: number
    senderReputation: number
    overallScore: number
  }
}

export function PhishingDetection() {
  const [emailContent, setEmailContent] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const { toast } = useToast()

  const analyzeEmail = async () => {
    if (!emailContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter email content to analyze",
        variant: "destructive"
      })
      return
    }

    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        isPhishing: emailContent.toLowerCase().includes('urgent') || 
                   emailContent.toLowerCase().includes('click') ||
                   emailContent.toLowerCase().includes('verify'),
        confidence: Math.random() * 30 + 70,
        riskFactors: [
          'Suspicious sender domain',
          'Urgent language detected',
          'External links present',
          'Request for personal information'
        ].filter(() => Math.random() > 0.5),
        analysis: {
          urlSafety: Math.random() * 40 + 60,
          contentAnalysis: Math.random() * 30 + 70,
          senderReputation: Math.random() * 50 + 50,
          overallScore: Math.random() * 30 + 70
        }
      }
      
      setResult(mockResult)
      setIsAnalyzing(false)
      
      toast({
        title: "Analysis Complete",
        description: `Email classified as ${mockResult.isPhishing ? 'PHISHING' : 'LEGITIMATE'}`,
        variant: mockResult.isPhishing ? "destructive" : "default"
      })
    }, 3000)
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setEmailContent(text)
      toast({
        title: "Success",
        description: "Email content pasted from clipboard"
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to paste from clipboard",
        variant: "destructive"
      })
    }
  }

  const sampleEmails = [
    {
      title: "Legitimate Email",
      content: "Hello John,\n\nThank you for your recent purchase. Your order #12345 has been shipped and will arrive within 3-5 business days.\n\nBest regards,\nCustomer Service Team"
    },
    {
      title: "Phishing Email",
      content: "URGENT: Your account will be suspended!\n\nClick here immediately to verify your account: http://suspicious-link.com\n\nFail to act within 24 hours and lose access forever!"
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Phishing Detection System</h1>
        <p className="text-muted-foreground">AI-powered email analysis for threat detection</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2">
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>Email Content Analysis</span>
              </CardTitle>
              <CardDescription>
                Paste or type email content below for real-time phishing detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={pasteFromClipboard}
                  className="flex items-center space-x-2"
                >
                  <Clipboard className="h-4 w-4" />
                  <span>Paste</span>
                </Button>
                {sampleEmails.map((sample, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm"
                    onClick={() => setEmailContent(sample.content)}
                  >
                    {sample.title}
                  </Button>
                ))}
              </div>
              
              <Textarea
                placeholder="Paste email content here for analysis..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
              
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={analyzeEmail}
                  disabled={isAnalyzing}
                  className="cyber-button"
                >
                  {isAnalyzing ? (
                    <>
                      <Scan className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Analyze Email
                    </>
                  )}
                </Button>
                
                {emailContent && (
                  <span className="text-sm text-muted-foreground">
                    {emailContent.length} characters
                  </span>
                )}
              </div>
              
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="scan-line"></div>
                  <p className="text-sm text-muted-foreground">
                    Running AI analysis • NLP processing • URL validation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div>
          <Card className="cyber-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span>Analysis Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-4">
                  <div className="text-center p-4 rounded-lg" 
                       style={{
                         background: result.isPhishing ? 
                           'hsl(var(--destructive) / 0.1)' : 
                           'hsl(var(--success) / 0.1)'
                       }}>
                    <div className={`text-2xl font-bold ${
                      result.isPhishing ? 'text-destructive' : 'text-success'
                    }`}>
                      {result.isPhishing ? 'PHISHING' : 'LEGITIMATE'}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {result.confidence.toFixed(1)}% confidence
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>URL Safety</span>
                        <span>{result.analysis.urlSafety.toFixed(0)}%</span>
                      </div>
                      <Progress value={result.analysis.urlSafety} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Content Analysis</span>
                        <span>{result.analysis.contentAnalysis.toFixed(0)}%</span>
                      </div>
                      <Progress value={result.analysis.contentAnalysis} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Sender Reputation</span>
                        <span>{result.analysis.senderReputation.toFixed(0)}%</span>
                      </div>
                      <Progress value={result.analysis.senderReputation} />
                    </div>
                  </div>

                  {result.riskFactors.length > 0 && (
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Risk Factors:</h4>
                      <div className="space-y-1">
                        {result.riskFactors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No analysis performed yet</p>
                  <p className="text-sm">Enter email content and click analyze</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}