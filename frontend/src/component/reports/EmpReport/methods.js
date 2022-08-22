// const XlsxTemplate = require('xlsx-template');
// const fs = require('fs');
// const path = require('path');
// const ExcelJS = require('exceljs');
// const workbook = new ExcelJS.Workbook();
const jp = require('jsonpath');



export const initJsPath = (obj, empdetails, empEdu) => {
    const finalObj = {}
    for (const key in obj) {
        for (const el of obj[key]['data']) {
            const string = '$..' + el
            if(empdetails) finalObj[el] = jp.query(key === 'empdetails' ? empdetails : empEdu, string).pop()
            
        }
    }
    return finalObj;
}



// export const fillExcel = (data) => {
//     console.log(data);
//     // Load an XLSX file into memory
//     fs.readFile(path.join(__dirname, 'template.xlsx'), async function (err, data) {
//         const option = { imageRootPath: "D:\\insertT\\1.jpg" }
//         // Create a template
//         const template = new XlsxTemplate(data, option);
//         // Replacements take place on first sheet
//         const sheetNumber = 1;
//         // Set up some placeholder values matching the placeholders in the template
//         const values = { 
//             imageName: "1.jpg"
//          };
//         // Perform substitution
//         template.substitute(sheetNumber, values);
//         // Get binary data
//         const data1 = template.generate();
//         // ... 
//         await workbook.xlsx.load(data1)
//         /* Create the file*/
//         await workbook.xlsx.writeFile('2.xlsx')
//     });
// }
