import {cn , formatDate } from '@/lib/utils'
import React from 'react'
import { EyeIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {Button} from "@/components/ui/button"
import { LogoJsIcon } from '@sanity/icons'
import { Startup, Author } from '@/sanity/types'

export type StartupTypeCard = Omit<Startup, "author">&{author?: Author}
const StartupCard = ({ post} : {post :StartupTypeCard}) => {

  const { _createdAt , views , author, title , category , _id , image , description }= post;
  return (
    <li className='startup-card group'>

      <div className='flex justify-between'>

        <p className='startup_card_date' >

          {formatDate(_createdAt)}
        </p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary'/>
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>

      <div className='flex flex-between mt-5 gap-5'>
          <div className='flex-1'>
              <Link href={`/user/${author?._id}`}>

                  <p className='text-16-medium line-clamp-1 '>{author?.name}</p>
              </Link>

              <Link href={`/startup/${_id}`}>
                  <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
              </Link>
          </div>
          <Link href={`/user/${author?._id}`}>
              <Image src="/"
               alt="placeholder" height={30} width={30} className='rounded-full'/>
          </Link>
      </div>

      <div>
          <Link href={`/startup/${_id}`}>

          <p className='startup-card_desc'>
            {description}
          </p>

          <img src={image} alt="placeholder" className='startup-card_img' />
      </Link>

      <div className='flex justify-between mt-5 items-center'>

          <Link href={`/?query=${category?.toLowerCase()}`}>
          
                <p className='text-16-medium font-medium '>{category}</p>
          </Link>

          <Button className='startup-card_btn' asChild>
                <Link href={`/startup/${_id}`}>
                      Details
                </Link>
          </Button>
      </div>

      


      </div>
      
    </li>
  )
}

export default StartupCard