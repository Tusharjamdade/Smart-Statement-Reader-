"use client"
import { ProfilePage } from '@/components/component/profile-page'
import { ProfilePageUpdated } from '@/components/component/profile-page-updated'
import { SettingsPage } from '@/components/component/settings-page'
import SignupFormDemo from '@/components/example/signup-form-demo'
import Profile from '@/components/settings/Profile'
import { ThemeProvider } from '@/components/theme-provider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  
  return (
//     <div>
//       <section className="w-full overflow-hidden dark:bg-gray-900">
//     <div className="flex flex-col">
//         <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="User Cover"
//                 className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]" />

//         <div className="sm:w-[80%] xs:w-[90%] mx-auto flex">
//             <img src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxwZW9wbGV8ZW58MHwwfHx8MTcxMTExMTM4N3ww&ixlib=rb-4.0.3&q=80&w=1080" alt="User Profile"
//                     className="rounded-md lg:w-[12rem] lg:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]" />

//             <h1
//                 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif">
//                 Samuel Abera</h1>

//         </div>

//         <div
//             className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
//             <p className="w-fit text-gray-700 dark:text-gray-400 text-md">Lorem, ipsum dolor sit amet
//                 consectetur adipisicing elit. Quisquam debitis labore consectetur voluptatibus mollitia dolorem
//                 veniam omnis ut quibusdam minima sapiente repellendus asperiores explicabo, eligendi odit, dolore
//                 similique fugiat dolor, doloremque eveniet. Odit, consequatur. Ratione voluptate exercitationem hic
//                 eligendi vitae animi nam in, est earum culpa illum aliquam.</p>


//             <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
//                 <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
//                     <div className="w-full">
//                         <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
//                             <div className="flex flex-col pb-3">
//                                 <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
//                                 <dd className="text-lg font-semibold">Samuel</dd>
//                             </div>
//                             <div className="flex flex-col py-3">
//                                 <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
//                                 <dd className="text-lg font-semibold">Abera</dd>
//                             </div>
//                             <div className="flex flex-col py-3">
//                                 <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Date Of Birth</dt>
//                                 <dd className="text-lg font-semibold">21/02/1997</dd>
//                             </div>
//                             <div className="flex flex-col py-3">
//                                 <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Gender</dt>
//                                 <dd className="text-lg font-semibold">Male</dd>
//                             </div>
//                         </dl>
//                     </div>
//                     <div className="w-full">
//                         <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
//                             <div className="flex flex-col pb-3">
//                                 <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Location</dt>
//                                 <dd className="text-lg font-semibold">Ethiopia, Addis Ababa</dd>
//                             </div>

//                             <div className="flex flex-col pt-3">
//                                 <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
//                                 <dd className="text-lg font-semibold">+251913****30</dd>
//                             </div>
//                             <div className="flex flex-col pt-3">
//                                 <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
//                                 <dd className="text-lg font-semibold">samuelabera87@gmail.com</dd>
//                             </div>

//                             <div className="flex flex-col pt-3">
//                                 <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Website</dt>
//                                 <dd className="text-lg font-semibold">https://www.teclick.com</dd>
//                             </div>
//                         </dl>
//                     </div>
//                 </div>
                
//             </div>

//             <div className="flex items-center justify-center text-black  dark:bg-gray-900 bg-white my-8">
//               <div className="flex items-center justify-center gap-x-10 md:gap-x-16">
//                   <Link href="https://x.com/tusharnjamdade" className="h-10 w-10 text-4xl text-black dark:text-white" aria-label="Find us on Twitter" target="_blank" rel="noopener">
//                   {/* <svg className="h-10 w-10 text-black dark:text-white"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg> */}
//                   <i className="fa-brands fa-x-twitter"></i>
//                   </Link>
//                   <Link className="h-10 w-10 text-4xl text-black dark:text-white" href="https://github.com/Tusharjamdade" aria-label="Find us on Facebook" target="_blank"
//                       rel="noopener">
//                       <i className="fa-brands fa-github"></i>

//                   </Link>
//                   <Link href="https://www.linkedin.com/in/tusharjamdade" aria-label="Find us on LinkedIn"
//                       target="_blank" rel="noopener">
//                       <svg className="h-10 w-10 text-black dark:text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path
//                               d="M44.45 0H3.55A3.5 3.5 0 0 0 0 3.46v41.07A3.5 3.5 0 0 0 3.54 48h40.9A3.51 3.51 0 0 0 48 44.54V3.46A3.5 3.5 0 0 0 44.45 0Zm-30.2 40.9H7.11V18h7.12v22.9Zm-3.57-26.03a4.13 4.13 0 1 1-.02-8.26 4.13 4.13 0 0 1 .02 8.26ZM40.9 40.9H33.8V29.77c0-2.66-.05-6.08-3.7-6.08-3.7 0-4.27 2.9-4.27 5.89V40.9h-7.1V18h6.82v3.12h.1c.94-1.8 3.26-3.7 6.72-3.7 7.21 0 8.54 4.74 8.54 10.91V40.9Z"
//                               fill="currentColor"></path>
//                       </svg>
//                   </Link>
//                   <Link href="https://www.instagram.com/tushar_jamdade_" aria-label="Find us on Instagram" target="_blank"
//                       rel="noopener">
//                       <svg className="h-10 w-10 text-black dark:text-white" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//                           <path
//                               d="M24 4.32c6.41 0 7.17.03 9.7.14 2.34.1 3.6.5 4.45.83 1.11.43 1.92.95 2.75 1.79a7.38 7.38 0 0 1 1.8 2.75c.32.85.72 2.12.82 4.46.11 2.53.14 3.29.14 9.7 0 6.4-.03 7.16-.14 9.68-.1 2.35-.5 3.61-.83 4.46a7.42 7.42 0 0 1-1.79 2.75 7.38 7.38 0 0 1-2.75 1.8c-.85.32-2.12.72-4.46.82-2.53.11-3.29.14-9.69.14-6.41 0-7.17-.03-9.7-.14-2.34-.1-3.6-.5-4.45-.83a7.42 7.42 0 0 1-2.75-1.79 7.38 7.38 0 0 1-1.8-2.75 13.2 13.2 0 0 1-.82-4.46c-.11-2.53-.14-3.29-.14-9.69 0-6.41.03-7.17.14-9.7.1-2.34.5-3.6.83-4.45A7.42 7.42 0 0 1 7.1 7.08a7.38 7.38 0 0 1 2.75-1.8 13.2 13.2 0 0 1 4.46-.82c2.52-.11 3.28-.14 9.69-.14ZM24 0c-6.52 0-7.33.03-9.9.14-2.54.11-4.3.53-5.81 1.12a11.71 11.71 0 0 0-4.26 2.77 11.76 11.76 0 0 0-2.77 4.25C.66 9.8.26 11.55.14 14.1A176.6 176.6 0 0 0 0 24c0 6.52.03 7.33.14 9.9.11 2.54.53 4.3 1.12 5.81a11.71 11.71 0 0 0 2.77 4.26 11.73 11.73 0 0 0 4.25 2.76c1.53.6 3.27 1 5.82 1.12 2.56.11 3.38.14 9.9.14 6.5 0 7.32-.03 9.88-.14 2.55-.11 4.3-.52 5.82-1.12 1.58-.6 2.92-1.43 4.25-2.76a11.73 11.73 0 0 0 2.77-4.25c.59-1.53 1-3.27 1.11-5.82.11-2.56.14-3.38.14-9.9 0-6.5-.03-7.32-.14-9.88-.11-2.55-.52-4.3-1.11-5.82-.6-1.6-1.41-2.94-2.75-4.27a11.73 11.73 0 0 0-4.25-2.76C38.2.67 36.45.27 33.9.15 31.33.03 30.52 0 24 0Z"
//                               fill="currentColor"></path>
//                           <path
//                               d="M24 11.67a12.33 12.33 0 1 0 0 24.66 12.33 12.33 0 0 0 0-24.66ZM24 32a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM39.7 11.18a2.88 2.88 0 1 1-5.76 0 2.88 2.88 0 0 1 5.75 0Z"
//                               fill="currentColor"></path>
//                       </svg>

//                   </Link>
//               </div>
//           </div>

            

//         </div>
//     </div>
// </section>

//     </div>
        <div>
          {/* {token} */}
            <ProfilePageUpdated/>
        </div>
  )
}

export default page
