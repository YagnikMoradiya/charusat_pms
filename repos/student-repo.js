const pool = require("../src/pool");

class studentRepo {
  static add = async (req) => {
    const {
      name,
      enroll_id,
      email,
      phone,
      dept_id,
      bio,
      avatar,
      current_status,
      ufm,
      disciplinary_action,
      state_id,
      city,
      addressline,
      zipcode,
      admission_year,
      graduation_year,
    } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO general_detail(name,
          enroll_id,
          email,
          phone,
          dept_id,
          bio,
          avatar,
          current_status,
          ufm,
          disciplinary_action,
          state_id,
          city,
          addressline,
          zipcode,
          admission_year,
          graduation_year) VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *;`,
        [
          name,
          enroll_id,
          email,
          phone,
          dept_id,
          bio,
          avatar,
          current_status,
          ufm,
          disciplinary_action,
          state_id,
          city,
          addressline,
          zipcode,
          admission_year,
          graduation_year,
        ]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getStudent = async () => {
    try {
      const { rows } = await pool.query(
        `SELECT general_detail.id, general_detail.name, enroll_id, email, phone, departments.name AS departments, institutes.name AS institutes, bio, avatar, current_status, ufm, disciplinary_action, state.name AS state, country.name AS country, city, addressline, zipcode, created_at, updated_at, is_hired, admission_year,
        graduation_year
              FROM general_detail 
              INNER JOIN departments ON general_detail.dept_id = departments.id
              INNER JOIN state ON general_detail.state_id = state.id
              INNER JOIN country ON state.country_id = country.id
              INNER JOIN institutes ON departments.institute_id = institutes.id
              WHERE is_deleted = FALSE
              ORDER BY id ASC;`
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static updateStudent = async (req, id) => {
    const {
      name,
      enroll_id,
      email,
      phone,
      dept_id,
      bio,
      avatar,
      current_status,
      ufm,
      disciplinary_action,
      state_id,
      city,
      addressline,
      zipcode,
      admission_year,
      graduation_year,
      updated_at,
    } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE general_detail
        SET name = $1, 
            enroll_id = $2,
            email = $3, 
            phone = $4, 
            dept_id = $5, 
            bio = $6, 
            avatar = $7, 
            current_status = $8, 
            ufm = $9, 
            disciplinary_action = $10, 
            state_id = $11, 
            city = $12, 
            addressline = $13, 
            zipcode = $14, 
            admission_year = $15,
            graduation_year = $16, 
            updated_at = $17
        WHERE id = $18 RETURNING *;`,
        [
          name,
          enroll_id,
          email,
          phone,
          dept_id,
          bio,
          avatar,
          current_status,
          ufm,
          disciplinary_action,
          state_id,
          city,
          addressline,
          zipcode,
          admission_year,
          graduation_year,
          updated_at,
          id,
        ]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getStudentByID = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT general_detail.name, enroll_id, email, phone, departments.name AS departments, institutes.name AS institutes, bio, avatar, current_status, ufm, disciplinary_action, state.name AS state, country.name AS country, city, addressline, zipcode, created_at, updated_at, is_hired, is_deleted, admission_year,
        graduation_year
              FROM general_detail 
              INNER JOIN departments ON general_detail.dept_id = departments.id
              INNER JOIN state ON general_detail.state_id = state.id
              INNER JOIN country ON state.country_id = country.id
              INNER JOIN institutes ON departments.institute_id = institutes.id
              WHERE general_detail.id = $1 AND is_deleted = FALSE ;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static deleteStudent = async (id) => {
    try {
      const { rows } = await pool.query(
        `UPDATE general_detail
          SET is_deleted = TRUE
        WHERE id = $1 RETURNING *;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static addAlumina = async (req) => {
    const {
      stu_id,
      current_profile,
      position,
      organization_name,
      salary,
      is_firstjob,
    } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO alumina_detail(stu_id, current_profile, position, organization_name, salary, is_firstjob) VALUES
              ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [
          stu_id,
          current_profile,
          position,
          organization_name,
          salary,
          is_firstjob,
        ]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getAluminaByID = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT alumina_detail.id, general_detail.name AS stu_name, current_profile, position, organization_name, salary, is_firstjob
        FROM alumina_detail
        INNER JOIN general_detail ON alumina_detail.stu_id = general_detail.id
        WHERE general_detail.id = $1 AND general_detail.is_deleted = FALSE;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static updateAlumina = async (req, id) => {
    const {
      current_profile,
      position,
      organization_name,
      salary,
      is_firstjob,
    } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE alumina_detail 
        SET current_profile = $1, 
            position = $2, 
            organization_name = $3, 
            salary = $4, 
            is_firstjob = $5
        WHERE alumina_detail.stu_id = $6 RETURNING *;`,
        [current_profile, position, organization_name, salary, is_firstjob, id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static deleteAluminaByID = async (id) => {
    try {
      const {
        rows,
      } = await pool.query(
        `DELETE FROM alumina_detail WHERE stu_id = $1 RETURNING *;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static addAcademic = async (req) => {
    const {
      stu_id,
      sgpa_1,
      sgpa_2,
      sgpa_3,
      sgpa_4,
      sgpa_5,
      sgpa_6,
      sgpa_7,
      sgpa_8,
      cgpa,
      ssc,
      hsc,
      backlogs,
    } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO academic(stu_id, sgpa_1, sgpa_2, sgpa_3, sgpa_4, sgpa_5, sgpa_6, sgpa_7, sgpa_8, cgpa, ssc, hsc, backlogs) VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;`,
        [
          stu_id,
          sgpa_1,
          sgpa_2,
          sgpa_3,
          sgpa_4,
          sgpa_5,
          sgpa_6,
          sgpa_7,
          sgpa_8,
          cgpa,
          ssc,
          hsc,
          backlogs,
        ]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static updateAcademic = async (req, id) => {
    const {
      sgpa_1,
      sgpa_2,
      sgpa_3,
      sgpa_4,
      sgpa_5,
      sgpa_6,
      sgpa_7,
      sgpa_8,
      cgpa,
      ssc,
      hsc,
      backlogs,
    } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE academic 
        SET sgpa_1 = $1, 
            sgpa_2 = $2, 
            sgpa_3 = $3, 
            sgpa_4 = $4, 
            sgpa_5 = $5, 
            sgpa_6 = $6, 
            sgpa_7 = $7, 
            sgpa_8 = $8, 
            cgpa = $9, 
            ssc = $10, 
            hsc = $11, 
            backlogs = $12 
        WHERE academic.stu_id = $13 RETURNING *;`,
        [
          sgpa_1,
          sgpa_2,
          sgpa_3,
          sgpa_4,
          sgpa_5,
          sgpa_6,
          sgpa_7,
          sgpa_8,
          cgpa,
          ssc,
          hsc,
          backlogs,
          id,
        ]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getAcademic = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT academic.id, sgpa_1, sgpa_2, sgpa_3, sgpa_4, sgpa_5, sgpa_6, sgpa_7, sgpa_8, cgpa, ssc, hsc, backlogs
            FROM academic 
            INNER JOIN general_detail ON academic.stu_id = general_detail.id
            WHERE general_detail.id = $1 AND general_detail.is_deleted = FALSE;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static addExamdetail = async (req) => {
    const { stu_id, exam_name, exam_status, result, result_link } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO exam_detail(stu_id, exam_name, exam_status, result, result_link) VALUES
            ($1, $2, $3, $4, $5) RETURNING *`,
        [stu_id, exam_name, exam_status, result, result_link]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getExamdetail = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT exam_detail.id, exam_name, exam_status, result, result_link
        FROM exam_detail
        INNER JOIN general_detail ON exam_detail.stu_id = general_detail.id
        WHERE exam_detail.stu_id = $1;`,
        [id]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static updateExamdetail = async (req, id) => {
    const { exam_name, exam_status, result, result_link } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE exam_detail
        SET exam_name = $1, 
            exam_status = $2, 
            result = $3, 
            result_link = $4
        WHERE exam_detail.id = $5 RETURNING *`,
        [exam_name, exam_status, result, result_link, id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static addAchivement = async (req) => {
    const {
      stu_id,
      achivement_name,
      achivement_detail,
      certificate_link,
      github_link,
      linkedin_link,
    } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO achivement(stu_id, achivement_name, achivement_detail, certificate_link, github_link, linkedin_link) VALUES
              ($1, $2, $3, $4, $5, $6) RETURNING *;`,
        [
          stu_id,
          achivement_name,
          achivement_detail,
          certificate_link,
          github_link,
          linkedin_link,
        ]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static updateAchivement = async (req, id) => {
    const {
      achivement_name,
      achivement_detail,
      certificate_link,
      github_link,
      linkedin_link,
    } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE achivement 
        SET achivement_name = $1, 
            achivement_detail = $2, 
            certificate_link = $3, 
            github_link = $4, 
            linkedin_link = $5
        WHERE achivement.stu_id = $6 RETURNING *;`,
        [
          achivement_name,
          achivement_detail,
          certificate_link,
          github_link,
          linkedin_link,
          id,
        ]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getAchivement = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT achivement.id, general_detail.id AS enroll_id, achivement_name, achivement_detail, certificate_link, github_link, linkedin_link
              FROM achivement
              INNER JOIN general_detail ON achivement.stu_id = general_detail.id
              WHERE achivement.stu_id = $1;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static addSkill = async (req) => {
    const { stu_id, skill_1, skill_2, skill_3 } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO skills(stu_id, skill_1, skill_2, skill_3) VALUES 
              ($1, $2, $3, $4) RETURNING *;`,
        [stu_id, skill_1, skill_2, skill_3]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static updateSkill = async (req, id) => {
    const { skill_1, skill_2, skill_3 } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE skills
        SET skill_1 = $1,  
            skill_2 = $2, 
            skill_3 = $3
        WHERE stu_id = $4 RETURNING *;`,
        [skill_1, skill_2, skill_3, id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getSkill = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT skills.id, skill_1, skill_2, skill_3
              FROM skills
              INNER JOIN general_detail ON skills.stu_id = general_detail.id
              WHERE skills.stu_id = $1;`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static addProject = async (req) => {
    const { stu_id, project_name, description, project_link } = req;
    try {
      const { rows } = await pool.query(
        `INSERT INTO projects(stu_id, project_name, description, project_link) VALUES
            ($1, $2, $3, $4) RETURNING *;`,
        [stu_id, project_name, description, project_link]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static getProject = async (id) => {
    try {
      const { rows } = await pool.query(
        `SELECT projects.id, project_name, description, project_link
            FROM projects
            INNER JOIN general_detail ON projects.stu_id = general_detail.id
            WHERE projects.stu_id = $1;`,
        [id]
      );
      return rows;
    } catch (error) {
      return error;
    }
  };

  static updateProject = async (req, id) => {
    const { project_name, description, project_link } = req;
    try {
      const { rows } = await pool.query(
        `UPDATE projects
        SET project_name = $1,
            description = $2,
            project_link = $3
        WHERE projects.id = $4 RETURNING *`,
        [project_name, description, project_link, id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };

  static deleteProject = async (id) => {
    try {
      const {
        rows,
      } = await pool.query(
        `DELETE FROM projects WHERE projects.id = $1 RETURNING *`,
        [id]
      );
      return rows[0];
    } catch (error) {
      return error;
    }
  };
}

module.exports = studentRepo;
