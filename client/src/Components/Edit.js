import React, { useEffect, useState } from "react";
import { NavLink, useParams,useNavigate } from "react-router-dom";

export default function Edit() {
  const navigate = useNavigate();
  const [inpVal,setINP] = useState({
    name : "",
    email : "",
    age : "",
    mobile : "",
    work : "",
    add : "",
    desc : ""
})
  const {id} = useParams("");
  const getData = async() => {
    const res = await fetch(`http://localhost:5007/view/${id}`,
    {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json'
      },
    })
    const data = await res.json();
    console.log(data);
    if(res.status === 422)
    {
      alert('Error');
    }
    else
    {
      setINP(data);
      console.log(data);
    }
  }
  useEffect(() => {
    getData();
  },[])
    const setData = (e) => {
        console.log(e.target.value);
        const {name,value} = e.target;
        setINP((preval) => {
            return {
                ...preval,[name]:value
            }
        })
        console.log(inpVal)
        }
        const handleSubmit = async(e) => {
          e.preventDefault();
          const {name,
            email,
            age,
            mobile ,
            work,
            add ,
            desc} = inpVal;
          const res = await fetch(`http://localhost:5007/edit/${id}`,
          {
            method : 'PUT',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              name,
        email,
        age,
        mobile ,
        work,
        add ,
        desc
            })
          })
          const data = await res.json();
          console.log(data);
          if(res.status === 422 || !data)
          {
            alert('Please fill the data');
          }
          else
          {
            alert('Data Updated');
            navigate('/');          
          }
        }
  return (
    <div className="container">
    {/* <NavLink to="/">Home</NavLink> */}
    <form className="mt-5">
      <div className="row">
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputEmail1" class="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={setData}
            value={inpVal.name}
            class="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputPassword1" class="form-label">
          Email address
          </label>
          <input
            type="text"
            name="email"
            onChange={setData}
            value={inpVal.email}
            class="form-control"
            id="email"
          />
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputEmail1" class="form-label">
          Age
          </label>
          <input
            type="text"
            name="age"
            onChange={setData}
            value={inpVal.age}
            class="form-control"
            id="age"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputEmail1" class="form-label">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            class="form-control"
            onChange={setData}
            value={inpVal.mobile}
            id="mobile"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputEmail1" class="form-label">
           Work
          </label>
          <input
            type="text"
            name="work"
            onChange={setData}
            value={inpVal.work}
            class="form-control"
            id="work"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputEmail1" class="form-label">
           Address
          </label>
          <input
            type="text"
            name="add"
            class="form-control"
            onChange={setData}
            value={inpVal.add}
            id="add"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
          <label for="exampleInputEmail1" class="form-label">
            Description
          </label>
          <textarea
            type="desc"
            name="desc"
            onChange={setData}
            value={inpVal.desc}
            class="form-control" 
            rows="5 "
            cols="30"

          />
        </div>

      </div>
      <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
    </form>
  </div>
  )
}
