'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Loader2 } from "lucide-react"
import { Loader } from "@/components/ui/loader"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface InstagramData {
  username: string
  followers: number
  location: string | "Unknown"
  is_private: boolean
  is_verified: boolean
  full_name?: string
  biography?: string
}

export default function Home() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<InstagramData[]>([])
  const [totalRows, setTotalRows] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hashtag, setHashtag] = useState('')
  const [maxPosts, setMaxPosts] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    loadExistingData()
  }, [])

  const loadExistingData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/data')
      const result = await response.json()
      if (result.data && Array.isArray(result.data)) {
        setData(result.data)
      } else if (result.message) {
        setData([])
        toast({
          title: "Info",
          description: result.message,
        })
      }
    } catch (error) {
      console.error('Error loading data:', error)
      toast({
        title: "Error",
        description: "Failed to load existing data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          hashtag,
          max_posts: maxPosts,
          location
        }),
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setData(data.data)
      toast({
        title: "Success",
        description: "Data scraped successfully",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to scrape data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExport = async () => {
    try {
      const response = await fetch('/api/export')
      if (!response.ok) {
        throw new Error('Export failed')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'scraped_data.csv'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast({
        title: "Success",
        description: "Data exported successfully",
      })
    } catch (error) {
      console.error('Error exporting:', error)
      toast({
        title: "Error",
        description: "Failed to export data",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Hashtag Scraper</CardTitle>
          <CardDescription>
            Enter your Instagram credentials and hashtag to scrape user data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Instagram username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Instagram password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hashtag">Hashtag</Label>
                <Input
                  id="hashtag"
                  name="hashtag"
                  type="text"
                  required
                  placeholder="Enter hashtag without #"
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxPosts">Max Posts</Label>
                <Input
                  id="maxPosts"
                  name="maxPosts"
                  type="number"
                  required
                  placeholder="Maximum posts to scrape"
                  value={maxPosts}
                  onChange={(e) => setMaxPosts(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Target Location</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter location to scrape (optional)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
           
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="min-w-[150px]"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Scraping...</span>
                    </div>
                  ) : (
                    'Start Scraping'
                  )}
                </Button>
                {data.length > 0 && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleExport}
                    disabled={loading}
                  >
                    Export to CSV
                  </Button>
                )}
              </div>
              {error && (
                <div className="text-sm text-red-500">
                  {error}
                </div>
              )}
            </div>
          </form>

          {loading && (
            <div className="mt-8">
              <Loader className="py-8" />
              <p className="text-center text-sm text-muted-foreground">
                This might take a few minutes depending on the number of posts...
              </p>
            </div>
          )}

          {data.length > 0 && (
            <div className="mt-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Total rows: {data.length}
                </div>
              </div>
              <div className="relative w-full overflow-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Username</TableHead>
                      <TableHead>Followers</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="w-[100px]">Private</TableHead>
                      <TableHead className="w-[100px]">Verified</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.username}</TableCell>
                        <TableCell>{item.followers?.toLocaleString() || 0}</TableCell>
                        <TableCell>{item.location || 'Unknown'}</TableCell>
                        <TableCell>{item.is_private ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{item.is_verified ? 'Yes' : 'No'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </main>
  )
}
