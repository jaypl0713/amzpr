const agenda = require('../cronjobs/index.cronjob');

async function cronjob() {
  agenda.every('8 hours', 'update markets');
  agenda.every('8 hours', 'update listings');
  agenda.every('8 hours', 'update products');
  agenda.every('12 hours', 'update orders last 24 hours');
}

module.exports = {
  cronjob,
};
