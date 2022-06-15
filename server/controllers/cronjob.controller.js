const agenda = require('../cronjobs/index.cronjob');

async function cronjob() {
  agenda.every('8 hours', 'update markets');
  agenda.every('8 hours', 'update listings');
  agenda.every('8 hours', 'update products');
  agenda.every('50 minutes', 'update orders last 1 hour');
}

module.exports = {
  cronjob,
};
