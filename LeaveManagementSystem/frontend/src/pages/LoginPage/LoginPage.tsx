import { FormEvent, useContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { login, mangerLogin } from '../../api/Auth';
import UserContext from '../../context/UserContext';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiAccountPinCircleFill, RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import img from '../../assets/images/gradient_1.jpg'
import logo from '../../assets/images/logo.png'

const LoginPage = () => {
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const [radioValue,setRadioValue] = useState('Employee')
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  
  const handleRadio = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setRadioValue(e.target.value)
  }

  const callEmployeeAPI = async ()=>{
    try {
      const res = await login(formData)
      if (res.ok) {
        const data = await res.json();
        toast.success('Logged in successfully')
        setUser(data)
        navigate('/leave-application')
      }
      else {
        toast.error('Invalid Credential')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const callManagerAPI = async ()=>{
    try{
      const res = await mangerLogin(formData)
      if(res.ok){
        const data = await res.json()
        setUser({
          ...data,
          isManager:true
        })
        toast.success('Login successfull');
        navigate('/view-leaves')
      }else{
        toast.error('Invalid Credential')
      }
    }catch(err){
      console.log(err)
    }
  }
  const handleSubmit = (e:FormEvent)=>{
    e.preventDefault()
    if(radioValue === 'Employee'){
      //call employee api
      callEmployeeAPI()
    }
    else{
      //call manager api
      callManagerAPI()
    }
  }
  return(
    <div className="w-full min-h-screen flex justify-center items-center relative">
      <div className='absolute top-4 left-4'>
        <img className='h-6' src={logo} alt='logo'/>
      </div>
      <form onSubmit={handleSubmit} className='w-[350px] border shadow-xl overflow-hidden rounded-xl'>
        <div className='h-[160px] relative overflow-hidden object-cover '>
          <img className='object-cover' src={img}/>
          <div className='absolute flex justify-center w-full p-3 top-[50%] text-white left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black/10 backdrop:blur-lg h-full flex-col items-center'>
            <RiAccountPinCircleFill className='text-7xl'/>
            <h3 className='px-10 text-center py-2 font-mono'>Welcome To Leave Management Login</h3>
          </div>
        </div>
        <div className='px-4 my-5 flex items-center space-x-2 font-mono'>
          <label className='text-4xl text-slate-800'><MdEmail/></label>
          <input required className='border border-slate-800 rounded-lg w-full outline-none px-2 py-1' type='email' value={formData.email} name='email' placeholder='Email' onChange={handleChange}/>
        </div>
        <div className='px-4 py-2 flex items-center space-x-2 font-mono'>
          <label className='text-4xl text-slate-800'><RiLockPasswordFill /></label>
          <input required className='border border-slate-800 rounded-lg w-full outline-none px-2 py-1' type='password' value={formData.password} name='password' placeholder='Password' onChange={handleChange} />
        </div>
        <div className='py-2 px-4 flex space-x-4'>
          <div className='flex items-center space-x-2 mx-2 font-mono'>
            <input  className="form-radio h-5 w-5 cursor-pointer text-slate-800 accent-slate-800" type='radio' name='user' value='Employee' onChange={handleRadio} defaultChecked/>
            <label>Employee</label>
          </div>
          <div className='flex items-center space-x-2 font-mono'>
            <input  className="form-radio h-5 w-5 cursor-pointer text-slate-800 accent-slate-800" type='radio' name='user' value='Manager' onChange={handleRadio}/>
            <label>Manager</label>
          </div>
        </div>
        <div className='mt-4'>
          <button type='submit' className='w-full text-xl font-mono bg-slate-800 text-white py-2'>Login</button>
        </div>
      </form>
    </div>
  )
};

export default LoginPage;
