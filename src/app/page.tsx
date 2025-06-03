import ImageAnalyzer from './components/ImageAnalyzer';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gradient-brand">Image Color Analyzer</h1>
        <p className="text-center mb-8 text-foreground-muted">
          Upload an image to analyze its color composition using Google&apos;s Gemini AI
        </p>
        <ImageAnalyzer />
      </div>
    </main>
  );
} 