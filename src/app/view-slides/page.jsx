"use client"
import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { OverallLayout } from '../common/MainLayout'
import { baseUrl, imgBaseUrl } from '@/Api/Api';
import { toast,ToastContainer } from 'react-toastify';
import Link from 'next/link';

export default function page() {

  let [slide, setSlide] = useState([]);

  let getSlide = () => {
    axios.get(`${baseUrl}slide/view-slide`)
      .then(res => res.data)
      .then(finalRes => setSlide(finalRes));
  }

  useEffect(() => {
    getSlide();
  }, [])

  let handleDelete = (id) => {
    console.log("delete btn clicked");

    axios.get(`${baseUrl}slide/delete-slide/${id}`)
      .then(res => res.data)
      .then(finalRes => {
        console.log(finalRes)
        finalRes.status ?
          (toast.info(finalRes.msg),
          getSlide())
          :
          toast.error(finalRes.msg);
      })
      .catch(err => toast.error("Something went xrong"))
    // console.log(id);
  }


  return (
    <div>
        <OverallLayout sectiontitle="View Slides">
        <div className='px-[20px] mb-[100px]'>
        <ToastContainer/>
          <table className='w-[100%] text-center align-items-start '>
            <thead>
              <tr>
                <th className='w-[40px]'>S.no.</th>
                <th>Slide Name</th>
                <th>Slide Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {slide.map((v,i)=><tr key={i} className='border-t-2 border-black '>
                <td className='w-[40px]'>{i+1}</td>
                <td>{v.slideName}</td>
                <td>
                  <div className='w-[120px] h-[80px] mx-auto my-[10px] overflow-hidden'>
                    <img src={`${imgBaseUrl}${v.slideImagePath}`} width="100%" height="100%" />
                  </div>
                </td>
                <td>{v.slideStatus ? 'Active' : 'Deactive'}</td>
                <td >
                  <div className='flex gap-[10px] items-center justify-center'>
                  <Link href={{pathname:'/edit-slide', query:{"id":v._id}}}> <button type='button' className='w-[100px] py-[5px] bg-green-500 text-white'>View/Edit</button></Link>
                  <button  onClick={() => handleDelete(v._id)} className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                  </div>
                  
                </td>
              </tr>
              )}
              
            </tbody>
          </table>
        </div>
        </OverallLayout>
    </div>
  )
}
