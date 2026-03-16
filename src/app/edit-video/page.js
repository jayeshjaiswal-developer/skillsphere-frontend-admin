"use client"
import React, { useState, useEffect } from 'react'
import { OverallLayout } from '../common/MainLayout'
import axios from 'axios';
import { baseUrl } from '@/Api/Api';
import { toast, ToastContainer } from 'react-toastify';
import { use } from 'react';
import Link from 'next/link';

export default function page({ searchParams }) {
    const videoId = use(searchParams).id;
    const courseId = use(searchParams).courseId;


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
        getCourseVideos(courseId);
    }, [])

    let videoArray = [];
    let supportVideoArray = [];

    let [videoObject, setVideoObject] = useState({});
    useEffect(() => {
        console.log(courseVideo);
        videoArray = courseVideo.videoDetails;
        console.log(videoArray);
        if (videoArray) {
            console.log(videoArray.length);
            supportVideoArray = videoArray.filter((v, i) => v._id == videoId);
            setVideoObject(supportVideoArray[0])

        }
    }, [courseVideo])

    useEffect(() => {
        console.log(videoObject);
    }, [videoObject]);

    let [course, setCourse] = useState([]);

    let getCourse = () => {
        axios.get(`${baseUrl}course/view-course`)
            .then(res => res.data)
            .then(finalRes => {
                // console.log(finalRes);
                let tempRes = finalRes.filter((v, i) => v.courseStatus && courseVideo.courseName != v.courseName);
                setCourse(tempRes);
            })
            .catch(err => console.log("unable to retrieve course"));
    }

    useEffect(() => {
        console.log("Updated course state:", course);
    }, [course]);

    useEffect(() => {
        getCourse();
    }, [courseVideo])

    let handleUpdate = (event) => {
        event.preventDefault();
        if (event.target.courseName.value == courseVideo.courseName) {
            console.log("Course is same");
            axios.post(`${baseUrl}video/update-video-same-course/${videoObject._id}/${courseVideo._id}`, videoObject, {
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
        } else {
            console.log("Course is differnt");
            
            axios.get(`${baseUrl}video/delete-video/${courseVideo._id}/${videoObject._id}`)
                .then(res => res.data)
                .then(finalRes => {
                    console.log(finalRes)
                    finalRes.status ?
                        (toast.info(finalRes.msg),
                            getCourseVideos(courseVideo._id))
                        :
                        toast.error(finalRes.msg);
                })
                .catch(err => {
                    console.log("start debug");
                    console.log(err);
                    toast.error("something went xrong");
                });


            let tempArr = event.target.courseName.value.split('AlertBreak93');
            const jsonData = {
                "courseName": tempArr[0],
                "courseThumbnail": tempArr[1],
                "videoTopic": event.target.videoTopic.value,
                "videoLink": event.target.videoLink.value,
                "videoStatus": event.target.videoStatus.value
            }
            console.log("submit btn clicked");
            axios.post(`${baseUrl}video/add-video`, jsonData, {
                headers: { "Content-Type": "application/json" }
            })
                .then(res => res.data)
                .then(finalRes => {
                    // console.log(finalRes);
                    finalRes.status ? toast.success(finalRes.msg) : toast.error(finalRes.msg);
                })
                .catch(err => {
                    // console.log("error occured");
                    toast.error("Error Occured")
                });


        }




    }

    let handleChange = (event) => {

        if (event.target.name == 'videoStatus') {
            let tempRadioValue = event.target.value == "true" ? true : false;
            let targetName = event.target.name;
            let tempObj = { ...videoObject }
            tempObj[targetName] = tempRadioValue;
            setVideoObject(tempObj);
        } else {
            let targetName = event.target.name;
            let tempObj = { ...videoObject }
            tempObj[targetName] = event.target.value;
            console.log(tempObj);
            setVideoObject(tempObj);
        }
    }

    return (
        <div>
            <OverallLayout sectiontitle="View/Edit Video">
                <form onSubmit={handleUpdate} className='mb-[100px] mx-[50px]'>
                    <ToastContainer />
                    <label className='flex flex-col gap-[5px] my-[10px]'>Course
                        <select className='bg-transparent border border-black outline-none px-[10px] py-[4px]' name='courseName'>
                            <option>{courseVideo.courseName}</option>
                            {course.map((v, i) => <option value={`${v.courseName}AlertBreak93${v.courseThumbnail}`} key={v._id}>{v.courseName}</option>)}
                        </select>
                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Video Topic
                        <input value={videoObject ? videoObject.videoTopic : ''} onChange={handleChange} className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="videoTopic" />
                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Video Link
                        <input value={videoObject ? videoObject.videoLink : ''} onChange={handleChange} className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type='text' name='videoLink' />
                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Video Status
                        <div className='flex gap-[40px] px-[20px]'>
                            <label className='flex gap-[5px]'><input checked={videoObject ? videoObject.videoStatus == true : ''} onChange={handleChange} type='radio' value={true} name='videoStatus' />Active</label>
                            <label className='flex gap-[5px]'><input checked={videoObject ? videoObject.videoStatus == false : ''} onChange={handleChange} type='radio' value={false} name='videoStatus' />Deactive</label>
                        </div>

                    </label>


                    <div className='flex justify-end items-end'>
                        <div className='flex gap-[20px]'>
                            <Link href={{ pathname: `/course-videos/`, query: { "id": courseId } }}><button type='button' value="Cancel" className='border border-2 border-gray-300 text-gray-400 hover:text-black w-[140px] py-[5px]'>Cancel</button></Link>
                            <button value="Submit" className='bg-[rgba(116,86,234,255)] hover:scale-[1.01] text-white w-[140px] py-[5px]'>Submit</button>
                        </div>
                    </div>
                </form>
            </OverallLayout>
        </div>
    )
}
