import MusicCard from '@/app/components/MusicCard'
import PageWraper from '@/app/components/PageWraper'
import Scroller from '@/app/components/Scroller'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { HiPlus } from 'react-icons/hi'

function page() {
    const userType = "artist"
  return (
    <PageWraper>
        <div>
            <div className='flex flex-col md:flex-row items-center  gap-4'>
                <Image className='rounded-full w-32 mdw-48' src="/yohana.jpg" alt='yohana' width={300} height={300}/>
                <div className='text-white'>
                    <h1>Yohana endalew</h1>
                    <h1 className='text-xs'>@yohan12</h1>
                </div>
                {
                    userType === "artist" && <div className='flex flex-col'>
                        <Button>
                            <HiPlus/>
                            Realese song</Button>
                        <Button>
                            <HiPlus/>
                            Release album</Button>
                    </div>
                }
                <div>

                </div>
            </div>
        </div>
        <Scroller title="My songs">
          <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
         <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
         <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
           <MusicCard
          url="/yohana.jpg"
          alt="yohana"
          title="Yetalesh"
          artist="Yohana"
        />
      </Scroller>

    </PageWraper>
  )
}

export default page