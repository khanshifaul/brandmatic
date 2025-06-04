import { NextResponse } from 'next/server';
import { execSync } from 'child_process';
import path from 'path';

export async function POST() {
  try {
    // Get the absolute path to the script
    const scriptPath = path.join(process.cwd(), 'scripts', 'generate-css-vars.ts');
    const tsConfigPath = path.join(process.cwd(), 'scripts', 'tsconfig.json');
    
    // Execute the script synchronously
    execSync(`npx ts-node --project "${tsConfigPath}" "${scriptPath}"`, {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error generating tokens:', error);
    return NextResponse.json(
      { error: 'Failed to generate tokens' },
      { status: 500 }
    );
  }
} 