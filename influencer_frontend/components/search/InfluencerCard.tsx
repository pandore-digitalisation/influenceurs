"use client"

import { Influencer } from '@/lib/types/influencer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, BarChart2 } from 'lucide-react';

interface InfluencerCardProps {
  influencer: Influencer;
}

export function InfluencerCard({ influencer }: InfluencerCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={influencer.profileImage} alt={influencer.name} />
          <AvatarFallback>{influencer.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{influencer.name}</h3>
            {influencer.verified && (
              <CheckCircle className="h-4 w-4 text-blue-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">@{influencer.username}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">{influencer.bio}</p>
          
          <div className="flex flex-wrap gap-2">
            {influencer.category.map((cat) => (
              <Badge key={cat} variant="secondary">
                {cat}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {influencer.metrics.followers.toLocaleString()} followers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {influencer.metrics.engagement}% engagement
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}