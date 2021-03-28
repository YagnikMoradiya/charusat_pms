const pool = require("../src/pool");

class companyRepo {
  static add = async (req) => {
    const { name, email, sector, bio, avatar, address, city, state_id } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO company(name, email, sector, bio, avatar, address, city, state_id) VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
        [name, email, sector, bio, avatar, address, city, state_id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static get = async () => {
    try {
      const { rows } = await pool.query(
        `SELECT company.id, company.name, email, sector, bio, avatar, address, city, state.name AS state, country.name AS country
              FROM company
              INNER JOIN state ON company.state_id = state.id
              INNER JOIN country ON state.country_id = country.id
              WHERE is_deleted = FALSE;`
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static getByID = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT company.id, company.name, email, sector, bio, avatar, address, city, state.name AS state, country.name AS country
              FROM company
              INNER JOIN state ON company.state_id = state.id
              INNER JOIN country ON state.country_id = country.id
              WHERE company.id = $1 AND is_deleted = FALSE;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static updateCompany = async (req, id) => {
    const { name, email, sector, bio, avatar, address, city, state_id } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE company
          SET name = $1, 
              email = $2, 
              sector = $3, 
              bio = $4, 
              avatar = $5, 
              address = $6, 
              city = $7, 
              state_id = $8 
          WHERE id = $9 AND is_deleted = FALSE RETURNING *;`,
        [name, email, sector, bio, avatar, address, city, state_id, id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static deleteCompany = async (id) => {
    try {
      const { rows } = await pool.query(
        `UPDATE company
          SET is_deleted = TRUE
          WHERE id = $1 RETURNING *;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };
}

module.exports = companyRepo;
