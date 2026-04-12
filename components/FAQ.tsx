'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-medium mb-6">Frequently asked questions</h2>
      <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-base">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
