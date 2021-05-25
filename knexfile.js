require('dotenv').config()

module.exports = {
    development: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "./utils/data/users.db3",
        },
        migrations: {
            directory: "./utils/data/migrations",
        },
        seeds: {
            directory: "./utils/data/seeds",
        },
        // add the following
        pool: {
            afterCreate: (conn, done) => {
                // runs after a connection is made to the sqlite engine
                conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
            },
        },

        // staging: {
        //     client: 'postgresql',
        //     connection: {
        //         database: 'my_db',
        //         user: 'username',
        //         password: 'password',
        //     },
        //     pool: {
        //         min: 2,
        //         max: 10,
        //     },
        //     migrations: {
        //         tableName: 'knex_migrations',
        //     },
        // },

        production: {
            client: "pg",
            connection: process.env.DATABASE_URL,
            pool: {
                min: 2,
                max: 10,
            },
            migrations: {
                tableName: "knex_migrations",
                directory: "./data/migrations",
            },
            useNullAsDefault: true,
        },
    },
};
