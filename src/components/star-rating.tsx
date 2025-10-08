'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  onRate?: (rating: number) => void;
}

export function StarRating({ totalStars = 5, initialRating = 0, onRate }: StarRatingProps) {
  const [rating, setRating] = React.useState(initialRating);
  const [hover, setHover] = React.useState(0);

  const handleRate = (rate: number) => {
    setRating(rate);
    if (onRate) {
      onRate(rate);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleRate(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer"
            aria-label={`Rate ${starValue} out of ${totalStars} stars`}
          >
            <Star
              className={cn(
                'h-5 w-5 transition-colors',
                starValue <= (hover || rating)
                  ? 'text-accent fill-accent'
                  : 'text-muted-foreground/50'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
