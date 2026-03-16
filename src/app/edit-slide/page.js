"use client"
import React, { useEffect, useState } from 'react'
import { OverallLayout } from '../common/MainLayout'
import { baseUrl, imgBaseUrl } from '@/Api/Api'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'
import { use } from 'react'

export default function page({ searchParams }) {
    const sliderId = use(searchParams).id;
        console.log(sliderId);

    let [fileSrc, setFileSrc] = useState("/images/thumbnail-placeholder.png")

    let [slide, setSlide] = useState({});

    let getSlide = () => {
        axios.get(`${baseUrl}slide/view-slide/${sliderId}`)
            .then(res => res.data)
            .then(finalRes => {
                setSlide(finalRes);
            });
    }


    useEffect(() => {
        getSlide();
    }, [])

    useEffect(() => {
        setFileSrc(`${imgBaseUrl}${slide.slideImagePath}`)
        console.log(slide);
    }, [slide])







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
  
    let handleUpdate = (event) => {
        event.preventDefault();
        console.log("update btn clicked");
        let isFileSelected = event.target.slideImage.files[0]
        if (isFileSelected) {
            console.log("file is selected");  
            const formData = new FormData(event.target);
              axios.post(`${baseUrl}slide/update-slide-w-img/${slide._id}`,formData,{
                headers: {
                  "Content-Type" : "multipart/form-data"
                }
              })
              .then(res => res.data)
              .then(finalRes => {
                  console.log(finalRes)
                  finalRes.status ? toast.success(finalRes.msg) : toast.error(finalRes.msg)
              })
              .catch(err => toast.error("Something went xrong"));
        } else {
            console.log("no file selected");
            axios.post(`${baseUrl}slide/update-slide-wo-img/${slide._id}`, slide, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.data)
                .then(finalRes => {
                    console.log(finalRes)
                    finalRes.status ? toast.success(finalRes.msg) : toast.error(finalRes.msg)

                })
                .catch(err => toast.error("Something went xrong"));
        }
    }


    let handleChange = (event) => {

        if (event.target.name == 'slideStatus') {
            let tempRadioValue = event.target.value == "true" ? true : false;
            let targetName = event.target.name;
            let tempObj = { ...slide }
            tempObj[targetName] = tempRadioValue;
            setSlide(tempObj);
        } else {
            let targetName = event.target.name;
            let tempObj = { ...slide }
            tempObj[targetName] = event.target.value;
            console.log(tempObj);
            setSlide(tempObj);
        }
    }

    return (
        <div>
            <OverallLayout sectiontitle="View/Edit Slider">
                <form onSubmit={handleUpdate} className='mb-[100px] mx-[50px]'>
                    <ToastContainer />
                    <label className='flex flex-col gap-[5px] my-[10px]'>Slider Name
                        <input value={slide.slideName} onChange={handleChange} required className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="slideName" />
                    </label>


                    <label className='flex flex-col gap-[5px] my-[10px]'>Slider Status
                        <div className='flex gap-[40px] px-[20px]'>
                            <label className='flex gap-[5px]'><input checked={slide.slideStatus == true} onChange={handleChange} required type='radio' value='true' name='slideStatus' />Active</label>
                            <label className='flex gap-[5px]'><input checked={slide.slideStatus == false} onChange={handleChange} required type='radio' value='false' name='slideStatus' />Deactive</label>
                        </div>

                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Upload Slider
                        <div>
                            <input onChange={handleFileChange} className='bg-transparent px-[10px] py-[4px] outline-none' type='file' name="slideImage" accept='.jpg,.png,.jpeg' />
                        </div>
                    </label>



                    <div className='flex justify-between items-end'>
                        <div className='w-[500px] h-[300px] overflow-hidden'>
                            <img src={fileSrc} width="100%" height="100%" />

                        </div>
                        <div className='flex gap-[20px]'>
                        <Link href={{ pathname: '/view-slides' }}><button value="Cancel" type='button' className='border border-2 border-gray-300 text-gray-400 hover:text-black w-[140px] py-[5px]'>Cancel</button></Link>
                            <button value="Submit" className='bg-[rgba(116,86,234,255)] hover:scale-[1.01] text-white w-[140px] py-[5px]'>Submit</button>
                        </div>
                    </div>
                </form>

            </OverallLayout>
        </div>
    )
}
