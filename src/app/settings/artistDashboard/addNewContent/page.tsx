"use client"
import { useState } from 'react'
import DashboardButton from '../components/DashboardButton'
import AddSongForm from '../components/AddSong'
import PageWraper from '@/app/components/PageWraper'

function page() {
    const [showAddSongForm,setShowAddSongForm] = useState(false)
  return (
    <PageWraper>
    
       
        <div>
          <h1></h1>
            <AddSongForm/>
        </div>
    </PageWraper>
  )
}

export default page