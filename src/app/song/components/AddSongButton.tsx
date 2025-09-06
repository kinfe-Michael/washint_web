import DashboardButton from '@/app/components/DashboardButton'
import { addSongToPlaylist } from '@/lib/helperfunc'
import React from 'react'

function AddSongButton({title,songId,playlistId}:{title:string,songId:string,playlistId:string}) {
  return (
    <DashboardButton onClick={()=>addSongToPlaylist(playlistId,songId)} >{title}</DashboardButton>
  )
}

export default AddSongButton