import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [searchstate,setSearchstate] = useState('');
  const dispatch = useDispatch();
  const searchFilter = useSelector(state => state.crud.search);
   useEffect(() =>{
     setSearchstate(searchFilter);
    console.log(searchstate);
   },[searchFilter])
    const navigate = useNavigate();
    const[getdata,setGetdata] = useState([]);
    const [updatedate,setUpdatedata] = useState('');
    const [inpVal, setInpVal] = useState({
      name: "",
      email: "",
      age: "",
      mobile: "",
      work: "",
      add: "",
      desc: "",
    }); 
    const AddData = async () =>{
        navigate('/register');
    }
    const getData = async() => {
      const res = await fetch('http://localhost:5007/getdata',{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json'
        }
      });
      const getUser = await res.json();
      console.log(getUser);
      setGetdata(getUser);
    }
    useEffect(() => {
      getData()
    },[])
    const deleteUser =async(id) => {
      const res = await fetch(`http://localhost:5007/delete/${id}`,
      {
        method : 'DELETE',
        headers : { 'Content-Type' : 'application/json'}
      })
      const data = await res.json();
      if(res.status === 422)
      {
        alert('Error');
      }
      else
      {
        console.log('Delete User');
        getData();
      }
    }
  return (
    <div className='mt-5'>
        <div className='container'>
            <div className='add_btn mt-2'>
                <button className='btn btn-primary' onClick={() => AddData()}>Add Data</button>
            </div>
            <table class="table">
  <thead>
    <tr className='table-dark'>
      <th scope="col">id</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Job</th>
      <th scope="col"></th>

    </tr>
  </thead>
  {/* {
    getdata.map((item,index) => (
        <tbody key={index}>
    <tr>
        <th scope="row">{index+1}</th>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.work}</td>
       
      <td className='d-flex justify-content-between'> 
      <NavLink to={`/view/${item._id}`}><button className='btn btn-success' name ={item.name} value={item.name}>Read</button></NavLink>
            <NavLink to={`/edit/${item._id}`}><button className='btn btn-primary' >Update</button></NavLink>
            <button className='btn btn-danger' onClick={() => deleteUser(item._id)}>Delete</button>
        </td>
    </tr>   
  </tbody>
    ))
  } */}

    {
        getdata.filter((item) => {
          return searchstate.toLowerCase() === '' ? item : item.name.toLowerCase().includes(searchstate)
        }).map((item,index) => (
            <tbody key={index}>
        <tr>
            <th scope="row">{index+1}</th>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.work}</td>
          
          <td className='d-flex justify-content-between'> 
          <NavLink to={`/view/${item._id}`}><button className='btn btn-success' name ={item.name} value={item.name}>Read</button></NavLink>
          <NavLink to={`/edit/${item._id}`}><button className='btn btn-primary' >Update</button></NavLink>
                <button className='btn btn-danger' onClick={() => deleteUser(item._id)}>Delete</button>
            </td>
        </tr>   
      </tbody>
        ))
      }
</table>
        </div>
    </div>
  )
}

