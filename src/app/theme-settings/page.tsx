import ImageAnalyzer from '../components/ImageAnalyzer';

export default function ThemeSettings() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gradient-brand">Theme Settings</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Brand Color Analysis</h2>
          <p className="text-center mb-8 text-foreground-muted">
            Upload your logo to analyze its color composition and generate a custom theme using Google&apos;s Gemini AI
          </p>
          <ImageAnalyzer />
        </div>
      </div>
    </main>
  );
} 