import { promises as fs } from 'fs';
import { basename, resolve } from 'path';

async function createFilesInDirectory(relativePath: string): Promise<void> {
  const fullPath = resolve(process.cwd(), relativePath);
  const folderName = basename(fullPath);

  try {
    try {
      await fs.access(fullPath);
    } catch {
      await fs.mkdir(fullPath);
    }

    const files = [
      `${folderName}.command.ts`,
      `${folderName}.http.controller.ts`,
      `${folderName}.req.dto.ts`,
      `${folderName}.service.ts`,
    ];

    for (const file of files) {
      await fs.writeFile(resolve(fullPath, file), '', 'utf8');
    }

    console.log(`Files generated successfully in ${fullPath}`);
  } catch (error: any) {
    console.error(`Failed to generate files: ${error.message}`);
  }
}

const [, , relativePath] = process.argv;
if (!relativePath) {
  console.error('Please provide a relative path.');
} else {
  createFilesInDirectory(relativePath);
}
