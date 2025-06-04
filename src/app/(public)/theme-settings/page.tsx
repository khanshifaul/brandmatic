import ImageAnalyzer from '../../components/organisms/ImageAnalyzer';

export default function ThemeSettings() {
  return (
    <main className="min-h-screen p-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gradient">Theme Settings</h1>
        <div className="mb-8 bg-background-subtle p-8 rounded-lg border border-border-subtle">
          <h2 className="text-2xl font-semibold text-center mb-4 text-foreground">Brand Color Analysis</h2>
          <p className="text-center mb-8 text-foreground-muted">
            Upload your logo to analyze its color composition and generate a custom theme using Google&apos;s Gemini AI
          </p>
          <ImageAnalyzer />
        </div>
      </div>
    </main>
  );
} 