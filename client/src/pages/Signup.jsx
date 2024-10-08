import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlechange = (e) => {
    setFormData({...formData,[e.target.id]: e.target.value.trim()})
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } 
    catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
        <Link to='/' className='font-bold dark:text-white text-rxl'>
            <span className="px-2 py-1 bg-gradient-to-r from-orange-500 via-white-500 to-green-500 rounded-lg text-white">Udit's</span>
            Blog
        </Link>
        <p className="text-sm mt-5">
          This is a demo project. Signup with your email.

        </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}> 
            <div >
              <Label  value="Your username " />
              <TextInput type="text" placeholder="Username" id="username" onChange={handlechange}/>
            </div>
            <div >
              <Label  value="Your email " />
              <TextInput type="email" placeholder="Email" id="email" onChange={handlechange}/>
            </div>
            <div >
              <Label  value="Your password " />
              <TextInput type="password" placeholder="Password" id="password" onChange={handlechange}/>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 via-white-500 to-green-500 rounded-lg text-white" gradientDuoTone='purpleToPink' type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className="pl-3">Loading...</span>
                  </>
                ): 'Sign Up'
              }
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Have a account?</span>
            <Link to='/sign-in' className="text-blue-500">
              Sign In
            </Link>
          </div>
          {
            errorMessage &&(
              <Alert className="mt-5" color='failure'>
                  {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
