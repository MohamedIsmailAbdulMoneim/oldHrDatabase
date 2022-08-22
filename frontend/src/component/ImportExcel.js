import React, { Fragment } from "react";
import Excel from 'exceljs'

class Upload extends React.Component {
    handleImport = (e) => {
        const wb = new Excel.Workbook();
        const reader = new FileReader();
        let arr = [];
        try {
            reader.readAsArrayBuffer(e.target.files[0])

            reader.onload = () => {
                const buffer = reader.result;
                wb.xlsx.load(buffer).then(workbook => {
                    let sheet = workbook.getWorksheet(1)
                    sheet.eachRow((row) => {
                        let smallArr = row.values
                        smallArr.splice(0, 1)
                        arr.push(smallArr);
                    })
                    arr.shift()
                    this.props.data(arr)
                    console.log(arr);

                })
            }
        } catch (e) {
            console.error(e);

        }

    }



    render() {
        return (
            <Fragment>
                <input onChange={this.handleImport} type="file" id="myFile" name="filename" />
            </Fragment>
        );
    }
}

export default Upload



