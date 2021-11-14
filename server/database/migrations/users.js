const connection = require('../../config/database')

const createUsersTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS users(
        id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        UNIQUE (email)
    )`

    connection.query(query, (err, result) => {
        if (err) {
            console.log(`[DB] Error: ${err.message}`)
        }
        if (!result.warningCount) {
            console.log('[Migration] tasks table successfully created')
        }
    })
}

module.exports = createUsersTable
