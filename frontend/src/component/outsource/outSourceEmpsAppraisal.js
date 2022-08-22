import React, { Fragment } from "react";
import {

    getEmpByDeps, getEmpName, getEmpNameByName

} from "../../actions/Actions";
import { newAppraisal, updateEmpAppraisal, deleteEmpAppraisal, getEmpAppraisal } from "../../actions/TransActions"
import { connect } from "react-redux";
import 'moment-timezone';
import Pagination from "../Pagination";

class OutsourceEmpsAppraisal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmAdd: false, showMsg: false, errorAdd: false, addEmpAppraisal: "", editEmpAppraisal: "", searchEmpAppraisal: "",
            addAppraisalYear: "",  editEmpAppraisalYear: "", searchEmpAppraisalYear: "" ,rowAppraisal: false, add: false, edit: false, empid: "", empname: "",
            empnat: null, showNamesResults: false, updated: false, firstArg: 0, secondArg: 20, currentPage: 1,
            firstArgPerBtn: 0, secondArgPerBtn: 10, delete: false, selectQuery: ""
        };
    }

    selectQueryHandler = (e) => {


    }

    changeArgs = (i) => (e) => {
        e.preventDefault()
        this.setState({ currentPage: i })
        if (i === 1) {
            this.setState({ firstArg: (i - 1) * 20, secondArg: i * 20 })

        }
        else if (i > 1) {
            this.setState({ firstArg: (i - 1) * 20 + 1, secondArg: i * 20 })


        }

    }

    addButtonClickHandeler = (e) => {
        this.setState({ add: true })
    }

    minusFirstArg = (e) => {
        e.preventDefault()
        if (this.state.firstArgPerBtn > 0) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn - 1, secondArgPerBtn: prevState.secondArgPerBtn - 1, currentPage: prevState.currentPage - 1, firstArg: prevState.firstArg - 10, secondArg: prevState.secondArg - 10 }
            })
        }
        this.changeArgs(this.state.currentPage - 1)
    }

    plusSecondArg = (e) => {
        e.preventDefault()
        let itemsPerPage = Math.ceil(this.props.empApp.length / 20)
        if (this.state.secondArgPerBtn < itemsPerPage) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn + 1, secondArgPerBtn: prevState.secondArgPerBtn + 1, currentPage: prevState.currentPage + 1, firstArg: prevState.firstArg + 10, secondArg: prevState.secondArg + 10 }
            })

        }
        this.changeArgs(this.state.currentPage + 1)

    }


    idInputAddHandler = (e) => {
        this.setState({ empid: e.target.value })
        this.refs.empnameAdd.value = ''
    }

    nameInputAddHandler = (e) => {
        this.setState({ empname: e.target.value })
        this.refs.empidAdd.value = ''
    }

    submitButtonHandler = (e) => {
        if (!this.state.confirmAdd) {
            this.setState({ confirmAdd: true })
        } else if (this.state.confirmAdd) {
            this.setState({ confirmAdd: false })
        }
    }

    handleNewAppraisal = (e) => {
        let obj = {
            appDate: this.state.addAppraisalYear, appValue: this.state.addEmpAppraisal, empid: this.state.empid, empname: this.state.empname, isShown: `"true"`
        }

        obj.empid = this.state.empid || "null"
        obj.empname = this.state.empname || "null"
        this.props.newAppraisal(obj)
        this.setState({ showMsg: true })

        setTimeout(() => {
            this.setState({ showMsg: false })
        }, 3000)
    }

    idInputHandler = (e) => {
        this.setState({ empid: e.target.value })
        this.refs.name.value = ''
        // if (this.refs.searchbox) {

        //     this.refs.searchbox.options.selectedIndex = 0
        // }
    }
    nameInputHandler = (e) => {
        this.setState({ showNamesResultsForSearch: true })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        console.log(e.target.value);

    }

    namesOptionshandlerForAdd = (e) => {
        this.setState({
            empnameForAdd: e.target.value, empidForAdd: null
        })
        if (this.refs.nameadd) this.refs.nameadd.value = e.target.value
    }

    namesOptionshandlerForSearch = (e) => {
        this.refs.name.value = e.target.value
        this.setState({ empname: e.target.value })
        console.log(e.target.value);

    }


    handelAddAppraisal = (e) => {
        e.preventDefault()
        this.setState({ addEmpAppraisal: e.target.value })
    }

    handelAddYear = (e) => {
        e.preventDefault()
        this.setState({ addAppraisalYear: e.target.value })
    }

    handelEditAppraisal = (e) => {
        e.preventDefault()
        this.setState({ editEmpAppraisal: e.target.value })
    }

    handelEditYear = (e) => {
        e.preventDefault()
        this.setState({ editAppraisalYear: e.target.value })
    }

    handelSearchAppraisal = (e) => {
        e.preventDefault()
        this.setState({ searchEmpAppraisal: e.target.value })
        if(e.target.value === "اختر التقدير"){
            this.setState({ searchEmpAppraisal: "" })
        }
    }

    handelSearchYear = (e) => {
        e.preventDefault()
        this.setState({ searchEmpAppraisalYear: e.target.value })
        if(e.target.value === "اختر السنة"){
            this.setState({ searchEmpAppraisalYear: ""})

        }

    }

    handelSearch = () => {
        this.setState({ edit: false, updated: false, firstArg: 0, secondArg: 20, currentPage: 1, firstArgPerBtn: 0, secondArgPerBtn: 10 })
        let nameOrId = ''
        // if (this.refs.name.value.length > 0) {
            if (this.refs.name.value.length > 0) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.refs.name.value}")`
        } else if (this.refs.empid.value.length > 0) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.refs.empid.value})`
        }
        let data = `${this.state.searchEmpAppraisal.length > 0 ? `appraisal.APPRAISAL = (SELECT APPRAISAL FROM appraisal WHERE APPRAISAL_ARABIC  = "${this.state.searchEmpAppraisal}")` : '' }
        ${(this.state.searchEmpAppraisalYear.length > 0 && this.state.searchEmpAppraisal.length > 0) ? `AND` : ''}
        ${this.state.searchEmpAppraisalYear.length > 0 ? `employee_appraisal.APPRAISAL_DATE = ${this.state.searchEmpAppraisalYear}` : ''}
        ${(this.state.searchEmpAppraisalYear.length > 0 && nameOrId.length > 0) ||
        (this.state.searchEmpAppraisal.length > 0 && nameOrId.length > 0) ? 'AND' : ''}
        ${nameOrId.length > 0 ? `employee_appraisal.NATIONAL_ID_CARD_NO = ${nameOrId}` : ''}
        `
        this.props.getEmpAppraisal(data)
    }

    handelEdit_1 = (e) => {
        this.setState({ edit: true, rowAppraisal: e.target.getAttribute("tableId"), empAppraisal: e.target.getAttribute("empApp"), appraisalYear: e.target.getAttribute("empDate"), empnat: e.target.getAttribute("empnatid") })
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "white"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
            tds[tds.length - 2].childNodes[0].classList.add("fa-check")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
            tds[tds.length - 1].childNodes[0].classList.add("fa-times")
        }
    }

    closeEditSectionHandler = (e) => {
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({ edit: false })
    }


    handelEdit_2 = (e) => {
        e.preventDefault()
        // let data = { , appraisal: this.refs.newAppraisal.value, year: document.getElementById("year").placeholder }
        let data = { empNat: this.state.empnat, appraisal: this.state.addEmpAppraisal, year: this.state.addAppraisalYear }
        this.props.updateEmpAppraisal(data)
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({
            edit: false
        })
        if (this.props.result === 200) {
            this.setState({ updated: true })
        }
    }

    closeAddSectionHandler = (e) => {
        this.setState({
            add: false
        })
    }

    deleteHandler = (e) => {
        this.setState({ delete: true })
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "white"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
            tds[tds.length - 2].childNodes[0].classList.add("fa-check")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
            tds[tds.length - 1].childNodes[0].classList.add("fa-times")
        }
    }

    closeDeleteSectionHandler = (e) => {
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({ delete: false })
    }
    confirmDelete = (e) => {
        let data = [e.target.getAttribute("tableId"), e.target.getAttribute("empnatid")]
        this.props.deleteEmpAppraisal(data)
        this.setState({ delete: false })
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
    }

    // catClickHandeler = (e) => {

    //     this.setState({ catname: e.target.value })
    //     if (this.refs.selected) {
    //         if (this.refs.selected.options) {
    //             this.refs.selected.options.selectedIndex = 2
    //         }
    //     }

    // }


    render() {
        var dates = [];
        let start = 1996;
        let end = 2021;

        while (start !== end) {
            dates.push(start);
            start++;
        }


        let appraisals = ["ممتاز بجدارة", "ممتاز", "جيد جدا بجدارة", "جيد جدا", "جيد", "مقبول", "ضعيف", "جيد حكمي", "جيد جدا حكمي", "ممتاز حكمي"]

    
        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <Fragment>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
                                <div style={{ height: "100%", minHeight: 250, width: "50%", minWidth: "750px", overflow: "auto" }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} class="fas fa-times-circle"></i> : null}
                                        <span>إضافة تقييم جديد</span>
                                        <div></div>
                                    </div>
                                    {this.state.showMsg ? this.props.msg === "تم إدخال التقييم بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.props.msg}</div> : this.props.msg === "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : this.props.msg === "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : null : null}
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                            <input ref={"empidAdd"} onChange={this.idInputAddHandler} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الأسم : </label>
                                            <input ref={'empnameAdd'} onKeyDown={this.nameInputAddHandler} id="nameinputadd" className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>
                                    {
                                        this.state.showNamesResultsForAdd ?
                                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                                <div></div>
                                                <select className="add" onClick={this.namesOptionshandlerForAdd} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                                    {this.props.empNameByName.map((name => (
                                                        <option>{name.NAME_ARABIC}</option>
                                                    )))}
                                                </select>
                                                <div></div>
                                            </div>
                                            : null
                                    }
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>التقدير : </label>
                                            <select onChange={this.handelAddAppraisal} id="empapp" style={{ height: 30, width: "100%", minWidth: "215px" }}>
                                                {appraisals.map(apprsl => (
                                                    <option>{apprsl}</option>
                                                ))}
                                                <option selected>اختر التقدير</option>
                                            </select>
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>السنة : </label>
                                            <input onChange={this.handelAddYear} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>
                                    <button onClick={this.submitButtonHandler} style={{ width: "92%", margin: "0 auto" }} type="button" class="btn btn-primary btn-block">إضافة تقييم جديد</button>

                                    {this.state.confirmAdd ? <div style={{ width: "100%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة تدرج جديد ؟ <button onClick={this.handleNewAppraisal} style={{ float: "left" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.submitButtonHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i></div> : null}


                                </div>
                            </div>
                        </div>

                    </Fragment> : null
                }

                <div class="row">
                    <div class="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                        <div style={{ height: "100%", width: 600 }} class="panel panel-default">

                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                <div></div>
                                <span style={{ marginRight: 70 }}>تقييمات العاملين</span>
                                <button onClick={this.addButtonClickHandeler} type="button" class="btn btn-primary">إضافة تقييم جديد</button>
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" colName={"NATIONAL_ID_CARD_NO"} onKeyDown={this.idInputHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input ref="name" id="empname" className="form-control" colName={"NATIONAL_ID_CARD_NO"} onKeyUp={this.nameInputHandler} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}></label>
                                        <button onClick={this.handelSearch} type="button" style={{ marginRight: 30, marginTop: 6 }} >
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "80%", textAlign: "right" }}>السنة : </label>
                                    <select colName={"APPRAISAL_DATE"} id="year1" style={{ width: "80%", height: 30 }} onChange={this.handelSearchYear}>
                                        {dates.map(year => (
                                            <option year={year} >{year}</option>
                                        ))}
                                        <option selected>اختر السنة</option>

                                    </select>
                                </div>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "80%", textAlign: "right" }}>التقدير : </label>
                                    <select colName={"APPRAISAL"} id="empapp" style={{ width: "80%", height: 30 }} onChange={this.handelSearchAppraisal}>
                                        {appraisals.map(apprsl => (
                                            <option>{apprsl}</option>
                                        ))}
                                        <option selected>اختر التقدير</option>

                                    </select>
                                </div>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "100%", textAlign: "right" }}>الإدارة : </label>
                                    <select disabled style={{ width: "100%", minWidth: "120px", height: 30 }}>
                                        {this.props.cates.map(cate => (
                                            <option id={cate.CAT_ID}>
                                                {cate.CAT_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            {
                                this.state.showNamesResultsForSearch ?
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div></div>
                                        <select ref={"searchbox"} onClick={this.namesOptionshandlerForSearch} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                            {this.props.empNameByName.map((name => (
                                                <option>{name.NAME_ARABIC}</option>
                                            )))}
                                        </select>
                                        <div></div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading" style={{ minHeight: 40 }}>
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التقدير</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>السنة</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empApp.slice(this.state.firstArg, this.state.secondArg).map(emp => (
                                            <tbody>
                                                <tr id={emp.id}>
                                                    <td>{emp.NAME_ARABIC}</td>
                                                    <td>{this.state.edit && this.state.rowAppraisal === emp.id ? <select onChange={this.handelEditAppraisal} id="empapp" style={{ width: "50%", height: 30 }}>
                                                        {appraisals.map(apprsl => (
                                                            <option>{apprsl}</option>
                                                        ))}
                                                        <option selected>اختر التقدير</option>

                                                    </select> : this.state.updated && this.state.rowAppraisal === emp.id ? this.state.addEmpAppraisal : emp.APPRAISAL_ARABIC}</td>
                                                    <td style={{ width: "10%" }}>{this.state.edit && this.state.rowAppraisal === emp.id ? <input onChange={this.handelEditYear} value={this.state.addAppraisalYear} className="form-control" style={{ width: "100%" }} type="text" /> :
                                                        this.state.updated && this.state.rowAppraisal === emp.id ? this.state.addAppraisalYear : emp.APPRAISAL_DATE}</td>
                                                    <td><i onClick={this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} tableId={emp.id} style={{ fontSize: 20 }} empName={emp.NAME_ARABIC} empApp={emp.APPRAISAL_ARABIC} empDate={emp.APPRAISAL_DATE} empnatid={emp.NATIONAL_ID_CARD_NO} class="fas fa-edit"></i></td>
                                                    <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={emp.id} empnatid={emp.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
                                        }
                                    </table>
                                    <Pagination minusFirstArg={this.minusFirstArg} plusSecondArg={this.plusSecondArg} firstArgPerBtn={this.state.firstArgPerBtn} secondArgPerBtn={this.state.secondArgPerBtn} changargs={this.changeArgs} pagesLength={this.props.empApp.length} currentPage={this.state.currentPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >)
    }
}


const mapStateToProps = (state) => {
    return {

        deps: state.posts.deps,
        empdep: state.posts.empdep,
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        empApp: state.posts.empApp,
        cates: state.posts.cates,
        result: state.trans.result,
        msg: state.trans.msg,
        updatedInf: state.trans.updatedInf,

    };
};
export default connect(mapStateToProps, {
    getEmpByDeps, getEmpAppraisal, getEmpName, getEmpNameByName, newAppraisal, updateEmpAppraisal, deleteEmpAppraisal
})(OutsourceEmpsAppraisal);