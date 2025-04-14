import readline from 'readline';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
console.log('welcome to users data explorer');
function showMenu() {
    console.log(`
options:
1. get users
2. exit
`);
    rl.question('choice: ', async (choice) => {
        try {
            if (choice === '1') {
                await getUsers();
            }
            else if (choice === '2') {
                console.log('goodbye!');
                rl.close();
            }
            else {
                console.log('invalid choice');
                showMenu();
            }
        }
        catch (error) {
            console.log('error:', error.message);
            showMenu();
        }
    });
}
async function fetchData(endpoint) {
    console.log(`fetching ${endpoint}...`);
    const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
    if (!response.ok) {
        throw new Error(`couldn't fetch data (${response.status})`);
    }
    return await response.json();
}
async function getUsers() {
    const users = await fetchData('users');
    console.log(`found ${users.length} users`);
    rl.question('search by name or filter by city (type "name:<search>" or "city:<filter>"): ', (input) => {
        let results = users;
        if (input.startsWith('name:')) {
            const search = input.split('name:')[1].trim();
            results = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
            console.log(`${results.length} matches for name "${search}"`);
        }
        else if (input.startsWith('city:')) {
            const filter = input.split('city:')[1].trim();
            results = users.filter(user => user.address.city.toLowerCase() === filter.toLowerCase());
            console.log(`${results.length} matches for city "${filter}"`);
        }
        results.forEach(user => {
            console.log(`${user.id}: ${user.name} (${user.email}) - ${user.address.city}`);
        });
        returnToMenu();
    });
}
function returnToMenu() {
    rl.question('\npress enter for menu', () => {
        showMenu();
    });
}
showMenu();
