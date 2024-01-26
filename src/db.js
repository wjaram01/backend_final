import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host:'database-1.cz5b7o2txcav.us-east-1.rds.amazonaws.com',
    user:'admin',
    password:'AppTransporte1.',
    database:'pinafy'
})
pool.on('connection', function (connection) {
    //connection.query('SET NAMES "utf8mb4"');
    connection.query('SET lc_time_names = "es_ES"');
});
