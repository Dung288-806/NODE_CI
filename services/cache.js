const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const keys = require('../config/keys')

const client = redis.createClient(keys.redisUrl);

client.hget = util.promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {

  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name,
    })
  );
  const cacheVale = await client.hget(this.hashKey, key);
  if (cacheVale) {
    return JSON.parse(cacheVale);
  }
  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result));
  return result;
  
};

module.exports = {
  delHashKey(key) {
    client.del(JSON.stringify(key));
  },
};
