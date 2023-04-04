import React, { useEffect, useState } from 'react'
import {Create,DeleteOutline,MailOutline,Work,PhoneAndroid,LocationOn} from '@mui/icons-material';
import {Card,CardContent} from '@mui/material'
import { NavLink, useParams,useNavigate } from 'react-router-dom';
export default function Details() {
    const {id} = useParams("");
    const navigate = useNavigate();
    const [inpVal, setInpVal] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: "",
      }); 
    const getIndividual = async() => {
        const res = await fetch(`http://localhost:5007/view/${id}`,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await res.json();
        console.log(data);
        setInpVal(data);
    }
    useEffect(() => {
        getIndividual()
    },[])
    const deleteUser = async(id) => {
        const res = await fetch(`http://localhost:5007/delete/${id}`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await res.json();
        if(res.status === 422)
        {
            alert('Error');
        }
        else
        {
            alert('Deleted')
            navigate('/');
        }
    }
  return (
    <div className='container mt-3'>
        <h1 style={{fontWeight : 400}}> Welcome </h1>
        <Card sx={{minWidth : 275}}>
            <CardContent>
                <div className='row'>
                    <div className='left_view col-lg-6 col-md-6 col-12'>
                        <h3 className='mt-3'>Name : <span  style={{fontWeight : 400}}>{inpVal.name}</span></h3>
                        <h3 className='mt-3'>Age : <span style={{fontWeight : 400}}>{inpVal.age}</span></h3>
                        <p className='mt-3'><MailOutline />Email : <span>{inpVal.email}</span></p>
                        <p className='mt-3'><Work/>Occuption : <span>{inpVal.work}</span></p>
                    </div>
                        <div className='right_view col-lg-6 col-md-6 col-12'>
                            <div className='add_btn'>
                                <NavLink to={`/edit/${inpVal._id}`}><button className='btn btn-primary' >Update</button></NavLink>
                                <button className='btn btn-danger ml-2' onClick={() => deleteUser(inpVal._id)}>Delete</button>
                            </div>
                            <p className='mt-4'><PhoneAndroid/>Mobile : <span>{inpVal.mobile}</span></p>
                            <p className='mt-4'><LocationOn/>Location : <span>{inpVal.add}</span></p>
                            <p className='mt-4'><PhoneAndroid/>Description : <span>{inpVal.desc}</span></p>
                        </div>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
