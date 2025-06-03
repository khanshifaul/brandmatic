import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';

export async function POST() {
  try {
    // Execute the restart script
    const scriptPath = path.join(process.cwd(), 'scripts', 'restart-server.js');
    
    // Run the script
    const child = exec(`node "${scriptPath}"`, {
      windowsHide: true
    });
    
    // Unref the child process so it can run independently
    child.unref();
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error restarting server:', error);
    return NextResponse.json(
      { error: 'Failed to restart server' },
      { status: 500 }
    );
  }
} 