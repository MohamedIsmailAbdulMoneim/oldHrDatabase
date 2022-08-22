import React from "react";
import { getempsdetails } from "../../actions/Actions";
import { connect } from "react-redux";
import Pagination from "../Pagination";
import * as Excel from "exceljs";
import { saveAs } from 'file-saver';
import ExcelLogo from "./excel.png"

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstArg: 0, secondArg: 20, currentPage: 1,
            firstArgPerBtn: 0, secondArgPerBtn: 10,
        };
    }

    componentDidMount() {
        this.props.getempsdetails()
    }

    exportExcelSheet = (e) => {

        const data = this.props.empsdetails
        async function exTest() {
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet("My Sheet");

            worksheet.columns = [
                { header: 'م', key: 'id', width: 10 },
                { header: 'رقم الأداء', key: 'empId', width: 32 },
                { header: 'الإسم', key: 'empName', width: 15, },
                { header: 'تاريخ الميلاد', key: 'dob', width: 15, },
                { header: 'الوظيفة الحالية', key: 'curJob', width: 15, },
                { header: 'تاريخ شغلها', key: 'docur', width: 15, },
                { header: 'الإداة', key: 'dep', width: 15, },

            ];

            data.forEach((el, i) => {
                worksheet.addRow({ id: i, empId: el.EMPLOYEE_ID, empName: el.NAME_ARABIC, dob: el.BIRTH_DATE, curJob: el.SUP_BOX_NAME, docur: el.docur, dep: el.cat_name });

            });

            // save under export.xlsx

            workbook.xlsx.writeBuffer()
                .then(buffer => saveAs(new Blob([buffer]), `${Date.now()}_feedback.xlsx`))
                .catch(err => console.log('Error writing excel export', err))

        };

        exTest();
    }

    changeArgs = (i) => (e) => {
        e.preventDefault()
        this.setState({ currentPage: i })
        if (i === 1) {
            this.setState({ firstArg: (i - 1) * 20, secondArg: i * 20 })

        }
        else if (i > 1) {
            this.setState({ firstArg: (i - 1) * 20, secondArg: i * 20 })

        }

    }

    minusFirstArg = (e) => {
        e.preventDefault()

        if (this.state.firstArgPerBtn > 0) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn - 1, secondArgPerBtn: prevState.secondArgPerBtn - 1, firstArg: prevState.firstArg - 20, secondArg: prevState.secondArg - 20, currentPage: prevState.currentPage - 1 }
            })
        }
    }

    plusSecondArg = (e) => {
        e.preventDefault()
        let itemsPerPage = Math.ceil(this.props.empsdetails.length / 20)
        if (this.state.secondArgPerBtn < itemsPerPage) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn + 1, secondArgPerBtn: prevState.secondArgPerBtn + 1, firstArg: prevState.firstArg + 20, secondArg: prevState.secondArg + 20, currentPage: prevState.currentPage + 1 }
            })

        }
    }
    render() {
        return (
            <div class="row">
                <div class="col-lg-12">
                    <div className="panel panel-default">
                        <div class="panel-body">
                        </div>
                        <div className="table-responsive" style={{ width: 900, marginRight: "300px" }}>
                            <table className="table table-striped">
                                <thead style={{ textAlign: "center" }}>
                                    <tr>
                                        <th>م</th>
                                        <th>رقم الأداء</th>
                                        <th>الإسم</th>
                                        <th>تاريخ الميلاد</th>
                                        <th>الوظيفة الحالية</th>
                                        <th>تاريخ شغلها</th>
                                        <th>الإدارة العامة</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.props.empsdetails.slice(this.state.firstArg, this.state.secondArg).map((emp, i) => (
                                        <tr id={emp.id}>
                                            <td>{((this.state.currentPage - 1)*20) + i + 1}</td>
                                            <td>{emp.EMPLOYEE_ID}</td>
                                            <td>{emp.NAME_ARABIC}</td>
                                            <td>{emp.BIRTH_DATE}</td>
                                            <td>{emp.SUP_BOX_NAME}</td>
                                            <td>{emp.docur}</td>
                                            <td>{emp.cat_name}</td>


                                        </tr>


                                    ))}
                                </tbody>
                            </table>
                            <button style={{width: 100}} onClick={this.exportExcelSheet}><img style={{ width: 50, height: 50 }} src={ExcelLogo} />  تصدير</button>


                            <Pagination minusFirstArg={this.minusFirstArg} plusSecondArg={this.plusSecondArg}
                                firstArgPerBtn={this.state.firstArgPerBtn} secondArgPerBtn={this.state.secondArgPerBtn}
                                changargs={this.changeArgs} pagesLength={this.props.empsdetails.length} currentPage={this.state.currentPage} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        empsdetails: state.posts.empsdetails,
    };
};
export default connect(mapStateToProps, {
    getempsdetails
})(Employees);



