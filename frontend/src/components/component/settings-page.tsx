
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export function SettingsPage() {
  const router = useRouter()
  const { data: session,status } = useSession();
  if(!(status === "authenticated")){
    // router.push("/signin")
  }
  const [skills, setSkills] = useState([""])
  const handleAddSkill = () => {
    setSkills([...skills, ""])
  }
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills]
    updatedSkills[index] = value
    setSkills(updatedSkills)
  }
  const handleDeleteSkill = (index) => {
    const updatedSkills = [...skills]
    updatedSkills.splice(index, 1)
    if (updatedSkills.length === 0) {
      updatedSkills.push("")
    }
    setSkills(updatedSkills)
  }
  const [education, setEducation] = useState([
    {
      university: "",
      degree: "",
      marks: "",
    },
  ])
  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        university: "",
        degree: "",
        marks: "",
      },
    ])
  }
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education]
    updatedEducation[index][field] = value
    setEducation(updatedEducation)
  }
  const handleDeleteEducation = (index) => {
    const updatedEducation = [...education]
    updatedEducation.splice(index, 1)
    setEducation(updatedEducation)
  }
  const [firstNameError, setFirstNameError] = useState("")
  const [lastNameError, setLastNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const validateForm = () => {
    let isValid = true
    if (!firstNameError) {
      setFirstNameError("First name is required")
      isValid = false
    }
    if (!lastNameError) {
      setLastNameError("Last name is required")
      isValid = false
    }
    if (!emailError) {
      setEmailError("Email is required")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(emailError)) {
      setEmailError("Email is not valid")
      isValid = false
    }
    if (!passwordError) {
      setPasswordError("Password is required")
      isValid = false
    } else if (passwordError.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      isValid = false
    }
    if (!confirmPasswordError) {
      setConfirmPasswordError("Confirm password is required")
      isValid = false
    } else if (confirmPasswordError !== passwordError) {
      setConfirmPasswordError("Passwords do not match")
      isValid = false
    }
    return isValid
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
    }
  }
  return (
    <div className="flex flex-col w-full min-h-screen bg-muted">
      <main className="flex-1 py-8 md:py-12">
        <div className="container grid gap-8 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
          <nav className="bg-background rounded-lg shadow-sm">
            <div className="p-4 md:p-6">
              <h2 className="text-lg font-semibold">Settings</h2>
            </div>
            <Separator />
            <div className="grid gap-1">
              <Link
                href="#profile"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                prefetch={false}
              >
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link
                href="#education"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                prefetch={false}
              >
                <BookIcon className="w-5 h-5" />
                <span>Education</span>
              </Link>
              <Link
                href="#settings"
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                prefetch={false}
              >
                <SettingsIcon className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </div>
          </nav>
          <div className="grid gap-8">

            <section id="profile" className="bg-background rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold">Profile</h2>
              <Separator className="my-4" />
              <form className="grid gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="Enter your first name"
                      value={session?.user.profile.firstName}
                      onChange={(e) => setFirstNameError(e.target.value)}
                      required
                    />
                    {/* {firstNameError && <div className="text-red-500">{firstNameError}</div>} */}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Enter your last name"
                      value={lastNameError}
                      onChange={(e) => setLastNameError(e.target.value)}
                      required
                    />
                    {/* {lastNameError && <div className="text-red-500">{lastNameError}</div>} */}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={emailError}
                    onChange={(e) => setEmailError(e.target.value)}
                    required
                  />
                  {/* {emailError && <div className="text-red-500">{emailError}</div>} */}
                </div>
                <div className="grid gap-2">
                  <Label>Gender</Label>
                  <div className="flex items-center gap-4">
                    <RadioGroup onChange={()=>{}}>
                      <RadioGroupItem id="gender-male" value="male" className="peer sr-only" />
                      <Label htmlFor="gender-male" className="flex items-center gap-2 cursor-pointer">
                        <div className="h-5 w-5 rounded-full border border-muted-foreground peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-background" />
                        </div>
                        <span>Male</span>
                      </Label>
                    </RadioGroup>
                    <RadioGroup>
                      <RadioGroupItem id="gender-female" value="female" className="peer sr-only" />
                      <Label htmlFor="gender-female" className="flex items-center gap-2 cursor-pointer">
                        <div className="h-5 w-5 rounded-full border border-muted-foreground peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-background" />
                        </div>
                        <span>Female</span>
                      </Label>
                    </RadioGroup>
                    <RadioGroup>
                      <RadioGroupItem id="gender-other" value="other" className="peer sr-only" />
                      <Label htmlFor="gender-other" className="flex items-center gap-2 cursor-pointer">
                        <div className="h-5 w-5 rounded-full border border-muted-foreground peer-checked:bg-primary peer-checked:border-primary flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full bg-background" />
                        </div>
                        <span>Other</span>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="social-links">Social Links</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="social-links-linkedin" placeholder="LinkedIn" />
                    <Input id="social-links-twitter" placeholder="Twitter" />
                    <Input id="social-links-github" placeholder="GitHub" />
                    <Input id="social-links-instagram" placeholder="Instagram" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="skills">Skills</Label>
                  <div className="grid grid-cols-1 gap-4">
                    {skills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          id={`skills-${index}`}
                          placeholder={`Skill ${index + 1}`}
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          required
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:bg-muted hover:text-muted"
                          onClick={() => handleDeleteSkill(index)}
                        >
                          <XIcon className="w-4 h-4" />
                          <span className="sr-only">Delete Skill</span>
                        </Button>
                        {index === skills.length - 1 && <Button onClick={handleAddSkill}>Add Skill</Button>}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Enter your bio" className="min-h-[100px]" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="profile-picture">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Upload</Button>
                  </div>
                </div>
                <Button className="justify-self-end">Save Changes</Button>
              </form>
            </section>



            <section id="education" className="bg-background rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold">Education</h2>
              <Separator className="my-4" />
              <form className="grid gap-6">
                {education.map((item, index) => (
                  <div key={index} className="grid gap-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`university-${index}`}>University</Label>
                        <Input
                          id={`university-${index}`}
                          placeholder="Enter your university"
                          value={item.university}
                          onChange={(e) => handleEducationChange(index, "university", e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`degree-${index}`}>Degree</Label>
                        <Input
                          id={`degree-${index}`}
                          placeholder="Enter your degree"
                          value={item.degree}
                          onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`marks-${index}`}>Marks Obtained</Label>
                        <Input
                          id={`marks-${index}`}
                          placeholder="Enter your marks"
                          value={item.marks}
                          onChange={(e) => handleEducationChange(index, "marks", e.target.value)}
                          required
                        />
                      </div>
                      {index === education.length - 1 && <Button onClick={handleAddEducation}>Add College</Button>}
                      {index !== 0 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:bg-muted hover:text-muted"
                          onClick={() => handleDeleteEducation(index)}
                        >
                          <XIcon className="w-4 h-4" />
                          <span className="sr-only">Delete Education</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </form>
            </section>
            <section id="settings" className="bg-background rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-xl font-semibold">Settings</h2>
              <Separator className="my-4" />
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="password">Change Password</Label>
                  <div className="grid gap-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your new password"
                      value={passwordError}
                      onChange={(e) => setPasswordError(e.target.value)}
                      required
                    />
                    {passwordError && <div className="text-red-500">{passwordError}</div>}
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your new password"
                      value={confirmPasswordError}
                      onChange={(e) => setConfirmPasswordError(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}


function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  )
}


function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
