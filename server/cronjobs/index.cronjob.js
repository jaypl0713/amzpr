/* When you need to add one more job to run, just create a new file with your job logic
under the same directory with this file,
then add the file name(without extention) into the .env JOB_TYPES(comma seprated), that's where all the jobs.
Don't need to change anything here.
*/

const Agenda = require('agenda');
const config = require('../config/config');
const mongoUri = config.mongo.host;
const dbCollection = 'agendajobs';
const connectionOptions = {
  db: { address: mongoUri, collection: dbCollection },
};
const agenda = new Agenda(connectionOptions);

const jobTypes = config.jobTypes ? config.jobTypes.split(',') : [];
jobTypes.forEach(type => {
  require('./' + type + '.cronjob')(agenda);
});

if (jobTypes.length) {
  agenda.start();
}

module.exports = agenda;
