"use client"
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
// import { XIcon } from "lucide-react"; // Import an icon for removing skills
import { Calendar } from "@/components/ui/calendar"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function JobPostPage() {
  const [skills, setSkills] = useState([]); // Initial skills
  const [newSkill, setNewSkill] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
   "use client"
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
// import { XIcon } from "lucide-react"; // Import an icon for removing skills
import { Calendar } from "@/components/ui/calendar"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function JobPostPage() {
  const [skills, setSkills] = useState([]); // Initial skills
  const [newSkill, setNewSkill] = useState("");
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="job-title">Job Title</Label>
          <Input id="job-title" placeholder="Enter job title" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea id="job-description" rows={5} placeholder="Describe the job details" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
          </div>
          <div className="grid gap-2">
            <Label>Skills</Label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <Button variant="outline" size="icon" onClick={handleAddSkill}>
                <div className="w-5 h-5">+</div>
              </Button>
            </div>
            <div className="grid gap-2 mt-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSkill(skill)}>
                    {/* <XIcon className="w-5 h-5 text-muted-foreground" /> */}
                    -
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Job Image</Label>
          <div className="flex items-center gap-2">
            <Input type="file" />
            <Button variant="outline" size="icon">
              <div className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Post Job</Button>
        </div>
      </div>
    </div>
  );
}

  );
}
