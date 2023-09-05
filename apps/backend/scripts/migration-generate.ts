import { exec } from 'child_process';

const command = `yarn typeorm migration:generate -d ./ormconfig.ts ./migrations/${process.argv[2]}`;

(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr);
    }
    console.log(stdout);
  }))();
