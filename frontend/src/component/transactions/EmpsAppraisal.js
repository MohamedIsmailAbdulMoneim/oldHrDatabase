import React, { Fragment } from "react";
import {

    getEmpByDeps, getEmpName, getEmpNameByName, globalNameOrId

} from "../../actions/Actions";
import { getEmpAppraisal, newAppraisal, updateEmpAppraisal, deleteEmpAppraisal } from "../../actions/TransActions"
import { connect } from "react-redux";
import 'moment-timezone';
import Pagination from "../Pagination";
var jp = require('jsonpath');

class EmpsAppraisal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initData: [],
            confirmAdd: false, showMsg: false, errorAdd: false, addEmpAppraisal: "", editEmpAppraisal: "", searchEmpAppraisal: [],
            addAppraisalYear: "", editEmpAppraisalYear: "", searchEmpAppraisalYear: "", rowAppraisal: null, add: false, edit: false, empid: "", empname: "",
            empnat: null, showNamesResults: false, updated: false, firstArg: 0, secondArg: 20, currentPage: 1,
            firstArgPerBtn: 0, secondArgPerBtn: 10, delete: false, selectQuery: ""
        };
    }

    componentDidMount() {
    }

    isEqual = (objects) => {
        return objects.every(obj => JSON.stringify(obj.NAME_ARABIC) === JSON.stringify(objects[0].NAME_ARABIC))
    };

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

    addButtonClickHandeler = (e) => {
        this.setState({ add: true })
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
        let itemsPerPage = Math.ceil(this.props.empApp.length / 20)
        if (this.state.secondArgPerBtn < itemsPerPage) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn + 1, secondArgPerBtn: prevState.secondArgPerBtn + 1, firstArg: prevState.firstArg + 20, secondArg: prevState.secondArg + 20, currentPage: prevState.currentPage + 1 }
            })

        }
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
            appDate: this.state.addAppraisalYear, appValue: this.state.addEmpAppraisal, empid: this.state.empid, empname: this.state.empname, isShown: `"True"`
        }

        let nameOrId = ''
        if (this.state.empname.length > 0) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empname}")`
        } else if (this.state.empid.length > 0) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empid})`
        }

        obj.empid = this.state.empid || "null"
        obj.empname = this.state.empname || "null"
        if (this.state.selectQuery.length < 1) {
            this.props.newAppraisal({ insertedData: obj, getData: `employee_appraisal.NATIONAL_ID_CARD_NO = ${nameOrId}` })
        } else {
            this.props.newAppraisal({ insertedData: obj, getData: this.state.selectQuery })
        }
        this.setState({ showMsg: true })

        if (this.props.msg === "تم إدخال التقييم بنجاح") {
            setTimeout(() => {
                this.setState({ showMsg: false })
            }, 3000)
        }

    }

    idInputHandler = (e) => {
        this.setState({ empid: e.target.value })
        if (e.key === "Enter") {
            this.props.getEmpAppraisal(`employee_appraisal.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${e.target.value})`)
            this.props.globalNameOrId(`${e.target.name} = ${e.target.value}`)
        }
        this.refs.name.value = ''
        // if (this.refs.searchbox) {

        //     this.refs.searchbox.options.selectedIndex = 0
        // }
    }
    nameInputHandler = (e) => {
        this.setState({ showNamesResultsForSearch: true })
        if (e.target.value.length > 0) this.props.getEmpNameByName(e.target.value, this)
        this.refs.empid.value = ''

    }

    namesOptionshandlerForAdd = (e) => {
        this.setState({
            empnameForAdd: e.target.value, empidForAdd: null
        })
        if (this.refs.nameadd) this.refs.nameadd.value = e.target.value
    }

    namesOptionshandlerForSearch = (e) => {
        this.refs.name.value = e.target.value
        this.props.getEmpAppraisal(`employee_appraisal.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${e.target.value}")`)
        this.props.globalNameOrId(`${e.target.getAttribute('name')} = "${e.target.value}"`)
        this.setState({ empname: e.target.value })

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
        this.setState({ editEmpAppraisalYear: e.target.value })
    }

    handelSearchAppraisal = (e) => {
        // this.setState({ searchEmpAppraisal: e.target.value })
        // if (e.target.value === "اختر التقدير") {
        //     this.setState({ searchEmpAppraisal: "" })
        // }
        if (e.target.checked) {
            let state = this.state
            state.searchEmpAppraisal.push(e.target.value)
        } else {
            let state = this.state
           let deletedIndex =  state.searchEmpAppraisal.indexOf(e.target.value);
           if (deletedIndex > -1) {
            state.searchEmpAppraisal.splice(deletedIndex, 1);
          }
        }

    }

    handelSearchYear = (e) => {
        e.preventDefault()
        this.setState({ searchEmpAppraisalYear: e.target.value })
        if (e.target.value === "اختر السنة") {
            this.setState({ searchEmpAppraisalYear: "" })

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
        let data = `${this.state.searchEmpAppraisal.length > 0 ? `appraisal.APPRAISAL = (SELECT APPRAISAL FROM appraisal WHERE APPRAISAL_ARABIC  = "${this.state.searchEmpAppraisal}")` : ''}
        ${(this.state.searchEmpAppraisalYear.length > 0 && this.state.searchEmpAppraisal.length > 0) ? `AND` : ''}
        ${this.state.searchEmpAppraisalYear.length > 0 ? `employee_appraisal.APPRAISAL_DATE = ${this.state.searchEmpAppraisalYear}` : ''}
        ${(this.state.searchEmpAppraisalYear.length > 0 && nameOrId.length > 0) ||
                (this.state.searchEmpAppraisal.length > 0 && nameOrId.length > 0) ? 'AND' : ''}
        ${nameOrId.length > 0 ? `employee_appraisal.NATIONAL_ID_CARD_NO = ${nameOrId}` : ''}
        AND employee_appraisal.is_shown = "True"

        `
        this.setState({ selectQuery: data })
        this.props.getEmpAppraisal(data)
    }

    handelEdit_1 = (e) => {
        this.setState({ edit: true, rowAppraisal: e.target.getAttribute("tableId"), editEmpAppraisal: e.target.getAttribute("empApp"), editEmpAppraisalYear: e.target.getAttribute("empDate"), empnat: e.target.getAttribute("empnatid") })
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
        let data = { empNat: this.state.empnat, appraisal: this.state.editEmpAppraisal, year: this.state.editEmpAppraisalYear, rowAppraisal: this.state.rowAppraisal }

        if (this.state.selectQuery.length < 1) {
            this.props.updateEmpAppraisal({ insertedData: data, getData: `employee_appraisal.NATIONAL_ID_CARD_NO = ${this.state.empnat}` })
        } else {
            this.props.updateEmpAppraisal({ insertedData: data, getData: this.state.selectQuery })
        }
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
        if (this.state.selectQuery.length < 1) {
            this.props.deleteEmpAppraisal({ insertedData: data, getData: `employee_appraisal.NATIONAL_ID_CARD_NO = ${e.target.getAttribute('empnatid')}` })
        } else {
            this.props.deleteEmpAppraisal({ insertedData: data, getData: this.state.selectQuery })
        }
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


    render() {
        var dates = [];
        let start = 1996;
        let end = 2021;
        while (start !== end) {
            dates.push(start);
            start++;
        }
console.log("render");
        var apprYear = [... new Set(jp.query(this.props.empApp, '$..APPRAISAL_DATE'))];
        var appValue = [... new Set(jp.query(this.props.empApp, '$..APPRAISAL_ARABIC'))];

        let appraisals = ["ممتاز بجدارة", "ممتاز", "جيد جدا بجدارة", "جيد جدا", "جيد", "مقبول", "ضعيف", "جيد حكمي", "جيد جدا حكمي", "ممتاز حكمي"]

        return (
            <div id="page-wrapper" className="empsappraisal">
                {this.state.add ?
                    <Fragment>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
                                <div style={{ height: "100%", minHeight: 250, width: "50%", minWidth: "750px", overflow: "auto" }} className="card-body">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} class="fas fa-times-circle"></i> : null}
                                        <span>إضافة تقييم جديد</span>
                                        <div></div>
                                    </div>
                                    {this.state.showMsg ? this.props.msg === "تم إدخال التقييم بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.props.msg}</div> : this.props.msg === "تم إدخال التقييم من قبل" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : this.props.msg === "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : null : null}
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                            <input ref={"empidAdd"} onKeyUp={this.idInputAddHandler} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
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
                        <div style={{ height: "100%", width: 600 }} class="card-body">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                <div></div>
                                <span style={{ marginRight: 70 }}>تقييمات العاملين</span>
                                <button onClick={this.addButtonClickHandeler} type="button" class="btn btn-primary">إضافة تقييم جديد</button>
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" colName={"NATIONAL_ID_CARD_NO"} onKeyDown={this.idInputHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="EMPLOYEE_ID" />
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
                                    <select colName={"APPRAISAL"} id="empapp" style={{ width: "80%", height: 30 }} >
                                        {appraisals.map(apprsl => (
                                            <option>{apprsl}</option>
                                        ))}
                                        <option selected>اختر التقدير</option>

                                    </select>
                                </div>
                                {/* <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "100%", textAlign: "right" }}>الإدارة : </label>
                                    <select disabled style={{ width: "100%", minWidth: "120px", height: 30 }}>
                                        {this.props.cates.map(cate => (
                                            <option id={cate.CAT_ID}>
                                                {cate.CAT_NAME}
                                            </option>
                                        ))}
                                    </select>
                                </div> */}
                            </div>
                            {
                                this.state.showNamesResultsForSearch ?
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div></div>
                                        <select ref={"searchbox"} onClick={this.namesOptionshandlerForSearch} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple>
                                            {this.props.empNameByName.map((name => (
                                                <option name="NAME_ARABIC">{name.NAME_ARABIC}</option>
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
                    <div class="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <table class="table table-striped table-bordered table-hover" id="dataTables-example" style={{ borderColor: "black", width: "80%" }}>
                            <thead>
                                <tr>
                                    <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                    <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            التقدير
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            {appValue.map((value, i) => (
                                                <>
                                                    <input onChange={this.handelSearchAppraisal} class="dropdown-item" type="checkbox" id={`year${i}`} name={`year${i}`} value={value} />
                                                    <label class="dropdown-item" for={`year${i}`}>{value}</label>
                                                </>
                                            ))}

                                        </ul>
                                    </th>

                                    <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>
                                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                            السنة
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            {apprYear.map((year, i) => (
                                                <>
                                                    <input class="dropdown-item" type="checkbox" id={`year${i}`} name={`year${i}`} value={year} />
                                                    <label class="dropdown-item" for={`year${i}`}>{year}</label>
                                                </>
                                            ))}

                                        </ul>
                                    </th>
                                    <th>تعديل</th>
                                    <th>حذف</th>
                                </tr>
                            </thead>
                            {this.props.empApp.length > 0 ? this.props.empApp.slice(this.state.firstArg, this.state.secondArg).map(emp => (
                                <tbody>
                                    <tr id={emp.id}>
                                        <td>{emp.NAME_ARABIC}</td>
                                        <td>{this.state.edit && JSON.parse(this.state.rowAppraisal) === JSON.parse(emp.id) ? <select onChange={this.handelEditAppraisal} id="empapp" style={{ width: "50%", height: 30 }}>
                                            {appraisals.map(apprsl => (
                                                <option>{apprsl}</option>
                                            ))}
                                            <option selected>اختر التقدير</option>

                                        </select> : emp.APPRAISAL_ARABIC}</td>
                                        <td style={{ width: "10%" }}>{this.state.edit && JSON.parse(this.state.rowAppraisal) === JSON.parse(emp.id) ? <input onChange={this.handelEditYear} placeholder={this.state.editEmpAppraisalYear} className="form-control" style={{ width: "100%" }} type="text" /> : emp.APPRAISAL_DATE}</td>
                                        <td><i onClick={this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} tableId={emp.id} style={{ fontSize: 20 }} empName={emp.NAME_ARABIC} empApp={emp.APPRAISAL_ARABIC} empDate={emp.APPRAISAL_DATE} empnatid={emp.NATIONAL_ID_CARD_NO} class="fas fa-edit"></i></td>
                                        <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={emp.id} empnatid={emp.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                    </tr>
                                </tbody>
                            )) :
                                <tbody>
                                    <tr>
                                        <td colspan="5">لا توجد بيانات</td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                        <Pagination minusFirstArg={this.minusFirstArg} plusSecondArg={this.plusSecondArg}
                            firstArgPerBtn={this.state.firstArgPerBtn} secondArgPerBtn={this.state.secondArgPerBtn}
                            changargs={this.changeArgs} pagesLength={this.props.empApp.length} currentPage={this.state.currentPage} />
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
        empApp: state.trans.empApp,
        cates: state.posts.cates,
        result: state.trans.result,
        msg: state.trans.msg,
        updatedInf: state.trans.updatedInf,

    };
};
export default connect(mapStateToProps, {
    getEmpByDeps, getEmpAppraisal, globalNameOrId, getEmpName, getEmpNameByName, newAppraisal, updateEmpAppraisal, deleteEmpAppraisal
})(EmpsAppraisal);