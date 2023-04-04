import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
export default function () {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const[opening,setOpening] = useState(false);
  const [inpVal, setInpVal] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    add: "",
    desc: "",
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    
  };
  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInpVal((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
    console.log(inpVal);
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
      const {name,
      email,
      age,
      mobile,
      work,
      add,
      desc} = inpVal;
        const res = await fetch('http://localhost:5007/register',{
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            name,
      email,
      age,
      mobile,
      work,
      add,
      desc
          })
        })
        const data = await res.json();
        console.log(data);  
        if(res.status === 422)
        {
          // alert('Please fill the data');
          setOpen(true)
        }
        else if(res.status === 404)
        {
          alert('This Email Already exists');
        }
        else
        {
          alert('Data Added');
          console.log('Data Added');  
          navigate('/');
        }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
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
          <div className="col-lg-6 col-md-6 col-12">
            
          </div>
        </div>
        <button
              type="submit"
              class="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
      </form>
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Please fill the form"
          action={action}
        /> 
      </div>
    </div>
  );
}
