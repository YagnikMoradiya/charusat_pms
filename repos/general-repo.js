const pool = require("../src/pool");

class generalRepo {
  static getCountry = async () => {
    try {
      const { rows } = await pool.query(`SELECT id, name FROM country;`);
      return rows;
    } catch (error) {
      return error;
    }
  };

  static getState = async (id) => {
    try {
      const {
        rows,
      } = await pool.query(`SELECT id, name FROM state WHERE country_id = $1`, [
        id,
      ]);
      return rows;
    } catch (error) {
      return error;
    }
  };

  static getInstitute = async () => {
    try {
      const { rows } = await pool.query(`SELECT id, name FROM institutes;`);
      return rows;
    } catch (error) {
      return error;
    }
  };

  static getDepartment = async (id) => {
    try {
      const {
        rows,
      } = await pool.query(
        `SELECT id, name FROM departments WHERE institute_id = $1;`,
        [id]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static addApply = async (req) => {
    const { stu_id, drive_id } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO stu_applies(stu_id, drive_id) VALUES 
        ($1, $2) RETURNING *`,
        [stu_id, drive_id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getApply = async () => {
    try {
      const { rows } = await pool.query(
        `SELECT stu_applies.id, general_detail.id AS stu_id, general_detail.enroll_id AS enroll_id, general_detail.name, company.name AS cmp_name
            FROM stu_applies
            INNER JOIN general_detail ON  stu_applies.stu_id = general_detail.id
            INNER JOIN cmp_drives ON stu_applies.drive_id  = cmp_drives.id
            INNER JOIN company ON cmp_drives.cmp_id = company.id
            WHERE general_detail.is_deleted = FALSE AND company.is_deleted = FALSE;`
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static getApplyBystuid = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT stu_applies.id, general_detail.enroll_id AS enroll_id, general_detail.name, company.name AS cmp_name
            FROM stu_applies
            INNER JOIN general_detail ON  stu_applies.stu_id = general_detail.id
            INNER JOIN cmp_drives ON stu_applies.drive_id  = cmp_drives.id
            INNER JOIN company ON cmp_drives.cmp_id = company.id
            WHERE general_detail.id = $1 AND general_detail.is_deleted = FALSE;`,
        [id]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static getApplyBycmpid = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT stu_applies.id, general_detail.enroll_id AS enroll_id, general_detail.name, company.name AS cmp_name
            FROM stu_applies
            INNER JOIN general_detail ON  stu_applies.stu_id = general_detail.id
            INNER JOIN cmp_drives ON stu_applies.drive_id  = cmp_drives.id
            INNER JOIN company ON cmp_drives.cmp_id = company.id
            WHERE company.id = $1 AND company.is_deleted = FALSE;`,
        [id]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static deleteApply = async (id) => {
    try {
      const { rows } = await pool.query(
        `DELETE FROM stu_applies
        WHERE id = $1 RETURNING *;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static addDrive = async (req) => {
    const { drive_date, drive_detail, cmp_id } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO cmp_drives(drive_date, drive_detail, cmp_id) VALUES 
            ($1, $2, $3) RETURNING *`,
        [drive_date, drive_detail, cmp_id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getDrive = async () => {
    try {
      const { rows } = await pool.query(
        `SELECT cmp_drives.id, drive_date, drive_detail, company.name AS cmp_name, cmp_drives.created_at, cmp_drives.updated_at
            FROM cmp_drives
            INNER JOIN company ON cmp_drives.cmp_id = company.id
            WHERE company.is_deleted = FALSE;`
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static getDriveBycmpId = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT cmp_drives.id, drive_date, drive_detail, company.name AS cmp_name, cmp_drives.created_at, cmp_drives.updated_at
            FROM cmp_drives
            INNER JOIN company ON cmp_drives.cmp_id = company.id
            WHERE cmp_drives.cmp_id = $1 AND company.is_deleted = FALSE;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static updateDrive = async (req, id) => {
    const { drive_date, drive_detail, updated_at } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE cmp_drives 
        SET drive_date = $1,
            drive_detail = $2,
            updated_at = $3 
        WHERE id = $4 RETURNING *;`,
        [drive_date, drive_detail, updated_at, id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static deleteDrive = async (id) => {
    try {
      const { rows } = await pool.query(
        `DELETE FROM cmp_drives
        WHERE id = $1 RETURNING *;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static addHired = async (req) => {
    const { cmp_id, stu_id, dept_id } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO hired(cmp_id, stu_id, dept_id) VALUES
        ($1, $2, $3) RETURNING *`,
        [cmp_id, stu_id, dept_id]
      );
      const addIngeneral = await pool.query(
        `UPDATE general_detail
        SET is_hired = TRUE
        WHERE general_detail.id = $1 RETURNING *`,
        [stu_id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getHired = async () => {
    try {
      const { rows } = await pool.query(
        `SELECT hired.id, company.name AS cmp_name, general_detail.name AS stu_name, general_detail.enroll_id AS enroll_id, departments.name AS dept_name, hired_at
        FROM hired
        INNER JOIN company ON hired.cmp_id = company.id
        INNER JOIN general_detail ON hired.stu_id = general_detail.id
        INNER JOIN departments ON hired.dept_id = departments.id
        WHERE general_detail.is_deleted = FALSE AND company.is_deleted = FALSE;`
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static removeHired = async (id) => {
    try {
      const { rows } = await pool.query(
        `DELETE FROM hired
        WHERE id = $1 RETURNING *;`,
        [id]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static addRequest = async (req) => {
    const { stu_id, admin_id, faculty_name } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO requests(stu_id, admin_id, faculty_name) VALUES 
          ($1, $2, $3) RETURNING *;`,
        [stu_id, admin_id, faculty_name]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getRequest = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT requests.id, general_detail.id AS stu_id, general_detail.enroll_id AS enroll_id, general_detail.name AS stu_name, faculty_name, requested_at
        FROM requests 
        LEFT JOIN general_detail ON general_detail.id = requests.stu_id
        WHERE requests.admin_id = $1 AND is_confirm = FALSE;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static confirmRequest = async (id) => {
    try {
      const { rows } = await pool.query(
        `UPDATE requests 
        SET is_confirm = TRUE
        WHERE requests.id = $4 RETURNING *;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static deleteRequest = async (id) => {
    try {
      const {
        rows,
      } = await pool.query(
        `DELETE FROM requests WHERE requests.id = $4 RETURNING *;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };
}

module.exports = generalRepo;
