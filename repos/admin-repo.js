const pool = require("../src/pool");

class adminRepo {
  static add = async (req) => {
    const { name, email, phone, bio, avatar } = req;
    try {
      const { rows } = pool.query(
        `INSERT INTO admin(name, email, phone, bio, avatar) VALUES 
                ($1, $2, $3, $4, $5) RETURNING *;`,
        [name, email, phone, bio, avatar]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static get = async () => {
    try {
      const { rows } = pool.query(
        `SELECT admin.id, admin.name, email, phone, bio, avatar FROM admin;`
      );
      return rows;
    } catch (error) {
      return error;
    }
  };
}

module.exports = adminRepo;
