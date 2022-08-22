import React, { Fragment } from "react";
import { getEmpName, getEmpNameByName } from "../../actions/Actions"
import { getempspenalties, deleteEmpPenalty } from "../../actions/TransActions"
import { connect } from "react-redux";
import axios from "axios";
import 'moment-timezone';

class OutsourceEmpPenalty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmAdd: false, showMsg: false, addPenaltyType: "", addPenaltyDate: "", addDayesOfPenalty: "",
            empname: null, updated: false, firstArg: 0, addReasonOfPenalty: "", empnameSearch: "", empidSearch: "", searchPenaltyType: "", searchPenaltyYear: "", messege: null,
            secondArg: 20, currentPage: 1, firstArgPerBtn: 0, secondArgPerBtn: 10, empnameadd: "", empidadd: "",
            showNamesResultsForSearch: false, showNamesResultsForAdd: false, finalData: null, penIsdisDeduct: false,
            editName: "", editPenaltyType: "", editPenaltyDate: "", editDayesOfPenalty: "", editReasonOfPenalty: "", add: false, edit: false, rowPen: ""
        };
    }

    /* ------------------------------------------------------ */

    AddPenaltyTypeHandler = (e) => {
        this.setState({ addPenaltyType: e.target.value })
        let numOfPen = document.getElementById('numofpen')
        if (e.target.value === "خصم") {
            numOfPen.style.display = "block"
            this.setState({ penIsdisDeduct: true })
        } else {
            numOfPen.style.display = "none"
            this.setState({ penIsdisDeduct: false })

        }
    }

    addDateHandler = (e) => {
        this.setState({ addPenaltyDate: e.target.value })
    }
    addDayesOfPenaltyHandler = (e) => {
        this.setState({
            addDayesOfPenalty: e.target.value
        })
    }
    addReasonOfPenaltyHandler = (e) => {
        this.setState({
            addReasonOfPenalty: e.target.value
        })
    }

    /* -----------------------------------------------------------------*/



    searchEditNameHandler = (e) => {
        this.props.getEmpNameByName(e.target.value)
    }

    editNameHandler = (e) => {
        this.setState({
            editName: e.target.value
        })
    }

    editPenaltyTypeHandler = (e) => {
        this.setState({
            editPenaltyType: e.target.value
        })
    }

    editPenaltyDateHandler = (e) => {
        this.setState({
            editPenaltyDate: e.target.value
        })
    }

    editDayesOfPenaltyHanler = (e) => {

        this.setState({
            editDayesOfPenalty: e.target.value
        })
    }

    editReasonOfPenaltyHanlder = (e) => {
        this.setState({
            editReasonOfPenalty: e.traget.value
        })
    }

    handelEdit_1 = (e) => {
        this.setState({ edit: true, rowPen: e.target.getAttribute("tableId"), editName: e.target.getAttribute("empName"), editPenaltyType: e.target.getAttribute("penType"), editDayesOfPenalty: e.target.getAttribute("penNum"), editPenaltyDate: e.target.getAttribute("penDate") })
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        console.log(this.state.editDayesOfPenalty);
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
        // editName: "", editPenaltyType: "", editPenaltyDate: "", editDayesOfPenalty: "", editReasonOfPenalty: ""

        let editName = `NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.editName}")`
        let editPenaltyType = `PENALTY_TYPE = (SELECT PENALTY_ID FROM penalty_type WHERE PENALTY_TYPE_AR = "${this.state.editPenaltyType}")`
        let editPenaltyDate = `PENALTY_DATE = "${this.state.editPenaltyDate}"`
        let editPenaltyYear = `PENALTY_YEAR = YEAR("${this.state.editPenaltyDate}")`
        let editPenNum = this.state.editDayesOfPenalty ? `PEN_NUM = ${this.state.editDayesOfPenalty}` : null
        console.log(editPenNum);

        let data = [editName, editPenaltyType, editPenaltyDate, editPenaltyYear, editPenNum ? editPenNum : "", this.state.rowPen]
        console.log(data);

        axios({
            method: "PUT",
            data: data,
            url: `http://${process.env.REACT_APP_URL}/updatepenalty`,
            headers: { "Content-Type": "application/json" },
        }).then(data => {
            console.log(data.data.msg);
            if (data.data.msg === "تم إدخال البيانات بنجاح") {
                this.setState({
                    updated: true
                })
            } else {
                this.setState({
                    updated: false
                })
            }
        })
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

    /* ________________________________________________________________________ */

    idInputHandlerForSearch = (e) => {
        this.refs.name.value = ''
        this.props.getEmpName(e.target.value)
        this.setState({ edit: false, empidSearch: e.target.value })
    }

    nameInputHandlerForSearch = (e) => {
        this.setState({ showNamesResultsForSearch: true, empidSearch: e.target.value })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
    }

    namesOptionshandlerForSearch = (e) => {
        this.refs.name.value = e.target.value
        this.setState({
            empnameSearch: e.target.value
        })
    }

    searchPenaltyTypeHandler = (e) => {
        this.setState({
            searchPenaltyType: e.target.value
        })
    }

    searchPenaltyYearHandler = (e) => {
        this.setState({
            searchPenaltyYear: e.target.value
        })
    }

    handelSearch = () => {
        let nameOrId = ''
        // if (this.refs.name.value.length > 0) {
        if (this.state.empnameSearch.length > 0) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empnameSearch}")`
        } else if (this.state.empidSearch.length > 0) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empidSearch})`
        }
        let data = `${this.state.searchPenaltyType.length > 0 ? `penalty_type.PENALTY_ID = (SELECT PENALTY_ID FROM penalty_type WHERE PENALTY_TYPE_AR  = "${this.state.searchPenaltyType}")` : ''}
        ${(this.state.searchPenaltyType.length > 0 && this.state.searchPenaltyYear.length > 0) ? `AND` : ''}
        ${this.state.searchPenaltyYear.length > 0 ? `PENALTY_YEAR = ${this.state.searchPenaltyYear}` : ''}
        ${(this.state.searchPenaltyType.length > 0 && nameOrId.length > 0) ||
                (this.state.searchPenaltyYear.length > 0 && nameOrId.length > 0) ? 'AND' : ''}
        ${nameOrId.length > 0 ? `employee_penalty.NATIONAL_ID_CARD_NO = ${nameOrId}` : ''}
        `
        this.props.getempspenalties(data)
    }

    /* ------------------------------------------------------------------*/

    idInputHandlerForAdd = (e) => {
        this.refs.nameadd.value = ''
        this.setState({ empidadd: e.target.value, empnameadd: "" })
        if (e.target.value.length === 0) {
            this.setState({ empidadd: "" })
        }
    }

    nameInputHandlerForAdd = (e) => {
        this.setState({ showNamesResultsForAdd: true, empidadd: "", empnameadd: e.target.value })
        this.props.getEmpNameByName(e.target.value)
        if (e.target.value.length === 0) {
            this.setState({ empnameadd: "" })
        }
        this.refs.idadd.value = ''
    }

    namesOptionshandlerForAdd = (e) => {
        this.setState({
            empnameadd: e.target.value, empidadd: ""
        })
        if (this.refs.nameadd) this.refs.nameadd.value = e.target.value
    }

    /* ------------------------------------------------------------------*/


    handleDataToSend = () => {
        let nameOrId;
        console.log(this.state.addPenaltyType);
        if (this.state.empnameadd) {
            nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empnameadd}")`
        } else if (this.state.empidadd) {
            nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empidadd})`
        }
        let penaltyType = `(SELECT PENALTY_ID FROM penalty_type WHERE PENALTY_TYPE_AR = "${this.state.addPenaltyType}")`
        let penaltyDate = `"${this.state.addPenaltyDate}"`
        let yearOfDate = `YEAR("${this.state.addPenaltyDate}")`
        let numOfPen = this.state.addDayesOfPenalty
        let organization = 30
        let reasonForPen = `"${this.state.addReasonOfPenalty}")`


        let data = [nameOrId, `"true"`, penaltyType, penaltyDate, yearOfDate, organization, reasonForPen]
        if (numOfPen.length > 1) data.push(numOfPen)
        console.log(this.state.empidadd.length, this.state.addPenaltyType.length, this.state.addPenaltyDate.length, reasonForPen.length);
        if ((this.state.empidadd.length < 1 && this.state.empnameadd.length < 1) || this.state.addPenaltyType.length < 1 ||
            penaltyDate.length < 1 || (this.state.penIsdisDeduct === true && numOfPen.length < 1) || this.state.addReasonOfPenalty.length < 1) {
            this.setState({
                messege: { msg: "البيانات غير كاملة" }
            })
            console.log('inputs are not completed');
        } else {
            console.log('done');
            this.setState({ finalData: data, confirmAdd: true })
        }

    }




    /* ------------------------  */

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

    minusFirstArg = (e) => {
        e.preventDefault()
        if (this.state.firstArgPerBtn > 0) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn - 1, secondArgPerBtn: prevState.secondArgPerBtn - 1, currentPage: prevState.currentPage - 1, firstArg: prevState.firstArg - 10, secondArg: prevState.secondArg - 10 }
            })
        }

        this.changeArgs(this.state.currentPage - 1)
    }

    /* ------------------------  */

    addButtonClickHandeler = (e) => {
        this.setState({ add: true })
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

    submitButtonHandler = (e) => {
        if (!this.state.confirmAdd) {
            this.setState({ confirmAdd: true })
        } else if (this.state.confirmAdd) {
            this.setState({ confirmAdd: false })
        }
    }



    closeAddConfirmHandler = (e) => {
        this.setState({
            confirmAdd: false
        })
    }

    submitNewPenalty = (e) => {
        axios({
            method: "POST",
            data: this.state.finalData,
            withCredentials: true,
            url: `http://${process.env.REACT_APP_URL}/postnewpenalty`,
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            console.log("Dasdasdasd");
            this.setState({
                messege: res.data,
                showMsg: true
            })
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
        let data = [e.target.getAttribute("tableId"), e.target.getAttribute("natIdCard")]
        this.props.deleteEmpPenalty(data)
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
        console.log(this.state.editDayesOfPenalty);
        var dates = [];
        let start = 1996;
        let end = 2021;

        while (start !== end) {
            dates.push(start);
            start++;
        }

        let penalties = ["أخرى", "ممتاز", "خصم", "إنذار", "جزاء إداري", "خفض أجر", "للفت نظر", "رفت", "تنبيه", "لوم", "احالة للمعاش", "تأجيل علاوة", "تأجيل ترقية", "خفض درجة ادارية", "إيقاف عن العمل", "الحرمان من العلاوة", "حرمان من نصف علاوة", "انذار كتابي بالفصل", "استبعاد", "حفظ التحقيق", "خصم من الحافز"]
        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <Fragment>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
                                <div style={{ height: "100%", minHeight: 250, width: "50%", minWidth: "750px", overflow: "auto" }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} class="fas fa-times-circle"></i> : null}
                                        <span>إضافة جزاء جديد</span>
                                        <div></div>
                                    </div>
                                    {this.state.showMsg ? this.state.messege.msg === "تم إدخال الجزاء بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.state.messege.msg}</div> : this.state.messege.msg === "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege.msg}</div> : this.state.messege.msg === "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege.msg}</div> : null : null}
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                            <input ref="idadd" onChange={this.idInputHandlerForAdd} className="form-control" style={{ width: "100%", minWidth: "250px" }} onKeyDown={this.nameInputHandler} type="number" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الأسم : </label>
                                            <input ref="nameadd" onKeyDown={this.nameInputHandlerForAdd} id="nameinputadd" className="form-control" style={{ width: "100%", minWidth: "250px" }} onChange={this.nameInputHandler} type="text" />
                                        </div>
                                    </div>
                                    {
                                        this.state.showNamesResultsForAdd ?
                                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                                <div></div>
                                                <select onClick={this.namesOptionshandlerForAdd} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
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
                                            <label style={{ width: "100%", textAlign: "right" }}>الجزاء : </label>
                                            <select onChange={this.AddPenaltyTypeHandler} id="empapp" style={{ height: 30, width: "100%", minWidth: "215px" }}>
                                                {penalties.map(penalty => (
                                                    <option>{penalty}</option>
                                                ))}
                                                <option selected>اختر ...</option>
                                            </select>
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>التاريخ : </label>
                                            <input onChange={this.addDateHandler} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="date" />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div id="numofpen" style={{ display: "none" }} className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>عدد أيام الجزاء : </label>
                                            <input onChange={this.addDayesOfPenaltyHandler} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="number" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>سبب الجزاء : </label>
                                            <input onChange={this.addReasonOfPenaltyHandler} className="form-control" style={{ width: "70%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>

                                    <button onClick={this.handleDataToSend} style={{ width: "92%", margin: "0 auto" }} type="button" class="btn btn-primary btn-block">إضافة جزاء جديد</button>

                                    {this.state.confirmAdd ? <div style={{ width: "100%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة جزاء جديد ؟ <button onClick={this.submitNewPenalty} style={{ float: "left" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i></div> : null}


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
                                <span style={{ marginRight: 70 }}>جزاءات العاملين</span>
                                <button onClick={this.addButtonClickHandeler} type="button" class="btn btn-primary">إضافة جزاء جديد</button>
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" onKeyUp={this.idInputHandlerForSearch} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input id="empname" className="form-control" onKeyUp={this.nameInputHandlerForSearch} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}></label>
                                        <button onClick={this.handelSearch} type="button" style={{ marginRight: 30, marginTop: 6 }} >
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.showNamesResultsForSearch ?
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div></div>
                                        <select onClick={this.namesOptionshandlerForSearch} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
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
                                    <label style={{ width: "80%", textAlign: "right" }}>السنة : </label>
                                    <select id="year1" style={{ width: "80%", height: 30 }} onKeyDown={this.searchPenaltyYearHandler}>
                                        {dates.map(year => (
                                            <option year={year} >{year}</option>
                                        ))}
                                        <option selected>اختر السنة</option>

                                    </select>
                                </div>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "80%", textAlign: "right" }}>الجزاء : </label>
                                    <select onChange={this.searchPenaltyTypeHandler} id="empapp" style={{ width: "80%", height: 30 }}>
                                        {penalties.map(penalty => (
                                            <option>{penalty}</option>
                                        ))}
                                        <option selected>اختر ...</option>

                                    </select>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading" style={{ minHeight: 40 }}>
                                جزاءات
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الجزاء</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>عدد أيام الخصم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التاريخ</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empsPenalties.length >= 1 ? this.props.empsPenalties.map(emp => (
                                            <tbody>
                                                <tr id={emp.id}>
                                                    <td>{this.state.edit && this.state.rowPen === emp.id ?
                                                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                            <input onKeyUp={this.searchEditNameHandler} className="form-control" style={{ width: 220, marginBottom: 5 }} name="brow501" />
                                                            <select onChange={this.editNameHandler} id="brow501" style={{ width: 220, height: 30 }}>
                                                                {this.props.empNameByName.map(name => (
                                                                    <option for="brow501">{name.NAME_ARABIC}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        : emp.NAME_ARABIC}</td>
                                                    <td>{this.state.edit && this.state.rowPen === emp.id ?
                                                        <select onChange={this.editPenaltyTypeHandler} id="empapp" style={{ height: 30, width: "50%", minWidth: "50px" }}>
                                                            {penalties.map(penalty => (
                                                                <option>{penalty}</option>
                                                            ))}
                                                            <option selected>اختر ...</option>
                                                        </select> : emp.PENALTY_TYPE_AR}</td>
                                                    <td>{this.state.edit && this.state.rowPen === emp.id ?
                                                        <select onChange={this.editPenaltyTypeHandler} id="empapp" style={{ height: 30, width: "50%", minWidth: "50px" }}>
                                                            {penalties.map(penalty => (
                                                                <option>{penalty}</option>
                                                            ))}
                                                            <option selected>اختر ...</option>
                                                        </select> : emp.PEN_NUM}</td>
                                                    <td>{this.state.edit && this.state.rowPen === emp.id ?
                                                        <input onChange={this.editPenaltyDateHandler} className="form-control" style={{ width: "70%", minWidth: "90px", margin: "0 auto" }} type="date" />
                                                        : emp.PENALTY_DATE}</td>
                                                    <td><i onClick={this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} tableId={emp.id} style={{ fontSize: 20 }} empName={emp.NAME_ARABIC} penType={emp.PENALTY_TYPE_AR} penDate={emp.PENALTY_DATE} class="fas fa-edit"></i></td>
                                                    <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={emp.id} natIdCard={emp.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        )) :
                                            <tbody>
                                                <tr>
                                                    <td colspan="9">لاتوجد بيانات</td>
                                                </tr>
                                            </tbody>}

                                    </table>
                                    {/* <Pagination minusFirstArg={this.minusFirstArg} plusSecondArg={this.plusSecondArg} firstArgPerBtn={this.state.firstArgPerBtn} secondArgPerBtn={this.state.secondArgPerBtn} changargs={this.changeArgs} pagesLength={this.props.empApp.length} currentPage={this.state.currentPage} /> */}
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
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        empsPenalties: state.trans.empsPenalties
    };
};
export default connect(mapStateToProps, {
    getEmpName, getEmpNameByName, getempspenalties, deleteEmpPenalty
})(OutsourceEmpPenalty);