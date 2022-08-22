import React, { Fragment } from "react";
import { getEmpName, getEmpNameByName, globalNameOrId } from "../../actions/Actions"
import { getEmpTraining, deleteEmpTraining } from "../../actions/TransActions"
import { } from "../../actions/TransActions"
import { connect } from "react-redux";
import 'moment-timezone';

class EmpTraining extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmAdd: false, showMsg: false,
            appraisalYear: "null", rowTrainning: false, add: false, edit: false, empid: null, messege: null,
            addTrainingArabicName: "", addTrainingEnglishName: "", addTrainingFromDate: "", addTrainingToDate: "", addTrainingType: "", addTrainingPlaceType: "", addTrainingPlace: "",
            empnameadd: "", empidadd: "", showNamesResultsForSearch: false, showNamesResultsForAdd: false, finalData: null,
            empname: null, updated: false, firstArg: 0, empnameforsearch: "", empidforsearch: "",
            secondArg: 20, currentPage: 1, firstArgPerBtn: 0, secondArgPerBtn: 10, delete: false
        };
    }

    handleEmpNameForSearch = (e) => {

    }

    handleDataToSend = () => {
        let nameOrId;
        if (this.state.empnameadd) {
            nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empnameadd}")`
        } else if (this.state.empidadd) {
            nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empidadd})`
        }
        let trainingArabicName = `"${this.state.addTrainingArabicName}"`
        let trainingEnglishName = `"${this.state.addTrainingEnglishName}"`
        let trainingFromDate = `"${this.state.addTrainingFromDate}"`
        let trainingToDate = `"${this.state.addTrainingToDate}"`
        let trainingType = `(SELECT TRAINING_TYPE FROM training_type WHERE TRAINING_TYPE_NAME = "${this.state.addTrainingType}")`
        let TrainingPlaceType = `(SELECT LOCATION_TYPE FROM location_type WHERE LOCATION_TYPE_NAME = "${this.state.addTrainingPlaceType}")`
        let trainingPlace = `"${this.state.addTrainingPlace}"`
        let organization = '30)'
        // this.state.trainingArabicName.length, this.state.trainingEnglishName.length, this.state.trainingFromDate.length, this.state.trainingToDate.length, this.state.trainingType.length, this.state.trainingPlace.length
        // console.log(this.state.addTrainingArabicName.length);
        let data = [nameOrId, `"true"`, trainingArabicName, trainingEnglishName, trainingFromDate, trainingToDate, trainingType, TrainingPlaceType, trainingPlace, organization]
        if ((this.state.empidadd.length < 1 && this.state.empnameadd.length < 1) || this.state.addTrainingArabicName.length < 1 ||
            this.state.addTrainingEnglishName.length < 1 || this.state.addTrainingFromDate.length < 1 || this.state.addTrainingToDate.length < 1 || this.state.addTrainingType.length < 1 || this.state.addTrainingPlaceType.length < 1 || this.state.addTrainingPlace.length < 1) {
            this.setState({
                messege: { msg: "البيانات غير كاملة" }
            })
            console.log('inputs are not completed');
        } else {
            console.log('done');
            this.setState({ finalData: data, confirmAdd: true })
        }
    }

    submitNewTrainning = (e) => {
        e.preventDefault()
        this.setState({
            // messege: res.data,
            showMsg: true,
            empidadd: "",
            empnameadd: "",
            addTrainingArabicName: "",
            addTrainingEnglishName: "",
            addTrainingFromDate: "",
            addTrainingToDate: "",
            addTrainingType: "",
            addTrainingPlaceType: "",
            addTrainingPlace: ""
        })
        let addInputs = document.getElementsByClassName("add")
        for (let i = 0; i < addInputs.length; i++) {
            addInputs[i].value = ""
        }
    }

    /* ------------------------------------------------------ */

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

    addTrainingArabicNameHandler = (e) => {
        this.setState({
            addTrainingArabicName: e.target.value
        })
    }
    addTrainingEnglishNameHandler = (e) => {
        this.setState({
            addTrainingEnglishName: e.target.value
        })
    }
    addTrainingFromDateHandler = (e) => {
        this.setState({
            addTrainingFromDate: e.target.value
        })

    }
    addTrainingToDateHandler = (e) => {
        this.setState({
            addTrainingToDate: e.target.value
        })
    }
    addTrainingTypeHandler = (e) => {
        this.setState({
            addTrainingType: e.target.value
        })
    }

    addTrainingPlaceTypeHandler = (e) => {
        this.setState({
            addTrainingPlaceType: e.target.value
        })
    }

    addTrainingPlaceHandler = (e) => {
        this.setState({
            addTrainingPlace: e.target.value
        })
    }

    /* -----------------------------------------------------------------*/

    idInputHandlerForSearch = (e) => {
        this.refs.name.value = ''



        let nameOrId = `employee_training.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${e.target.value})`
        if (e.key === 'Enter') {

            this.props.globalNameOrId(`${e.target.name} = ${e.target.value}`)
            this.props.getEmpTraining(nameOrId)
            this.props.getEmpName(e.target.value)

            this.setState({ edit: false, empid: e.target.value })
        }
    }

    nameInputHandlerForSearch = (e) => {
        this.setState({ showNamesResultsForSearch: true })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
    }

    namesOptionshandlerForSearch = (e) => {
        let nameOrId = `employee_training.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empname}")`
        this.props.getEmpTraining(nameOrId)
        this.props.globalNameOrId(`${e.target.getAttribute('name')} = "${e.target.value}"`)
        this.refs.name.value = e.target.value
        this.setState({
            empname: e.target.value
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


    /* ------------------------------------------------------------------*/






    /* ----------------------------------------------------------------  */

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
    }

    nameInputAddHandler = (e) => {
        this.setState({ empname: e.target.value })

    }

    handleNewAppraisal = (e) => {
        let obj = {
            appDate: this.state.appraisalYear, appValue: this.state.empAppraisal, empid: this.state.empid, empname: this.state.empname
        }

        obj.empid = this.state.empid || "null"
        obj.empname = this.state.empname || "null"
        this.props.newAppraisal(obj)
        this.setState({ showMsg: true })

        setTimeout(() => {
            this.setState({ showMsg: false })
        }, 3000)
    }

    namesOptionshandler = (e) => {
        document.getElementById('empname').value = e.target.value
        if (document.getElementById('nameinputadd')) document.getElementById('nameinputadd').value = e.target.value
        this.setState({ showFamilyResult: true, empname: e.target.value })
    }

    handelYear = (e) => {
        e.preventDefault()
        this.setState({ appraisalYear: e.target.value })
    }

    handelSearch = () => {
        this.setState({ edit: false, updated: false, firstArg: 0, secondArg: 20, currentPage: 1, firstArgPerBtn: 0, secondArgPerBtn: 10 })
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
        let data = { empNat: this.state.empnat, appraisal: this.state.empAppraisal, year: this.state.appraisalYear }
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
        let data = [e.target.getAttribute("tableId"), e.target.getAttribute("natIdCard")]
        this.props.deleteEmpTraining(data)
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


        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <Fragment>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}>
                                <div style={{ height: "100%", minHeight: 250, width: "50%", minWidth: "750px", overflow: "auto" }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} class="fas fa-times-circle"></i> : null}
                                        <span>إضافة تدريب جديد</span>
                                        <div></div>
                                    </div>
                                    {this.state.showMsg ? this.state.messege === "تم إدخال التدريب بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.state.messege}</div> : this.state.messege === "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : this.state.messege === "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : null : null}
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                            <input ref="idadd" onChange={this.idInputHandlerForAdd} className="form-control add" style={{ width: "100%", minWidth: "250px" }} type="number" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الأسم : </label>
                                            <input ref="nameadd" onKeyDown={this.nameInputHandlerForAdd} id="nameinputadd" className="form-control add" style={{ width: "100%", minWidth: "250px" }} type="text" />
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
                                            <label style={{ width: "100%", textAlign: "right" }}>اسم البرنامج باللغة العربية: </label>
                                            <input onChange={this.addTrainingArabicNameHandler} className="form-control add" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>اسم البرنامج باللغة الإنجليزية: </label>
                                            <input onChange={this.addTrainingEnglishNameHandler} className="form-control add" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>من: </label>
                                            <input onChange={this.addTrainingFromDateHandler} className="form-control add" style={{ width: "100%", minWidth: "250px" }} type="date" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>إلى: </label>
                                            <input onChange={this.addTrainingToDateHandler} className="form-control add" style={{ width: "100%", minWidth: "250px" }} type="date" />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>نوع التدريب : </label>
                                            <select className="add" onChange={this.addTrainingTypeHandler} id="empapp" style={{ height: 30, width: "100%", minWidth: "200px" }}>
                                                <option selected>أخرى</option>
                                                <option selected>مؤتمر</option>
                                                <option selected>ملتقى</option>
                                                <option selected>محاضرة</option>
                                                <option selected>دورة تدريبية</option>
                                                <option selected>اختر ...</option>
                                            </select>
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}> نوع المكان : </label>
                                            <select className="add" onChange={this.addTrainingPlaceTypeHandler} id="empapp" style={{ height: 30, width: "100%", minWidth: "200px" }}>
                                                <option >داخلي</option>
                                                <option >خارجي</option>
                                                <option selected>اختر ...</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>مكان التدريب : </label>
                                            <input onChange={this.addTrainingPlaceHandler} className="form-control add" style={{ width: "100%", minWidth: "650px" }} type="text" />
                                        </div>
                                    </div>
                                    <button onClick={this.handleDataToSend} style={{ width: "92%", margin: "0 auto" }} type="button" class="btn btn-primary btn-block">إضافة تدريب جديد</button>

                                    {this.state.confirmAdd ? <div style={{ width: "100%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة تدريب جديد ؟ <button onClick={this.submitNewTrainning} style={{ float: "left" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.submitButtonHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i></div> : null}


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
                        <div style={{ height: "100%", width: 600, minHeight: 120 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                <div></div>
                                <span style={{ marginRight: 70 }}>تدريب العاملين</span>
                                <button onClick={this.addButtonClickHandeler} type="button" class="btn btn-primary">إضافة تدريب جديد</button>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                    <input id="empid" ref="empid" className="form-control" onKeyDown={this.idInputHandlerForSearch} style={{ background: "white", width: "70%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="EMPLOYEE_ID" />
                                </div>
                                <div className="form-group" controlId="formBasicEmail">
                                    <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                    <input ref="name" id="empname" className="form-control" onKeyUp={this.nameInputHandlerForSearch} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                            </div>
                            {
                                this.state.showNamesResultsForSearch ?
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div></div>
                                        <select onClick={this.namesOptionshandlerForSearch} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple>
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
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading" style={{ minHeight: 40 }}>
                                {this.props.empTraining.length > 0 ? <h4>بيان بتدريبات السيد / {this.props.empTraining[0].NAME_ARABIC}</h4> : null}
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>اسم الدور التدريبية</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>مكان الدورة التدريبية</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>من</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>إلى</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>نوع التدريب</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>نوع المكان</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تكلفة الدورة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الشهادة</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empTraining.map(emp => (
                                            <tbody>
                                                <tr id={emp.id}>
                                                    <td>{emp.TRAINING_PROGRAM_ARABIC}</td>
                                                    <td>{emp.LOCATION_NAME}</td>
                                                    <td>{emp.TRAINING_START_DATE}</td>
                                                    <td>{emp.TRAINING_COMPLETION_DATE}</td>
                                                    <td>{emp.TRAINING_TYPE_NAME}</td>
                                                    <td>{emp.LOCATION_TYPE_NAME}</td>
                                                    <td>{emp.TRAINING_COST}</td>
                                                    <td>{emp.TRAINING_COST}</td>
                                                    <td><i onClick={this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} tableId={emp.id} relType={emp.RELATION_TYPE} famName={emp.FAMILY_NAME} birthDate={emp.BIRTH_DATE} marNid={emp.NATIONAL_ID_NUMBER} natIdCard={emp.NATIONAL_ID_CARD_NO} class="fas fa-edit"></i></td>
                                                    <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={emp.id} natIdCard={emp.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
                                        }
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
        empTraining: state.trans.empTraining


    };
};
export default connect(mapStateToProps, {
    getEmpName, getEmpNameByName, getEmpTraining, deleteEmpTraining, globalNameOrId
})(EmpTraining);