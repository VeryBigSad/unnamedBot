const mgclient = require("mongodb");
 
<<<<<<< HEAD
// creating mongoclient object
=======
// создаем объект MongoClient и передаем ему строку подключения
>>>>>>> refs/remotes/origin/master
const mongoClient = new mgclient.MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

db_insert_one = function (dbname, collectionname, data) {
	mongoClient.connect(function(err, client){

		const db = client.db(dbname);
		const collection = db.collection(collectionname);
		let chatMessage = data;

		collection.insertOne(chatMessage, function(err, result) {
			console.log(result.ops);
			client.close();
		})
	});
}

db_find = function(dbname, collectionname, data) {
	returnVal = null;
	const db = client.db(dbname);
	const collection = db.collection(collectionname);
	mongoClient.connect(function(err, client){

		collection.find(data, function(err, result){
			returnVal = result;
			client.close();
		})
	});

	return returnVal;
}

exports.addChatMessage = function(username, message) {
	db_insert_one("poggopdb", "chat", {'username': username, 'message': message});
}

exports.getRandomChatMessage = function(username) {
	messages = db_find({username})
	randomIndex = Math.floor(Math.random() * messages.length);
	return messages[randomIndex].message;
}

console.log(exports.getRandomChatMessage('Sanyss'));
