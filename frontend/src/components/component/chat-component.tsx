
import { Button } from "../../components/ui/button"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { Input } from "../../components/ui/input"

export function ChatComponent() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-80 border-r bg-muted/20 p-4 sm:block">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Chats</h2>
          <Button variant="ghost" size="icon" className="rounded-full">
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">New chat</span>
          </Button>
        </div>
        <div className="mt-4 space-y-2 overflow-auto">
          <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted/50 p-2 hover:bg-muted" prefetch={false}>
            <Avatar className="h-12 w-12 border">
              <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-0.5">
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Hey, how's it going?</p>
            </div>
            <div className="text-xs text-muted-foreground">2:34 PM</div>
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted/50 p-2 hover:bg-muted" prefetch={false}>
            <Avatar className="h-12 w-12 border">
              <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-0.5">
              <p className="font-medium">Jane Doe</p>
              <p className="text-sm text-muted-foreground">Did you see the new design?</p>
            </div>
            <div className="text-xs text-muted-foreground">1:45 PM</div>
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted/50 p-2 hover:bg-muted" prefetch={false}>
            <Avatar className="h-12 w-12 border">
              <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-0.5">
              <p className="font-medium">Bob Smith</p>
              <p className="text-sm text-muted-foreground">Sounds good, let's do it!</p>
            </div>
            <div className="text-xs text-muted-foreground">12:30 PM</div>
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg bg-muted/50 p-2 hover:bg-muted" prefetch={false}>
            <Avatar className="h-12 w-12 border">
              <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-0.5">
              <p className="font-medium">Alice Johnson</p>
              <p className="text-sm text-muted-foreground">I'll be there in 10 minutes.</p>
            </div>
            <div className="text-xs text-muted-foreground">11:15 AM</div>
          </Link>
        </div>
      </aside>
      <div className="flex-1">
        <div className="flex h-full flex-col">
          <div className="border-b bg-muted/20 p-4 sm:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <p className="font-medium">John Doe</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PhoneIcon className="h-5 w-5" />
                  <span className="sr-only">Call</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <VideoIcon className="h-5 w-5" />
                  <span className="sr-only">Video call</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoveHorizontalIcon className="h-5 w-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div className="grid gap-4">
              <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                <p>Hey, how's it going?</p>
                <div className="text-xs text-muted-foreground">2:34 PM</div>
              </div>
              <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm ml-auto">
                <p>I'm doing great, thanks for asking!</p>
                <div className="text-xs text-primary-foreground/80">2:35 PM</div>
              </div>
              <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                <p>Did you see the new design?</p>
                <div className="text-xs text-muted-foreground">1:45 PM</div>
              </div>
              <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm ml-auto">
                <p>Yeah, it looks really nice! I like the new color scheme.</p>
                <div className="text-xs text-primary-foreground/80">1:47 PM</div>
              </div>
              <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                <p>Sounds good, let's do it!</p>
                <div className="text-xs text-muted-foreground">12:30 PM</div>
              </div>
              <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm ml-auto">
                <p>Awesome, I'll get started on it right away.</p>
                <div className="text-xs text-primary-foreground/80">12:32 PM</div>
              </div>
              <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full bg-muted px-4 py-2 text-sm">
                <p>I'll be there in 10 minutes.</p>
                <div className="text-xs text-muted-foreground">11:15 AM</div>
              </div>
            </div>
          </div>
          <div className="border-t bg-muted/20 p-4">
            <form className="flex items-center gap-2">
              <Input id="message" placeholder="Type your message..." className="flex-1" autoComplete="off" />
              <Button variant="ghost" size="icon" className="rounded-full">
                <PaperclipIcon className="h-5 w-5" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MicIcon className="h-5 w-5" />
                <span className="sr-only">Record voice message</span>
              </Button>
              <Button type="submit" variant="ghost" size="icon" className="rounded-full">
                <SendIcon className="h-5 w-5" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function MicIcon(props) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}


function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function PaperclipIcon(props) {
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
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}


function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}


function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function VideoIcon(props) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}
