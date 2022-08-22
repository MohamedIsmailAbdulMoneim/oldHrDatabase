import React from "react";
import {
    getEmpName, getEmpNameByName
} from "../../actions/Actions";
import {
    InsertNewEdu, getEmpEdu
} from "../../actions/TransActions"
import { connect } from "react-redux";
import axios from "axios";


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 500,
        height: 500,
        margin: 100,
    },
    //style for font size
    resize: {
        fontSize: 100
    },
}

class OutsourceEmpEduDeg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false, edit: false, empidForAdd: "",
            empnameForAdd: "", qual: null, showNamesResultsForAdd: false,
            showNamesResultsForSearch: false, showSpeciality: false,
            addEduDeg: "", specs: [], specsEdit: [], addSpec: "", showSpecialityDetails: false,
             specsDetails: [], specsDetailsEdit: [], addSpecDetails: "",
            addGrade: "", showUneSchools: false, unes: [], unesEdit: [], addUneversity: "", addGradYear: "",
            rowEmpEdu: "", editDegree: "", editSpec: "", delete:false,
            editSpecDetail: "", editGrade: "", editUni: "", editGradeYear: ""
        };

    }

    /* 
    
    --------------------
    Create Methods
    --------------------
    
    */

    handleDataToSend = () => {
        let nameOrId;
        if (this.state.empnameForAdd) {
            nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM outsource_employee_education_degree WHERE NAME_ARABIC = "${this.state.empnameForAdd}")`
        } else if (this.state.empidForAdd) {
            nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM outsource_employee_education_degree WHERE EMPLOYEE_ID = ${this.state.empidForAdd})`
        }
        let eduDeg = `(SELECT DEGREE FROM education_degree WHERE DEGREE_ARABIC = "${this.state.addEduDeg}")`
        let spec = `(SELECT SPECIALITY FROM dgree_speciality WHERE SPECIALITY_ARABIC = "${this.state.addSpec}")`
        let specDetails = `(SELECT SPECIALITY_DETAIL FROM dgree_speciality_detail WHERE SPECIALITY_DETAIL_ARABIC = "${this.state.addSpecDetails}")`
        let grade = `(SELECT GRADUATION_GRADE FROM graduation_grade WHERE GRADE_ARABIC = "${this.state.addGrade}")`
        let uneversity = `(SELECT UNIVERSITY_SCHOOL FROM university_school WHERE UNIVERSITY_SCHOOL_ARABIC = "${this.state.addUneversity}")`
        let gradYear = `${this.state.addGradYear}`
        let organization = '30)'
        let data = [nameOrId, `"true"` ,eduDeg, spec, specDetails, grade, uneversity, gradYear, organization]
        if (this.state.addEduDeg.length < 1 || this.state.addSpec.length < 1 || this.state.addSpecDetails.length < 1 ||
            this.state.addGrade.length < 1 || this.state.addUneversity.length < 1 || this.state.addGradYear.length < 1) {
            this.setState({
                messege: { msg: "البيانات غير كاملة" }
            })
            console.log('inputs are not completed');
        } else if (this.state.empnameForAdd.length > 0 || this.state.empidForAdd.length > 0) {
            console.log('done');
            this.setState({ finalData: data, confirmAdd: true })

        }
    }

    addButtonClickHandeler = () => {
        this.setState({
            add: true
        })
    }

    idInputHandlerForAdd = (e) => {
        this.refs.nameadd.value = ''
        this.setState({ empidForAdd: e.target.value, empnameForAdd: "" })
        if (e.target.value.length === 0) {
            this.setState({ empidForAdd: "" })
        }
    }
    nameInputHandlerForAdd = (e) => {
        this.setState({ showNamesResultsForAdd: true, empidForAdd: "", empnameForAdd: e.target.value })
        this.props.getEmpNameByName(e.target.value)
        if (e.target.value.length === 0) {
            this.setState({ empnameForAdd: "" })
        }
        this.refs.idadd.value = ''
    }

    addEducationDegreeHandler = (e) => {
        this.setState({
            addEduDeg: e.target.value
        })
    }



    getSpecialityHandlerForEdit = (e) => {
        axios.get(`http://${process.env.REACT_APP_URL}/specarabic/?specarabic=${e.target.value}`).then(res => {
            this.setState({
                specsEdit: res.data,
            })
        })
    }

    getSpecialityDetailsHandlerForEdit = (e) => {
        axios.get(`http://${process.env.REACT_APP_URL}/specDetail/?specDetail=${e.target.value}`).then(res => {
            this.setState({
                specsDetailsEdit: res.data,
            })
        })
    }

    getUneshcoolHandlerForEdit = (e) => {
        axios.get(`http://${process.env.REACT_APP_URL}/uneschool/?uneschool=${e.target.value}`).then(res => {
            this.setState({
                unesEdit: res.data

            })
        })

    }

    getSpecialityHandlerForAdd = (e) => {
        axios.get(`http://${process.env.REACT_APP_URL}/specarabic/?specarabic=${e.target.value}`).then(res => {
            this.setState({
                specs: res.data,
                showSpeciality: true
            })
        })
    }

    specsOptionshandler = (e) => {
        this.refs.spec.value = e.target.value
        this.setState({ addSpec: e.target.value })
    }

    getSpecialityDetailsHandlerForAdd = (e) => {
        axios.get(`http://${process.env.REACT_APP_URL}/specDetail/?specDetail=${e.target.value}`).then(res => {
            this.setState({
                specsDetails: res.data,
                showSpecialityDetails: true
            })
        })
    }



    specDetailsOptionshandler = (e) => {
        this.refs.specDet.value = e.target.value
        this.setState({ addSpecDetails: e.target.value })
    }

    addGradeHandler = (e) => {
        this.setState({
            addGrade: e.target.value
        })
    }

    getUneshcoolHandlerForAdd = (e) => {
        axios.get(`http://${process.env.REACT_APP_URL}/uneschool/?uneschool=${e.target.value}`).then(res => {
            this.setState({
                showUneSchools: true,
                unes: res.data
            })
        })

    }

    uneshcoolsOptionshandler = (e) => {
        this.refs.unes.value = e.target.value
        this.setState({ addUneversity: e.target.value })
    }

    addGraduationYearHandler = (e) => {

        this.setState({
            addGradYear: e.target.value
        })
    }

    handelInsertNewEdu = (e) => {
        e.preventDefault()
        this.props.InsertNewEdu(this.state.finalData)

    }

    closeAddSectionHandler = (e) => {
        this.setState({ add: false })
    }


    idInputHandlerForSearch = (e) => {
        this.refs.name.value = ''
        this.setState({ showFamilyResult: false })
        if (e.key === 'Enter') {
            this.props.getEmpName(e.target.value)
            this.props.getEmpEdu(e.target.value, "")
            this.setState({ edit: false, empid: e.target.value, showMaritalstate: true })
        }
    }

    nameInputHandlerForSearch = (e) => {
        this.setState({ showNamesResultsForSearch: true, showFamilyResult: false })
        this.refs.empid.value = ''
        this.props.getEmpNameByName(e.target.value)
        if (e.key === 'Enter') {
            this.props.getEmpEdu("", e.target.value)
        }
    }



    namesOptionshandlerForSearch = (e) => {
        this.refs.name.value = e.target.value
        this.props.getEmpEdu("", e.target.value)
    }

    namesOptionshandlerForAdd = (e) => {
        this.setState({
            empnameForAdd: e.target.value, empidForAdd: null
        })
        if (this.refs.nameadd) this.refs.nameadd.value = e.target.value
    }



    /* 
    
    --------------------
    Read Methods
    --------------------
    
    */



    /* 
    
    --------------------
    Update Methods
    --------------------
    
    */


    editDegreeHandler = (e) => {
        this.setState({
            editDegree: e.target.value
        })

    }

    editSpecHandler = (e) => {
        this.setState({
            editSpec: e.target.value
        })
    }

    editSpecDetailHandler = (e) => {
        this.setState({
            editSpecDetail: e.target.value
        })
    }

    editGradeHandler = (e) => {
        this.setState({
            editGrade: e.target.value
        })
    }

    editUniHandler = (e) => {
        this.setState({
            editUni: e.target.value
        })
    }

    editGradeYearHandler = (e) => {
        this.setState({
            editGradeYear: e.target.value
        })
    }



    handelEdit_1 = (e) => {

        this.setState({
            edit: true, rowEmpEdu: e.target.getAttribute("tableId"), editDegree: e.target.getAttribute('empDeg'), editSpec: e.target.getAttribute("empSpec"),
            editSpecDetail: e.target.getAttribute("empSpecDetail"), editGrade: e.target.getAttribute("empGrade"), editUni: e.target.getAttribute("empUni"),
            editGradeYear: e.target.getAttribute("empGradeYear")
        })
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
        // editGradeYear: ""
        let degree = `DEGREE = (SELECT DEGREE FROM education_degree WHERE DEGREE_ARABIC = "${this.state.editDegree}")`
        let spec = ` SPECIALITY = (SELECT SPECIALITY FROM dgree_speciality WHERE SPECIALITY_ARABIC = "${this.state.editSpec}")`
        let specDetail = `SPECIALITY_DETAIL = (SELECT SPECIALITY_DETAIL FROM dgree_speciality_detail WHERE SPECIALITY_DETAIL_ARABIC = "${this.state.editSpecDetail}")`
        let grade = `GRADUATION_GRADE = (SELECT GRADUATION_GRADE FROM graduation_grade WHERE GRADE_ARABIC = "${this.state.editGrade}")`
        let uni = `UNIVERSITY_SCHOOL = (SELECT UNIVERSITY_SCHOOL FROM university_school WHERE UNIVERSITY_SCHOOL_ARABIC = "${this.state.editUni}")`
        let gradYear = `GRADUATION_YEAR = ${this.state.editGradeYear}`
        let lastSentence = this.state.rowEmpEdu
        let data = [degree, spec, specDetail, grade, uni, gradYear, lastSentence]

        axios({
            method: "PUT",
            data: data,
            url: `http://localhost:5000/editempedu`,
            headers: { "Content-Type": "application/json" },
        }).then(data => {
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

    /* 
    
    --------------------
    Delete Methods
    --------------------
    
    */
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

    /* 
    
    --------------------
    Shared Methods
    --------------------
    
    */



    // End Of Methods


    render() {
        let grades = ["مقبول", "جيد", "جيد جدا", "جيد جدا مع مرتبة الشرف", "ممتاز", "امتياز مع مرتبة الشرف"]
        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <div>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ height: "100%", minHeight: 250, width: "50%", minWidth: "750px", overflow: "auto" }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                        <span style={{ position: "relative", right: 50 }}>إضافة مؤهل جديد</span> {this.state.edit ? <i style={{ fontSize: 15, position: "relative", left: 530 }} class="fas fa-times-circle"></i> : null}
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i> : null}
                                    </div>
                                    {this.state.showMsg ? this.props.msg === "تم إدخال التقييم بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.props.msg}</div> : this.props.msg === "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : this.props.msg === "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : null : null}
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                            <input ref="idadd" onChange={this.idInputHandlerForAdd} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الأسم : </label>
                                            <input ref="nameadd" onKeyDown={this.nameInputHandlerForAdd} id="nameinputadd" className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>
                                    {this.state.showNamesResults ?
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                            <select onClick={this.nameInputHandlerForAdd} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                                {this.props.empNameByName.map((name => (
                                                    <option>{name.NAME_ARABIC}</option>
                                                )))}
                                            </select>
                                        </div> : null}
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>المؤهل : </label>
                                            <select onChange={this.addEducationDegreeHandler} id="empapp" style={{ height: 30, width: "100%", minWidth: "215px" }}>
                                                <option>زمالة</option>
                                                <option>دكتوراه</option>
                                                <option>ماجستير</option>
                                                <option>دبلوم دراسات عليا</option>
                                                <option>ليسانس</option>
                                                <option>بكالوريوس</option>
                                                <option>دبلوم</option>
                                                <option>الشهادة الأهلية</option>
                                                <option>ثانوية</option>
                                                <option>إعدادية</option>
                                                <option>إبتدائية</option>
                                                <option>شهادة محو الأمية</option>
                                                <option>بدون مؤهل</option>
                                                <option>مؤهل فوق متوسط</option>
                                                <option>مؤهل متوسط</option>
                                                <option>شهادة</option>
                                                <option selected>اختر المؤهل</option>
                                            </select>
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>التخصص : </label>
                                            <input ref="spec" onChange={this.getSpecialityHandlerForAdd} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div></div>
                                        {this.state.showSpeciality ?
                                            <div style={{ width: "150px", marginLeft: 10 }}>
                                                <select onClick={this.specsOptionshandler} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                                    {this.state.specs.map((spec => (
                                                        <option>{spec.SPECIALITY_ARABIC}</option>
                                                    )))}
                                                </select>
                                            </div> : null}
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الشعبة : </label>
                                            <input ref="specDet" onChange={this.getSpecialityDetailsHandlerForAdd} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>التقدير : </label>
                                            <select onChange={this.addGradeHandler} id="empapp" style={{ height: 30, width: "100%", minWidth: "215px" }}>
                                                {grades.map(grade => (
                                                    <option>{grade}</option>
                                                ))}
                                                <option selected>
                                                    اختر التقدير
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        {this.state.showSpecialityDetails ?
                                            <div style={{ width: "200px", marginRight: 30 }}>
                                                <select onClick={this.specDetailsOptionshandler} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                                    {this.state.specsDetails.map((specDet => (
                                                        <option>{specDet.SPECIALITY_DETAIL_ARABIC}</option>
                                                    )))}
                                                </select>
                                            </div> : null}
                                        <div></div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>جهة التخرج : </label>
                                            <input ref="unes" onChange={this.getUneshcoolHandlerForAdd} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>سنة التخرج : </label>
                                            <input onChange={this.addGraduationYearHandler} className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        {this.state.showUneSchools ?
                                            <div style={{ width: "200px", marginRight: 30 }}>
                                                <select onClick={this.uneshcoolsOptionshandler} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                                    {this.state.unes.map((us => (
                                                        <option>{us.UNIVERSITY_SCHOOL_ARABIC}</option>
                                                    )))}
                                                </select>
                                            </div> : null}
                                        <div></div>
                                    </div>

                                    <button onClick={this.handleDataToSend} style={{ width: "92%", margin: "0 auto" }} type="button" class="btn btn-primary btn-block">إضافة مؤهل جديد</button>

                                    {this.state.confirmAdd ? <div style={{ width: "100%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة مؤهل جديد ؟ <button onClick={this.handelInsertNewEdu} style={{ float: "left" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.submitButtonHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i></div> : null}


                                </div>
                                {/* {this.state.addConfirmed ? <div style={{ width: "70%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة مؤهل جديد ؟ <button onClick={this.handelInsertNewTrans} style={{ position: "absolute", left: "17%", top: "80%" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15, position: "relative", top: "5%", left: "62%" }} class="fas fa-times-circle"></i></div> : null} */}
                            </div>
                        </div>
                    </div> : null}

                {this.state.showSpeciality ?
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                        <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                            {/* {this.props.specarabic.map((spec => (
                                <option>{spec.SPECIALITY_ARABIC}</option>
                            )))} */}
                        </select>
                    </div> : null}
                <div class="row">
                    <div class="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: "100%", minHeight: 150, width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                مؤهلات العاملين
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20, marginLeft: 0, width: "30%" }} class="input-group">
                                    <span>رقم الأداء : </span><input ref="empid" onKeyDown={this.idInputHandlerForSearch} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <div style={{ marginTop: 20, marginRight: 0, width: "70%" }} class="input-group">
                                    <span >الإسم : </span><input ref="name" onKeyUp={this.nameInputHandlerForSearch} style={{ background: "white", width: "80%", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                </div>
                                <button onClick={this.addButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة مؤهل جديد</button>
                            </div>
                            {this.state.showNamesResultsForSearch ?
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                    <select onClick={this.namesOptionshandlerForSearch} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple name="pets" id="pet-select">
                                        {this.props.empNameByName.map((name => (
                                            <option>{name.NAME_ARABIC}</option>
                                        )))}
                                    </select>
                                </div> : null}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div></div>
                                        {this.props.empEdu.length > 0 ? <h4 style={{ textAlign: "right", fontWeight: "bolder" }}>بيان بمؤهل السيد / {this.props.empEdu[0].NAME_ARABIC}</h4> : null}
                                        <div></div>
                                    </div>
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الدرجة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التخصص</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الشعبة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>التقدير</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة التخرج</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة التخرج</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empEdu.map((edu) => (
                                            <tbody>
                                                <tr id={edu.id}>
                                                    <td>
                                                        {!this.state.edit ? edu.DEGREE_ARABIC :
                                                            <select onChange={this.editDegreeHandler} id="empapp" style={{ height: 30, width: 120 }}>
                                                                <option>زمالة</option>
                                                                <option>دكتوراه</option>
                                                                <option>ماجستير</option>
                                                                <option>دبلوم دراسات عليا</option>
                                                                <option>ليسانس</option>
                                                                <option>بكالوريوس</option>
                                                                <option>دبلوم</option>
                                                                <option>الشهادة الأهلية</option>
                                                                <option>ثانوية</option>
                                                                <option>إعدادية</option>
                                                                <option>إبتدائية</option>
                                                                <option>شهادة محو الأمية</option>
                                                                <option>بدون مؤهل</option>
                                                                <option>مؤهل فوق متوسط</option>
                                                                <option>مؤهل متوسط</option>
                                                                <option>شهادة</option>
                                                                <option selected>اختر المؤهل</option>
                                                            </select>}
                                                    </td>
                                                    <td>{!this.state.edit ? edu.SPECIALITY_ARABIC :
                                                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                            <input onChange={this.getSpecialityHandlerForEdit} className="form-control" style={{ width: 120 }} type="text" />
                                                            <select onChange={this.editSpecHandler} style={{ width: 120, height: 30 }}>
                                                                {this.state.specsEdit.map((spec => (
                                                                    <option value={spec.SPECIALITY_ARABIC}>{spec.SPECIALITY_ARABIC}</option>
                                                                )))}
                                                                <option selected>اختر</option>

                                                            </select>
                                                        </div>
                                                    }</td>
                                                    <td>{!this.state.edit ? edu.SPECIALITY_DETAIL_ARABIC :
                                                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                            <input onChange={this.getSpecialityDetailsHandlerForEdit} className="form-control" style={{ width: 120 }} type="text" />
                                                            <select onChange={this.editSpecDetailHandler} id="brow501" style={{ width: 120, height: 30 }}>
                                                                {this.state.specsDetailsEdit.map((specDet => (
                                                                    <option>{specDet.SPECIALITY_DETAIL_ARABIC}</option>
                                                                )))}
                                                                <option selected>اختر</option>

                                                            </select>
                                                        </div>

                                                    }</td>
                                                    <td>{!this.state.edit ? edu.GRADE_ARABIC :
                                                        <select onChange={this.editGradeHandler} id="empapp" style={{ height: 30, width: 120 }}>
                                                            {grades.map(grade => (
                                                                <option>{grade}</option>
                                                            ))}
                                                            <option selected>
                                                                اختر التقدير
                                                            </option>
                                                        </select>
                                                    }</td>
                                                    <td>{!this.state.edit ? edu.UNIVERSITY_SCHOOL_ARABIC :
                                                        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                                                            <input onChange={this.getUneshcoolHandlerForEdit} className="form-control" style={{ width: 120 }} type="text" />
                                                            <select onChange={this.editUniHandler} id="brow501" style={{ width: 120, height: 30 }}>
                                                                {this.state.unesEdit.map((us => (
                                                                    <option>{us.UNIVERSITY_SCHOOL_ARABIC}</option>
                                                                )))}
                                                                <option selected>اختر</option>
                                                            </select>
                                                        </div>
                                                    }</td>
                                                    <td>{!this.state.edit ? edu.GRADUATION_YEAR : <input onChange={this.editGradeYearHandler} className="form-control" style={{ width: 80 }} type="number" />}</td>
                                                    <td ><i tableId={edu.id} onClick={this.state.edit ? this.handelEdit_2 : this.handelEdit_1} empDeg={edu.DEGREE_ARABIC} empSpec={edu.SPECIALITY_ARABIC} empSpecDetail={edu.SPECIALITY_DETAIL_ARABIC} empGrade={edu.GRADE_ARABIC} empUni={edu.UNIVERSITY_SCHOOL_ARABIC} empGradeYear={edu.GRADUATION_YEAR} class="fas fa-edit"></i></td>
                                                    <td><i tableId={edu.id} onClick={this.state.edit ? this.closeEditSectionHandler : null} class="fas fa-backspace"></i></td>

                                                </tr>
                                            </tbody>))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}

// const useStyles = (theme) => ({
//     styledLine: {
//         color: "red"
//     }
// });


const mapStateToProps = (state) => {
    return {
        empEdu: state.trans.empEdu,
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        cates: state.posts.cates,
        specarabic: state.posts.specarabic,
        uneshcool: state.posts.uneshcool
    };
};
export default connect(mapStateToProps, {
    getEmpEdu, getEmpName, getEmpNameByName, InsertNewEdu
})((OutsourceEmpEduDeg));