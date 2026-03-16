"use client"
import React, { useEffect, useState } from 'react'
import { OverallLayout } from '../common/MainLayout'
import { baseUrl, imgBaseUrl } from '@/Api/Api'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'
import { use } from 'react'

export default function page({ searchParams }) {
    const memberId = use(searchParams).id;
    console.log(memberId);
    let [fileSrc, setFileSrc] = useState("/images/team-avatar.png")

    let [team, setTeam] = useState({});

    let getTeam = () => {
        axios.get(`${baseUrl}team/view-team/${memberId}`)
            .then(res => res.data)
            .then(finalRes => {
                setTeam(finalRes);
            });
    }


    useEffect(() => {
        getTeam();
    }, [])

    useEffect(() => {
        setFileSrc(`${imgBaseUrl}${team.memberImage}`)
    }, [team])


    let handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => setFileSrc(e.target.result);
        } else {
            setFileSrc("/images/team-avatar.png");
        }
    }

    let handleUpdate = (event) => {
        event.preventDefault();
        console.log("update btn clicked");
        let isFileSelected = event.target.memberImage.files[0]
        if (isFileSelected) {
            console.log("file is selected");
            
            const formData = new FormData(event.target);
              axios.post(`${baseUrl}team/update-team-w-img/${team._id}`,formData,{
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
            axios.post(`${baseUrl}team/update-team-wo-img/${team._id}`, team, {
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
        if (event.target.name == 'memberStatus') {
            // console.log(true);
            let tempRadioValue = event.target.value == "true" ? true : false;
            // console.log(tempRadioValue);
            let targetName = event.target.name;
            let tempObj = { ...team }
            tempObj[targetName] = tempRadioValue;
            // console.log(tempObj);
            setTeam(tempObj);
        } else {
            let targetName = event.target.name;
            let tempObj = { ...team }
            tempObj[targetName] = event.target.value;
            console.log(tempObj);
            setTeam(tempObj);
        }
    }



    return (
        <div>
            <OverallLayout sectiontitle="View/Edit Team">
                <form onSubmit={handleUpdate} className='mb-[100px] mx-[50px]'>
                    <ToastContainer />
                    <label className='flex flex-col gap-[5px] my-[10px]'>Team Member Name
                        <input required value={team.memberName} onChange={handleChange} className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="memberName" />
                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Domain/Category
                        <input required value={team.memberDomain} onChange={handleChange} className='bg-transparent border border-black px-[10px] py-[4px] outline-none' type="text" name="memberDomain" />
                    </label>


                    <label className='flex flex-col gap-[5px] my-[10px]'>Member Status
                        <div className='flex gap-[40px] px-[20px]'>
                            <label className='flex gap-[5px]'><input checked={team.memberStatus == true} onChange={handleChange} required type='radio' value="true" name='memberStatus' />Active</label>
                            <label className='flex gap-[5px]'><input checked={team.memberStatus == false} onChange={handleChange} required type='radio' value="false" name='memberStatus' />Deactive</label>
                        </div>

                    </label>

                    <label className='flex flex-col gap-[5px] my-[10px]'>Member Image
                        <div>
                            <input name='memberImage' onChange={handleFileChange} className='bg-transparent px-[10px] py-[4px] outline-none' type='file' accept='.jpg,.png,.jpeg' />
                        </div>
                    </label>

                    <div className='flex justify-between items-end'>
                        <div className='w-[200px] h-[200px] rounded-[50%] overflow-hidden'>
                            <img src={fileSrc} width="100%" height="100%" />

                        </div>
                        <div className='flex gap-[20px]'>
                            <Link href={{ pathname: '/view-team' }}><button type='button' value="Cancel" className='border border-2 border-gray-300 text-gray-400 hover:text-black w-[140px] py-[5px]'>Cancel</button></Link>
                            <button value="Submit" className='bg-[rgba(116,86,234,255)] hover:scale-[1.01] text-white w-[140px] py-[5px]'>Update</button>
                        </div>
                    </div>

                </form>
            </OverallLayout>
        </div>
    )
}
