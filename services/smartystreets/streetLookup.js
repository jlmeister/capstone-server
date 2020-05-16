const SmartyStreetsSDK = require("smartystreets-javascript-sdk");
const SmartyStreetsCore = SmartyStreetsSDK.core;

const authId = process.env.SMARTY_AUTH_ID;
const authToken = process.env.SMARTY_AUTH_TOKEN;
const credentials = new SmartyStreetsCore.StaticCredentials(authId, authToken);

const client = SmartyStreetsCore.buildClient.usStreet(credentials);
const Lookup = SmartyStreetsSDK.usStreet.Lookup;

module.exports = { client, Lookup }
