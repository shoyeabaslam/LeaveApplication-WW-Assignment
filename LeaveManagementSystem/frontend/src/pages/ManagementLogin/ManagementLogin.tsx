import { FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import { mangerLogin } from '../../api/Auth';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';

const LoginPage = () => {
 const {setUser} = useContext(UserContext);
 const navigate = useNavigate();
 const [formData,setFormData] = useState(
  {
    email:'',
    password:''
  }
 )

 const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value
  });
}


  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
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
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <form className="border px-5 py-4  backdrop:blur-sm rounded-xl shadow-lg bg-white/100" onSubmit={handleSubmit}>
            <h1 className='text-xl font-bold text-center mb-5'>Management Login</h1>
            
           <InputField name='email' inputValue={formData.email} type={'email'} handleChange={handleChange} placeholder='Email Address'/>
           <InputField name='password' inputValue={formData.password}  type={'password'} handleChange={handleChange} placeholder='Password'/>
           
            <div className='my-3 flex flex-col'>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Login
              </button>
              <Link className='text-center underline py-3' to='/'>Go to employee panel</Link>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
