// "use client"
// import Image from "next/image"
// import Link from "next/link"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useRef } from "react"
// import { signIn } from "next-auth/react"

// export function Signin() {
//   const userName = useRef("")
//   const password = useRef("")
//   const onClickHandler = async()=>{
//     console.log(userName)
//     console.log(password)
//     const result = signIn("credentials",{
//       username:userName.current,
//       password:password.current,
//       redirect:true,
//       callbackUrl:"/"
//     })
//     console.log(result)
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
//                 onChange={(e)=>{userName.current =e.target.value}}
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Password</Label>
//                 <Link
//                   href="/forgot-password"
//                   className="ml-auto inline-block text-sm underline"
//                 >
//                   Forgot your password?
//                 </Link>
//               </div>
//               <Input id="password" type="password" required onChange={(e)=>{password.current =e.target.value}}/>
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
"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef } from "react"
import { signIn } from "next-auth/react"

export function Signin() {
  const userName = useRef("")
  const password = useRef("")

  const onClickHandler = async () => {
    const result = await signIn("credentials", {
      email: userName.current, // Use 'email' instead of 'username'
      password: password.current,
      // redirect: true,
      role: "user",
      callbackUrl: "/app"
    })
    console.log(result)
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Signin</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                required
                onChange={(e) => { userName.current = e.target.value }}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input id="password" type="password" required onChange={(e) => { password.current = e.target.value }} />
            </div>
            <Button type="submit" className="w-full" onClick={onClickHandler}>
              Signin
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"} className="underline">
              Signup
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
          className="h-full w-full object-cover dark:brightness-[0.2] "
        />
      </div>
    </div>
  )
}