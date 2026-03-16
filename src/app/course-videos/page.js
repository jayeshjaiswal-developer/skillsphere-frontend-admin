"use client"
import React, { useEffect, useState } from 'react'
import { OverallLayout } from '../common/MainLayout'
import { use } from 'react' // Importing use hook
import axios from 'axios'
import { baseUrl } from '@/Api/Api'
import { ToastContainer,toast } from 'react-toastify'
import Link from 'next/link'

export default function page({ searchParams }) {
    const courseId = use(searchParams); // Retrieve query parameters here
    const id = courseId.id;
    // console.log(id);

    let [courseVideo, setCourseVideo] = useState([]);


    let getCourseVideos = (id) => {
        axios.get(`${baseUrl}video/view-video/${id}`)
            .then(res => res.data)
            .then(finalRes => {
                finalRes.status ? setCourseVideo(finalRes.result) : setCourseVideo([]);
            })
            .catch(err => setCourseVideo([]));
        // console.log(id);
    }


    useEffect(() => {
        getCourseVideos(id);
    }, [])


    let handleDelete = (videoId) => {
        console.log("delete btn clicked");
        axios.get(`${baseUrl}video/delete-video/${id}/${videoId}`)
          .then(res => res.data)
          .then(finalRes => {
            console.log(finalRes)
            finalRes.status ?
              (toast.info(finalRes.msg),
              getCourseVideos(id))
              :
              toast.error(finalRes.msg);
          })
          .catch(err => toast.error("Something went xrong"))

        // console.log(videoId);
      }
    

    return (
        <div>
            <OverallLayout sectiontitle="Course Videos">
                <h1 className='font-bold text-[18px] text-[rgba(116,86,234,255)]'>{courseVideo.courseName}</h1>
                <ToastContainer/>
                <table className='w-[100%] text-center align-items-start'>
                    <thead>
                        <tr>
                            <th className='w-[40px]'>S.no.</th>
                            <th>Topic</th>
                            <th>Link</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {courseVideo.videoDetails ?
                            courseVideo.videoDetails.map((v, i) => <tr className='border-t-2 border-black' key={i}>
                                <td className='w-[40px]'>{i + 1}</td>
                                <td>{v.videoTopic}</td>
                                <td>{v.videoLink}</td>
                                <td>{v.videoStatus ? 'Active' : 'Deactive'}</td>
                                <td >
                                    <div className='flex gap-[10px] items-center justify-center my-[5px]'>
                                    <Link href={{pathname:'/edit-video', query:{"id":v._id,"courseId":courseVideo._id}}}><button className='w-[100px] py-[5px] bg-green-500 text-white'>View/Edit</button></Link>
                                        <button onClick={() => handleDelete(v._id)} className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                                    </div>
                                </td>
                            </tr>)

                            :
                            ""
                        }




                    </tbody>
                </table>
            </OverallLayout>
        </div>
    )
}
