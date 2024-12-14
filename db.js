const oracledb = require('oracledb');

async function getConnection() {
    return await oracledb.getConnection({
        user: 'oracle_user',
        password: 'oraclePassword',
        connectString: 'localhost/XEPDB1', // Update to your Oracle DB connection string
    });
}

module.exports = getConnection;
