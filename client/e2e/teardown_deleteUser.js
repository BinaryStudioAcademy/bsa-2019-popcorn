const fetch = require('node-fetch');
{
    const args = require('./credentials.json');
    const url = args.appUrl + 'api';

    class User {
        static async getUserToken(url, args) {
            return fetch(`${url}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: args.email,
                    password: args.password,
                })
            })
            .then(res => res.json())
            .then(res => 'bearer ' + res.token)
        };

        static async getUserId(url, token) {
            return fetch(`${url}/auth/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then(res => res.json())
            .then(res => res.data)
            .then(res => res.user)
            .then(res => res.id)
        };

        static async sendDeleteUserRequest(url, token, id) {
            return fetch(`${url}/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
        };

    };

    async function deleteUser(url, args) {
        console.log(`Deleting user on ${url}`);

        const userToken = await User.getUserToken(url, args);
        const userId = await User.getUserId(url, userToken);
        const response = await User.sendDeleteUserRequest(url, userToken, userId);
        if (response.status === 200) {
            console.log(`User is deleted on ${url}`);
            return Promise.resolve();
        }
        const responseJSON = await response.json();
        const error = new Error(`Failed to successfully delete user for ${url}`);
        error.message = '' + JSON.stringify(responseJSON.error);
        return Promise.reject(error);
        
    }

    function handleError(error) {
        const errorBody = () => {
            return error && error.message ? error.message : error;
        };
        console.log('Error during teardown, exiting', errorBody());
        process.exit(1);

    };

    module.exports = (async done => {
        console.log('========Start=========');
        console.log('========Deleting User=========');
        deleteUser(url, args)
            .then(() => {})
            .catch(error => {
                done(handleError(error));
            })
    });
}
