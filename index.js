const { Connection, Database } = require("./src");
const auth = require("./auth");

const app = Connection(auth);
const db = new Database(app);

console.log("Starting...");

async function main() {
	async function addUser(user) {
		await db.read("users")
			.then(async users => {
				let isNewUser = true;

				users.forEach(async u => {
					if (u.name === user.name) {
						console.log("User already exists:", user.name);

						isNewUser = false;
						return;
					}
				});

				if (isNewUser) {
					const newUser = {
						...user,
						id: users.length
					}

					const newUsers = [...users, newUser];
					await db.update("users", newUsers);
				}
			})
			.catch(err => console.log(err));
	}
	async function removeUser(user) {
		await db.read("users")
			.then(async users => {
				const newUsers = users.filter(u => u.name !== user.name);
				await db.update("users", newUsers);
			})
			.catch(err => console.log(err));
	}
	async function updateUser(user) {
		await db.read("users")
			.then(async users => {
				const newUsers = users.map(u => {
					user = {
						...user,
						id: u.id
					}
					if (u.name === user.name) return user;
					return u;
				});
				await db.update("users", newUsers);
			})
			.catch(err => console.log(err));
	}


	console.log((await db.read("users")));

	await addUser({ name: "Neguin", age: 15 });
	await addUser({ name: "Preto", age: 18 });
	await addUser({ name: "Negro", age: 16 });
	await addUser({ name: "Jao", age: 13 });
	
	await updateUser({ name: "Jao", age: 64 });
	await removeUser({ name: "Preto" })
	
	console.log((await db.read("users")));

}

main();