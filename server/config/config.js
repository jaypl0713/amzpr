const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development', 'production', 'test', 'provision')
    .default('development'),
  SERVER_PORT: Joi.number().default(4040),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT Secret required to sign'),
  MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
  MONGO_PORT: Joi.number().default(27017),
  GPLUS_API_HOST: Joi.string().required().description('GPlus ERP API Host Url'),
  GPLUS_API_APPID: Joi.string().required().description('GPlus ERP API AppId'),
  GPLUS_API_APPKEY: Joi.string().required().description('GPlus ERP API AppKey'),
  TIMEZONE_OFFSET: Joi.number()
    .required()
    .default(10)
    .description('Server location timezone offset'),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  frontend: envVars.MEAN_FRONTEND || 'angular',
  mongo: {
    host: envVars.MONGO_HOST,
    port: envVars.MONGO_PORT,
  },
  jobTypes: envVars.JOB_TYPES || [],
  gplusApiHost: envVars.GPLUS_API_HOST,
  gplusApiAppId: envVars.GPLUS_API_APPID,
  gplusApiAppKey: envVars.GPLUS_API_APPKEY,
  timezoneOffset: envVars.TIMEZONE_OFFSET,
};

module.exports = config;
