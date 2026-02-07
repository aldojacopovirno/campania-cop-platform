import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  const environmentalReportPlugin = () => ({
    name: 'environmental-report-plugin',
    configureServer(server) {
      server.middlewares.use('/api/generate-report', async (req, res, next) => {
        try {
          console.log('Generating report...');
          const { exec } = await import('child_process');
          const fs = await import('fs');
          const path = await import('path');

          const scriptDir = path.resolve(__dirname, 'data_to_yaml');
          const scriptPath = path.join(scriptDir, 'generate_site.py');
          const outputPath = path.join(scriptDir, 'site_config.yaml');

          exec(`python3 "${scriptPath}"`, { cwd: scriptDir, env: { ...process.env, ...env } }, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing script: ${error}`);
              console.error(`Stderr: ${stderr}`);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to generate report', details: stderr }));
              return;
            }

            console.log(`Script output: ${stdout}`);

            fs.readFile(outputPath, 'utf8', (err, data) => {
              if (err) {
                console.error(`Error reading output file: ${err}`);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to read report file' }));
                return;
              }

              res.setHeader('Content-Type', 'text/yaml');
              res.end(data);
            });
          });
        } catch (e) {
          console.error('Middleware error:', e);
          next(e);
        }
      });

      server.middlewares.use('/api/read-report', async (req, res, next) => {
        try {
          const fs = await import('fs');
          const path = await import('path');
          const outputPath = path.resolve(__dirname, 'data_to_yaml', 'site_config.yaml');

          if (fs.existsSync(outputPath)) {
            fs.readFile(outputPath, 'utf8', (err, data) => {
              if (err) {
                console.error(`Error reading report file: ${err}`);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to read report file' }));
                return;
              }
              res.setHeader('Content-Type', 'text/yaml');
              res.end(data);
            });
          } else {
            // If report doesn't exist, return empty or specific code to prompt generation
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Report not found' }));
          }
        } catch (e) {
          console.error('Read middleware error:', e);
          next(e);
        }
      });
    }
  });

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      watch: {
        ignored: ['**/data_to_yaml/site_config.yaml']
      }
    },
    plugins: [react(), environmentalReportPlugin()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
