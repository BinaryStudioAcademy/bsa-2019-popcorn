const fetch = require('node-fetch');
{
    const args = require('./credentials.json');
    const url = args.appUrl + 'api';

    class User {
        static async sendCreateUserRequest(url, args) {
            return fetch(`${url}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: args.name,
                    email: args.email,
                    password: args.password
                })
            });
        };
    };

    async function createUser(url, args) {

        console.log(`Creating user for ${url}`);
        const response = await User.sendCreateUserRequest(url, args);
        if (response.status === 200) {
            console.log(`User is created on ${url}`);
            return Promise.resolve();
        }
        const responseJSON = await response.json();
        const error = new Error(`Failed to successfully create user for ${url}`);
        error.message = '' + JSON.stringify(responseJSON.error);
        return Promise.reject(error);
        
    }

    function handleError(error) {
        const errorBody = () => {
            return error && error.message ? error.message : error;
        };
        console.log('Error during bootstrap, exiting', errorBody());
        process.exit(1);

    };

    module.exports = (async done => {
        console.log('========Start=========');
        console.log('========Creating User=========');
        createUser(url, args)
            .then(() => {})
            .catch(error => {
                done(handleError(error));
            })
    });
}