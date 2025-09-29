"use client"
import { useState } from 'react'
import PageWraper from '@/app/components/PageWraper'
import AlbumForm from '../components/AddAlbum'
import AddSongForm from '../components/AddSong'

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