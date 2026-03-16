"use client"
import React, { useState } from 'react'
import { OverallLayout } from '../common/MainLayout'
import { ToastContainer, toast } from 'react-toastify';
import { baseUrl } from '@/Api/Api'; 
import axios from 'axios';

export default function page() {
  let [fileSrc, setFileSrc] = useState("/images/thumbnail-placeholder.png")
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

  let handleSubmit = (event) =>{
    event.preventDefault();
    let buttonClicked = event.nativeEvent.submitter.value;
    if(buttonClicked == "Submit"){
      console.log("Submit btn clicked");
      const formData = new FormData(event.target);

      axios.post(`${baseUrl}slide/addSlide`,formData, {
        headers: {
          "Content-Type" : "multipart/form-data"
        }
      })
      .then(res=>res.data)
      .then(finalRes=>{
        // event.target.reset();
        // setFileSrc("/images/thumbnail-placeholder.png");
        toast.info(finalRes);
        
      })
      .catch(err=>console.log("An error occurred during api post"))

    }else{
      console.log('Cancel btn clicked');
    }
    
  }
  return (
    <div>
      <OverallLayout sectiontitle="Add Slider">
        <form onSubmit={handleSubmit} className='mb-[100px] mx-[50px]'>
        <ToastContainer/>
          <label className='flex flex-col gap-[5px] my-[10px]'>Slider Name
            <input required className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="slideName" />
          </label>


          <label className='flex flex-col gap-[5px] my-[10px]'>Slider Status
            <div className='flex gap-[40px] px-[20px]'>
              <label className='flex gap-[5px]'><input required type='radio' value='true' name='slideStatus' />Active</label>
              <label className='flex gap-[5px]'><input required type='radio' value='false' name='slideStatus' />Deactive</label>
            </div>

          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Upload Slider
            <div>
              <input required onChange={handleFileChange} className='bg-transparent px-[10px] py-[4px] outline-none' type='file' name="slideImage" accept='.jpg,.png,.jpeg' />
            </div>
          </label>

          

          <div className='flex justify-between items-end'>
          <div className='w-[500px] h-[400px] overflow-hidden'>
            <img src={fileSrc} width="100%"/>

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
