import React, { useState, useContext } from 'react'
import "./Login.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/Context'
import axios from 'axios'
const Login = ({setShowLogin}) => {
const {url, setToken} = useContext (StoreContext)

    const [currState, setCurrState] = useState("Login")
 
    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    })
const onChangeHandler =(event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))

}

const onLogin = async (event) =>{
event.preventDefault()
let newUrl = url;
if(currState==="Login"){
  newUrl += "/api/user/login"
}
else{
  newUrl += "/api/user/register"
}
const response = await axios.post(newUrl, data);

if (response.data.success) {
  setToken(response.data.token);
  localStorage.setItem("token", response.data.token);
  setShowLogin(false)
}
else{
   alert(response.data.message)
} 
}
  return (
    <div className='login'>
      <form onSubmit={onLogin} className='login-container'>
<div className='login-title'>
    <h2>{currState}</h2>
    <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}alt=''/>
</div>
<div className='login-inputs'>
    {currState==="Login"?<></>:<input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='enter your name' required/>}
<input type='email' name='email' onChange={onChangeHandler} value={data.email} placeholder='enter your email' required/>
<input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='enter your password' required/>
</div>
<button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
<div className='login-condition'>
<input type='checkbox'required/>
<p>by continuing, i agree to the terms of use & Privacy policy.</p>
</div>
{currState==="Login"
?<p>create a new account? <span onClick={()=>setCurrState("Sign Up")}>click here</span></p>
:<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
}
      </form>
    </div>
  )
}

export default Login
