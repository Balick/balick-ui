import { GitHubIcon, LinkedInIcon, XIcon, YouTubeIcon } from "@/registry/balick/ui/social-icons"

const socials = [
  { name: "GitHub", icon: GitHubIcon },
  { name: "X", icon: XIcon },
  { name: "LinkedIn", icon: LinkedInIcon },
  { name: "YouTube", icon: YouTubeIcon },
]

export default function SocialIconsDemo() {
  return (
    <div className="flex items-center gap-2">
      {socials.map(({ name, icon: Icon }) => (
        <a
          key={name}
          href="#"
          aria-label={name}
          className="inline-flex size-10 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Icon className="size-4" />
        </a>
      ))}
    </div>
  )
}
