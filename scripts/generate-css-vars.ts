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

  // Create the CSS content with theme variables
  const css = `/* Dynamic color variables - Generated ${new Date().toISOString()} */
:root {
  /* Light theme color tokens */
${lightVars}

  /* Main theme variables */
  --color-primary: var(--color-primary-light);
  --color-secondary: var(--color-secondary-light);
  --color-accent: var(--color-accent-light);
  --color-tertiary: var(--color-tertiary-light);
  --color-quaternary: var(--color-quaternary-light);

  /* Theme transition */
  --theme-transition: background-color 0.2s ease-in-out,
                     color 0.2s ease-in-out,
                     border-color 0.2s ease-in-out,
                     opacity 0.2s ease-in-out;
}

/* Dark theme tokens */
.dark {
  /* Dark theme color tokens */
${darkVars}

  /* Update main theme variables */
  --color-primary: var(--color-primary-dark);
  --color-secondary: var(--color-secondary-dark);
  --color-accent: var(--color-accent-dark);
  --color-tertiary: var(--color-tertiary-dark);
  --color-quaternary: var(--color-quaternary-dark);
}`;

  // Write to a new file
  const outputPath = path.join(process.cwd(), 'src/app/styles/colors.css');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, css);
  console.log('Generated color tokens CSS file');
};

generateThemeVars(); 