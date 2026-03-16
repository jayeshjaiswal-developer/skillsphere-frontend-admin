"use client"
import React, { useState } from 'react'
import { OverallLayout } from '../common/MainLayout'
import { baseUrl } from '@/Api/Api'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

export default function page() {
  let [fileSrc, setFileSrc] = useState("/images/team-avatar.png")
  let handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => setFileSrc(e.target.result);
    } else {
      setFileSrc("/images/thumbnail-placeholder.png");
    }
  }

  let handleSubmit = (event)=>{
    event.preventDefault();
    let buttonClicked = event.nativeEvent.submitter.value;
    if(buttonClicked=="Submit"){
    const formData = new FormData(event.target);
      axios.post(`${baseUrl}team/add-team`,formData,{
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      })
      .then(res=>res.data)
      .then(finalRes=>{
        console.log(finalRes)
        toast.success("Team member added successfully");

      })
      .catch(err=>toast.error("Something went xrong"));
    }
  }
  return (
    <div>
      <OverallLayout sectiontitle="Add Team">
        <form onSubmit={handleSubmit} className='mb-[100px] mx-[50px]'>
        <ToastContainer/>
          <label className='flex flex-col gap-[5px] my-[10px]'>Team Member Name
            <input required className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="memberName" />
          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Domain/Category
            <input required className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="memberDomain" />
          </label>


          <label className='flex flex-col gap-[5px] my-[10px]'>Member Status
            <div className='flex gap-[40px] px-[20px]'>
              <label className='flex gap-[5px]'><input required type='radio' value='true' name='memberStatus' />Active</label>
              <label className='flex gap-[5px]'><input required type='radio' value='false' name='memberStatus' />Deactive</label>
            </div>

          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Member Image
            <div>
              <input required name='memberImage' onChange={handleFileChange} className='bg-transparent px-[10px] py-[4px] outline-none' type='file' accept='.jpg,.png,.jpeg' />
            </div>
          </label>

          <div className='flex justify-between items-end'>
            <div className='w-[200px] h-[200px] rounded-[50%] overflow-hidden'>
              <img src={fileSrc} width="100%" height="100%" />

            </div>
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
