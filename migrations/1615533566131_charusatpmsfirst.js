/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        CREATE TABLE institutes (
            id SERIAL PRIMARY KEY,
            name VARCHAR NOT NULL
        );

        CREATE TABLE departments (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            institute_id INTEGER NOT NULL,
            FOREIGN KEY(institute_id) REFERENCES institutes(id) ON DELETE CASCADE
        );

        CREATE TABLE country (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            sortname VARCHAR(3) NOT NULL,
            phonecode VARCHAR(6) NOT NULL,
            UNIQUE(name)
          );
  
        CREATE TABLE state (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            country_id INTEGER NOT NULL,
            FOREIGN KEY(country_id) REFERENCES country(id)
        );

        CREATE TYPE status AS ENUM ('student', 'alumina');

        CREATE TABLE general_detail (
            id VARCHAR(128) PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            enroll_id VARCHAR(15) NOT NULL UNIQUE,
            email VARCHAR(60) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            dept_id INTEGER NOT NULL,
            bio VARCHAR(400),
            avatar VARCHAR(300),
            current_status status NOT NULL,
            ufm VARCHAR(300) DEFAULT NULL,
            disciplinary_action VARCHAR(300) DEFAULT NULL,
            state_id INTEGER NOT NULL,
            city VARCHAR(50) NOT NULL,
            addressline VARCHAR(150) NOT NULL,
            zipcode VARCHAR(15) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            is_hired BOOLEAN DEFAULT FALSE,
            is_deleted BOOLEAN DEFAULT FALSE,
            admission_year INTEGER NOT NULL,
            graduation_year INTEGER NOT NULL,
            FOREIGN KEY(dept_id) REFERENCES departments(id),
            FOREIGN KEY(state_id) REFERENCES state(id)
        );

        CREATE TABLE academic (
            stu_id VARCHAR(128) PRIMARY KEY,
            sgpa_1 NUMERIC(4, 2),
            sgpa_2 NUMERIC(4, 2),
            sgpa_3 NUMERIC(4, 2),
            sgpa_4 NUMERIC(4, 2),
            sgpa_5 NUMERIC(4, 2),
            sgpa_6 NUMERIC(4, 2),
            sgpa_7 NUMERIC(4, 2),
            sgpa_8 NUMERIC(4, 2),
            cgpa NUMERIC(4, 2) NOT NULL,
            ssc NUMERIC(4, 2) NOT NULL,
            hsc NUMERIC(4, 2) NOT NULL,
            backlogs INTEGER NOT NULL,
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE
        );

        CREATE TYPE profile AS ENUM ('job', 'entrepreneur', 'highereducation');

        CREATE TABLE alumina_detail (
            stu_id VARCHAR(128) PRIMARY KEY,
            current_profile profile NOT NULL,
            position VARCHAR(50) NOT NULL,
            organization_name VARCHAR(100) NOT NULL,
            salary INTEGER DEFAULT 0,
            is_firstjob BOOLEAN DEFAULT FALSE,
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE
        );
        
        CREATE TYPE e_status AS ENUM('prepration', 'clear');

        CREATE TABLE exam_detail (
            id SERIAL PRIMARY KEY,
            stu_id VARCHAR(128) NOT NULL,
            exam_name VARCHAR(100) NOT NULL,
            exam_status e_status NOT NULL,
            result NUMERIC(4, 2),
            result_link VARCHAR(300),
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE
        );

        CREATE TABLE achivement (
            stu_id VARCHAR(128) PRIMARY KEY,
            achivement_name VARCHAR(100) NOT NULL,
            achivement_detail VARCHAR(400) NOT NULL,
            certificate_link VARCHAR(300),
            github_link VARCHAR(300) NOT NULL,
            linkedin_link VARCHAR(300),
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE
        );

        CREATE TABLE projects (
            id SERIAL PRIMARY KEY,
            stu_id VARCHAR(128) NOT NULL,
            project_name VARCHAR(50) NOT NULL,
            description VARCHAR(400) NOT NULL,
            project_link VARCHAR(300),
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE
        );

        CREATE TABLE skills (
            stu_id VARCHAR(128) PRIMARY KEY,
            skill_1 VARCHAR(50),
            skill_2 VARCHAR(50),
            skill_3 VARCHAR(50),
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE
        );

        CREATE TABLE company (
            id VARCHAR(128) PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(50) NOT NULL,
            sector VARCHAR(50) NOT NULL,
            bio VARCHAR(400) NOT NULL,
            avatar VARCHAR(300),
            address VARCHAR(100) NOT NULL,
            city VARCHAR(50) NOT NULL,
            state_id INTEGER NOT NULL,
            is_deleted BOOLEAN DEFAULT FALSE,
            FOREIGN KEY(state_id) REFERENCES state(id)
        );

        CREATE TABLE cmp_drives (
            id SERIAL PRIMARY KEY,
            drive_date TIMESTAMP,
            drive_detail TEXT NOT NULL,
            cmp_id VARCHAR(128) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(cmp_id) REFERENCES company(id) ON DELETE CASCADE
        );

        CREATE TABLE stu_applies (
            id SERIAL PRIMARY KEY,
            stu_id VARCHAR(128) NOT NULL,
            drive_id INTEGER NOT NULL,
            applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE,
            FOREIGN KEY(drive_id) REFERENCES cmp_drives(id) ON DELETE CASCADE,
            UNIQUE (stu_id, drive_id)
        );

        CREATE TABLE admin (
            id VARCHAR(128) PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(50) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            dept_id INTEGER NOT NULL,
            avatar VARCHAR(300),
            FOREIGN KEY(dept_id) REFERENCES departments(id) ON DELETE CASCADE
        );

        CREATE TABLE hired (
            id SERIAL PRIMARY KEY,
            cmp_id VARCHAR(128) NOT NULL,
            stu_id VARCHAR(128) NOT NULL,
            dept_id INTEGER NOT NULL,
            hired_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(cmp_id) REFERENCES company(id) ON DELETE CASCADE,
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE,
            FOREIGN KEY(dept_id) REFERENCES departments(id) ON DELETE CASCADE
        );

        CREATE TABLE requests (
            id SERIAL PRIMARY KEY,
            stu_id VARCHAR(128) NOT NULL UNIQUE,
            admin_id VARCHAR(128) NOT NULL,
            is_confirm BOOLEAN DEFAULT FALSE,
            requested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY(stu_id) REFERENCES general_detail(id) ON DELETE CASCADE,
            FOREIGN KEY(admin_id) REFERENCES admin(id) ON DELETE CASCADE
        )
        
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE requests;
        DROP TABLE hired;
        DROP TABLE admin;
        DROP TABLE stu_applies;
        DROP TABLE cmp_drives;
        DROP TABLE company;
        DROP TABLE skills;
        DROP TABLE projects;
        DROP TABLE achivement;
        DROP TABLE exam_detail;
        DROP TYPE e_status;
        DROP TABLE alumina_detail;
        DROP TYPE profile;
        DROP TABLE academic;
        DROP TABLE general_detail;
        DROP TYPE status;
        DROP TABLE state;
        DROP TABLE country;
        DROP TABLE departments;
        DROP TABLE institutes;
    `);
};
