"use client"
import React, { useEffect, useState } from 'react'
import { OverallLayout } from '../common/MainLayout'
import { baseUrl, imgBaseUrl } from '@/Api/Api'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'

export default function page() {

  let [team, setTeam] = useState([]);

  let getTeam = () => {
    axios.get(`${baseUrl}team/view-team`)
      .then(res => res.data)
      .then(finalRes => setTeam(finalRes));
  }

  useEffect(() => {
    getTeam();
  }, [])

  let handleDelete = (id) => {
    console.log("delete btn clicked");

    axios.get(`${baseUrl}team/delete-team/${id}`)
      .then(res => res.data)
      .then(finalRes => {
        console.log(finalRes)
        finalRes.status ?
          (toast.info(finalRes.msg),
          getTeam())
          :
          toast.error(finalRes.msg);
      })
      .catch(err => toast.error("Something went xrong"))
    // console.log(id);
  }

  return (
    <div>
      <OverallLayout sectiontitle="View Team">
        <div className='px-[20px]'>
          <ToastContainer />
          <table className='w-[100%] text-center align-items-start mb-[100px]'>
            <thead>
              <tr>
                <th className='w-[40px]'>S.no.</th>
                <th>Member Name</th>
                <th>Domain/Category</th>
                <th>Thumbnail</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                team.map((v, i) => <tr className='border-t-2 border-black ' key={i}>
                  <th className='w-[40px]'>{i + 1}</th>
                  <td>{v.memberName}</td>
                  <td>{v.memberDomain}</td>
                  <td>
                    <div className='w-[70px] h-[70px] mx-auto my-[10px] rounded-[50%] overflow-hidden'>
                      <img src={`${imgBaseUrl}${v.memberImage}`} width="100%" height="100%" />
                    </div>
                  </td>
                  <td>{v.memberStatus ? 'Active' : 'Deactive'}</td>
                  <td >
                    <div className='flex gap-[10px] items-center justify-center'>
                      <Link href={{pathname:'/edit-team', query:{"id":v._id}}}><button className='w-[100px] py-[5px] bg-green-500 text-white'>View/Edit</button></Link>
                      <button onClick={() => handleDelete(v._id)} className='w-[100px] py-[5px] bg-red-500 text-white'>Delete</button>
                    </div>

                  </td>
                </tr>)
              }

            </tbody>
          </table>
        </div>
      </OverallLayout>
    </div>
  )
}
