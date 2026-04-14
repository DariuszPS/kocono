'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'Where do I find KoboReader.sqlite?',
    answer: 'Connect your Kobo to your Mac via USB. Open Finder and navigate to your Kobo device. Look for the hidden .kobo folder (press Cmd+Shift+. to show hidden files). Inside, you\'ll find KoboReader.sqlite.'
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes! All processing happens locally in your browser. Your database file never leaves your computer or gets uploaded to any server. This is a 100% client-side application.'
  },
  {
    question: 'How do I run the AppleScript?',
    answer: 'After downloading the .scpt file, open Script Editor (in Applications → Utilities). Click File → Open and select the downloaded file. Then click the ▶️ Run button. Check Apple Notes for a new "Kobo Highlights" folder.'
  },
  {
    question: 'Will the colors show in Apple Notes?',
    answer: 'Yes! The highlights will appear in their original colors (yellow, pink, blue, green). Each color section also has an emoji header (🟡🟣🔵🟢) for easy identification.'
  },
  {
    question: 'Which Kobo devices are supported?',
    answer: 'This tool works with Kobo Clara Colour and Kobo Libra Colour - the devices that support color highlighting. Older Kobo models without color support are not compatible.'
  },
  {
    question: 'Can I customize the color categories?',
    answer: 'Currently, the color mapping is fixed (Yellow=Knowledge, Purple=Personal, Blue=Action, Green=Questions). Custom categories will be added in a future update.'
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-border border border-border rounded-xl overflow-hidden">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left bg-card hover:bg-accent transition-colors"
            >
              <span className="text-sm font-medium text-foreground pr-4">{faq.question}</span>
              <ChevronDown
                className={`w-4 h-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-4 pt-3 text-sm text-muted-foreground leading-relaxed bg-card">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
