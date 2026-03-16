"use client"
import React, { useEffect, useState } from 'react'
import { OverallLayout } from '../common/MainLayout'
import axios from 'axios'
import { baseUrl } from '@/Api/Api'
import { toast, ToastContainer } from 'react-toastify'

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

  let [team, setTeam] = useState([]);

  let getTeam = () => {
    axios.get(`${baseUrl}team/view-team`)
      .then(res => res.data)
      .then(finalRes => {
        // console.log(finalRes);
        let tempRes = finalRes.filter((v, i) => v.memberStatus);
        setTeam(tempRes);
      })
      .catch(err => console.log("unable to retrieve teams"));
  }

  useEffect(() => {
    console.log("Updated team state:", team);

  }, [team]);

  useEffect(() => {
    getTeam();
  }, [])

  let handleSubmit = (event) => {
    event.preventDefault();
    let buttonClicked = event.nativeEvent.submitter.value;


    if (buttonClicked == 'Submit') {
      const formData = new FormData(event.target);
      console.log("submit btn clicked");

      axios.post(`${baseUrl}course/add-course`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
        .then(res => res.data)
        .then(finalRes => {
          console.log(finalRes);
          finalRes.status ? toast.success(finalRes.msg) : toast.err(finalRes.msg);
        })
        .catch(err => {
          toast.error("Something went xrong");
        })
    } else {
      console.log('cancel btn clicked');
    }


  }

  return (
    <div>
      <OverallLayout sectiontitle="Add Course">
        <form onSubmit={handleSubmit} className='mb-[100px] mx-[50px]'>
          <ToastContainer />
          <label className='flex flex-col gap-[5px] my-[10px]'>Course Name
            <input className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="courseName" />
          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Course Price
            <input className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="coursePrice" />
          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Course Duration
            <input className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type='text' name='courseDuration' />
          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Course Description
            <textarea className='bg-transparent border border-black resize-none outline-none' name='courseDescription' rows={3} />
          </label>


          <label className='flex flex-col gap-[5px] my-[10px]'>Course Instructor
            <select className='bg-transparent border border-black outline-none px-[10px] py-[4px]' name='courseInstructor'>
              <option>--select--</option>
              {team.map((v, i) => <option value={v.memberName} key={i}>{v.memberName}</option>)}
            </select>
          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Course Status
            <div className='flex gap-[40px] px-[20px]'>
              <label className='flex gap-[5px]'><input value='true' type='radio' name='courseStatus' />Active</label>
              <label className='flex gap-[5px]'><input value='false' type='radio' name='courseStatus' />Deactive</label>
            </div>

          </label>

          <label className='flex flex-col gap-[5px] my-[10px]'>Course Thumbnail
            <div>
              <input required name='courseThumbnail' onChange={handleFileChange} className='bg-transparent px-[10px] py-[4px] outline-none' type='file' accept='.jpg,.png,.jpeg' />
            </div>
          </label>

          <div className='flex justify-between items-end'>
            <div className='w-[200px] h-[150px] overflow-hidden'>
              <img src={fileSrc} width="100%" height="100%" />
            </div>
            <div className='flex gap-[20px]'>
              <button type='button' value="Cancel" className='border border-2 border-gray-300 text-gray-400 hover:text-black w-[140px] py-[5px]'>Cancel</button>
              <button value="Submit" className='bg-[rgba(116,86,234,255)] hover:scale-[1.01] text-white w-[140px] py-[5px]'>Submit</button>
            </div>
          </div>

        </form>
      </OverallLayout>

    </div>
  )
}
