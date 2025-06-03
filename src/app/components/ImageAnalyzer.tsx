'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Image from 'next/image';

interface ColorToken {
  value: string;
  type: "color";
}

interface ColorInfo {
  hex: string;
  percentage: number;
}

interface ColorAnalysis {
  color: {
    light: {
      primary: ColorToken;
      secondary: ColorToken;
      accent: ColorToken;
      tertiary: ColorToken;
      quaternary: ColorToken;
      [key: string]: ColorToken | Record<string, ColorToken>;
    };
    dark: {
      primary: ColorToken;
      secondary: ColorToken;
      accent: ColorToken;
      tertiary: ColorToken;
      quaternary: ColorToken;
      [key: string]: ColorToken | Record<string, ColorToken>;
    };
  };
  originalColors: ColorInfo[];
}

const isNearBlackOrWhite = (hex: string): boolean => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Check if color is very light (near white)
  if (r > 240 && g > 240 && b > 240) return true;
  
  // Check if color is very dark (near black)
  if (r < 15 && g < 15 && b < 15) return true;
  
  return false;
};

const adjustColorForDarkTheme = (hex: string): string => {
  // Convert hex to RGB
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  if (luminance > 0.5) {
    // Color is light, darken it for dark theme
    const darkenFactor = 0.7;
    const newR = Math.floor(r * darkenFactor);
    const newG = Math.floor(g * darkenFactor);
    const newB = Math.floor(b * darkenFactor);
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  } else {
    // Color is dark, lighten it for dark theme
    const lightenFactor = 1.3;
    const newR = Math.min(255, Math.floor(r * lightenFactor));
    const newG = Math.min(255, Math.floor(g * lightenFactor));
    const newB = Math.min(255, Math.floor(b * lightenFactor));
    return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
  }
};

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
};

const generateHarmoniousColors = (baseColor: string, colorCount: number) => {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors: string[] = [baseColor];

  // Generate complementary and analogous colors
  const angles = [180, 30, -30, 60, -60];
  for (let i = 0; i < colorCount - 1 && i < angles.length; i++) {
    let newHue = (hsl.h + angles[i]) % 360;
    if (newHue < 0) newHue += 360;
    
    // Vary saturation and lightness slightly for more interest
    const newSat = Math.min(100, hsl.s + (i % 2 === 0 ? 5 : -5));
    const newLight = Math.min(100, hsl.l + (i % 2 === 0 ? -5 : 5));
    
    const newRgb = hslToRgb(newHue, newSat, newLight);
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  }

  return colors;
};

const generateAIColorPalette = async (baseColor: string): Promise<ColorInfo[]> => {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Given the base color ${baseColor}, generate a harmonious color palette with 4 additional colors.
Return ONLY a raw JSON array (no markdown, no code blocks) in this format:
[
  { "hex": "${baseColor}", "percentage": 40 },
  { "hex": "#HEX2", "percentage": 25 },
  { "hex": "#HEX3", "percentage": 15 },
  { "hex": "#HEX4", "percentage": 12 },
  { "hex": "#HEX5", "percentage": 8 }
]
Use uppercase HEX values (e.g. #FF8000).
Ensure colors are visually distinct but harmonious.
Make sure percentages sum to 100.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Clean up the response text
  let jsonText = text.trim();
  const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    jsonText = codeBlockMatch[1].trim();
  }
  jsonText = jsonText.replace(/`/g, '');

  try {
    return JSON.parse(jsonText) as ColorInfo[];
  } catch (error) {
    console.error('Failed to parse AI-generated color palette:', error);
    throw new Error('Failed to generate color palette');
  }
};

const createColorPalette = async (colors: ColorInfo[]) => {
  const significantColors = colors
    .filter(color => !isNearBlackOrWhite(color.hex))
    .sort((a, b) => b.percentage - a.percentage);

  let paletteColors: ColorInfo[];
  
  if (significantColors.length < 2) {
    // If not enough significant colors, use AI to generate a palette
    // Use the first significant color as base, or a default if none available
    const baseColor = significantColors.length > 0 
      ? significantColors[0].hex 
      : '#3B82F6'; // Default blue if no significant colors
    
    try {
      paletteColors = await generateAIColorPalette(baseColor);
    } catch (error) {
      console.error('Failed to generate AI color palette:', error);
      throw new Error('Failed to generate color palette');
    }
  } else {
    paletteColors = significantColors;
  }

  // Generate harmonious colors based on the palette
  const harmonious = generateHarmoniousColors(paletteColors[0].hex, 5);
  
  // Use actual colors from the palette when available
  for (let i = 0; i < Math.min(paletteColors.length, harmonious.length); i++) {
    harmonious[i] = paletteColors[i].hex;
  }

  return {
    light: {
      primary: { value: harmonious[0], type: "color" },
      secondary: { value: harmonious[1], type: "color" },
      accent: { value: harmonious[2], type: "color" },
      tertiary: { value: harmonious[3], type: "color" },
      quaternary: { value: harmonious[4], type: "color" }
    },
    dark: {
      primary: { value: adjustColorForDarkTheme(harmonious[0]), type: "color" },
      secondary: { value: adjustColorForDarkTheme(harmonious[1]), type: "color" },
      accent: { value: adjustColorForDarkTheme(harmonious[2]), type: "color" },
      tertiary: { value: adjustColorForDarkTheme(harmonious[3]), type: "color" },
      quaternary: { value: adjustColorForDarkTheme(harmonious[4]), type: "color" }
    }
  };
};

// Add an environment check helper
const isDevelopment = process.env.NODE_ENV === 'development';

export default function ImageAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<ColorAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isGeneratingPalette, setIsGeneratingPalette] = useState(false);
  const [isRegeneratingVars, setIsRegeneratingVars] = useState(false);
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    setIsProduction(!isDevelopment);
  }, []);

  const analyzeImage = async (base64Image: string) => {
    try {
      setLoading(true);
      setError(null);
      setIsGeneratingPalette(false);

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY!);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const initialPrompt = `Analyze this logo image and extract the main colors used in it with their percentages.
Return ONLY a raw JSON array (no markdown, no code blocks) in this format:
[
  { "hex": "#HEX1", "percentage": number },
  { "hex": "#HEX2", "percentage": number }
]
Use uppercase HEX values (e.g. #FF8000).
Include only distinct colors, ignore slight variations of the same color.
Sum of percentages should be 100.
Sort by percentage in descending order.`;

      const initialResult = await model.generateContent([
        initialPrompt,
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image.split(',')[1]
          }
        }
      ]);

      const initialResponse = await initialResult.response;
      const text = initialResponse.text();
      
      let jsonText = text.trim();
      const codeBlockMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (codeBlockMatch) {
        jsonText = codeBlockMatch[1].trim();
      }
      jsonText = jsonText.replace(/`/g, '');

      try {
        const colorInfo = JSON.parse(jsonText) as ColorInfo[];
        const significantColors = colorInfo.filter(color => !isNearBlackOrWhite(color.hex));

        if (significantColors.length < 2) {
          setIsGeneratingPalette(true);
        }

        // Create harmonious color palette
        const palette = await createColorPalette(colorInfo);

        const colorAnalysis = {
          color: palette,
          originalColors: colorInfo
        } as ColorAnalysis;

        setAnalysis(colorAnalysis);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        setError('Failed to parse color analysis. Please try again.');
      }
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
      console.error('Error analyzing image:', err);
    } finally {
      setLoading(false);
      setIsGeneratingPalette(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setLoading(true);
      setError(null);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        setImage(base64);
        await analyzeImage(base64);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const updateColorsJson = async () => {
    if (!analysis) return;

    try {
      const response = await fetch('/api/update-colors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          light: {
            primary: analysis.color.light.primary,
            secondary: analysis.color.light.secondary,
            accent: analysis.color.light.accent,
            tertiary: analysis.color.light.tertiary,
            quaternary: analysis.color.light.quaternary
          },
          dark: {
            primary: analysis.color.dark.primary,
            secondary: analysis.color.dark.secondary,
            accent: analysis.color.dark.accent,
            tertiary: analysis.color.dark.tertiary,
            quaternary: analysis.color.dark.quaternary
          }
        })
      });

      if (response.ok) {
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        throw new Error('Failed to update colors.json');
      }
    } catch (err) {
      setError('Failed to update colors.json. Please try again.');
      console.error('Error updating colors.json:', err);
    }
  };

  const regenerateAndRestart = async () => {
    try {
      setIsRegeneratingVars(true);
      setError(null);

      // First, regenerate the tokens
      const generateResponse = await fetch('/api/generate-tokens', {
        method: 'POST'
      });

      if (!generateResponse.ok) {
        throw new Error('Failed to regenerate tokens');
      }

      // Then restart the development server
      const restartResponse = await fetch('/api/restart-server', {
        method: 'POST'
      });

      if (!restartResponse.ok) {
        throw new Error('Failed to restart server');
      }

      // Show success message
      setUpdateSuccess(true);

      // Wait a moment for the server to start shutting down
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Start checking if the server is back up
      const checkServer = async () => {
        try {
          const response = await fetch('/');
          if (response.ok) {
            window.location.reload();
          } else {
            setTimeout(checkServer, 1000);
          }
        } catch {
          // If fetch fails, server is still restarting
          setTimeout(checkServer, 1000);
        }
      };

      // Start checking after a short delay
      setTimeout(checkServer, 2000);

    } catch (err) {
      setError('Failed to regenerate variables and restart server. Please try again.');
      console.error('Error regenerating variables:', err);
      setIsRegeneratingVars(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-primary bg-background-muted' 
            : 'border-border-default hover:border-primary'}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-foreground">Drop your logo here...</p>
        ) : (
          <p className="text-foreground">Drag and drop a logo here, or click to select one</p>
        )}
      </div>

      {loading && (
        <div className="mt-4 text-center">
          <p className="text-foreground">Analyzing logo...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 text-error text-center">
          <p>{error}</p>
        </div>
      )}

      {image && (
        <div className="mt-6 relative w-full aspect-video">
          <Image 
            src={image} 
            alt="Uploaded logo" 
            fill
            className="object-contain rounded-lg shadow-lg"
            priority
          />
        </div>
      )}

      {isGeneratingPalette && (
        <div className="mt-4 text-center">
          <p className="text-foreground-muted">
            Not enough distinct colors found. Generating an AI-powered color palette...
          </p>
        </div>
      )}

      {analysis && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Brand Color Analysis</h2>

          {/* Original Logo Colors with Percentages */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3 text-foreground">Original Logo Colors</h3>
            <div className="flex flex-wrap gap-4">
              {analysis.originalColors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded shadow"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">{color.hex}</p>
                    <p className="text-xs text-foreground-muted">{color.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-foreground-subtle">
              Colors are assigned roles based on their prominence in the logo, excluding black and white.
            </p>
          </div>

          {/* Generated Color Tokens */}
          <div className="space-y-6">
            {/* Light Theme Colors */}
            <div className="p-4 bg-background-subtle rounded-lg shadow">
              <h3 className="text-lg font-medium mb-3 text-foreground">Light Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(analysis.color.light)
                  .filter(entry => typeof entry[1] === 'object' && 'value' in entry[1])
                  .map(([tokenName, color]) => (
                    <div key={tokenName} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded shadow"
                        style={{ backgroundColor: (color as ColorToken).value }}
                      />
                      <div>
                        <p className="font-medium capitalize text-foreground">{tokenName}</p>
                        <p className="text-sm text-foreground-muted">{(color as ColorToken).value}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Dark Theme Colors */}
            <div className="p-4 bg-background-muted rounded-lg shadow">
              <h3 className="text-lg font-medium mb-3 text-foreground">Dark Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(analysis.color.dark)
                  .filter(entry => typeof entry[1] === 'object' && 'value' in entry[1])
                  .map(([tokenName, color]) => (
                    <div key={tokenName} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded shadow"
                        style={{ backgroundColor: (color as ColorToken).value }}
                      />
                      <div>
                        <p className="font-medium capitalize text-foreground">{tokenName}</p>
                        <p className="text-sm text-foreground-muted">{(color as ColorToken).value}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            {isProduction ? (
              <div className="w-full p-4 bg-background-muted rounded-lg">
                <p className="text-foreground-muted text-center">
                  Color updates are only available in development mode. 
                  To update colors, run this application locally using <code className="bg-background-subtle px-2 py-1 rounded">npm run dev</code>
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={updateColorsJson}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    updateSuccess
                      ? 'bg-success text-white'
                      : 'bg-primary hover:bg-secondary text-white'
                  }`}
                >
                  {updateSuccess ? 'Colors Updated!' : 'Update colors.json'}
                </button>

                <button
                  onClick={regenerateAndRestart}
                  disabled={isRegeneratingVars}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    isRegeneratingVars
                      ? 'bg-disabled text-foreground-muted cursor-not-allowed'
                      : 'bg-accent hover:bg-tertiary text-white'
                  }`}
                >
                  {isRegeneratingVars ? 'Regenerating...' : 'Regenerate & Restart'}
                </button>
              </>
            )}
          </div>

          {error && (
            <p className="mt-4 text-error text-center">{error}</p>
          )}
        </div>
      )}
    </div>
  );
} 