const { spawn, exec } = require('child_process');
const path = require('path');

// Function to find and kill the Next.js server process
const findAndKillServer = () => {
  return new Promise((resolve, reject) => {
    // Find process using port 3000 or 3001
    exec('netstat -ano | findstr :3000 & netstat -ano | findstr :3001', async (error, stdout) => {
      if (error) {
        console.log('No existing server found, proceeding with start');
        resolve();
        return;
      }

      const lines = stdout.split('\n');
      const pids = new Set();

      for (const line of lines) {
        const match = line.match(/LISTENING\s+(\d+)/);
        if (match) {
          pids.add(match[1]);
        }
      }

      if (pids.size === 0) {
        resolve();
        return;
      }

      // Kill all found processes
      const killPromises = Array.from(pids).map(pid => {
        return new Promise((resolve) => {
          exec(`taskkill /F /PID ${pid}`, () => resolve());
        });
      });

      await Promise.all(killPromises);
      console.log('Successfully killed existing server processes');
      resolve();
    });
  });
};

// Main function to restart the server
const restartServer = async () => {
  try {
    // Kill existing server
    await findAndKillServer();

    // Wait a moment before starting new server
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Start new server
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const child = spawn(npmCmd, ['run', 'dev'], {
      cwd: path.resolve(__dirname, '..'),
      stdio: 'inherit',
      shell: true,
      detached: true
    });

    // Don't wait for child process
    child.unref();

    console.log('Started new server process');
  } catch (error) {
    console.error('Error during server restart:', error);
    process.exit(1);
  }
};

// Run the restart
restartServer(); 