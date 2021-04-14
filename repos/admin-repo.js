const pool = require("../src/pool");

class adminRepo {
  static add = async (req) => {
    const { name, email, phone, avatar, dept_id } = req;
    try {
      const { rows } = pool.query(
        `INSERT INTO admin(name, email, phone, avatar, dept_id) VALUES 
                ($1, $2, $3, $4, $5) RETURNING *;`,
        [name, email, phone, avatar, dept_id]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static get = async () => {
    try {
      const { rows } = pool.query(
        `SELECT admin.name, email, phone, avatar, departments.name AS department, institutes.name as institute
        FROM admin
        INNER JOIN departments ON  admin.dept_id = departments.id
        INNER JOIN institutes ON  institutes.id = departments.institute_id;`
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static getByEmail = async (email) => {
    try {
      const { rows } = pool.query(
        `SELECT admin.name, email, phone, avatar, departments.name AS department, institutes.name as institute
        FROM admin
        INNER JOIN departments ON  admin.dept_id = departments.id
        INNER JOIN institutes ON  institutes.id = departments.institute_id
        WHERE admin.email = $1`,
        [email]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };
}

module.exports = adminRepo;
