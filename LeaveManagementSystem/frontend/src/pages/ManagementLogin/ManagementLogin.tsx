import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/InputField';

const LoginPage = () => {
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


  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    console.log(formData);
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
