"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

enum Options {
  PROFILE,
  EDUCATION
}

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
import Profile from "./settings/Profile"
import { NavigationBar } from "./settings/NavigationBar"
import Education from "./settings/Education"
import { ProfilePage } from "./component/profile-page"

export function Settings() {
  const [activeSection, setActiveSection] = React.useState<Options>(Options.PROFILE);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-black p-4 md:gap-8 md:p-10">
        <div className="border-b pb-4">
          <h1 className="text-3xl font-semibold">Settings</h1>
          <div className="font-semibold text-pink-100">Manage your account settings and set e-mail preferences.</div>
        </div>
       
        <div className="">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Education
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => setActiveSection(Options.EDUCATION)}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Experience
                  </NavigationMenuLink>
                </button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <button onClick={() => setActiveSection(Options.PROFILE)}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Profile
                  </NavigationMenuLink>
                </button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {activeSection === Options.EDUCATION ? <Education /> : <ProfilePage />}
        </div>
      </main>
    </div>
  )
}
