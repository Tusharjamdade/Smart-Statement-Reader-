
// "use client"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { getCsrfToken, getSession, useSession } from "next-auth/react"
// import { getServerSession } from "next-auth"
// import { redirect } from "next/navigation"

// export  function ProfilePageUpdated() {
//   const {data:session,status}  =useSession();
//   if(!(status === "authenticated")){
//     redirect("/signin")
//   }
//       const blob = new Blob([new Uint8Array(session.user.profile.image)], { type: 'image/png' });
//           const url = URL.createObjectURL(blob);
//   // console.log(session)
//   return (
//     <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12">
//       <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12">
//         <div className="flex flex-col items-center gap-6">
//           <Avatar className="w-52 h-52 border-4 border-primary">
//             <AvatarImage src={url} alt="@username" />
//             <AvatarFallback>JD</AvatarFallback>
//           </Avatar>
//           <div className="text-center space-y-1">
//             <h2 className="text-2xl font-bold">{session?.user.profile.firstName +" "+session?.user.profile.lastName}</h2>
//             <p className="text-muted-foreground">{session?.user.profile.jobRole}</p>
//           </div>
//           <div className="flex items-center gap-2 text-primary">
//             <StarIcon className="w-5 h-5 fill-current" />
//             <StarIcon className="w-5 h-5 fill-current" />
//             <StarIcon className="w-5 h-5 fill-current" />
//             <StarIcon className="w-5 h-5 fill-current" />
//             <StarIcon className="w-5 h-5 fill-current" />
//             <span className="font-semibold">5.0</span>
//           </div>
//           <div className="grid gap-2 text-sm">
//             <div className="flex items-center gap-2">
//               <BriefcaseIcon className="w-5 h-5 text-muted-foreground" />
//               <span>5+ years of experience</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <LocateIcon className="w-5 h-5 text-muted-foreground" />
//               <span>{session?.user.profile.location}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <WalletIcon className="w-5 h-5 text-muted-foreground" />
//               <span>$50 - $100/hr</span>
//             </div>
//           </div>
//         </div>
//         <div className="space-y-8">
//           <div>
//             <h3 className="text-xl font-bold mb-4">About Me</h3>
//             <p className="text-muted-foreground">
//               {session?.user.profile.bio}
//             </p>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4">Skills</h3>
//             <div className="flex flex-wrap gap-2">
//               {session?.user.profile.skills.map((skill)=>
//               <Badge variant="secondary">{skill}</Badge>
//               )}
              
//             </div>
//           </div>
//           <div>
//             <h3 className="text-xl font-bold mb-4">Reviews</h3>
//             <div className="space-y-4">
//               <div className="flex items-start gap-4">
//                 <Avatar className="w-10 h-10 border">
//                   <AvatarImage src="/placeholder-user.jpg" alt="@username" />
//                   <AvatarFallback>JD</AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 space-y-2">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-semibold">Sarah Johnson</h4>
//                     <div className="flex items-center gap-1 text-primary">
//                       <StarIcon className="w-4 h-4 fill-current" />
//                       <StarIcon className="w-4 h-4 fill-current" />
//                       <StarIcon className="w-4 h-4 fill-current" />
//                       <StarIcon className="w-4 h-4 fill-current" />
//                       <StarIcon className="w-4 h-4 fill-current" />
//                     </div>
//                   </div>
//                   <p className="text-muted-foreground">
//                     John did an amazing job on my website. He was responsive, professional, and delivered high-quality
//                     work. I would highly recommend him to anyone looking for a skilled web developer.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-4">
//                 <Avatar className="w-10 h-10 border">
//                   <AvatarImage src="/placeholder-user.jpg" alt="@username" />
//                   <AvatarFallback>JD</AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 space-y-2">
//                   <div className="flex items-center justify-between">
//                     <h4 className="font-semibold">Alex Smith</h4>
//                     <div className="flex items-center gap-1 text-primary">
//                       <StarIcon className="w-4 h-4 fill-current" />
//                       <StarIcon className="w-4 h-4 fill-current" />
//                       <StarIcon className="w-4 h-4 fill-current" />
//                       <StarIcon className="w-4 h-4 fill-current" />
//                       <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
//                     </div>
//                   </div>
//                   <p className="text-muted-foreground">
//                     John was a pleasure to work with. He understood my requirements and delivered a great website on
//                     time. I would definitely hire him again for future projects.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Separator className="my-8 md:my-12" />
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Other Freelancers</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           <Card className="p-4 hover:bg-muted transition-colors">
//             <div className="flex items-center gap-4">
//               <Avatar className="w-12 h-12 border">
//                 <AvatarImage src="/placeholder-user.jpg" alt="@username" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h3 className="text-lg font-semibold">Jane Doe</h3>
//                 <p className="text-muted-foreground">UI/UX Designer</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4 text-primary">
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
//               <span className="font-semibold">4.8</span>
//             </div>
//             <p className="text-muted-foreground mt-2 line-clamp-2">
//               Experienced UI/UX designer with a passion for creating user-friendly and visually appealing interfaces.
//             </p>
//             <Button variant="link" className="mt-4">
//               View Profile
//             </Button>
//           </Card>
//           <Card className="p-4 hover:bg-muted transition-colors">
//             <div className="flex items-center gap-4">
//               <Avatar className="w-12 h-12 border">
//                 <AvatarImage src="/placeholder-user.jpg" alt="@username" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h3 className="text-lg font-semibold">Michael Johnson</h3>
//                 <p className="text-muted-foreground">Front-end Developer</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4 text-primary">
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
//               <span className="font-semibold">4.7</span>
//             </div>
//             <p className="text-muted-foreground mt-2 line-clamp-2">
//               Skilled front-end developer with expertise in React, JavaScript, and responsive design.
//             </p>
//             <Button variant="link" className="mt-4">
//               View Profile
//             </Button>
//           </Card>
//           <Card className="p-4 hover:bg-muted transition-colors">
//             <div className="flex items-center gap-4">
//               <Avatar className="w-12 h-12 border">
//                 <AvatarImage src="/placeholder-user.jpg" alt="@username" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h3 className="text-lg font-semibold">Emily Davis</h3>
//                 <p className="text-muted-foreground">Full-stack Developer</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4 text-primary">
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <span className="font-semibold">5.0</span>
//             </div>
//             <p className="text-muted-foreground mt-2 line-clamp-2">
//               Experienced full-stack developer with expertise in Node.js, React, and database technologies.
//             </p>
//             <Button variant="link" className="mt-4">
//               View Profile
//             </Button>
//           </Card>
//           <Card className="p-4 hover:bg-muted transition-colors">
//             <div className="flex items-center gap-4">
//               <Avatar className="w-12 h-12 border">
//                 <AvatarImage src="/placeholder-user.jpg" alt="@username" />
//                 <AvatarFallback>JD</AvatarFallback>
//               </Avatar>
//               <div>
//                 <h3 className="text-lg font-semibold">David Lee</h3>
//                 <p className="text-muted-foreground">Mobile Developer</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 mt-4 text-primary">
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-current" />
//               <StarIcon className="w-4 h-4 fill-muted stroke-muted-foreground" />
//               <span className="font-semibold">4.6</span>
//             </div>
//             <p className="text-muted-foreground mt-2 line-clamp-2">
//               Skilled mobile developer with expertise in both iOS and Android platforms.
//             </p>
//             <Button variant="link" className="mt-4">
//               View Profile
//             </Button>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// function BriefcaseIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
//       <rect width="20" height="14" x="2" y="6" rx="2" />
//     </svg>
//   )
// }


// function LocateIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <line x1="2" x2="5" y1="12" y2="12" />
//       <line x1="19" x2="22" y1="12" y2="12" />
//       <line x1="12" x2="12" y1="2" y2="5" />
//       <line x1="12" x2="12" y1="19" y2="22" />
//       <circle cx="12" cy="12" r="7" />
//     </svg>
//   )
// }


// function StarIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//     </svg>
//   )
// }


// function WalletIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
//       <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
//     </svg>
//   )
// }
"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function ProfilePageUpdated() {
  const { data: session, status } = useSession();

  if (status !== "authenticated") {
    redirect("/signin");
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col items-center gap-6">
        <Avatar className="w-32 h-32 border-4 border-primary">
          <AvatarImage src="https://lh3.googleusercontent.com/a/default-user" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold">{session?.user.email}</h2>
          <p className="text-muted-foreground font-semibold">Role: {session?.user.role || "User"}</p>
        </div>
      </div>
      <Separator className="my-8 md:my-12" />
      <div>
        <h2 className="text-xl font-bold mb-4">Account Information</h2>
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span>{session?.user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Password:</span>
              <span>********</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span>{session?.user.role || "User"}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
