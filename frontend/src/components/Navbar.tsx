"use client"
import React from 'react'
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from './ModeToggle'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
    const { data: session, status } = useSession();
  
    const router = useRouter();

    const handleLogout = async () => {
      await signOut(); // Prevents NextAuth from handling redirection
      router.push("/"); // Manually redirect after signout
    };
  // const router =useRouter()
  return (
    <div className='sticky top-0 z-50'>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/app"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
             <div className="flex items-center gap-2">
          <span className="text-2xl font-medium text-foreground">LedgerAI</span>
        </div>
          </Link>
          {status == "authenticated" && (
            <>
          
          <Link
            href="/app"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/preview"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Preview
          </Link>
          <Link
            href="/chart"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Chart
          </Link>
          </>
          )}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="/app"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                {/* <Package2 className="h-6 w-6" /> */}
                <span className="sr-only">LedgerAI</span>
              </Link>
              {status == "authenticated" && (
            <>
          
          <Link
            href="/app"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/preview"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Preview
          </Link>
          <Link
            href="/chart"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Chart
          </Link>
          <Link
            href="/chart"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
          </>
          )}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              /> */}
            </div>
          </form>
          <ModeToggle/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel ><Link href={"/profile"}>My Account</Link></DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem><Link href={"/settings"}>Settings</Link></DropdownMenuItem> */}
              {/* <DropdownMenuItem><Link href={"/support"}>Support</Link></DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}

export default Navbar

