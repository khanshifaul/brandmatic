import fs from 'fs';
import path from 'path';

interface ColorToken {
  value: string;
  type: 'color';
}

interface ThemeColors {
  [key: string]: ColorToken | Record<string, ColorToken>;
}

interface ColorTokens {
  color: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

const isColorToken = (value: unknown): value is ColorToken => {
  return typeof value === 'object' && 
         value !== null && 
         'value' in value && 
         typeof (value as ColorToken).value === 'string';
};

// Read the colors.json file
const colorsPath = path.join(process.cwd(), 'tokens', 'colors.json');
const colorsJson = JSON.parse(fs.readFileSync(colorsPath, 'utf8')) as ColorTokens;

// Generate CSS variables for both light and dark themes
const generateThemeVars = () => {
  const lightTheme = colorsJson.color.light;
  const darkTheme = colorsJson.color.dark;

  // Generate light theme variables
  const lightVars = Object.entries(lightTheme)
    .filter(([_, value]) => isColorToken(value))
    .map(([key, value]) => `  --color-${key}-light: ${value.value};`)
    .join('\n');

  // Generate dark theme variables
  const darkVars = Object.entries(darkTheme)
    .filter(([_, value]) => isColorToken(value))
    .map(([key, value]) => `  --color-${key}-dark: ${value.value};`)
    .join('\n');

  // Create the CSS content
  const css = `:root {
/* Light theme color tokens */
${lightVars}
}

/* Inject dark theme tokens */
@media (prefers-color-scheme: dark) {
  :root {
${darkVars}
  }
}
`;

  // Write to a new file
  const outputPath = path.join(process.cwd(), 'src/app/styles/colors.css');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css);
  console.log('Generated color tokens CSS file');
};

generateThemeVars(); 