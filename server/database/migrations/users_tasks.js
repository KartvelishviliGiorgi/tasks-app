const connection = require('../../config/database')

const createUsersTasksTable = () => {
    const query = `CREATE TABLE IF NOT EXISTS users_tasks(
        user_id INT(11) UNSIGNED NOT NULL,
        task_id INT(11) UNSIGNED NOT NULL,
        UNIQUE KEY unique_combination (user_id, task_id)
    )`

    connection.query(query, (err, result) => {
        if (err) {
            console.log(`[DB] Error: ${err.message}`)
        }
        if (!result.warningCount) {
            console.log('[Migration] users_task table successfully created')
        }
    })
}

module.exports = createUsersTasksTable
