"use client"
import React, { useEffect, useState } from 'react'
import { OverallLayout } from '../common/MainLayout'
import axios from 'axios'
import { baseUrl } from '@/Api/Api'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'
import { use } from 'react'


export default function page({ searchParams }) {
    const courseId = use(searchParams).id;
    console.log(courseId);


    let [course, setCourse] = useState({});
    let [fileSrc, setFileSrc] = useState("/images/thumbnail-placeholder.png")



    let getCourse = () => {
        axios.get(`${baseUrl}course/view-course/${courseId}`)
            .then(res => res.data)
            .then(finalRes => {
                setCourse(finalRes);
            });
    }


    useEffect(() => {
        getCourse();
    }, [])

    useEffect(() => {
        console.log(course);
        setFileSrc(`${baseUrl}${course.courseThumbnail}`)

    }, [course]);




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
                let tempRes = finalRes.filter((v, i) => v.memberStatus && v.memberName != course.courseInstructor);
                setTeam(tempRes);
            })
            .catch(err => console.log("unable to retrieve teams"));
    }


    useEffect(() => {
        getTeam();
    }, [course])

    let handleUpdate = (event) => {
        event.preventDefault();
        console.log("update btn clicked");
        let isFileSelected = event.target.courseThumbnail.files[0]
        if (isFileSelected) {
            console.log("file is selected");
            
            const formData = new FormData(event.target);
              axios.post(`${baseUrl}course/update-course-w-img/${course._id}`,formData,{
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
            axios.post(`${baseUrl}course/update-course-wo-img/${course._id}`, course, {
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
        // console.log(event.target.value);
        // console.log(event.target.name);
        if (event.target.name == 'courseStatus') {
            // console.log(true);
            let tempRadioValue = event.target.value == "true" ? true : false;
            // console.log(tempRadioValue);
            let targetName = event.target.name;
            let tempObj = { ...course }
            tempObj[targetName] = tempRadioValue;
            // console.log(tempObj);
            setCourse(tempObj);
        } else {
            let targetName = event.target.name;
            let tempObj = { ...course }
            tempObj[targetName] = event.target.value;
            console.log(tempObj);
            setCourse(tempObj);
        }
    }


    return (
        <div>
            <OverallLayout sectiontitle="View/Edit Course">
                <form onSubmit={handleUpdate} className='mb-[100px] mx-[50px]'>
                    <ToastContainer />
                    <label className='flex flex-col gap-[5px] my-[10px]'>Course Name
                        <input value={course.courseName} onChange={handleChange} className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="courseName" />
                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Course Price
                        <input value={course.coursePrice} onChange={handleChange} className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="coursePrice" />
                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Course Duration
                        <input value={course.courseDuration} onChange={handleChange} className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type='text' name='courseDuration' />
                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Course Description
                        <textarea value={course.courseDescription} onChange={handleChange} className='bg-transparent border border-black resize-none outline-none' name='courseDescription' rows={3} />
                    </label>


                    <label className='flex flex-col gap-[5px] my-[10px]'>Course Instructor
                        <select value={course.courseInstructor} onChange={handleChange} className='bg-transparent border border-black outline-none px-[10px] py-[4px]' name='courseInstructor'>
                            <option>{course.courseInstructor}</option>
                            {team.map((v, i) => <option value={v.memberName} key={i}>{v.memberName}</option>)}
                        </select>
                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Course Status
                        <div className='flex gap-[40px] px-[20px]'>
                            <label className='flex gap-[5px]'><input checked={course.courseStatus == true} onChange={handleChange} value='true' type='radio' name='courseStatus' />Active</label>
                            <label className='flex gap-[5px]'><input checked={course.courseStatus == false} onChange={handleChange} value='false' type='radio' name='courseStatus' />Deactive</label>
                        </div>

                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Course Thumbnail
                        <div>
                            <input name='courseThumbnail' onChange={handleFileChange} className='bg-transparent px-[10px] py-[4px] outline-none' type='file' accept='.jpg,.png,.jpeg' />
                        </div>
                    </label>

                    <div className='flex justify-between items-end'>

                        <div className='w-[200px] h-[150px] overflow-hidden'>
                            <img src={fileSrc} width="100%" height="100%" />
                        </div>

                        <div className='flex gap-[20px]'>
                            <Link href={{ pathname: '/view-courses' }}><button value="Cancel" className='border border-2 border-gray-300 text-gray-400 hover:text-black w-[140px] py-[5px]'>Cancel</button></Link>
                            <button value="Submit" className='bg-[rgba(116,86,234,255)] hover:scale-[1.01] text-white w-[140px] py-[5px]'>Submit</button>
                        </div>
                    </div>

                </form>
            </OverallLayout>

        </div>
    )
}
