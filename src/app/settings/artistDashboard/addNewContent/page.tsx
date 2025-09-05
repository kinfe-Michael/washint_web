"use client"
import { useState } from 'react'
import DashboardButton from '../../../components/DashboardButton'
import AddSongForm from '../components/AddSong'
import PageWraper from '@/app/components/PageWraper'
import AlbumForm from '../../components/AddAlbum'

function Page() {
    const [showAddSongForm,setShowAddSongForm] = useState(false)
  return (
    <PageWraper>
    
       
        <div>
          <h1></h1>
            <AddSongForm/>
        </div>
        <div>
          <h1></h1>
          <AlbumForm/>
        </div>
    </PageWraper>
  )
}

export default Page