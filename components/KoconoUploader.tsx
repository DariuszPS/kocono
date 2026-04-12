'use client';

import { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';

interface KoconoUploaderProps {
  onBooksExtracted: (books: any) => void;
}

export function KoconoUploader({ onBooksExtracted }: KoconoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Validate file
      if (!file.name.toLowerCase().includes('kobo')) {
        throw new Error('Please select KoboReader.sqlite file');
      }

      // Read file
      const arrayBuffer = await file.arrayBuffer();
      
      // Dynamic import sql.js (FIXED!)
      const initSqlJs = (await import('sql.js')).default;
      
      // Initialize SQL.js with LOCAL wasm file
      const SQL = await initSqlJs({
        locateFile: (filename: string) => `/${filename}`
      });
      
      // Load database
      const db = new SQL.Database(new Uint8Array(arrayBuffer));
      
      // Extract highlights
      const query = `
        SELECT 
          b.Text,
          b.Color,
          b.DateCreated,
          b.Annotation,
          c.Title,
          c.Attribution
        FROM Bookmark b
        JOIN content c ON b.VolumeID = c.ContentID
        WHERE b.Text IS NOT NULL
        ORDER BY c.Title, b.DateCreated
      `;
      
      const results = db.exec(query);
      
      if (results.length === 0) {
        throw new Error('No highlights found in this database. Make sure your Kobo has saved highlights.');
      }
      
      // Group by book
      const books: any = {};
      const rows = results[0].values;
      
      rows.forEach((row: any) => {
        const [text, color, date, annotation, title, author] = row;
        
        if (!books[title]) {
          books[title] = {
            title,
            author: author || 'Unknown Author',
            highlights: []
          };
        }
        
        books[title].highlights.push({
          text,
          color: color !== null ? color : 0,
          date,
          annotation
        });
      });
      
      onBooksExtracted(books);
      
    } catch (error: any) {
      console.error('Error processing file:', error);
      setError(error.message || 'Error processing file. Make sure this is a valid KoboReader.sqlite file.');
    } finally {
      setIsProcessing(false);
    }
  }, [onBooksExtracted]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleClick = () => {
    document.getElementById('file-input')?.click();
  };

  return (
    <>
      {/* Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle>Upload your database</CardTitle>
          <CardDescription>
            Connect your Kobo to Mac and locate KoboReader.sqlite in the .kobo folder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={handleClick}
            className={`
              border-2 border-dashed rounded-lg p-12 text-center
              transition-all cursor-pointer
              ${isDragging ? 'border-primary bg-accent' : 'border-border hover:border-primary/50 hover:bg-accent/50'}
              ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-muted-foreground" />
                <p className="font-medium mb-1">Processing your highlights...</p>
                <p className="text-sm text-muted-foreground">This may take a moment</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-1">Drop KoboReader.sqlite here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </>
            )}
            <input
              id="file-input"
              type="file"
              accept=".sqlite,.sqlite3,.db"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground mb-2">Supported devices</div>
            <div className="text-sm font-medium">Kobo Clara & Libra Colour</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground mb-2">Privacy</div>
            <div className="text-sm font-medium">File never leaves your browser</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-xs text-muted-foreground mb-2">Output</div>
            <div className="text-sm font-medium">AppleScript for Notes.app</div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
