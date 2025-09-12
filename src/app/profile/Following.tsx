"use client"
import { Button } from '@/components/ui/button'
import { checkIsFollowing, followUser, unfollowUser } from '@/lib/helperfunc'
import { UserProfile } from '@/lib/type'
import React, { useEffect, useState } from 'react'

 function Following({profile}:{profile:UserProfile}) {
  const [isFollowing,setIsFollowing] = useState(false)
  useEffect(()=>{
   checkIsFollowing(profile.userId).then(r => setIsFollowing(r))
  },[])
  return (
      <div className="flex gap-1">
              <Button onClick={()=>{
                if(isFollowing){
                  unfollowUser(profile.userId)
                 setIsFollowing(false)
                } else {
                  followUser(profile.userId)
                  setIsFollowing(true)
                }
              }}>{
                isFollowing ? 'Unfollow' : 'follow'
                }</Button>
            </div>
  )
}

export default Following