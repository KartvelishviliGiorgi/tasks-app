const connection = require('../../config/database')

const createTasksTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS tasks(
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        due_date VARCHAR(255) NOT NULL,
        status TINYINT UNSIGNED NOT NULL DEFAULT 0,
        author_id INT UNSIGNED NOT NULL
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

module.exports = createTasksTable
