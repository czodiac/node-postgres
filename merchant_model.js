const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'my_database',
    password: '123',
    port: 5432,
});

const getMerchants = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM merchants ORDER BY id ASC', (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const createMerchant = (body) => {
    return new Promise(function (resolve, reject) {
        const { name, email } = body
        pool.query('INSERT INTO merchants (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`A new merchant has been added added: ${results.rows[0].name}`)
        })
    })
}

const updateMerchant = (id, body) => {
    return new Promise(function (resolve, reject) {
        const { name, email } = body
        pool.query('UPDATE merchants SET name=$1, email=$2 WHERE id=$3', [name, email, id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`${id} updated.`)
        })
    })
}

const deleteMerchant = (merchantId) => {
    return new Promise(function (resolve, reject) {
        const id = parseInt(merchantId)
        pool.query('DELETE FROM merchants WHERE id = $1', [id], (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(`Merchant deleted with ID: ${id}`)
        })
    })
}

module.exports = {
    getMerchants,
    createMerchant,
    updateMerchant,
    deleteMerchant,
}