# Popcorn

### Installation

1. Install [Node.js](https://nodejs.org/en/)(last LTS version)
2. Install [Git](https://git-scm.com/)
3. Check the installation: for this, run the command line (terminal):

```
node -v
npm -v
```

4. Install [PostgreSQL](https://www.postgresql.org/) for your OS and create a database via pgAdmin, for example. Remember the name of the database, username and password, because it is required for running a server
5. Clone the repository: open the command line and run command

```
git clone https://github.com/BinaryStudioAcademy/bsa-2019-popcorn.git
```

6. Open the project, then open the server folder and create .env file there. After it, copy everything from .env.example to .env file and follow all the instructions from the comments in the file
7. Install client and server packages:

```
npm i -g yarn
npm i -g nodemon
yarn install-packages
```

8. Run client and server simultaneously:

```
yarn start
```
