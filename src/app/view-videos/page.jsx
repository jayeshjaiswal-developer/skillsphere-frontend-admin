"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { OverallLayout } from '../common/MainLayout'
import axios from 'axios'
import { baseUrl, imgBaseUrl } from '@/Api/Api'

export default function page() {
  let [course, setCourse] = useState([]);

  let getCourse = () => {
    axios.get(`${baseUrl}video/view-video`)
      .then(res => res.data)
      .then(finalRes => setCourse(finalRes));
  }
  useEffect(() => {
    getCourse();
  }, [])


  return (
    <div>
      <OverallLayout sectiontitle="View Videos">
        <div className='px-[20px] mb-[100px]'>
          <div className='grid grid-cols-4 gap-[20px] '>
            {course.map((v, i) => <Link href={{pathname:'/course-videos', query: {"id":v._id} }} key={i}>
              <div className='cursor-pointer p-[5px] shadow-lg'>
                <div className='w-full h-[170px] overflow-hidden'>
                  <img src={`${imgBaseUrl}${v.courseThumbnail}`} alt="thumbnail" width="100%" />
                </div>
                <h1><b>Course:</b>{v.courseName}</h1>
              </div>
            </Link>)}



          </div>



        </div>
      </OverallLayout>
    </div>
  )
}
