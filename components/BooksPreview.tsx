'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, RotateCcw } from 'lucide-react';

const COLOR_MAP: Record<number, { emoji: string; name: string; color: string; bgColor: string; appleColor: string }> = {
  0: { emoji: '🟡', name: 'Knowledge', color: '#BA7517', bgColor: 'rgba(255, 196, 0, 0.12)', appleColor: '#FFC400' },
  1: { emoji: '🟣', name: 'Personal', color: '#993556', bgColor: 'rgba(194, 24, 91, 0.12)', appleColor: '#C2185B' },
  2: { emoji: '🔵', name: 'Action', color: '#185FA5', bgColor: 'rgba(21, 101, 192, 0.12)', appleColor: '#1565C0' },
  3: { emoji: '🟢', name: 'Questions', color: '#0F6E56', bgColor: 'rgba(34, 197, 94, 0.12)', appleColor: '#22C55E' }
};

interface BooksPreviewProps {
  books: Record<string, any>;
  onReset: () => void;
}

function escapeAppleScript(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

function formatDate(dateStr: string): string {
  try {
    const dt = new Date(dateStr);
    return dt.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function generateAppleScript(books: Record<string, any>): string {
  const lines = [
    'tell application "Notes"',
    '    activate',
    '    ',
    '    -- Create folder if it doesn\'t exist',
    '    try',
    '        set koboFolder to folder "Kobo Highlights"',
    '    on error',
    '        set koboFolder to make new folder with properties {name:"Kobo Highlights"}',
    '    end try',
    '    '
  ];

  Object.entries(books).forEach(([, bookData]) => {
    const { title, author, highlights } = bookData;
    const byColor: Record<number, any[]> = {};
    
    highlights.forEach((h: any) => {
      if (!byColor[h.color]) byColor[h.color] = [];
      byColor[h.color].push(h);
    });

    const htmlParts: string[] = [];
    Object.keys(byColor).map(Number).sort().forEach(colorId => {
      const colorInfo = COLOR_MAP[colorId] || COLOR_MAP[0];
      const appleColor = colorInfo.appleColor;
      
      htmlParts.push(`<h2>${colorInfo.emoji} ${colorInfo.name.toUpperCase()}</h2>`);
      
      byColor[colorId].forEach(h => {
        htmlParts.push(`<p style="color: ${appleColor}">${escapeAppleScript(h.text)}</p>`);
        htmlParts.push(`<p style="font-size: 11px; color: #888888;">📅 ${formatDate(h.date)}</p>`);
        if (h.annotation) {
          htmlParts.push(`<p style="font-size: 12px; font-style: italic; color: #666666;">💭 ${escapeAppleScript(h.annotation)}</p>`);
        }
        htmlParts.push('<br>');
      });
    });

    const htmlContent = htmlParts.join('');
    const escapedTitle = escapeAppleScript(title);
    const escapedAuthor = escapeAppleScript(author);
    const escapedHTML = escapeAppleScript(htmlContent);

    lines.push(`    -- Create note for: ${title}`);
    lines.push(`    set noteTitle to "${escapedTitle}"`);
    lines.push(`    set noteAuthor to "${escapedAuthor}"`);
    lines.push(`    set noteHTML to "${escapedHTML}"`);
    lines.push('    ');
    lines.push('    tell koboFolder');
    lines.push('        set newNote to make new note with properties {name:noteTitle}');
    lines.push('        tell newNote');
    lines.push('            set body to "<h1>" & noteTitle & "</h1><p style=\\"font-size: 14px; color: #666;\\">by " & noteAuthor & "</p><hr>" & noteHTML');
    lines.push('        end tell');
    lines.push('    end tell');
    lines.push('    ');
  });

  lines.push('end tell');
  return lines.join('\n');
}

export function BooksPreview({ books, onReset }: BooksPreviewProps) {
  const stats = useMemo(() => {
    const bookCount = Object.keys(books).length;
    const highlightCount = Object.values(books).reduce(
      (sum, book: any) => sum + book.highlights.length,
      0
    );
    return { bookCount, highlightCount };
  }, [books]);

  const handleDownload = () => {
    const script = generateAppleScript(books);
    const blob = new Blob([script], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'import_to_apple_notes.scpt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>
          Found {stats.bookCount} {stats.bookCount === 1 ? 'book' : 'books'}, {stats.highlightCount} highlights
        </CardTitle>
        <CardDescription>Ready to export to Apple Notes</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {Object.entries(books).map(([, bookData]) => {
            const { title, author, highlights } = bookData;
            
            const colorCounts: Record<number, number> = {};
            highlights.forEach((h: any) => {
              colorCounts[h.color] = (colorCounts[h.color] || 0) + 1;
            });

            return (
              <div key={title} className="pb-4 border-b last:border-b-0 last:pb-0">
                <div className="font-medium mb-1">{title}</div>
                <div className="text-sm text-muted-foreground mb-2">{author}</div>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(colorCounts).map(([colorId, count]) => {
                    const color = Number(colorId);
                    const colorInfo = COLOR_MAP[color] || COLOR_MAP[0];
                    return (
                      <Badge
                        key={colorId}
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor: colorInfo.bgColor,
                          color: colorInfo.color,
                          border: 'none'
                        }}
                      >
                        {colorInfo.emoji} {count} {count === 1 ? 'highlight' : 'highlights'}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="flex gap-3">
        <Button onClick={handleDownload} className="flex-1">
          <Download className="w-4 h-4 mr-2" />
          Download AppleScript
        </Button>
        <Button onClick={onReset} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Start over
        </Button>
      </CardFooter>
    </Card>
  );
}
