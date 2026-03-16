"use client"
import React from 'react'
import { useContext } from 'react';
import { UserContext } from './MainContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight, faBook, faCoffee, faPeopleGroup, faSliders, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'



export default function LeftSideMenu() {
    let { clickedList, setClickedList, subClickedList, setSubClickedList } = useContext(UserContext);

    let listClickedFunc = (str, subStr) => {
        if (clickedList == str) {
            setClickedList('')
        } else {
            setClickedList(str);
            // setSubClickedList(subStr)
        }
    }

    let subListClickedFunc = (str) => {
        setSubClickedList(str);
    }

    return (
        <>
            <div className='p-[20px] text-[15px] sticky top-[68px] '>
                <ul>
                    <li onClick={() => clickedList != 'courses' ? listClickedFunc('courses', 'addCourses') : ''} className={`mainli ${clickedList == 'courses' ? 'bg-[rgba(116,86,234,255)] text-white' : 'text-gray-700  hover:bg-[rgba(116,86,234,0.7)] hover:text-white'} p-[20px] m-[5px] rounded-t-[15px]`} style={{ transition: '0s' }}>
                        <div onClick={() => clickedList == 'courses' ? listClickedFunc('courses') : ''} className='hover:font-bold flex justify-between items-center'>
                            <div className='flex gap-[10px] items-center'>
                                <FontAwesomeIcon icon={faBook} className='w-[15px]' />
                                Courses
                            </div>
                            <FontAwesomeIcon icon={clickedList == 'courses' ? faAngleDown : faAngleRight} className='w-[12px]' />
                        </div>


                        <ul className={`${clickedList == 'courses' ? 'h-auto' : 'h-0'} ms-[20px] list-disc overflow-hidden list-inside`}>
                            <Link href={'/add-courses'}><li onClick={() => subListClickedFunc('addCourses')} className={`${subClickedList == 'addCourses' ? 'font-bold' : 'font-normal'} m-[10px]`}>Add Courses</li></Link>
                            <Link href={'/view-courses'}><li onClick={() => subListClickedFunc('viewCourses')} className={`${subClickedList == 'viewCourses' ? 'font-bold' : 'font-normal'} mx-[10px]`}>View Courses</li></Link>
                        </ul>
                    </li>

                    <li onClick={() => clickedList != 'videos' ? listClickedFunc('videos', 'addVideos') : ''} className={`mainli ${clickedList == 'videos' ? 'bg-[rgba(116,86,234,255)] text-white' : 'text-gray-700  hover:bg-[rgba(116,86,234,0.7)] hover:text-white'} p-[20px] m-[5px] rounded-t-[15px]`} style={{ transition: '0s' }}>
                        <div onClick={() => clickedList == 'videos' ? listClickedFunc('videos') : ''} className='hover:font-bold flex justify-between items-center'>
                            <div className='flex gap-[10px] items-center'>
                                <FontAwesomeIcon icon={faVideo} className='w-[18px]' />
                                Videos
                            </div>
                            <FontAwesomeIcon icon={clickedList == 'videos' ? faAngleDown : faAngleRight} className='w-[12px]' />
                        </div>


                        <ul className={`${clickedList == 'videos' ? 'h-auto' : 'h-0'} ms-[20px] list-disc overflow-hidden list-inside`}>
                            <Link href={'/add-videos'}><li onClick={() => subListClickedFunc('addVideos')} className={`${subClickedList == 'addVideos' ? 'font-bold' : 'font-normal'} m-[10px]`}>Add Videos</li></Link>
                            <Link href={'/view-videos'}><li onClick={() => subListClickedFunc('viewVideos')} className={`${subClickedList == 'viewVideos' ? 'font-bold' : 'font-normal'} mx-[10px]`}>View Videos</li></Link>
                        </ul>
                    </li>

                    <li onClick={() => clickedList != 'slides' ? listClickedFunc('slides', 'addSlides') : ''} className={`mainli ${clickedList == 'slides' ? 'bg-[rgba(116,86,234,255)] text-white' : 'text-gray-700  hover:bg-[rgba(116,86,234,0.7)] hover:text-white'} p-[20px] m-[5px] rounded-t-[15px]`} style={{ transition: '0s' }}>
                        <div onClick={() => clickedList == 'slides' ? listClickedFunc('slides') : ''} className='hover:font-bold flex justify-between items-center'>
                            <div className='flex gap-[10px] items-center'>
                                <FontAwesomeIcon icon={faSliders} className='w-[15px]' />
                                Slides
                            </div>
                            <FontAwesomeIcon icon={clickedList == 'slides' ? faAngleDown : faAngleRight} className='w-[12px]' />
                        </div>


                        <ul className={`${clickedList == 'slides' ? 'h-auto' : 'h-0'} ms-[20px] list-disc overflow-hidden list-inside`}>
                            <Link href={'/add-slides'}><li onClick={() => subListClickedFunc('addSlides')} className={`${subClickedList == 'addSlides' ? 'font-bold' : 'font-normal'} m-[10px]`}>Add Slides</li></Link>
                            <Link href={'/view-slides'}><li onClick={() => subListClickedFunc('viewSlides')} className={`${subClickedList == 'viewSlides' ? 'font-bold' : 'font-normal'} mx-[10px]`}>View Slides</li></Link>
                        </ul>
                    </li>

                    <li onClick={() => clickedList != 'team' ? listClickedFunc('team', 'addTeam') : ''} className={`mainli ${clickedList == 'team' ? 'bg-[rgba(116,86,234,255)] text-white' : 'text-gray-700  hover:bg-[rgba(116,86,234,0.7)] hover:text-white'} p-[20px] m-[5px] rounded-t-[15px]`} style={{ transition: '0s' }}>
                        <div onClick={() => clickedList == 'team' ? listClickedFunc('team') : ''} className='hover:font-bold flex justify-between items-center'>
                            <div className='flex gap-[10px] items-center'>
                                <FontAwesomeIcon icon={faPeopleGroup} className='w-[18px]' />
                                Team
                            </div>
                            <FontAwesomeIcon icon={clickedList == 'team' ? faAngleDown : faAngleRight} className='w-[12px]' />
                        </div>


                        <ul className={`${clickedList == 'team' ? 'h-auto' : 'h-0'} ms-[20px] list-disc overflow-hidden list-inside`}>
                            <Link href={'/add-team'}><li onClick={() => subListClickedFunc('addTeam')} className={`${subClickedList == 'addTeam' ? 'font-bold' : 'font-normal'} m-[10px]`}>Add Team</li></Link>
                            <Link href={'/view-team'}><li onClick={() => subListClickedFunc('viewTeam')} className={`${subClickedList == 'viewTeam' ? 'font-bold' : 'font-normal'} mx-[10px]`}>View Team</li></Link>
                        </ul>
                    </li>

                    <li onClick={() => clickedList != 'user' ? listClickedFunc('user', 'viewUser') : ''} className={`mainli ${clickedList == 'user' ? 'bg-[rgba(116,86,234,255)] text-white' : 'text-gray-700  hover:bg-[rgba(116,86,234,0.7)] hover:text-white'} p-[20px] m-[5px] rounded-t-[15px]`} style={{ transition: '0s' }}>
                        <div onClick={() => clickedList == 'user' ? listClickedFunc('user') : ''} className='hover:font-bold flex justify-between items-center'>
                            <div className='flex gap-[10px] items-center'>
                                <FontAwesomeIcon icon={faUsers} className='w-[18px]' />
                                User
                            </div>
                            <FontAwesomeIcon icon={clickedList == 'user' ? faAngleDown : faAngleRight} className='w-[12px]' />
                        </div>


                        <ul className={`${clickedList == 'user' ? 'h-auto' : 'h-0'} ms-[20px] list-disc overflow-hidden list-inside`} >
                            <Link href={'/view-user'}><li onClick={() => subListClickedFunc('viewUser')} className={`${subClickedList == 'viewUser' ? 'font-bold' : 'font-normal'} mx-[10px] mt-[10px]`} >View User</li></Link>
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    )
}
