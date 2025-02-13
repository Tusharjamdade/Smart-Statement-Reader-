import React from 'react'
import Link from "next/link"
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
import { RadioGroupDemo } from '../RadioGroupDemo'

const Education = () => {
  return (
    <div>
           <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <div className="border-b pb-4">
                <CardTitle>Education</CardTitle>
                <CardDescription>
                This is how others will see you on the site.
                </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="mb-6">
                    <label htmlFor="" >&nbsp;Username
                      <input className="mt-1 flex h-10 w-full md:w-2/3 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Username" />
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Update Profile</Button>
              </CardFooter>
            </Card>
    </div>
  )
}

export default Education
