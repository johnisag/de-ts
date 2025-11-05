// Example of a TypeScript interface defining a User object
interface User {
  id: number;
  name: string;
  email?: string;
}

//#region Partial: Allow updating only some properties
function updateUser(id: number, fields: Partial<User>) {
    console.log(`Updating user ${id} with`, fields);
} 

updateUser(1, { name: "New Name" });
updateUser(2, { email: "newemail@example.com" });
updateUser(3, { name: "Another Name", email: "anotheremail@example.com" });
//#endregion

//#region Required: Ensure all properties are provided
function createUser(user: Required<User>) {
    console.log("Creating user", user);
}

createUser({ id: 1, name: "Full Name", email: "email@example.com" });
//#endregion

//#region Readonly: Prevent modification of user properties
function displayUser(user: Readonly<User>) {
    console.log("User details:", user);
    // user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
}

const user: Readonly<User> = { id: 1, name: "Readonly User", email: "readonly@example.com" };
displayUser(user);
//#endregion

//#region Pick: Select specific properties from User
function getUserName(user: Pick<User, 'id' | 'name'>) {
    console.log(`User ID: ${user.id}, Name: ${user.name}`);
}

getUserName({ id: 1, name: "Picked User" });
//#endregion

//#region Omit: Exclude specific properties from User
function getUserWithoutEmail(user: Omit<User, 'email'>) {
    console.log(`User ID: ${user.id}, Name: ${user.name}`);
}   

getUserWithoutEmail({ id: 2, name: "Omitted Email User" });
//#endregion

//#region Record: Create a mapping of user IDs to User objects
const userMap: Record<number, User> = {
    1: { id: 1, name: "User One", email: "userone@example.com" },
    2: { id: 2, name: "User Two" },
    3: { id: 3, name: "User Three", email: "userthree@example.com" },
};

function displayUserMap(users: Record<number, User>) {
    for (const id in users) {
        const user = users[id];
        if (user){
            console.log(`User ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
        }
    }
}

displayUserMap(userMap);
//#endregion

//#region Exclude: Exclude specific types from a union
type Status = 'active' | 'inactive' | 'pending' | 'banned';
type ActiveStatus = Exclude<Status, 'banned' | 'inactive'>;

function setStatus(status: ActiveStatus) {
    console.log(`Setting status to: ${status}`);
}

setStatus('active');
setStatus('pending');
//#endregion

//#region Extract: Extract specific types from a union
type MixedStatus = 'active' | 'inactive' | 'pending' | 'banned';
type UserStatus = Extract<MixedStatus, 'active' | 'inactive'>;  

function logUserStatus(status: UserStatus) {
    console.log(`User status is: ${status}`);
}   

logUserStatus('active');
logUserStatus('inactive');
//#endregion