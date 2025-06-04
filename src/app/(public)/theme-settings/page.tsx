import ImageAnalyzer from "@/components/organisms/ImageAnalyzer";


export default function ThemeSettings() {
  return (
    <main className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Theme Settings
          </h1>
          <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
            Customize your shopping experience with our AI-powered theme generator
          </p>
        </div>
        
        <div className="relative mb-8 bg-background-subtle rounded-2xl border border-border shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
          <div className="relative p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4 text-foreground">
              Brand Color Analysis
            </h2>
            <p className="text-center mb-8 text-foreground-muted max-w-2xl mx-auto">
              Upload your logo to analyze its color composition and generate a custom theme using Google&apos;s Gemini AI
            </p>
            <div className="transition-all duration-300 hover:scale-[1.01]">
              <ImageAnalyzer />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 