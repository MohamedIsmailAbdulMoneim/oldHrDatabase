import React from "react";
import {

    getEmpName, getEmpNameByName, globalNameOrId

} from "../../actions/Actions";
import { newAppraisal, getEmpExp, newEmpExp, deleteEmpExperience, editeEmpExperience } from "../../actions/TransActions"
import { connect } from "react-redux";
import moment from 'moment';
import 'moment-timezone';

class EmpExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toe: [],
            poe: []
            , job: [],
            from: []
            , to: [],
            calcfrom: [],
            calcto: []
            , length: 0, exp: [], empNameAdd: "", empIdAdd: "", empNameSearch: "", empIdSearch: "", expTypeForSearch: ""
            , finalData: [], showFamilyResult: true, editExpTyp: "", editPlaceOfExp: "", editJobOfExp: "", editFromOfExp: "", editToOfExp: "",
            confirmAdd: false, showMsg: false, errorAdd: false,
            add: false, edit: false, delete: false,
            empid: null, empname: null, catname: null, catid: null, showNamesResults: false, rowExp: "", searchQuery: "", nameOrId: "", NATID: ""
        };
    }

    toeHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { expType: e.target.options[e.target.options.selectedIndex].getAttribute('expType'), key: index }
        console.log(newArr);
        this.setState({
            [selectedArr]: newArr
        })


    }

    poeHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            [selectedArr]: newArr
        })


    }

    jobHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            [selectedArr]: newArr
        })
    }

    fromHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            [selectedArr]: newArr
        })


    }

    toHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            [selectedArr]: newArr
        })
    }

    calcFromHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            [selectedArr]: newArr
        })
    }

    calcToHandler = (e) => {
        e.preventDefault()
        var selectedArr = e.target.getAttribute('uniqueClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state[selectedArr].slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            [selectedArr]: newArr
        })
    }

    addExp = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                length: prevState.length + 1,
                toe: [...this.state.toe, " "],
                poe: [...this.state.poe, " "],
                job: [...this.state.job, " "],
                from: [...this.state.from, " "],
                to: [...this.state.to, " "],
                calcfrom: [...this.state.calcfrom, ""],
                calcsto: [...this.state.calcto, ""]
            }
        })
    }


    deleteExp = (e) => {
        let selectedArr = e.target.getAttribute('uClass')
        let nodes = document.getElementsByClassName(selectedArr);
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArrOfToe = [...this.state.toe]
        let newArrOfPoe = [...this.state.poe]
        let newArrOfJob = [...this.state.job]
        let newArrOfFrom = [...this.state.from]
        let newArrOfTo = [...this.state.to]
        let newArrOfCalcFrom = [...this.state.calcfrom]
        let newArrOfCalcTo = [...this.state.calcto]
        if (index !== -1) {
            newArrOfToe.splice(index, 1)
            newArrOfPoe.splice(index, 1)
            newArrOfJob.splice(index, 1)
            newArrOfFrom.splice(index, 1)
            newArrOfTo.splice(index, 1)
            newArrOfCalcFrom.splice(index, 1)
            newArrOfCalcTo.splice(index, 1)
        }
        this.setState(prevState => {
            return {
                length: prevState.length - 1,
                toe: newArrOfToe,
                poe: newArrOfPoe,
                job: newArrOfJob,
                from: newArrOfFrom,
                to: newArrOfTo,
                calcfrom: newArrOfCalcFrom,
                calcto: newArrOfCalcTo

            }
        })
    }

    expHandler = (exps) => {
        let exp = []
        for (let i = 0; i <= exps; i++) {
            if (i > 0) {
                exp.push(
                    <div div className="form-group" controlId="formBasicEmail" >
                        {this.state.add ? <div style={{ height: 50 }}> <i uClass={'Exp'} uIndex={4} onClick={this.deleteExp} style={{ fontSize: 15, float: "right", marginRight: 20 }} class="fas fa-times-circle Exp"></i></div> : null}
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ minWidth: 315, width: "100%", textAlign: "right" }}>نوع الخبرة : </label>
                                <select style={{ minWidth: 315, height: 34, width: "100%", borderRadius: 5 }} uniqueClass={'toe'} className="toe" onChange={this.toeHandler}>
                                    <option expType="1">
                                        خدمة عسكرية
                                    </option>
                                    <option expType="4">
                                        خبرة داخل القطاع
                                    </option>
                                    <option expType="3">
                                        خبرة خارج القطاع
                                    </option>
                                    <option selected>
                                        اختر ...
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>جهة الخبرة : </label>
                                <input onChange={this.poeHandler} uniqueClass={'poe'} ref="nameinput" className="form-control poe" style={{ width: "100%", minWidth: "250px" }} type="text" required />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>الوظيفة : </label>
                                <input onChange={this.jobHandler} uniqueClass={'job'} ref="nameinput" className="form-control job" style={{ width: "100%", minWidth: "250px" }} type="text" />
                            </div>
                        </div>
                        <h4 style={{ textAlign: "right", marginRight: 10 }}>المدة الفعلية</h4>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>من : </label>
                                <input onChange={this.fromHandler} uniqueClass={'from'} ref="nameinput" className="form-control from" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>إلى : </label>
                                <input onChange={this.toHandler} uniqueClass={'to'} ref="nameinput" className="form-control to" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                        </div>
                        <h4 style={{ textAlign: "right", marginRight: 10 }}>المدة المحتسبة</h4>
                        <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>من : </label>
                                <input onChange={this.calcFromHandler} uniqueClass={'calcfrom'} ref="nameinput" className="form-control calcfrom" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                            <div className="form-group" controlId="formBasicEmail">
                                <label style={{ width: "100%", textAlign: "right" }}>إلى : </label>
                                <input onChange={this.calcToHandler} uniqueClass={'calcto'} ref="nameinput" className="form-control calcto" style={{ width: "100%", minWidth: "250px" }} type="date" />
                            </div>
                        </div>
                    </div >)
            }
        }
        return exp;
    };

    handleArrToSend = (e) => {
        var state = this.state
        var arrays = state.toe.concat(state.poe, state.job, state.from, state.to, state.calcfrom, state.calcto)
        var emptyInputs = arrays.find(i => i.length <= 1) || null
        let arr = []
        let nameOrId;
        if (this.state.empNameAdd) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empNameAdd}"))`
        } else if (this.state.empIdAdd) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empIdAdd}))`
        }
        this.setState({ nameOrId })
        if (emptyInputs !== undefined) {
        } else if (emptyInputs === undefined && (this.state.empNameAdd || this.state.empIdAdd)) {
            let militerExp = arrays.filter(el => el.expType === 1)
            if (militerExp.length > 0) {
                let militeIndex;
                let addTypeToIMiliterndex;
                let newAddedMiliter = [];
                let listOfKeys = [];
                militerExp.forEach(exp => {
                    listOfKeys.push(exp.key)
                    militeIndex = exp.key
                    addTypeToIMiliterndex = arrays.filter(el => el.key === militeIndex)
                    newAddedMiliter = [...newAddedMiliter,...addTypeToIMiliterndex.map(el => ({expType: "1", ...el}))]
                })
                console.log(newAddedMiliter);
                let i = 0
                console.log(listOfKeys);
                while (i < listOfKeys.length) {
                    let keys = listOfKeys[i]
                    let smallArr = []
                    var arrloop = newAddedMiliter.filter(el => el.key === keys)
                    console.log(arrloop);
                    smallArr.push(`("${arrloop[1].value}"`)
                    smallArr.push(`"${arrloop[2].value}"`)
                    smallArr.push(`"${arrloop[3].value}"`)
                    smallArr.push(`"${arrloop[4].value}"`)
                    smallArr.push(arrloop.length > 5 ? `"${arrloop[5].value}"` : "null")
                    smallArr.push(arrloop.length > 6 ? `"${arrloop[6].value}"` : "null")
                    smallArr.push(arrloop[0].expType)
                    smallArr.push(`"True"`)
                    smallArr.push(nameOrId)
                    arr.push(smallArr)
                    i++
                }
            }
            let innerExp = arrays.filter(el => el.expType === 4)
            if (innerExp.length > 0) {
                let innerIndex;
                let addTypeToInnerndex;
                let newAddedInner = [];
                let listOfKeys = [];
                innerExp.forEach(exp => {
                    listOfKeys.push(exp.key)
                    innerIndex = exp.key
                    addTypeToInnerndex = arrays.filter(el => el.key === innerIndex)
                    newAddedInner = [...newAddedInner,...addTypeToInnerndex.map(el => ({expType: "4", ...el}))]

                })
                let i = 0
                while (i < listOfKeys.length) {
                    let keys = listOfKeys[i]
                    let smallArr = []
                    var arrloop_3 = newAddedInner.filter(el => el.key === keys)
                    smallArr.push(`("${arrloop_3[1].value}"`)
                    smallArr.push(`"${arrloop_3[2].value}"`)
                    smallArr.push(`"${arrloop_3[3].value}"`)
                    smallArr.push(`"${arrloop_3[4].value}"`)
                    smallArr.push(`"${arrloop_3[5].value}"`)
                    smallArr.push(`"${arrloop_3[6].value}"`)
                    smallArr.push(arrloop_3[0].expType)
                    smallArr.push(`"True"`)
                    smallArr.push(nameOrId)
                    arr.push(smallArr)
                    i++
                }
                console.log(arr);

            }

            let outerExp = arrays.filter(el => el.expType === 3)
            if (outerExp.length > 0) {
                let outerIndex;
                let addTypeToOuterndex;
                let newAddedOuter = [];
                let listOfKeys = [];
                outerExp.forEach(exp=> {
                    listOfKeys.push(exp.key)
                    outerIndex = exp.key
                    addTypeToOuterndex = arrays.filter(el => el.key === outerIndex)
                    newAddedOuter = [...newAddedOuter,...addTypeToOuterndex.map(el => ({expType: "3", ...el}))]

                })
                let i = 0
                while (i < listOfKeys.length) {
                    let keys = listOfKeys[i]
                    let smallArr = []
                    var arrloop_2 = newAddedOuter.filter(el => el.key === keys)
                    console.log(arrloop);
                    smallArr.push(`("${arrloop_2[1].value}"`)
                    smallArr.push(`"${arrloop_2[2].value}"`)
                    smallArr.push(`"${arrloop_2[3].value}"`)
                    smallArr.push(`"${arrloop_2[4].value}"`)
                    smallArr.push(`"${arrloop_2[5].value}"`)
                    smallArr.push(`"${arrloop_2[6].value}"`)
                    smallArr.push(arrloop_2[0].expType)
                    smallArr.push(`"True"`)
                    smallArr.push(nameOrId)
                    arr.push(smallArr)
                    i++
                }
            }
            console.log(arr);
            this.setState({
                confirmAdd: true, finalData: arr
            })
        }
    }

    submitButtonHandler = (e) => {
        if (!this.state.confirmAdd) {
            this.setState({ confirmAdd: true })
        } else if (this.state.confirmAdd) {
            this.setState({ confirmAdd: false })
        }
    }

    addButtonClickHandeler = (e) => {
        this.setState({ add: true })
    }


    idInputHandlerForAdd = (e) => {
        this.setState({ empIdAdd: e.target.value })
        this.refs.nameAdd.value = ''

    }

    nameInputHandlerForAdd = (e) => {
        this.setState({ empNameAdd: e.target.value })
        this.refs.idAdd.value = ''
    }

    namesOptionshandlerForAdd = (e) => {
        this.setState({
            empnameForAdd: e.target.value, empidForAdd: null
        })
        if (this.refs.nameadd) this.refs.nameadd.value = e.target.value
    }

    nameInputHandlerForSearch = (e) => {
        this.setState({ showNamesResultsForSearch: true })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            // this.props.getEmpExp("", e.target.value)
        }
    }



    idInputHandlerForSearch = (e) => {
        this.refs.empname.value = ''
        if(e.key === "Enter") this.props.globalNameOrId(`${e.target.name} = ${e.target.value}`)

        this.props.getEmpExp(`employee_experince.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${e.target.value})`)
        this.setState({ empIdSearch: e.target.value })
    }

    namesOptionshandlerForSearch = (e) => {
        // this.refs.name.value = e.target.value
        this.props.globalNameOrId(`${e.target.getAttribute('name')} = "${e.target.value}"`)
        this.props.getEmpExp(`employee_experince.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${e.target.value}")`)
        this.setState({ empNameSearch: e.target.value })
    }

    expTypeForSearchHandler = (e) => {
        this.setState({
            expTypeForSearch: e.target.value
        })
        if (e.target.value === "اختر") {
            this.setState({
                expTypeForSearch: ""
            })
        }
    }

    handelSearch = (e) => {
        let nameOrId = ''
        if (this.state.empNameSearch.length > 0) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empNameSearch}")`
        } else if (this.state.empIdSearch.length > 0) {
            nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empIdSearch})`
        }
        let data = `${nameOrId.length > 0 ? `employee_experince.NATIONAL_ID_CARD_NO = ${nameOrId}` : ''}
        ${(nameOrId.length > 0 && this.state.expTypeForSearch.length > 0) ? `AND` : ''}
        ${this.state.expTypeForSearch.length > 0 ? `exp_type.EXP_TYP_CODE = (SELECT EXP_TYP_CODE FROM exp_type WHERE EXP_TYP_NAME = "${this.state.expTypeForSearch}")` : ''}
        `
        this.setState({
            searchQuery: data
        })
        this.props.getEmpExp(data)

    }

    handleExpTime = (startDate, endDate) => {

        const start = moment(startDate);
        const end = moment(endDate);
        const diff = end.diff(start);
        const diffDuration = moment.duration(diff);
        return diffDuration;
    }

    handleNewExp = (e) => {
        if (this.state.searchQuery.length < 1) {
            console.log(this.props.msg);
            this.props.newEmpExp({ insertedData: this.state.finalData, getData: `NATIONAL_ID_CARD_NO = ${this.state.nameOrId.slice(0, -1)}` })
        } else {
            this.props.newEmpExp({ insertedData: this.state.finalData, getData: this.state.searchQuery })
        }
        this.setState({
            confirmAdd: false, showMsg: true
        })
    }

    /* ______________________________ */

    editPlaceOfExpHandler = (e) => {
        this.setState({ editPlaceOfExp: e.target.value })
    }

    editJobOfExpHandler = (e) => {
        this.setState({ editJobOfExp: e.target.value })
    }

    editFromOfExpHandler = (e) => {
        this.setState({ editFromOfExp: e.target.value })
    }

    editToOfExpHandler = (e) => {
        this.setState({ editToOfExp: e.target.value })
    }

    handelEdit_1 = (e) => {
        this.setState({
            edit: true, rowExp: e.target.getAttribute("tableId"), editExpTyp: e.target.getAttribute("expType")
            , editPlaceOfExp: e.target.getAttribute("placeName"), editJobOfExp: e.target.getAttribute("jobName"),
            editFromOfExp: e.target.getAttribute("startDate"), editToOfExp: e.target.getAttribute("endDate"),
            NATID: e.target.getAttribute("natIdCard")
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

    handelEdit_2 = (e) => {
        e.preventDefault()
        let expType = `EXP_TYP_CODE = ${this.state.editExpTyp}`
        let placeOfExp = `PLACE_NAME = "${this.state.editPlaceOfExp}"`
        let jobOfExp = `JOB_NAME = "${this.state.editJobOfExp}"`
        let fromOfExparName = `START_DATE = "${this.state.editFromOfExp}"`
        let toOfExp = `END_DATE = "${this.state.editToOfExp}"`
        let lastSentence = this.state.rowExp

        let data = [expType, placeOfExp, jobOfExp, fromOfExparName, toOfExp, lastSentence]
        let nat = this.state.NATID
        this.props.editeEmpExperience({ data, nat })
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
        let data = [e.target.getAttribute("tableId"), e.target.getAttribute("expType"), e.target.getAttribute("natIdCard")]
        this.props.deleteEmpExperience(data)
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




    /* ___________________________________ */

    render() {
        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "55%",
            height: 250,
            backgroundColor: "#fff",
            color: "#212529",
            fontSize: "2rem",
            lineHeight: 1.5,
            fontWeight: "bold",
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            appearance: "none",
            transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"

        }


        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <div>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <span style={{ position: "relative", right: 50 }}>إضافة بيانات جديدة</span>
                                <div style={{ height: "100%", minHeight: 150, width: "70%", minWidth: "450", overflow: "auto" }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i> : null}
                                        {/* <input style={{ position: "relative", right: 250, fontSize: 20 }} type="submit" class="btn btn-primary" onSubmit={this.handelInsertNewTrans} value="Add" /> */}
                                        <button style={{ height: "10%", minHeight: "20px", float: "left", marginRight: 7, background: "#062f07" }} onClick={this.addExp} className="btn btn-primary"> <span style={{ marginLeft: 7 }}>إضافة خبرة جديدة</span><i class="fas fa-user-plus"></i> </button>

                                    </div>
                                    {this.state.showMsg ? this.props.msg === "تم إدخال البيانات بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.props.msg}</div> : this.props.msg === "تم إدخال هذه الخبرة من قبل" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : this.props.msg === "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : null : null}

                                    <div style={{ display: "flex", justifyContent: "space-around" }}>

                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                            <input onChange={this.idInputHandlerForAdd} ref="idAdd" className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                        <div className="form-group" controlId="formBasicEmail">
                                            <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                            <input onChange={this.nameInputHandlerForAdd} ref="nameAdd" id="nameinputadd" className="form-control" style={{ width: "100%", minWidth: "250px" }} type="text" />
                                        </div>
                                    </div>
                                    {this.state.length === 0 ? null : this.expHandler(this.state.length)}

                                    <button onClick={this.handleArrToSend} style={{ marginLeft: 62, marginBottom: 15, float: "left", display: "block" }} type="button" class="btn btn-primary">إضافة بيانات جديدة</button>
                                    {this.state.confirmAdd ? <div style={{ width: "100%", marginTop: 50 }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة بيانات جديدة ؟ <button onClick={this.handleNewExp} style={{ float: "left" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.submitButtonHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i></div> : null}

                                </div>
                            </div>
                        </div>
                    </div> : null
                }
                {
                    this.state.showNamesResults ?
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                            <select onClick={this.namesOptionshandler} style={styles} multiple name="pets" id="pet-select">
                                {this.props.empNameByName.map((name => (
                                    <option>{name.NAME_ARABIC}</option>
                                )))}
                            </select>
                        </div> : null
                }

                <div class="row">
                    <div class="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                        <div style={{ height: "100%", width: 600 }} class="panel panel-default">

                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                <span>خبرات العاملين</span>
                                <button onClick={this.addButtonClickHandeler} style={{ float: "left" }} type="button" class="btn btn-primary">إضافة بيانات جديدة</button>

                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" onKeyUp={this.idInputHandlerForSearch} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="EMPLOYEE_ID" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input id="name" ref="empname" className="form-control" onChange={this.nameInputHandlerForSearch} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text"  />
                                    </div>
                                </div>
                            </div>
                            {
                                this.state.showNamesResultsForSearch ?
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div></div>
                                        <select onClick={this.namesOptionshandlerForSearch} style={{ marginTop: 20, marginRight: 15, marginBottom: 5, width: "40%", background: "transparent", border: "none" }} multiple >
                                            {this.props.empNameByName.map((name => (
                                                <option name="NAME_ARABIC">{name.NAME_ARABIC}</option>
                                            )))}
                                        </select>
                                        <div></div>
                                    </div>
                                    : null
                            }
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>نوع الخبرة : </label>
                                        <select onChange={this.expTypeForSearchHandler} id="empapp" style={{ height: 30, width: "100%", minWidth: "215px" }}>
                                            <option>خبرة داخل القطاع</option>
                                            <option>خبرة خارج القطاع</option>
                                            <option>الخدمة العسكرية</option>
                                            <option selected>اختر</option>
                                        </select>
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}></label>
                                        <button onClick={this.handelSearch} type="button" style={{ marginRight: 30, marginTop: 6 }} >
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    {this.props.empexp.length >= 1 ? <h1>بيان بخبرة السيد  : {this.props.empexp.length >= 1 ? this.props.empexp[0].NAME_ARABIC : null} </h1> : null}
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead style={{ height: 2 }}>
                                            <tr style={{ height: 2 }}>
                                                <th rowspan="2" style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", padding: 0, margin: 0 }}><h3 style={{ marginBottom: 30 }}>نوع الخبرة</h3></th>
                                                <th rowspan="2" style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", padding: 0, margin: 0 }}><h3 style={{ marginBottom: 30 }}>جهة الخبرة</h3></th>
                                                <th rowspan="2" style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", padding: 0, margin: 0 }}><h3 style={{ marginBottom: 30 }}>الوظيفة</h3></th>
                                                <th rowspan="2" style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", padding: 0, margin: 0 }}><h3 style={{ marginBottom: 30 }}>من</h3></th>
                                                <th rowspan="2" style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", padding: 0, margin: 0 }}><h3 style={{ marginBottom: 30 }}>إلى</h3></th>
                                                <th colspan="3" style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", padding: 0, margin: 0 }}><h3>المدة الفعلية</h3></th>
                                                <th colspan="3" style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", padding: 0, margin: 0 }}><h3>المدة المحتسبة</h3></th>
                                                <th rowspan="2"><h3 style={{ marginBottom: 30 }}>تعديل</h3></th>
                                                <th rowspan="2"><h3 style={{ marginBottom: 30 }}>حذف</h3></th>
                                            </tr>
                                            <tr>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>يوم</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>شهر</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>يوم</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>شهر</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>سنة</td>
                                            </tr>
                                        </thead>

                                        {this.props.empexp.length >= 1 ? this.props.empexp.map(emp => (
                                            <tbody>
                                                <tr id={emp.id}>
                                                    <td>{this.state.edit && this.state.rowExp === emp.id ? <input onChange={this.editPlaceOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="text" placeholder={emp.EXP_TYP_NAME} /> : emp.EXP_TYP_NAME}</td>
                                                    <td>{this.state.edit && this.state.rowExp === emp.id ? <input onChange={this.editPlaceOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="text" placeholder={emp.PLACE_NAME} /> : emp.PLACE_NAME}</td>
                                                    <td>{this.state.edit && this.state.rowExp === emp.id ? <input onChange={this.editJobOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="text" placeholder={emp.JOB_NAME} /> : emp.JOB_NAME}</td>
                                                    <td>{this.state.edit && this.state.rowExp === emp.id ? <input onChange={this.editFromOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="date" placeholder={emp.START_DATE} /> : emp.START_DATE}</td>
                                                    <td>{this.state.edit && this.state.rowExp === emp.id ? <input onChange={this.editToOfExpHandler} className="form-control job" style={{ width: "100%", minWidth: "90px" }} type="date" placeholder={emp.END_DATE} /> : emp.END_DATE}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).days()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).months()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).years()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).days()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).months()}</td>
                                                    <td>{this.handleExpTime(emp.START_DATE, emp.END_DATE).years()}</td>
                                                    <td><i onClick={this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} style={{ fontSize: 20 }} tableId={emp.id} expType={emp.EXP_TYP_CODE} natIdCard={emp.NATIONAL_ID_CARD_NO} placeName={emp.PLACE_NAME} jobName={emp.JOB_NAME} startDate={emp.START_DATE} endDate={emp.END_DATE} class="fas fa-edit"></i></td>
                                                    <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={emp.id} expType={emp.EXP_TYP_CODE} natIdCard={emp.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                </tr>
                                            </tbody>
                                        ))
                                            :
                                            <tbody>
                                                <tr>
                                                    <td colspan="9">لاتوجد بيانات</td>
                                                </tr>
                                            </tbody>
                                        }

                                    </table>
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
        result: state.trans.result,
        msg: state.trans.msg,
        empexp: state.trans.empexp
    };
};
export default connect(mapStateToProps, {
    getEmpName, getEmpNameByName, newAppraisal, getEmpExp, globalNameOrId ,newEmpExp, deleteEmpExperience, editeEmpExperience
})(EmpExperience);