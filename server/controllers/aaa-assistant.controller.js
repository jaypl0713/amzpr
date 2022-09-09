const { v4: uuidv4 } = require('uuid');
const Assistant = require('../models/aaa-assistant.model');

module.exports = {
  reg,
  findBy,
  create,
  update,
  updateOrInsert,
};

async function findBy(assistant) {
  const query = {};
  if (assistant.sellerId) {
    query.sellerId = assistant.sellerId;
  }
  if (assistant.code) {
    query.code = assistant.code;
  }
  if (assistant.token) {
    query.token = assistant.token;
  }
  return await Assistant.find(query);
}

async function create(assistant) {
  console.log('create a new assistant');
  if (assistant.sellerId && assistant.code) {
    assistant.token = uuidv4();
    return await new Assistant(assistant).save();
  } else return null;
}

async function reg(assistantReq) {
  const query = {};
  if (assistantReq) {
    if (assistantReq.sellerId) {
      query.sellerId = assistantReq.sellerId;
    }
    if (assistantReq.code) {
      query.code = assistantReq.code;
    }
    const assistant = await findBy(query);
    const re = (assistant && assistant[0]) || (await create(assistantReq));
    return re;
  }
  return null;
}

async function update(assistant) {
  if (assistant && (assistant.sellerId || assistant.token)) {
    const existedAssistants = await findBy(assistant);
    if (existedAssistants && existedAssistants.length) {
      const conditions = {};
      if (assistant.sellerId) {
        conditions.sellerId = assistant.sellerId;
      }
      if (assistant.token) {
        conditions.token = assistant.token;
      }
      const update = assistant;
      const options = {
        new: true,
      };
      return await Assistant.findOneAndUpdate(conditions, update, options);
    } else {
      return null;
    }
  }
}

async function updateOrInsert(assistant) {
  return (await update(assistant)) || (await create(assistant));
}
