import { useState } from 'react'
import { Lock, Key, FileDown, Copy, Unlock, Hash } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

interface KeyPair {
  publicKey: string
  privateKey: string
}

export function EmailEncryption() {
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null)
  const [message, setMessage] = useState('')
  const [encryptedMessage, setEncryptedMessage] = useState('')
  const [decryptedMessage, setDecryptedMessage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEncrypting, setIsEncrypting] = useState(false)
  const [isDecrypting, setIsDecrypting] = useState(false)
  const { toast } = useToast()

  // Mock RSA key generation
  const generateKeyPair = async () => {
    setIsGenerating(true)
    
    // Simulate key generation delay
    setTimeout(() => {
      const mockKeyPair: KeyPair = {
        publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rsuHiD+XJ8U0VGb/Ynh
xK8GIJShw/SPTLUj1XOr8BZmCnfK+FJ4UgCyI8KrVegjl7fRXZYdFsQrGOKEQOk/
FwBmPzKxCbqQJ7EqcVJIgXODxiRWPH8j+QwLcYiQ7H9SgJGxI7ZJcVgQ1Bz8QfG9
VbP4Nz8wKLAaJ7ZQhFzCvgYz1aB8QsZVqGJKhFXQCQ1JFH7H9J3M2dLQcCkJrQ8s
fMzQ0h+qZVnYJ0HLK8GJ4YZJ8FbX9aA8hK8Q2OGFjIq4K2HhYQs7BZ8FzEQxhLJP
QiCo8KZHpQaLwXQyZNqJ8K8F2QFQY1HzKjG4VsUh4xQ7mQ4NJcV2QyZGqJKhFnJZ
QIDAQAB
-----END PUBLIC KEY-----`,
        privateKey: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWuy4eIP5cnxTR
UZv9ieHErwYglKHD9I9MtSPVc6vwFmYKd8r4UnhSALIjwqtV6CeXt9FdlR0WxCsY
4oRA6T8XAGk/MrEJupAnsSpxUkiBc4PGJFo8fyP5DAtxiJDsf1KAkbEjtklxWBDU
HPxB8b1Vs/g3PzAosBoktlCEXMK+BjPVoHxCxlWoYkqEVdAJDUkUfsf0nczZ0tBw
KQmtDyx8zNDSH6plWdgnQcsrwYnhhknwVtf1oDyErxDY4YWMirgrYeFhCzsFnwXM
RDGEsk9CIKjwpkelBovBdDJk2onwrwXZAVBjUfMqMbhWxSHjFDuZDg0lxXZDJkao
kqEWcllBAgMBAAECggEBAKG5PQW9YEBw4YdFj+1K3w9gKRpJHCJQ8p9VQ3aFvOHK
JL8f9sJH+FJGl9Kq4j7XgJVK8H6IkjQgNQCJd+Dz8fGqY9Q8GaZ8LjB4R7GhH+Wq
JKG4Q8DaF6mW9J8K3QGH2cJF8aB9OgQ+YqJ7CQKKd7DzQ9F8vHJ4BgKqd7Q8CnGl
...
-----END PRIVATE KEY-----`
      }
      
      setKeyPair(mockKeyPair)
      setIsGenerating(false)
      
      toast({
        title: "Key Pair Generated",
        description: "RSA-2048 key pair created successfully"
      })
    }, 2000)
  }

  const encryptMessage = async () => {
    if (!message.trim() || !keyPair) {
      toast({
        title: "Error",
        description: "Please enter a message and generate keys first",
        variant: "destructive"
      })
      return
    }

    setIsEncrypting(true)
    
    // Simulate encryption
    setTimeout(() => {
      const encoded = btoa(message + '_encrypted_' + Date.now())
      setEncryptedMessage(encoded)
      setIsEncrypting(false)
      
      toast({
        title: "Message Encrypted",
        description: "Email content encrypted with RSA public key"
      })
    }, 1500)
  }

  const decryptMessage = async () => {
    if (!encryptedMessage || !keyPair) {
      toast({
        title: "Error",
        description: "Please encrypt a message first",
        variant: "destructive"
      })
      return
    }

    setIsDecrypting(true)
    
    // Simulate decryption
    setTimeout(() => {
      try {
        const decoded = atob(encryptedMessage)
        const originalMessage = decoded.split('_encrypted_')[0]
        setDecryptedMessage(originalMessage)
        setIsDecrypting(false)
        
        toast({
          title: "Message Decrypted",
          description: "Email content decrypted with RSA private key"
        })
      } catch (err) {
        setIsDecrypting(false)
        toast({
          title: "Decryption Failed",
          description: "Invalid encrypted message",
          variant: "destructive"
        })
      }
    }, 1500)
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied",
      description: `${type} copied to clipboard`
    })
  }

  const downloadKey = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
    
    toast({
      title: "Download Started",
      description: `${filename} download initiated`
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Secure Email Encryption</h1>
        <p className="text-muted-foreground">RSA public-key cryptography for secure email communication</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Key Generation */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-primary" />
              <span>RSA Key Generation</span>
            </CardTitle>
            <CardDescription>
              Generate public/private key pair for encryption
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={generateKeyPair}
              disabled={isGenerating}
              className="cyber-button w-full"
            >
              {isGenerating ? (
                <>
                  <Key className="h-4 w-4 mr-2 animate-spin" />
                  Generating Keys...
                </>
              ) : (
                <>
                  <Key className="h-4 w-4 mr-2" />
                  Generate RSA Key Pair
                </>
              )}
            </Button>
            
            {keyPair && (
              <div className="space-y-3">
                <Badge className="bg-success text-success-foreground">
                  ✓ RSA-2048 Keys Generated
                </Badge>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadKey(keyPair.publicKey, 'public_key.pem')}
                  >
                    <FileDown className="h-3 w-3 mr-1" />
                    Public Key
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadKey(keyPair.privateKey, 'private_key.pem')}
                  >
                    <FileDown className="h-3 w-3 mr-1" />
                    Private Key
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Encryption Process */}
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-success" />
              <span>Encryption Process</span>
            </CardTitle>
            <CardDescription>
              Encrypt and decrypt email messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="encrypt" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
                <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
              </TabsList>
              
              <TabsContent value="encrypt" className="space-y-4">
                <Textarea
                  placeholder="Enter your email message to encrypt..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[120px]"
                />
                
                <Button 
                  onClick={encryptMessage}
                  disabled={isEncrypting || !keyPair}
                  className="w-full"
                  variant="outline"
                >
                  {isEncrypting ? (
                    <>
                      <Lock className="h-4 w-4 mr-2 animate-spin" />
                      Encrypting...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Encrypt Message
                    </>
                  )}
                </Button>
                
                {encryptedMessage && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Encrypted Output:</span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(encryptedMessage, 'Encrypted message')}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="p-3 bg-muted rounded font-mono text-xs break-all">
                      {encryptedMessage}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="decrypt" className="space-y-4">
                <Textarea
                  placeholder="Paste encrypted message here..."
                  value={encryptedMessage}
                  onChange={(e) => setEncryptedMessage(e.target.value)}
                  className="min-h-[120px] font-mono text-xs"
                />
                
                <Button 
                  onClick={decryptMessage}
                  disabled={isDecrypting || !keyPair}
                  className="w-full"
                  variant="outline"
                >
                  {isDecrypting ? (
                    <>
                      <Unlock className="h-4 w-4 mr-2 animate-spin" />
                      Decrypting...
                    </>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4 mr-2" />
                      Decrypt Message
                    </>
                  )}
                </Button>
                
                {decryptedMessage && (
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Decrypted Message:</span>
                    <div className="p-3 bg-success/10 border border-success/20 rounded">
                      {decryptedMessage}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Key Display */}
      {keyPair && (
        <Card className="cyber-card">
          <CardHeader>
            <CardTitle>Generated Keys</CardTitle>
            <CardDescription>
              Your RSA public and private keys (keep private key secure!)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="public" className="w-full">
              <TabsList>
                <TabsTrigger value="public">Public Key</TabsTrigger>
                <TabsTrigger value="private">Private Key</TabsTrigger>
              </TabsList>
              
              <TabsContent value="public" className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline">Safe to share</Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(keyPair.publicKey, 'Public key')}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="p-4 bg-muted rounded text-xs overflow-x-auto">
                  {keyPair.publicKey}
                </pre>
              </TabsContent>
              
              <TabsContent value="private" className="space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="destructive">Keep confidential!</Badge>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => copyToClipboard(keyPair.privateKey, 'Private key')}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <pre className="p-4 bg-muted rounded text-xs overflow-x-auto">
                  {keyPair.privateKey}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}