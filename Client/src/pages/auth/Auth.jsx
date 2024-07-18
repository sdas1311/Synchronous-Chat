import {React,useState} from 'react'
import Background from '../../assets/login2.png'
import Victory from '../../assets/victory.svg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { apiClient } from '@/lib/apiClient';
import { SIGNUP_ROUTE } from '@/utils/constants';

function Auth() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setconfirm] = useState("")

  const validateSignup =()=>{
    if(!email.length){
      toast.error("Email is required.");
      return false;
    }
    if(!password.length){
      toast.error("Password is required.");
      return false;
    }
    if(password.length < 6){
      toast.error("Password must be atleast 6 characters long.");
      return false;
    }
    if(password !== confirmPassword){
      toast.error("Password and confirm password do not match.");
      return false
    }
    return true;
  }

  const handleLogin = async () => {

  };

  const handleSignup = async () => {
      if (validateSignup()){ 
        const res = await apiClient.post(SIGNUP_ROUTE, { email, password });
        console.log(res);
    }
  };
  
  return (
    <div className='h-screen w-screen flex items-center justify-center'>
      <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
        <div className='flex flex-col gap-5 items-center justify-center' >
          <div className= " flex items-center justify-center flex-col">
            <div className='flex items-center justify-center'>
                <h1 className="text-5xl font-bold md:text-6xl text-gray-800">Welcome</h1>
                <img src={Victory} alt="victory emoji" className="h-[100px]"/> 
            </div> {/* heading */}  
            <p className="font-medium text-center text-gray-500">Fill in the details to get started with the best chat app!</p>{/* lower heading */}
          </div> 
          <div className='flex items-center justify-center w-full'>
              <Tabs className='w-3/4'>
                <TabsList className="bg-transparent rounded-none w-full">
                  <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]: font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" >Login</TabsTrigger>
                  <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]: font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent className=" flex flex-col gap-3 mt-5 " value="login" >
                  <Input placeholder="Email" 
                  type="email" 
                  className="rounded-full p-6" 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                  />
                  <Input placeholder="Password" 
                  type="password" 
                  className="rounded-full p-6" 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                  />
                  <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                </TabsContent>
                <TabsContent className=" flex flex-col gap-3 " value="signup">
                <Input placeholder="Email" 
                  type="email" 
                  className="rounded-full p-6" 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)} 
                />
                <Input placeholder="Password" 
                  type="password" 
                  className="rounded-full p-6" 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                />
                <Input placeholder="Confirm Password" 
                  type="password" 
                  className="rounded-full p-6" 
                  value={confirmPassword} 
                  onChange={(e)=>setconfirm(e.target.value)} 
                />
                <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
                </TabsContent>
              </Tabs>
          </div>
        </div>
        <div className='hidden xl:flex items-center justify-center p-10'>
          <img src={Background} alt="background" className="w-full h-full object-cover"/>
        </div>
      </div>  
    </div>
  )
}

export default Auth