"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { countries } from "./countries";
import { Label } from "@/components/ui/label";


const SignUp = () => {
    const[form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        country: '',
    })
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null)

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        console.log("Form data:", form);

        const res =await fetch("/api/user/sign-up", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(form),
        })

        const data = await res.json(); 
        if(res.ok){
            setPending(false);
            
            toast.success(data.message);
            router.push('/sign-in');
        }else if(res.status === 400){
            setError(data.message);
            setPending(false);
        }else if(res.status === 500){
            setError(data.message);
            setPending(false);
        }

        
    }
    const handleProvider = (
        e: React.MouseEvent<HTMLButtonElement>,
        value: 'github' | 'google'
    ) => {
        e.preventDefault();
        signIn( value, { callbackUrl: '/'});
    }
  return (
    <div className="h-full flex justify-center">
        <Card className="bg-transparent shadow-none border-none  px-8 w-full  max-w-3xl flex flex-col items-center">
            <CardHeader className="hidden md:block">
                <CardTitle className="font-bold text-center text-2xl">
                    Let’s get you started with Aoun
                </CardTitle>
                
                <CardDescription className="text-sm text-center text-accent-foreground tracking-tighter">
                    Enter the details to get going
                </CardDescription>
            </CardHeader>
            
            {
                !!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert />
                        <p>{error}</p>
                    </div>
                )
            }
            <CardContent className="w-full max-w-2xl rounded-md  md:rounded-3xl shadow-lg bg-white px-4 py-6">
                <CardHeader className="block md:hidden">
                    <h1 className='text-4xl text-center'>عون للتأمين</h1>
                    <p className='text-xs text-center'>Affordable Health Insurance</p>
                </CardHeader>
                <form onSubmit={handleSubmit} className=" flex flex-col md:grid md:grid-cols-2 gap-x-4 gap-y-6 max-w-lg mx-auto pt-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="username" className="text-xs font-semibold tracking-wide text-gray-700">Username</Label>
                        <Input 
                            type='text'
                            disabled={pending}
                            placeholder="Enter a Valid Username"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({...form, name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-xs font-semibold tracking-wide text-gray-700">Email</Label>
                        <Input 
                            type='email'
                            disabled={pending}
                            placeholder="Email"
                            name="email"
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}
                            required
                        />
                    </div>
                    <div className=" flex flex-col gap-2">
                        <Label htmlFor="password" className="text-xs font-semibold tracking-wide text-gray-700">Password</Label>
                        <Input 
                            type='password'
                            disabled={pending}
                            placeholder="Enter a Password"
                            name="password"
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            required
                        />
                        
                    </div>
                    <div className=" flex flex-col gap-2">
                        <Label htmlFor="confirmPassword" className="text-xs font-semibold tracking-wide text-gray-700">Confirm Password</Label>
                        <Input 
                            type='password'
                            disabled={pending}
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                            required
                        />
                    </div>
                    <div className=" flex flex-col gap-2">
                        <Label htmlFor="phoneNumber" className="text-xs font-semibold tracking-wide text-gray-700">Phone Number</Label>
                        <Input 
                            type='text'
                            disabled={pending}
                            placeholder="Enter a valid phone number"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={(e) => setForm({...form, phoneNumber: e.target.value})}
                            required
                        />    
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="country" className="text-xs font-semibold tracking-wide text-gray-700">Country</Label>
                        <Select onValueChange={(value) => setForm({ ...form, country: value })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Country" />
                        </SelectTrigger>
                        <SelectContent className="">
                            {
                                countries.map((country, index) => (
                                    <SelectItem value={country.name} key={index} className="">{country.name}</SelectItem>
                                ) )
                            }
                            
                           
                        </SelectContent>
                    </Select>
                    </div>
                    
                    
                    

                    
                    

                    
                    
                    <div className="col-span-2 flex justify-center">
                        <Button className="w-full max-w-sm bg-sky-600 shadow-md hover:bg-sky-800 text-md font-semibold" size='lg' disabled={pending}>
                            Sign Up
                        </Button>
                    </div>
                    
                    
                    
                </form>
                <Separator className="mt-6" />
                <div className="flex my-2 justify-evenly mx-auto items-center">
                    <Button
                        disabled={false}
                        onClick={() => { }}
                        variant='outline'
                        size='lg'
                        className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                    >
                        <FcGoogle className="size-8 left-25 top-2.5" />
                    </Button>
                    <Button
                        disabled={false}
                        onClick={(e) => {handleProvider(e, 'github') }}
                        variant='outline'
                        size='lg'
                        className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                    >
                        <FaGithub className="size-8 left-25 top-2.5" />
                    </Button>
                </div>
                <p className="text-center text-sm mt-2 text-muted-foreground">
                    Already have an account?
                    <Link href='/sign-in' className="text-sky-700 ml-4 hover:underline cursor-pointer">Sign in </Link>
                </p>
            </CardContent> 
        </Card>
    </div>
  )
}

export default SignUp