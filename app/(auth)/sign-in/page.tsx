"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const SignIn =  () => {
    const [email, setEmail] = useState<string>('');
    const [ password, setPassword] = useState<string>('');
    const [pending, setPending] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async  (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password
        })

        if(res?.ok){
            router.push('/');
            toast.success("login succesful");

        }else if(res?.status === 401){
            setError('Invalid credentials');
            setPending(false);
        }else{
            setError("something went wrong")
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
    <div className="h-full flex gap-8 justify-around">
        <div className="border border-red-500 flex flex-col gap-6">
            <h1 className="text-center text-2xl font-semibold">عون للتأمين</h1>
            <p>Aoun lets you split your purchases into 
                4 monthly<br /> payments so you can worry less 
                and aim for more. And you’ll never pay interest 
                or fees.
            </p>
            <div className="">
                <div className="flex items-center">
                    <div className="relative w-[30px] h-[30px]">
                        <Image src='/insurance1.png' alt='' fill/>
                    </div>
                    <p>Insurance you can trust</p>
                </div>
                <div className="flex items-center">
                    <div className="relative w-[30px] h-[30px]">
                        <Image src='/insurance1.png' alt='' fill/>
                    </div>
                    <p>Insurance you can trust</p>
                </div>
            </div>
            
            
        </div>
        <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
            <CardHeader>
                <CardTitle className="text-center">
                    Sign In
                </CardTitle>
                <CardDescription className="text-sm text-center text-accent-foreground">
                    Use email or service, to Sign in
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
            <CardContent className="px-2 sm:px-6">
                <form onSubmit={handleSubmit} className=" flex flex-col md:grid md:grid-cols-2 gap-x-4 gap-y-6 max-w-lg mx-auto pt-6">
                    
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-xs font-semibold tracking-wide text-gray-700">Email</Label>
                        <Input 
                            type='email'
                            disabled={pending}
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                    </div>
                    
                
                    
                    <div className="col-span-2 flex justify-center">
                        <Button className="w-full max-w-sm bg-sky-600 shadow-md hover:bg-sky-800 text-md font-semibold" size='lg' disabled={pending}>
                            Sign Up
                        </Button>
                    </div>
                    
                    
                    
                </form>
                <Separator />
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
                        onClick={(e) => handleProvider(e,'github') }
                        variant='outline'
                        size='lg'
                        className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                    >
                        <FaGithub className="size-8 left-25 top-2.5" />
                    </Button>
                </div>
                <p className="text-center text-sm mt-2 text-muted-foreground">
                    Create an account
                    <Link href='/sign-up' className="text-sky-700 ml-4 hover:underline cursor-pointer">Sign Up</Link>
                </p>
            </CardContent> 
        </Card>
    </div>
  )
}

export default SignIn