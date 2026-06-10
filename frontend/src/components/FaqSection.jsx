import * as React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { FAQ_ITEMS } from '../constants/content';

export default function FaqSection() {
  return (
    <section id="faq" className="bg-white py-16 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 lg:px-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs text-blue-primary px-3 py-1 rounded-full border border-blue-border bg-white inline-block mb-4">FAQ</span>
          <h2 className="font-heading font-bold text-[#0F172A] text-4xl lg:text-5xl leading-tight">
            Have Questions?
          </h2>
          <p className="font-body text-[#64748B] mt-4 leading-relaxed">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our admissions team.
          </p>
        </div>

        <Accordion type="single" collapsible className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem
              key={item.q}
              value={item.q}
              className="rounded-xl border border-blue-border bg-white px-5 transition-all hover:bg-blue-light/40"
            >
              <AccordionTrigger className="text-left hover:no-underline font-body font-medium text-sm text-[#0F172A]">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base md:w-3/4">
                <p className="font-body text-sm text-[#64748B] leading-relaxed">{item.a}</p>
                <a
                  href="mailto:admissions@university.edu"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 inline-flex items-center text-xs text-blue-primary opacity-60 transition-opacity hover:opacity-100 font-body"
                >
                  Learn more <ArrowUpRight className="ml-1" size={14} strokeWidth={1.5} />
                </a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
