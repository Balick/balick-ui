import { ArrowRight, ChevronDown } from "lucide-react"

import { Section, SectionHeader } from "@/registry/balick/ui/section"

const header = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  description: "Everything you need to know before getting started.",
}

const contact = { label: "Contact support", href: "#" }

const faqs = [
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Hobby plan is free forever and includes one project and 10,000 monthly events. Upgrade whenever you need more.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "At any time. Upgrades take effect immediately and downgrades apply at the end of your billing period, with no fees either way.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "Every paid plan starts with a 14-day trial. No credit card is required, and you choose whether to continue at the end.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "In the region you choose when creating a project: Europe, the United States or Asia. Data is encrypted at rest and in transit.",
  },
  {
    question: "Do you offer discounts for startups and nonprofits?",
    answer:
      "Yes. Eligible startups and nonprofits get 50% off the Pro plan for the first year. Contact us with a short description of your project.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Of course. Cancel from your settings in two clicks and export all your data whenever you like.",
  },
]

export function Faq01({ id = "faq" }: { id?: string }) {
  return (
    <Section id={id}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeader {...header} align="left">
            <a
              href={contact.href}
              className="group inline-flex items-center gap-1 text-sm font-medium"
            >
              {contact.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </SectionHeader>
        </div>
        {/*
          Native disclosure: accessible without JavaScript and independent of the
          project's shadcn/ui style. Sharing a name keeps one answer open at a time.
        */}
        <div className="border-t">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              name="faq"
              className="group border-b [interpolate-size:allow-keywords] details-content:h-0 details-content:overflow-hidden details-content:transition-[height,content-visibility] details-content:transition-discrete details-content:duration-200 details-content:ease-out open:details-content:h-auto motion-reduce:details-content:transition-none"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDown
                  aria-hidden
                  className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <p className="pb-5 leading-6 text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
