'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState([]);

  return (
    <>
      {data.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-full'>
          <h2 className='text-xl font-semibold text-neutral-600 mb-4'>
            No documents created
          </h2>
          <Button className='hover:cursor-pointer' size={'lg'}>
            Create New Document
          </Button>
        </div>
      ) : (
        'Main Content'
      )}
    </>
  );
}
