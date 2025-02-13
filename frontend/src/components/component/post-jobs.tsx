"use client";

import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Input } from "../../components/ui/input";

export function PostJobs() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [selectedDeadline, setSelectedDeadline] = useState(null);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="space-y-6">
        {/* Job Title */}
        <div className="grid gap-2">
          <Label>Job Title</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select job title" />
              <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software-engineering">
                <CodeIcon className="w-4 h-4 mr-2" />
                Software Engineering
              </SelectItem>
              <SelectItem value="design">
                <BrushIcon className="w-4 h-4 mr-2" />
                Design
              </SelectItem>
              <SelectItem value="marketing">
                <MegaphoneIcon className="w-4 h-4 mr-2" />
                Marketing
              </SelectItem>
              <SelectItem value="sales">
                <BriefcaseIcon className="w-4 h-4 mr-2" />
                Sales
              </SelectItem>
              <SelectItem value="finance">
                <DollarSignIcon className="w-4 h-4 mr-2" />
                Finance
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="grid gap-2">
          <Label>Location</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
              <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">
                <FlagIcon className="w-4 h-4 mr-2" />
                United States
              </SelectItem>
              <SelectItem value="canada">
                <FlagIcon className="w-4 h-4 mr-2" />
                Canada
              </SelectItem>
              <SelectItem value="uk">
                <FlagIcon className="w-4 h-4 mr-2" />
                United Kingdom
              </SelectItem>
              <SelectItem value="australia">
                <FlagIcon className="w-4 h-4 mr-2" />
                Australia
              </SelectItem>
              <SelectItem value="germany">
                <FlagIcon className="w-4 h-4 mr-2" />
                Germany
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div className="grid gap-2">
          <Label>Job Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
              <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">
                <ClockIcon className="w-4 h-4 mr-2" />
                Full Time
              </SelectItem>
              <SelectItem value="part-time">
                <ClockIcon className="w-4 h-4 mr-2" />
                Part Time
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Description */}
        <div className="grid gap-2">
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea id="job-description" rows={5} placeholder="Describe the job details" />
        </div>

        {/* Deadline and Skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  {selectedDeadline ? selectedDeadline.toLocaleDateString() : "Select deadline"}
                  <ChevronDownIcon className="ml-2 w-4 h-4 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar selected={selectedDeadline} onSelect={setSelectedDeadline} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid gap-2">
            <Label>Skills</Label>
            <div className="flex items-center gap-2">
              <Input placeholder="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
              <Button variant="outline" size="icon" onClick={handleAddSkill}>
                <PlusIcon className="w-5 h-5" />
              </Button>
            </div>
            <div className="grid gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSkill(index)}>
                    <div className="w-5 h-5 text-muted-foreground">✕</div>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Job Image */}
        <div className="grid gap-2">
          <Label>Job Image</Label>
          <div className="flex items-center gap-2">
            <Input type="file" />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit">
            <PlusIcon className="w-5 h-5 mr-2" />
            Post Job
          </Button>
        </div>
      </div>
    </div>
  );
}

// Icon Components
function ChevronDownIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

// Include other icons similarly...
