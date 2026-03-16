"use client"
import React, {useState,useEffect} from 'react'
import Header from '../common/Header'
import { DashboardSectionsLayout, OverallLayout } from '../common/MainLayout'
import axios from 'axios'
import { baseUrl, imgBaseUrl } from '@/Api/Api'
import { ToastContainer,toast } from 'react-toastify'
import Link from 'next/link'

export default function page() {

  let [course, setCourse] = useState([]);

  let getCourse = () => {
    axios.get(`${baseUrl}course/view-course`)
      .then(res => res.data)
      .then(finalRes => setCourse(finalRes));
  }

  useEffect(() => {
    getCourse();
  }, [])


  let handleDelete = (id) => {
    console.log("delete btn clicked");

    axios.get(`${baseUrl}course/delete-course/${id}`)
      .then(res => res.data)
      .then(finalRes => {
        console.log(finalRes)
        finalRes.status ?
          (toast.info(finalRes.msg),
          getCourse())
          :
          toast.error(finalRes.msg);
      })
      .catch(err => toast.error("Something went xrong"))
    // console.log(id);
  }





  return (
    <div>
      <OverallLayout sectiontitle="View Courses">
        <div className='px-[20px] mb-[100px]'>
        <ToastContainer/>
          <table className='w-[100%] text-center align-items-start'>
            <thead>
              <tr>
                <th className='w-[40px]'>S.no.</th>
                <th className='w-[200px]'>Course Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th className='w-[200px]'>Description</th>
                <th>Instructor</th> 
                <th>Thumbnail</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {course.map((v,i)=><tr key={i} className='border-t-2 border-black '>
                <th className='w-[40px]'>{i+1}</th>
                <td>{v.courseName}</td>
                <td>{v.coursePrice}</td>
                <td>{v.courseDuration}</td>
                <td>
                <div className='h-[50px] overflow-hidden text-justify'>
                {v.courseDescription}
                  </div>
                  </td>
                <td>{v.courseInstructor}</td>
                <td>
                  <div className='w-[100px] h-[70px] mx-auto my-[10px] overflow-hidden'>
                    <img src={`${imgBaseUrl}${v.courseThumbnail}`} width="100%" height="100%" />
                  </div>
                </td>
                <td>{v.courseStatus ? 'Active' : 'Deactive'}</td>
                <td >
                  <div className='flex gap-[10px] items-center justify-center'>
                  <Link href={{pathname:'/edit-course', query:{"id":v._id}}}><button type='button' className='w-[100px] py-[5px] bg-green-500 text-white'>View/Edit</button></Link>
                  <button onClick={() => handleDelete(v._id)} className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                  </div>
                </td>
              </tr>)}
              

            
            </tbody>
          </table>
        </div>
      </OverallLayout>

    </div>
  )
}
