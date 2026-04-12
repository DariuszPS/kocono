'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { KoconoUploader } from '@/components/KoconoUploader';
import { BooksPreview } from '@/components/BooksPreview';
import { FAQ } from '@/components/FAQ';
import { Moon, Sun } from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [books, setBooks] = useState<any>(null);

  const handleReset = () => {
    setBooks(null);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <div className="max-w-[700px] mx-auto px-4 py-8">
          {/* Header with dark mode toggle */}
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  Light
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  Dark
                </>
              )}
            </Button>
          </div>

          {/* Hero */}
          <div className="text-center py-12 pb-8">
            <h1 className="text-[42px] font-medium tracking-tight mb-2">Kocono</h1>
            <p className="text-base text-muted-foreground">
              Preserve your Kobo Colour highlights when exporting to Apple Notes
            </p>
          </div>

          {/* Main Content */}
          {!books ? (
            <KoconoUploader onBooksExtracted={setBooks} />
          ) : (
            <BooksPreview books={books} onReset={handleReset} />
          )}

          {/* How it works */}
          <div className="mt-12">
            <h3 className="text-xl font-medium mb-4">How it works</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-sm font-medium flex-shrink-0">
                  1
                </div>
                <div>
                  <div className="font-medium text-sm mb-0.5">Upload your database</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    Connect your Kobo to Mac and locate KoboReader.sqlite in the .kobo folder
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-sm font-medium flex-shrink-0">
                  2
                </div>
                <div>
                  <div className="font-medium text-sm mb-0.5">Preview your highlights</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    See all your books and color-coded highlights before exporting
                  </div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-sm font-medium flex-shrink-0">
                  3
                </div>
                <div>
                  <div className="font-medium text-sm mb-0.5">Download and run</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    Open the AppleScript file in Script Editor and click Run to import to Apple Notes
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <FAQ />

          {/* Footer */}
          <div className="text-center py-8 border-t border-border mt-12">
            <p className="text-sm text-muted-foreground">
              First tool to preserve Kobo Colour highlights with their original colors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
