"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import axios from "axios";

export function PostJobUpdated() {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("jobType", jobType);
    formData.append("description", description);
    formData.append("deadline", deadline);
    formData.append("skills", JSON.stringify(skills));

    try {
      const response = await axios.post("/api/user/postjob", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.msg || "Job posted successfully");
    } catch (error) {
      console.log(error);
      setMessage("Error posting job");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-2">
          <Label>Job Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter job title" />
        </div>

        <div className="grid gap-2">
          <Label>Location</Label>
          <Select value={location} onValueChange={(value) => setLocation(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="australia">Australia</SelectItem>
              <SelectItem value="germany">Germany</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Job Type</Label>
          <Select value={jobType} onValueChange={(value) => setJobType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="job-description">Job Description</Label>
          <Textarea
            id="job-description"
            rows={5}
            placeholder="Describe the job details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start">
                  <span id="deadline">{deadline || "Select deadline"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar onChange={(date) => setDeadline(date?.toISOString() || "")} />
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
                +
              </Button>
            </div>
            <div className="grid gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{skill}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveSkill(index)}>
                    x
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Job Image</Label>
          <div className="flex items-center gap-2">
            <Input type="file" onChange={handleFileChange} />
            {/* <Button variant="outline" size="icon">
              +
            </Button> */}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">Post Job</Button>
        </div>
      </form>

      {message && <div className="mt-4 text-center text-green-500">{message}</div>}
    </div>
  );
}
