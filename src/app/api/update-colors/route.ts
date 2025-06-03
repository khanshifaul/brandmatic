import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { light, dark } = await request.json();

    // Read the existing colors.json
    const colorsPath = path.join(process.cwd(), 'tokens', 'colors.json');
    const existingContent = await fs.readFile(colorsPath, 'utf8');
    const existingColors = JSON.parse(existingContent);

    // Update only the brand colors while preserving other values
    const updatedColors = {
      ...existingColors,
      color: {
        light: {
          ...existingColors.color.light,
          primary: light.primary,
          secondary: light.secondary,
          accent: light.accent,
          tertiary: light.tertiary,
          quaternary: light.quaternary,
          focus: light.primary // Update focus color to match primary
        },
        dark: {
          ...existingColors.color.dark,
          primary: dark.primary,
          secondary: dark.secondary,
          accent: dark.accent,
          tertiary: dark.tertiary,
          quaternary: dark.quaternary,
          focus: dark.primary // Update focus color to match primary
        }
      }
    };

    // Write the updated colors back to the file
    await fs.writeFile(colorsPath, JSON.stringify(updatedColors, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating colors:', error);
    return NextResponse.json({ error: 'Failed to update colors' }, { status: 500 });
  }
} 