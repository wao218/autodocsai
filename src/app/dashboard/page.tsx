'use client';

// import { Button } from '@/components/ui/button';
import { useState } from 'react';
import RepositoriesDialog from "@/components/repositories/RepositoriesDialog"

type DocStub = { id: string; title: string } // expand later as you build


export default function DashboardPage() {
  const [data] = useState<DocStub[]>([]);

  return (
    <>
      {data.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-full'>
          <h2 className='text-xl font-semibold text-neutral-600 mb-4'>
            No documents created
          </h2>
          <RepositoriesDialog />
          {/* <Button className='hover:cursor-pointer' size={'lg'}>
            Create New Document
          </Button> */}
        </div>
      ) : (
        'Main Content'
      )}
    </>
  );
}
