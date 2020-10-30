const Post = require('../models/post.js');
const { promiseQuery } = require('../util/promiseQuery')

const create = async data => {
	const postModel = new Post(data);
	await postModel.save();
	return postModel
}

const find = async query => {
	const postModel = await promiseQuery(Post, query);
	return postModel
}

const edit = ({ content, owner, _id }) => {


	// 	const postModel = postModels[0]
	// 	if(postModel.owner !== owner) {
	// 		throw new Error('Post not found');
	// 	}
	// 	const postModel = await promiseQuery(Post, query);
	// 	return postModel
}

const insertMessage = (_id, data) => {
	// const chat_model = await Chat.findOne({ _id });
	// chat_model.messages.push(data)
	// await chat_model.save();
	// return chat_model
}

module.exports = { create, find, edit, insertMessage }
