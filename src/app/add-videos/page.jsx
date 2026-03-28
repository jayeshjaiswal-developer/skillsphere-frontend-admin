"use client"
import React, { useState, useEffect } from 'react'
import { OverallLayout } from '../common/MainLayout'
import axios from 'axios';
import { baseUrl } from '@/Api/Api';
import { toast, ToastContainer } from 'react-toastify';

export default function page() {

  let [course, setCourse] = useState([]);

  let getCourse = () => {
    axios.get(`${baseUrl}course/view-course`)
      .then(res => res.data)
      .then(finalRes => {
        // console.log(finalRes);
        let tempRes = finalRes.filter((v, i) => v.courseStatus);
        setCourse(tempRes);
      })
      .catch(err => console.log("unable to retrieve course"));
  }

  useEffect(() => {
    console.log("Updated course state:", course);
  }, [course]);

  useEffect(() => {
    getCourse();
  }, [])

  let handleSubmit = (event) => {
    event.preventDefault();
    let buttonClick = event.nativeEvent.submitter.value;

    if (buttonClick == "Submit") {
      let tempArr= event.target.courseName.value.split('AlertBreak93');
      const jsonData = {
        "courseName": tempArr[0],
        "courseThumbnail":tempArr[1],
        "videoTopic": event.target.videoTopic.value,
        "videoLink": event.target.videoLink.value,
        "videoStatus": event.target.videoStatus.value
        }
      console.log("submit btn clicked");
      axios.post(`${baseUrl}video/add-video`, jsonData, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res=>res.data)
      .then(finalRes=>{
        // console.log(finalRes);
        finalRes.status? toast.success(finalRes.msg) : toast.error(finalRes.msg);
      })
      .catch(err=>{
        // console.log("error occured");
        toast.error("Error Occured")
      });

    } else {
      console.log("cancel btn clicked");
    }
  }
  return (
    <div>
      <OverallLayout sectiontitle="Add Video">
        <form onSubmit={handleSubmit} className='mb-[100px] mx-[50px]'>
          <ToastContainer/>
          <label className='flex flex-col gap-[5px] my-[10px]'>Course
            <select className='bg-transparent border border-black outline-none px-[10px] py-[4px]' name='courseName'>
              <option>--select--</option>
              {course.map((v, i) => <option value={`${v.courseName}AlertBreak93${v.courseThumbnail}`}  key={v._id}>{v.courseName}</option>)}
            </select>
          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Video Topic
            <input className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="videoTopic" />
          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Video Link
            <input className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type='text' name='videoLink' />
          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Video Status
            <div className='flex gap-[40px] px-[20px]'>
              <label className='flex gap-[5px]'><input type='radio' value={true} name='videoStatus' />Active</label>
              <label className='flex gap-[5px]'><input type='radio' value={false} name='videoStatus' />Deactive</label>
            </div>
          </label>

          <div className='flex justify-end items-end'>
            <div className='flex gap-[20px]'>
              <button value="Cancel" className='border border-2 border-gray-300 text-gray-400 hover:text-black w-[140px] py-[5px]'>Cancel</button>
              <button value="Submit" className='bg-[rgba(116,86,234,255)] hover:scale-[1.01] text-white w-[140px] py-[5px]'>Submit</button>
            </div>
          </div>
        </form>
      </OverallLayout>
    </div>
  )
}
