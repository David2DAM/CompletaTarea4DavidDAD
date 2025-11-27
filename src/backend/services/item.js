import db from '../../../backend/db.js'
import helper from '../../../backend/helper.js'
import config from '../../../backend/config.js'


async function insertData(nombre, marca, tipo, precio) {

  const result = await db.query(
    `
    INSERT INTO coleccion (nombre, marca, tipo, precio)
    VALUES (?, ?, ?, ?)
    `,
    [nombre, marca, tipo, precio]
  );

  return result.affectedRows;
}



// SELECT
async function getData() {

  const rows = await db.query(`
    SELECT * FROM coleccion
  `);

  const data = helper.emptyOrRows(rows);

  return { data };
}

// DELETE
async function deleteData(req) {
  const data = req.query;

  const result = await db.query(
    `
    DELETE FROM coleccion
    WHERE id = ?
    `,
    [data.id]
  );

  return result.affectedRows;
}

export { insertData, getData, deleteData }
