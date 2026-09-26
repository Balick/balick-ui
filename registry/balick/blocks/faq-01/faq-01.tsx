import { ArrowRight } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

export function Faq01() {
  return (
    <Section>
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
        <Accordion type="single" collapsible className="border-t">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="py-5 text-base hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 leading-6 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  )
}
