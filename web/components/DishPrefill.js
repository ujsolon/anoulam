'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function DishPrefill({ onSetDish }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const dish = searchParams.get('dish');
    if (dish) {
      onSetDish(dish);
    }
  }, [searchParams, onSetDish]);

  return null;
}
