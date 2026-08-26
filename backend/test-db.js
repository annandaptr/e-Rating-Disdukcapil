const db = require("./config/db");

async function testDatabase() {
    try {
        const [rows] = await db.query("SELECT 1 AS test");

        console.log("Database berhasil terkoneksi!");
        console.log(rows);
    } catch (error) {
        console.error("Database gagal terkoneksi:");
        console.error(error.message);
    } finally {
        await db.end();
    }
}

testDatabase();