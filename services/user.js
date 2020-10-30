const User = require('../models/user.js');
const { promiseQuery } = require('../util/promiseQuery')

const find = async query => {
	const data = await promiseQuery(User, query);
	return data
}

module.exports = { find }
