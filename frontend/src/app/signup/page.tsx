// "use client"
// import Image from "next/image"
// import Link from "next/link"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useRef, useState } from "react"
// import { signIn } from "next-auth/react"
// import axios from "axios"

// export default function Signup() {
//   const [email,setEmail] = useState("")
//   const [password,setpassword] = useState("")
//   const [confirmPassword,setconfirmPassword] = useState("")
//   const onClickHandler = async()=>{
//   const response = axios.post("")
//   }
//   return (
//     <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
//       <div className="flex items-center justify-center py-12">
//         <div className="mx-auto grid w-[350px] gap-6">
//           <div className="grid gap-2 text-center">
//             <h1 className="text-3xl font-bold">Login</h1>
//             <p className="text-balance text-muted-foreground">
//               Enter your email below to login to your account
//             </p>
//           </div>
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//                 onChange={(e)=>{setEmail(e.target.value)}}
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Password</Label>
//                 {/* <Link
//                   href="/forgot-password"
//                   className="ml-auto inline-block text-sm underline"
//                 >
//                   Forgot your password?
//                 </Link> */}
//               </div>
//               <Input id="password" type="password" placeholder="password" required onChange={(e)=>{setpassword(e.target.value)}}/>
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Confirm Password</Label>
//                 <Link
//                   href="/forgot-password"
//                   className="ml-auto inline-block text-sm underline"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>
//               <Input id="password" type="password" placeholder="Confirm Password" required onChange={(e)=>{setpassword(e.target.value)}}/>
//             </div>
//             <Button type="submit" className="w-full"  onClick={onClickHandler}>
//               Login
//             </Button>
//             <Button variant="outline" className="w-full">
//               Login with Google
//             </Button>
//           </div>
//           <div className="mt-4 text-center text-sm">
//             Don&apos;t have an account?{" "}
//             <Link href="#" className="underline">
//               Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="hidden bg-muted lg:block bg-cover">
//         <Image
//           src="/img4.webp"
//           alt="Image"
//           width="1920"
//           height="1080"
//           className="h-full w-full object-cover dark:brightness-[0.2] "
//         />
//       </div>
//     </div>
//   )
// }
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Success popup state

  const onClickHandler = async () => {
    setError(""); // Clear previous errors

    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const user = {
      email,
      password,
      role: "user",
    };

    try {
      await axios.post(`http://localhost:3000/api/user/signup`, user);
      setSuccess(true); // Show success popup
      setEmail(""); // Clear fields
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("An error occurred during signup");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signup</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details to create an account
            </p>
          </div>

          {error && <div className="text-red-500 text-center">{error}</div>}

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" onClick={onClickHandler}>
              Signup
            </Button>
            <Button variant="outline" className="w-full">
              Signup with Google
            </Button>
          </div>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block bg-cover">
        <Image
          src="/img4.webp"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2]"
        />
      </div>

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-green-600">
              User Created Successfully!
            </h2>
            <Button onClick={() => setSuccess(false)} className="mt-4">
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
