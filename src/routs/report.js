const express = require("express");
const db = require("../database/connection")
const XlsxTemplate = require('xlsx-template')
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const e = require("express");
const workbook = new ExcelJS.Workbook();

let router = express.Router();



function getDeps(req, res, next) {
    const query = `SELECT DISTINCT SUP_BOX_NAME FROM a_job_trans`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}

function getEmpByDeps(req, res, next) {
    const dep = req.params.dep
    const query = `SELECT employee.NATIONAL_ID_CARD_NO, employee.EMPLOYEE_ID, a_job_trans.MAIN_BOX_NAME, a_job_trans.SUP_BOX_NAME, employee.NAME_ARABIC FROM a_job_trans JOIN employee ON a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO WHERE a_job_trans.INDICATOR = 2 AND a_job_trans.SUP_BOX_NAME = "${dep}" ORDER BY a_job_trans.MAIN_BOX_NAME`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}

function getjobgovern(req, res, next) {
    const query = `select DISTINCT employee.JOB_GOVERNORATE, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON employee.JOB_GOVERNORATE = governorate.GOVERNORATE`
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {
            res.send(details)
        }
    })
}

function getjobstation(req, res, next) {
    const govern = req.params.govern
    const query = `SELECT DISTINCT JOB_LOCATION, JOB_GOVERNORATE from employee where JOB_GOVERNORATE = ${govern} `
    db.query(query, (err, details) => {
        if (err) {
            next(err);
        } else {

            res.send(details)
        }
    })
}

function getEmpStationAndGovern(req, res, next) {
    let query;
    const govern = req.params.govern
    const station = req.params.station

    if (station === "null") {
        db.query(`SELECT employee.EMPLOYEE_ID, FOUND_ROWS() , employee.NAME_ARABIC, employee.JOB_LOCATION, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON employee.JOB_GOVERNORATE = governorate.GOVERNORATE WHERE governorate.GOVERNORATE = ${govern} ORDER BY employee.JOB_LOCATION`, (err, details) => {
            if (err) {
                next(err);
            } else {
                res.send(details)
            }
        })
    } else if (station !== "null") {
        db.query(`SELECT employee.EMPLOYEE_ID, FOUND_ROWS(), employee.NAME_ARABIC, employee.JOB_LOCATION, governorate.GOVERNORATE_ARABIC FROM employee JOIN governorate ON  employee.JOB_GOVERNORATE = governorate.GOVERNORATE WHERE governorate.GOVERNORATE = ${govern} AND JOB_LOCATION = "${station}" ORDER BY employee.JOB_LOCATION`, (err, details) => {
            if (err) {
                next(err);
            } else {

                details.length = details.length

                res.send(details)
            }
        })
    }


}


function getqn(req, res, next) {
    let query = `CALL autogetqn();`
    db.query(query, (err, details) => {
        if (err) {
            next(err)
        } else {
            details.shift()
            res.send(details)
        }
    })

}

function getEmps(req, res) {
    let query = `
    select COUNT(GENDER) AS MALE from employee WHERE GENDER = 1;
    select COUNT(GENDER) AS FEMALE from employee WHERE GENDER = 2;
    `
    db.query(query, (err, data) => {
        if (err) {
            res.json({ data: null, msg: "there is an error" })
        } else {
            res.json(data)
        }
    })
}

function getgid(req, res) {
    let query = `
      SELECT DISTINCT COUNT(NATIONAL_ID_CARD_NO) AS Technical FROM a_job_trans WHERE G_ID = 1;
      SELECT DISTINCT COUNT(NATIONAL_ID_CARD_NO) AS NON_Technical FROM a_job_trans WHERE G_ID = 2;
    `
    db.query(query, (err, data) => {
        if (err) {
            res.json({ data: null, msg: "there is an error" })
        } else {
            res.json(data)
        }
    })
}

function countEmpsInGoverns(req, res, next) {
    let query = `CALL countEmpsInGoverns();`

    db.query(query, (err, data) => {
        if (err) {
            next(err)
        } else {
            res.json(data)
        }
    })
}

function gethierarchicaldata(req, res, next) {

    jobdesc = req.query.jobdesc
    let query = `SELECT * FROM hierarchicaldata where level_1 = "${jobdesc}"`
    db.query(query, (err, data) => {
        if (err) {
            next(err)
        } else {
            for (let i = 0; i < 1436; i++) {
                var ob = data.filter(el => el.level_2 = "مدير ادارة الخدمات الاجتماعية")
            }
        }
    })
}

function getNatIdExpired(req, res, next) {
    let query = `SELECT NAME_ARABIC, EMPLOYEE_ID, NATIONAL_ID_CARD_EXPIRE_DATE FROM employee where NATIONAL_ID_CARD_EXPIRED = "true" ORDER BY NATIONAL_ID_CARD_EXPIRE_DATE`
    db.query(query, (err, data) => {
        if (err) {
            next(err)
        } else {
            res.send(data)
        }
    })
}

function getStructRep(req, res, next) {
    let query = `SELECT a_sup_box.SUP_BOX_NAME AS emp_box_name,(select ACTIV_NAME from active_not where active_not.ACTIV = a_sup_box.ACTIV_NOT) as activename, (select VAC_NAME from vac_not where vac_not.VAC = a_sup_box.VAC_NOT) as vacname, (select cat_name from a_category where a_category.CAT_ID =  a_main_box.CAT_ID) as catname , (select JOB_LEVEL from a_job_dgree where a_main_box.J_D_ID = a_job_dgree.J_D_ID) as joblevel, (select G_NAME from a_job_groups where a_job_groups.G_ID = a_sup_box.G_ID) as gname , (select j_d_name from a_job_dgree where a_job_dgree.J_D_ID = a_main_box.J_D_ID) as jdnamea_sup_box ,manager.SUP_BOX_NAME AS manager_box_name,manager.SUP_BOX_ID AS manager_box_id, a_sup_box.SUP_BOX_ID AS emp_box_id, a_sup_box.SUP_BOX_NAME AS emp_box_name FROM a_sup_box JOIN( SELECT * FROM a_sup_box ) AS manager join a_main_box ON a_sup_box.SUP_BOX_ID_P = manager.SUP_BOX_ID  and a_main_box.MAIN_BOX_ID = a_sup_box.MAIN_BOX_ID order by catname`
    db.query(query, (err, data) => {
        if (err) {
            next(err)
        } else {
            res.send(data)
        }
    })
}

function postStructRep(req, res, next) {
    const data  = req.body
    data.data.map(el => el.joblevel === 4 ? el.joblevel = 'إدارة عليا' : el.joblevel === 3 ? el.joblevel = 'ثالث' : el.joblevel === '2' ? el.joblevel = 'ثاني' : el.joblevel = 'أول')
    fs.readFile(path.join(__dirname, 'struct.xlsx'), async (err, da) => {
        const template = new XlsxTemplate(da)
        const sheetNumber = 1;
        template.substitute(sheetNumber, data)
        const data1 = template.generate()
        await workbook.xlsx.load(data1)
        workbook.xlsx.writeFile('struct.xlsx').then(data => {
            fileLocation = path.join(__dirname, '..', '..', 'struct.xlsx')
            res.download(fileLocation, 'struct.xlsx', (err) => {
                if (err) console.log(err);
            });
        })

    })
}

function getEmpReport(req, res, next) {
    const data = req.body

    if (data.empexp) {
        if (data.empexp.length === 0) {
            data.empexp.push({
                PLACE_NAME: 'لايوجد',
                JOB_NAME: 'لايوجد',
                START_DATE: 'لايوجد',
                END_DATE: 'لايوجد'
            })

        }
    }
    fs.readFile(path.join(__dirname, 'template.xlsx'), async function (err, da) {
        const option = { imageRootPath: "C:\\Users\\hrdbase\\Desktop\\lastproj\\frontend\\src\\uploads", imageRatio: 50 }
        // Create a template
        const template = new XlsxTemplate(da, option);
        // Replacements take place on first sheet
        const sheetNumber = 1;

        // Perform substitution
        template.substitute(sheetNumber, data);
        // Get binary data
        const data1 = template.generate();
        // ... 
        await workbook.xlsx.load(data1)
        /* Create the file*/

        workbook.xlsx.writeFile('2.xlsx').then(data => {
            fileLocation = path.join(__dirname, '..', '..', '2.xlsx')
            res.download(fileLocation, '2.xlsx', (err) => {
                if (err) console.log(err);
            });
        })
    });

}

router
    .get('/getdeps', getDeps)
    .get('/getempbydeps/:dep', getEmpByDeps)
    .get('/getjobgovern', getjobgovern)
    .get('/getjobstation/:govern', getjobstation)
    .get('/getempstationandgovern/:govern/:station', getEmpStationAndGovern)
    .get('/getqn', getqn)
    .get('/getemps', getEmps)
    .get('/getgid', getgid)
    .get('/countempsingoverns', countEmpsInGoverns)
    .get('/gethierarchicaldata', gethierarchicaldata)
    .get('/getnatidexpired', getNatIdExpired)
    .post('/getEmpReport', getEmpReport)
    .get('/getStructRep', getStructRep)
    .post('/postStructRep', postStructRep)





module.exports = router;