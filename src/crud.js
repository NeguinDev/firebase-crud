const { getDatabase, ref, get, set } = require('firebase/database');

class Database {
	constructor(app) {
		this.db = getDatabase(app);
	}

	async read(query) {
		const data = ref(this.db, query);
		const snapshot = await get(data);
		return await snapshot.val();
	}

	async update(query, value) {
		const data = ref(this.db, query);
		return await set(data, value);
	}
}

module.exports = Database;