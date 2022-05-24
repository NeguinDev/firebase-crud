const { initializeApp } = require("firebase/app");

function Connection(auth) {
	return initializeApp(auth);
}

module.exports = Connection;