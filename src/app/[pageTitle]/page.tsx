import React from 'react'
import PageWraper from '../components/PageWraper';

interface PageProps {
  params: Promise<{ pageTitle: string }>; // For a single dynamic segment
}

async function page({params}:PageProps) {
    const {pageTitle} =await params
  return (
    <PageWraper>
      <div className='text-white'>
      {pageTitle}
    </div>
    </PageWraper>
  )
}

export default page