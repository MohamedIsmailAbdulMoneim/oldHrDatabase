import React from "react";
import {
    getEmpName, getEmpNameByName, globalNameOrId
} from "../../actions/Actions";

import {
    submitNewFamily, getEmpFamily, deleteEmpFamily, updateEmpFamily
} from "../../actions/TransActions"
import { connect } from "react-redux";
import axios from "axios";

class EmpFamily extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalData: [], messege: "", addMaritalType: [{ value: " ", type: null, key: null }],
            addMaritalName: [{ value: " ", key: null }], addMaritalNId: [{ value: " ", key: null }],
            addMaritalBod: [{ value: " ", key: null }], addMaritalWorkStatus: [{ value: " ", key: null }],
            addMarital: false, editMaritalType: null, editMaritalName: null, editNid: null, editMaritalNid: null, editMaritalBod: null,
            maritalLength: 0, showFamilyResult: true, add: false, edit: false, empid: null, delete: false,
            empname: null, showMaritalstate: false, showNamesResultsForSearch: false, showNamesResultsForAdd: false,
            empnameForAdd: null, empidForAdd: null, showMsg: false, rowFam: null, addConfirmed: false, updated: false

        };
    }

    idInputHandlerForSearch = (e) => {
        this.refs.name.value = ''
        this.setState({ showFamilyResult: false })
        if (e.key === 'Enter') {
            this.props.globalNameOrId(`${e.target.name} = ${e.target.value}`)
            this.props.getEmpName(e.target.value)
            this.props.getEmpFamily(e.target.value, "")
            this.setState({ edit: false, empid: e.target.value, showMaritalstate: true })
        }
    }

    idInputHandlerForAdd = (e) => {
        this.refs.nameadd.value = ''
        this.setState({ empidForAdd: e.target.value, empnameForAdd: null })
        if (e.target.value.length === 0) {
            this.setState({ empidForAdd: null })
        }
    }

    nameInputHandlerForSearch = (e) => {
        this.setState({ showNamesResultsForSearch: true, showFamilyResult: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpFamily("", e.target.value)
            this.setState({ showFamilyResult: true, showMaritalstate: true })
        }
    }

    nameInputHandlerForAdd = (e) => {
        this.setState({ showNamesResultsForAdd: true, empidForAdd: null, empnameForAdd: e.target.value })
        this.props.getEmpNameByName(e.target.value)
        if (e.target.value.length === 0) {
            this.setState({ empnameForAdd: null })
        }
        this.refs.idadd.value = ''
    }

    namesOptionshandlerForSearch = (e) => {
        this.refs.name.value = e.target.value
        this.props.globalNameOrId(`${e.target.getAttribute('name')} = "${e.target.value}"`)
        this.props.getEmpFamily("", e.target.value)
        this.setState({ showFamilyResult: true, showMaritalstate: true })
    }
    namesOptionshandlerForAdd = (e) => {
        this.setState({
            empnameForAdd: e.target.value, empidForAdd: null
        })
        if (this.refs.nameadd) this.refs.nameadd.value = e.target.value
    }

    addMaritalTypeHandler = (e) => {
        e.preventDefault()
        let nodes = document.getElementsByClassName("maritaltype");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addMaritalType.slice()
        let type;
        if (e.target.value === "الزوجة") {
            type = 1
        } else if (e.target.value === "الأبن") {
            type = 2
        }
        newArr[index] = { value: e.target.value, type, key: index }
        this.setState({
            addMaritalType: newArr
        })

    }

    addMaritalNameHandler = (e) => {
        e.preventDefault()
        let nodes = document.getElementsByClassName("maritalname");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addMaritalName.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addMaritalName: newArr
        })

    }

    addMaritalNIdHandler = (e) => {
        let nodes = document.getElementsByClassName("maritalnid");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addMaritalNId.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addMaritalNId: newArr
        })
    }

    addMaritalBodHandler = (e) => {
        let nodes = document.getElementsByClassName("maritalbod");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addMaritalBod.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addMaritalBod: newArr
        })
    }

    addMaritalWorkStatus = (e) => {
        let nodes = document.getElementsByClassName("maritalws");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        // let insertedVal = e.target.value === "اختر ..." ? " " : e.target.value
        let newArr = this.state.addMaritalWorkStatus.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addMaritalWorkStatus: newArr
        })
    }


    tabhandler = (e) => {
        let nodes = document.getElementsByClassName("maritalws");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        if (e.key === 'Tab' && index === nodes.length - 1) {
            this.setState(prevState => {
                return {
                    maritalLength: prevState.maritalLength + 1,
                    addMaritalTyp: [...this.state.addMaritalType, { value: " ", type: null, key: null }],
                    addMaritalName: [...this.state.addMaritalName, { value: " ", key: null }],
                    addMaritalNId: [...this.state.addMaritalNId, { value: " ", key: null }],
                    addMaritalBod: [...this.state.addMaritalBod, { value: " ", key: null }],
                    addMaritalWorkStatus: [...this.state.addMaritalWorkStatus, { value: " ", key: null }],
                }
            })
        }
    }

    addMaritaldHandler = (e) => {
        e.preventDefault()
        this.setState(prevState => {
            return {
                maritalLength: prevState.maritalLength + 1,
                addMaritalType: [...this.state.addMaritalType, { value: " ", type: null, key: null }],
                addMaritalName: [...this.state.addMaritalName, { value: " ", key: null }],
                addMaritalNId: [...this.state.addMaritalNId, { value: " ", key: null }],
                addMaritalBod: [...this.state.addMaritalBod, { value: " ", key: null }],
                addMaritalWorkStatus: [...this.state.addMaritalWorkStatus, { value: " ", key: null }],
            }
        })
    }

    deleteMaritaldHandler = (e) => {
        e.preventDefault()
        let newArrOfMType = [...this.state.addMaritalType]
        let newArrOfMName = [...this.state.addMaritalName]
        let newArrOfMNid = [...this.state.addMaritalNId]
        let newArrOfMBod = [...this.state.addMaritalBod]
        let newArrOfMworkState = [...this.state.addMaritalWorkStatus]
        newArrOfMType.pop()
        newArrOfMName.pop()
        newArrOfMNid.pop()
        newArrOfMBod.pop()
        newArrOfMworkState.pop()
        if (this.state.maritalLength !== 0) {
            this.setState(prevState => {
                return {
                    maritalLength: prevState.maritalLength - 1,
                    addMaritalType: newArrOfMType,
                    addMaritalName: newArrOfMName,
                    addMaritalNId: newArrOfMNid,
                    addMaritalBod: newArrOfMBod,
                    addMaritalWorkStatus: newArrOfMworkState
                }
            })
        }
    }

    handleArrToSend = (e) => {
        console.log('hit');
        e.preventDefault()
        var state = this.state
        this.setState({
            showMsg: true
        })
        var arrays = state.addMaritalType.concat(state.addMaritalName, state.addMaritalNId, state.addMaritalBod, state.addMaritalWorkStatus)
        var emptyInputs = arrays.find(i => i.value.length <= 1) || null
        let arr = []
        if (emptyInputs || state.addMaritalNId[0].value.length !== 14) {
            console.log("البيانات غير كاملة");
            if (emptyInputs) {
                this.setState({
                    messege: { msg: "البيانات غير كاملة" }
                })
            } else if (state.addMaritalNId[0].value.length !== 14) {
                console.log("رقم البطاقة غير صحيح");
                this.setState({
                    messege: { msg: "رقم البطاقة غير صحيح" }
                })
            }
        } else if (!emptyInputs && (this.state.empnameForAdd || this.state.empidForAdd)) {
            let i;
            i = arrays.length / 5
            while (i > 0) {
                let k = i
                let smallArr = []
                var arrloop = arrays.filter(el => el.key === k - 1)
                let nameOrId;
                if (this.state.empnameForAdd) {
                    nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empnameForAdd}")`
                } else if (this.state.empidForAdd) {
                    nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empidForAdd})`
                }
                smallArr.push(nameOrId)
                smallArr.push(`"true"`)
                smallArr.push(arrloop[0].type)
                smallArr.push(`"${arrloop[1].value}"`)
                smallArr.push(arrloop[2].value)
                smallArr.push(`"${arrloop[3].value}"`)
                smallArr.push(`"${arrloop[4].value}"`)
                smallArr.push("30)")

                arr.push(smallArr)
                i--
            }

            this.setState({
                finalData: arr,
                addConfirmed: true
            })


        }

    }
    martialRender = (maritals) => {

        let trnas = []
        for (let i = 0; i <= maritals; i++) {
            if (i > 0) {
                trnas.push(
                    <tr>
                        <td>
                            <select onChange={this.addMaritalTypeHandler} className="maritaltype add" required ref="selected">
                                <option selected>الزوجة</option>
                                <option selected>الأبن</option>
                                <option selected>اختر ...</option>
                            </select>
                        </td>
                        <td>
                            <input required className="maritalname add" onChange={this.addMaritalNameHandler} type="text" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                        </td>
                        <td>
                            <input required className="maritalnid add" onChange={this.addMaritalNIdHandler} type="text" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                        </td>
                        <td>
                            <input required className="maritalbod add" onChange={this.addMaritalBodHandler} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                        </td>
                        <td>
                            <select onKeyDown={this.tabhandler} onChange={this.addMaritalWorkStatus} className="maritalws add" required ref="selected" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }}>
                                <option selected>يعمل</option>
                                <option selected>لا يعمل</option>
                                <option selected>اختر ...</option>
                            </select>
                        </td>
                    </tr>
                )
            }
        }
        return trnas;
    };

    closeAddSectionHandler = (e) => {
        this.setState({ add: false })
    }

    closeEditSectionHandler = (e) => {
        this.setState({ edit: false })
    }

    addButtonClickHandeler = () => {
        this.setState({ add: true })
        this.setState({
            empid: null, empname: null, transdate: null, catname: null,
            jdname: null, supboxname: null, gname: null, jasi: null, indname: null, shoshowStructWAddw: false, showStruct: false
        })
    }
    submitNewFamily = (e) => {
        e.preventDefault()
        this.props.submitNewFamily(this.state.finalData).then((data) => {
            this.setState({
                messege: this.props.msg,
                showMsg: true,
                addConfirmed: false,
                addMaritalType: [{ value: " ", type: null, key: null }],
                addMaritalName: [{ value: " ", key: null }],
                addMaritalNId: [{ value: " ", key: null }],
                addMaritalBod: [{ value: " ", key: null }],
                addMaritalWorkStatus: [{ value: " ", key: null }]
            })
            let addInputs = document.getElementsByClassName("add")
            for (let i = 0; i < addInputs.length; i++) {
                addInputs[i].value = ""
            }
        }


        )
    }

    closeAddConfirmHandler = (e) => {
        this.setState({
            addConfirmed: false
        })
    }

    handelEdit_1 = (e) => {
        this.setState({
            edit: true, rowFam: e.target.getAttribute("tableId"),
            editMaritalType: e.target.getAttribute("relType"), editMaritalName: e.target.getAttribute("famName"),
            editMaritalNid: e.target.getAttribute("marNid"), editMaritalBod: e.target.getAttribute("birthDate"),
            editNid: e.target.getAttribute("natIdCard")
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

    handleMarType = (e) => {
        this.setState({
            editMaritalType: e.target.value
        })
    }
    handleMarName = (e) => {
        this.setState({
            editMaritalName: e.target.value
        })
    }
    handleNid = (e) => {
        this.setState({
            editMaritalNid: e.target.value
        })
    }
    handleBod = (e) => {
        this.setState({
            editMaritalBod: e.target.value
        })
    }

    handelEdit_2 = (e) => {
        e.preventDefault()
        let empNid = `NATIONAL_ID_CARD_NO = ${this.state.editNid}`
        let type = `RELATION_TYPE = ${this.state.editMaritalType}`
        let marName = `FAMILY_NAME = "${this.state.editMaritalName}"`
        let nat = `NATIONAL_ID_NUMBER = ${this.state.editMaritalNid}`
        let bod = `BIRTH_DATE = "${this.state.editMaritalBod}"`
        let lastSentence = this.state.rowFam

        let data = [empNid, type, marName, nat, bod, lastSentence]

        this.props.updateEmpFamily({insertedData: data, nat: this.state.editNid })

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
        let data = [e.target.getAttribute("tableId"), e.target.getAttribute("natIdCard")]
        this.props.deleteEmpFamily(data)
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
    

        return (
            <div id="page-wrapper" >
                {this.state.add ?
                    <div>
                        <div class="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ height: "100%", minWidth: 1000 }} class="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} class="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15, float: "right" }} class="fas fa-times-circle"></i> : null}
                                        <span>إضافة بيانات جديد</span>
                                        <h3> </h3>
                                    </div>
                                    {this.state.showMsg ? this.state.messege === "تم إدخال البيانات بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.state.messege}</div> : this.state.messege === "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : this.state.messege === "رقم البطاقة غير صحيح" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : this.state.messege === "البيانات غير كاملة" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : null : null}

                                    {/* <ImportExcel data={this.ImportExcelHandler} /> */}
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div className="form-group" controlId="formBasicEmail">
                                                <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                                <input ref="idadd" id="empid" className="form-control add" onChange={this.idInputHandlerForAdd} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                            </div>
                                            <div className="form-group" controlId="formBasicEmail">
                                                <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                                <input ref="nameadd" id="empname" className="form-control add" onChange={this.nameInputHandlerForAdd} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                            </div>
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
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>القرابة</th>
                                                <th>الإسم</th>
                                                <th>الرقم القومي</th>
                                                <th>تاريخ الميلاد</th>
                                                <th>حالة العمل</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <select onChange={this.addMaritalTypeHandler} className="maritaltype add" required ref="selected">
                                                        <option type="1" selected>الزوجة</option>
                                                        <option type="2" selected>الأبن</option>
                                                        <option selected>اختر ...</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input required className="maritalname add" onChange={this.addMaritalNameHandler} type="text" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                </td>
                                                <td>
                                                    <input required className="maritalnid add" onChange={this.addMaritalNIdHandler} type="text" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                </td>
                                                <td>
                                                    <input required className="maritalbod add" onChange={this.addMaritalBodHandler} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                </td>
                                                <td>
                                                    <select onKeyDown={this.tabhandler} onChange={this.addMaritalWorkStatus} className="maritalws add" required ref="selected" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }}>
                                                        <option selected>يعمل</option>
                                                        <option selected>لا يعمل</option>
                                                        <option selected>اختر ...</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            {this.state.maritalLength === 0 ? null : this.martialRender(this.state.maritalLength)}
                                        </tbody>
                                    </table>
                                    <button onClick={this.addMaritaldHandler} style={{ float: "right", minWidth: 50, marginBottom: 5, marginRight: 12, maxHeight: 25 }}><i class="fas fa-plus"></i>
                                    </button>
                                    <button onClick={this.deleteMaritaldHandler} style={{ float: "left", minWidth: 50, marginBottom: 5, marginLeft: 12, maxHeight: 25 }}><i class="fas fa-minus"></i>
                                    </button>
                                    <button onClick={this.handleArrToSend} className="btn btn-block">إضافة</button>

                                </div>
                                {this.state.addConfirmed ? <div style={{ width: "70%" }} class="alert alert-warning" role="alert"> هل انت متأكد من إضافة بيانات جديد ؟ <button onClick={this.submitNewFamily} style={{ position: "absolute", left: "17%", top: "80%" }} type="button" class="btn btn-warning">تأكيد</button> <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15, position: "relative", top: "5%", left: "62%" }} class="fas fa-times-circle"></i></div> : null}
                            </div>

                        </div>

                    </div> : null
                }


                <div class="row">
                    <div class="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ height: "100%", minHeight: 150, width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20, marginLeft: 0, width: "30%" }} class="input-group">
                                    <span>رقم الأداء : </span><input ref="empid" onKeyDown={this.idInputHandlerForSearch} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="EMPLOYEE_ID" />
                                </div>
                                <div style={{ marginTop: 20, marginRight: 0, width: "70%" }} class="input-group">
                                    <span >الإسم : </span><input ref="name" onKeyUp={this.nameInputHandlerForSearch} placeholder={this.props.empname && !this.state.edit ? this.props.empname.length >= 1 ? this.props.empname[0].NAME_ARABIC : null : null} style={{ background: "white", width: "80%", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                </div>

                                <button onClick={this.addButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" class="btn btn-primary">إضافة بيانات جديد</button>
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
                        <div class="panel panel-default">
                            <div class="panel-heading" style={{ display: "flex", justifyContent: "space-evenly" }}>
                                البيانات العائلية
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div></div>
                                        {this.props.empfamily.length > 0 ? <h4 style={{ textAlign: "right", fontWeight: "bolder" }}>{this.props.empfamily[0].NAME_ARABIC}</h4> : null}
                                        <div></div>
                                    </div>
                                    <h3 style={{ textAlign: "right" }}>بيانات الزوجة</h3>
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تاريخ الميلاد</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الرقم القومي</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>المؤهل</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تاريخ الزواج</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تعمل أو لا تعمل</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>جهة العمل</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empfamily.map((fam) => (
                                            fam.RELATION_TYPE === 1 ?
                                                <tbody>
                                                    <tr id={fam.id}>
                                                        <td>{this.state.edit && JSON.parse(this.state.rowFam) === JSON.parse(fam.id) ? <input onChange={this.handleMarName} value={this.state.editMaritalName} className="form-control" style={{ width: "100%" }} type="text" /> : this.state.updated && this.state.rowFam === fam.id ? this.state.editMaritalName : fam.FAMILY_NAME}</td>
                                                        <td>{this.state.edit && JSON.parse(this.state.rowFam) === JSON.parse(fam.id) ? <input onChange={this.handleBod} value={this.state.editMaritalBod} className="form-control" style={{ width: "100%" }} type="date" /> : this.state.updated && this.state.rowFam === fam.id ? this.state.editMaritalBod : fam.BIRTH_DATE}</td>
                                                        <td>{this.state.edit && JSON.parse(this.state.rowFam) === JSON.parse(fam.id) ? <input onChange={this.handleNid} value={this.state.editMaritalNid} className="form-control" style={{ width: "100%" }} type="text" /> : this.state.updated && this.state.rowFam === fam.id ? this.state.editMaritalNid : fam.NATIONAL_ID_NUMBER}</td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td><i onClick={this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} tableId={fam.id} relType={fam.RELATION_TYPE} famName={fam.FAMILY_NAME} birthDate={fam.BIRTH_DATE} marNid={fam.NATIONAL_ID_NUMBER} natIdCard={fam.NATIONAL_ID_CARD_NO} class="fas fa-edit"></i></td>
                                                        <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={fam.id} natIdCard={fam.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                    </tr>
                                                </tbody>
                                                :
                                                null
                                        ))}


                                    </table>

                                    <h3 style={{ textAlign: "right" }}>بيانات الأبناء</h3>
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>تاريخ الميلاد</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الرقم القومي</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>يدرس أو لا يدرس</th>
                                                <th>تعديل</th>
                                                <th>حذف</th>
                                            </tr>
                                        </thead>
                                        {this.props.empfamily.map((fam) => (
                                            fam.RELATION_TYPE === 2 ?
                                                <tbody>
                                                    <tr id={fam.id}>
                                                        <td>{this.state.edit && JSON.parse(this.state.rowFam) === JSON.parse(fam.id) ? <input onChange={this.handleMarName} value={this.state.editMaritalName} className="form-control" style={{ width: "100%" }} type="text" /> : this.state.updated && this.state.rowFam === fam.id ? this.state.editMaritalName : fam.FAMILY_NAME}</td>
                                                        <td>{this.state.edit && JSON.parse(this.state.rowFam) === JSON.parse(fam.id) ? <input onChange={this.handleBod} value={this.state.editMaritalBod} className="form-control" style={{ width: "100%" }} type="date" /> : this.state.updated && this.state.rowFam === fam.id ? this.state.editMaritalBod : fam.RELATION_TYPE === 2 ? fam.BIRTH_DATE : null}</td>
                                                        <td>{this.state.edit && JSON.parse(this.state.rowFam) === JSON.parse(fam.id) ? <input onChange={this.handleNid} value={this.state.editMaritalNid} className="form-control" style={{ width: "100%" }} type="text" /> : this.state.updated && this.state.rowFam === fam.id ? this.state.editMaritalNid : fam.RELATION_TYPE === 2 ? fam.NATIONAL_ID_NUMBER : null}</td>
                                                        <td></td>
                                                        <td><i onClick={this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} tableId={fam.id} relType={fam.RELATION_TYPE} famName={fam.FAMILY_NAME} birthDate={fam.BIRTH_DATE} marNid={fam.NATIONAL_ID_NUMBER} natIdCard={fam.NATIONAL_ID_CARD_NO} class="fas fa-edit"></i></td>
                                                        <td><i onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler} tableId={fam.id} natIdCard={fam.NATIONAL_ID_CARD_NO} class="fas fa-backspace"></i></td>
                                                    </tr>
                                                </tbody>
                                                :
                                                null
                                        ))

                                        }


                                    </table>



                                    {this.state.showMaritalstate ? <div><h3 style={{ textAlign: "left", fontFamily: 'Markazi Text ,serif' }}>الحالة الإجتماعية : <span style={{ color: "#7d7272" }}> {this.props.empfamily ? this.props.empfamily.length === 1 ? "متزوج" : this.props.empfamily.length > 1 ? `متزوج ويعول ${this.props.empfamily.length - 1}` : "أعزب" : null} </span> </h3></div> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        empfamily: state.trans.empfamily,
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        msg: state.trans.msg
    };
};
export default connect(mapStateToProps, {
    getEmpFamily, getEmpName, getEmpNameByName, submitNewFamily, deleteEmpFamily, globalNameOrId,updateEmpFamily
})(EmpFamily);