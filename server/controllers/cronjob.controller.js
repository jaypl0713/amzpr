const agenda = require('../cronjobs/index.cronjob');

async function cronjob() {
  agenda.every('5 hours', 'update markets list');
  agenda.every('1 minute', 'update listings');
}

module.exports = {
  cronjob,
};
