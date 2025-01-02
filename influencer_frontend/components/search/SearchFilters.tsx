'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SearchFilters } from '@/lib/types/influencer';
import { SlidersHorizontal } from 'lucide-react';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
}

export function SearchFiltersComponent({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    platform: [],
    minFollowers: 0,
    maxFollowers: 1000000,
    category: [],
    verified: false,
  });

  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Search Filters</SheetTitle>
          <SheetDescription>
            Refine your influencer search results
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Platforms</Label>
            <div className="space-y-2">
              {['Instagram', 'Facebook', 'LinkedIn'].map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={platform}
                    checked={filters.platform?.includes(platform.toLowerCase())}
                    onCheckedChange={(checked) => {
                      const platforms = checked
                        ? [...(filters.platform || []), platform.toLowerCase()]
                        : filters.platform?.filter(
                            (p) => p !== platform.toLowerCase()
                          );
                      handleFilterChange({ platform: platforms });
                    }}
                  />
                  <Label htmlFor={platform}>{platform}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Followers Range</Label>
            <div className="pt-4">
              <Slider
                defaultValue={[0, 1000000]}
                max={1000000}
                step={1000}
                onValueChange={([min, max]) =>
                  handleFilterChange({
                    minFollowers: min,
                    maxFollowers: max,
                  })
                }
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{filters.minFollowers?.toLocaleString()}</span>
                <span>{filters.maxFollowers?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="space-y-2">
              {['Technology', 'Fashion', 'Lifestyle', 'Marketing', 'Programming'].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.category?.includes(category)}
                      onCheckedChange={(checked) => {
                        const categories = checked
                          ? [...(filters.category || []), category]
                          : filters.category?.filter((c) => c !== category);
                        handleFilterChange({ category: categories });
                      }}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={filters.verified}
              onCheckedChange={(checked) =>
                handleFilterChange({ verified: !!checked })
              }
            />
            <Label htmlFor="verified">Verified Only</Label>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}