import cron from 'node-cron';
import { keepAlive } from './server.js';
import { exec } from 'node:child_process';
import cronstrue from 'cronstrue';

//cada 1 hora, si la fecha esta entre el rango, todos los meses,de lun a vier https://crontab.cronhub.io/
let cronExpression = `*/2 * * * mon-fri`;
console.log(`running a task ${cronstrue.toString(cronExpression)}`);

let task = cron.schedule(
  cronExpression,
  function () {
    console.log(
      `running a task ${cronstrue.toString(cronExpression)}`
    );

    exec('node bot.js', (error, stdout, stderr) => {
      console.log('Executing file...');
      if (error) {
        console.error(`exec error: ${JSON.parse(error)}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  },
  { timezone: 'America/Argentina/Buenos_Aires' }
);

keepAlive();
task.start();
