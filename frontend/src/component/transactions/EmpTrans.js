import React, { Fragment } from "react";
import {
    getJobDgByCat, globalNameOrId, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd, getStations
} from "../../actions/Actions";
import { updateEmpTrans, getEmpTrans, insertNewTrans, deleteEmpTrans, getEmpExp } from "../../actions/TransActions";
import { connect } from "react-redux";
import axios from "axios";
import ExcelSheet from "../reports/ExcelSheet"
import ImportExcel from "../ImportExcel"
import structure from "../structure.png"
import moment from "moment";

const colNames = [{ label: "الإسم", value: "name" }, { label: "تاريخ الحركة", value: "date" }, { label: "الإدارة", value: "dep" }, { label: "الوظيفة", value: "job" }, { label: "المسمى الوظيفي", value: "jobdesc" }, { label: "نوع التخصص", value: "gname" }, { label: "طريقة شغل الوظيفة", value: "jas" }, { label: "حالة الوظيفة", value: "ind" }]
class EmpTrans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addDate: [" "], catnameAdd: [" "], jdNameAdd: [" "], addSupbox: [" "], addGName: [" "], addJasi: [" "], addInd: [" "],
            addStation: [" "],
            trnasLength: 0, catnameChanged: false, rowTrans: null, editConfirmed: false, id: null,
            confirmAdd: false, showDateUnlessEdit: true, showTransResult: true, add: false,
            edit: false, empid: null, empname: null, transdate: null, jdname: null,
            supboxname: null, gname: null, jasi: null, indname: null, catname: null,
            catid: null, supboxid: null, mainboxid: null, levels: null, station: null, showStructWAdd: false, delete: false,
            showStruct: false, showNamesResultsForAdd: false, showNamesResultsForSearch: false, index: null, jobDgByCat: [{ data: [" "], IdNum: 0 }], empavailsup: [{ data: [" "], IdNumSP: 0 }]
        };

    }
    componentDidMount() {

    }
    /* 
    
    --------------------
    Create Methods
    --------------------
    
    */

    idInputHandlerForSearch = (e) => {
        this.refs.name.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpExp(`employee_experince.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${e.target.value})`)
            this.props.globalNameOrId(`${e.target.name} = ${e.target.value}`)

            this.props.getEmpName(e.target.value)
            this.props.getEmpTrans(`${e.target.name} = ${e.target.value}`)
            this.setState({ edit: false, empid: e.target.value })
        }
    }

    idInputHandlerForAdd = (e) => {
        this.refs.nameadd.value = ''
        this.setState({ empidForAdd: e.target.value, empnameForAdd: null })
        if (e.target.value.length === 0) {
            this.setState({ empidForAdd: null, confirmAdd: false })
        }
    }

    nameInputHandlerForSearch = (e) => {
        this.setState({ showNamesResultsForSearch: true, showFamilyResult: false })
        if (e.target.value.length > 0) this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (e.key === 'Enter') {
            this.props.getEmpExp(`employee_experince.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE ${this.props.nameOrId})`)
            this.props.getEmpTrans(`${e.target.name} = ${e.target.value}`)
        }
    }

    nameInputHandlerForAdd = (e) => {
        this.setState({ showNamesResultsForAdd: true, empidForAdd: null, empnameForAdd: e.target.value })
        this.props.getEmpNameByName(e.target.value)
        if (e.target.value.length === 0) {
            this.setState({ empnameForAdd: null, confirmAdd: false })
        }
        this.refs.idadd.value = ''
    }

    handleExpTime = (startDate, empexp) => {

        let editjobdesc = this.props.empTrans.find(el => el.JOB_ASSIGNMENT_FORM === 16) || []
        const startWithout = moment(startDate);
        const startWith = moment(editjobdesc.TRANS_DATE)
        const endDate = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
        console.log(endDate);
        const end = moment(endDate);
        const diffWithout = end.diff(startWithout);
        const diffWith = end.diff(startWith) || null;
        const diffDurationWithout = moment.duration(diffWithout);
        const diffDurationWith = moment.duration(diffWith);
        let militerExpStart;
        let militerExpEnd
        let outerSectorStart
        let outerSectorEnd
        let innerSectorStart
        let innerSectorEnd

        if (empexp.length > 0) {
            militerExpStart = empexp.filter(el => el.EXP_TYP_CODE === 1).length > 0 ? empexp.filter(el => el.EXP_TYP_CODE === 1)[0].START_DATE : 0
            militerExpEnd = empexp.filter(el => el.EXP_TYP_CODE === 1).length > 0 ? empexp.filter(el => el.EXP_TYP_CODE === 1)[0].END_DATE : 0
            outerSectorStart = empexp.filter(el => el.EXP_TYP_CODE === 3).length > 0 ? empexp.filter(el => el.EXP_TYP_CODE === 3)[0].START_DATE : 0
            outerSectorEnd = empexp.filter(el => el.EXP_TYP_CODE === 3).length > 0 ? empexp.filter(el => el.EXP_TYP_CODE === 3)[0].END_DATE : 0
            innerSectorStart = empexp.filter(el => el.EXP_TYP_CODE === 4).length > 0 ? empexp.filter(el => el.EXP_TYP_CODE === 4)[0].START_DATE : 0
            innerSectorEnd = empexp.filter(el => el.EXP_TYP_CODE === 4).length > 0 ? empexp.filter(el => el.EXP_TYP_CODE === 4)[0].END_DATE : 0

        }

        const diffMiliter = moment(militerExpEnd).diff((moment(militerExpStart)))
        const diffInner = moment(innerSectorEnd).diff((moment(innerSectorStart)))
        const diffOuter = moment(outerSectorEnd).diff((moment(outerSectorStart)))
        const diffDurationMiliter = moment.duration(diffMiliter)
        const diffDurationInner = moment.duration(diffInner)
        const diffDurationOuter = moment.duration(diffOuter)

        let total = diffWith > 0 ? moment.duration(diffWith + diffMiliter + diffInner + diffOuter) : moment.duration(diffWithout + diffMiliter + diffInner + diffOuter)
        // const total = moment.duration(diffWith)


        return ([diffDurationWithout, editjobdesc.TRANS_DATE ? diffDurationWith : {
            days: function () {
                return 0;
            }, months: function () {
                return 0;
            }, years: function () {
                return 0;
            }
        },

            militerExpStart ? diffDurationMiliter : {
                days: function () {
                    return 0;
                }, months: function () {
                    return 0;
                }, years: function () {
                    return 0;
                }
            },

            innerSectorStart ? diffDurationInner : {
                days: function () {
                    return 0;
                }, months: function () {
                    return 0;
                }, years: function () {
                    return 0;
                }
            },

            outerSectorStart ? diffDurationOuter : {
                days: function () {
                    return 0;
                }, months: function () {
                    return 0;
                }, years: function () {
                    return 0;
                }
            },
            total
        ]);
    }



    namesOptionshandlerForAdd = (e) => {
        this.setState({
            empnameForAdd: e.target.value, empidForAdd: null, confirmAdd: false
        })
        if (this.refs.nameadd) this.refs.nameadd.value = e.target.value
    }



    /* ---------------------------------------------------------------- */

    handelAddDateClick = (e) => {
        let nodes = document.getElementsByClassName("date");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addDate.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addDate: newArr, confirmAdd: false
        })
    }
    tabhandler = (e) => {
        let nodes = document.getElementsByClassName("ind");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        if ((e.key === 'Tab' && index) === nodes.length - 1 || this.state.trnasLength <= 6) {
            if (this.state.trnasLength < 5) {

                this.setState(prevState => {
                    return {
                        trnasLength: prevState.trnasLength + 1,
                        addDate: [...this.state.addDate, " "],
                        catnameAdd: [...this.state.catnameAdd, " "],
                        jdNameAdd: [...this.state.jdNameAdd, " "],
                        addSupbox: [...this.state.addSupbox, " "],
                        addGName: [...this.state.addGName, " "],
                        addJasi: [...this.state.addJasi, " "],
                        addInd: [...this.state.addInd, " "],
                        jobDgByCat: [...this.state.jobDgByCat, { data: [" "], IdNum: prevState.trnasLength + 1 }],
                        empavailsup: [...this.state.empavailsup, { data: [" "], IdNumSP: prevState.trnasLength + 1 }],
                        addStation: [...this.state.addStation, " "]


                    }
                })
            }
        }
    }

    addTrans = (e) => {
        e.preventDefault()
        if (this.state.trnasLength < 5) {
            this.setState(prevState => {
                return {
                    trnasLength: prevState.trnasLength + 1,
                    addDate: [...this.state.addDate, " "],
                    catnameAdd: [...this.state.catnameAdd, " "],
                    jdNameAdd: [...this.state.jdNameAdd, " "],
                    addSupbox: [...this.state.addSupbox, " "],
                    addGName: [...this.state.addGName, " "],
                    addJasi: [...this.state.addJasi, " "],
                    addInd: [...this.state.addInd, " "],
                    jobDgByCat: [...this.state.jobDgByCat, { data: [" "], IdNum: prevState.trnasLength + 1 }],
                    empavailsup: [...this.state.empavailsup, { data: [" "], IdNumSP: prevState.trnasLength + 1 }],
                    confirmAdd: false


                }
            })
        }

    }

    deleteTrans = (e) => {
        e.preventDefault()
        // catnameAdd: [], jdNameAdd: [], addSupbox: [], addGName: [], addJasi: [], addInd: []
        let newArrOfDate = [...this.state.addDate]
        let newArrOfCat = [...this.state.catnameAdd]
        let newArrOfJd = [...this.state.jdNameAdd]
        let newArrOfSupBox = [...this.state.addSupbox]
        let newArrOfGname = [...this.state.addGName]
        let newArrOfJasi = [...this.state.addJasi]
        let newArrOfInd = [...this.state.addInd]
        let newArrOfJobDgByCat = [...this.state.jobDgByCat]
        let newArrOfempavailsup = [...this.state.empavailsup]
        let newArrOfStation = [...this.state.addStation]

        newArrOfDate.pop()
        newArrOfCat.pop()
        newArrOfJd.pop()
        newArrOfSupBox.pop()
        newArrOfGname.pop()
        newArrOfJasi.pop()
        newArrOfInd.pop()
        newArrOfJobDgByCat.pop()
        newArrOfempavailsup.pop()
        newArrOfStation.pop()

        if (this.state.trnasLength !== 0) {
            this.setState(prevState => {
                return {
                    trnasLength: prevState.trnasLength - 1,
                    addDate: newArrOfDate,
                    catnameAdd: newArrOfCat,
                    jdNameAdd: newArrOfJd,
                    addSupbox: newArrOfSupBox,
                    addGName: newArrOfGname,
                    addJasi: newArrOfJasi,
                    addInd: newArrOfInd,
                    jobDgByCat: newArrOfJobDgByCat,
                    empavailsup: newArrOfempavailsup,
                    addStation: newArrOfStation,
                    confirmAdd: false
                }
            })
        }
    }

    addCatClickHandeler = (e) => {
        let nodes = document.getElementsByClassName("cate");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        // e.target.parentNode.nextSibling.childNodes[0].setAttribute('id', this.state.trnasLength)
        let newArr = this.state.catnameAdd.slice()
        let jdNodes = document.getElementsByClassName("jd")
        let jdIndex = Array.prototype.indexOf.call(jdNodes, e.target.parentNode.nextSibling.childNodes[0]);
        let newArrOfJd = this.state.jobDgByCat.slice()
        axios.get(`http://${process.env.REACT_APP_URL}/getjobdgbycat/${e.target.value}`).then((res => {
            newArrOfJd[jdIndex] = { data: res.data, IdNum: e.target.getAttribute("idNum") }
            this.setState({
                jobDgByCat: newArrOfJd, confirmAdd: false
            })
        }))

        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            catnameAdd: newArr,
            index: index,
        })
        // if (this.refs.selected) {
        //     if (this.refs.selected.options) {
        //         this.refs.selected.options.selectedIndex = this.refs.selected.options.length - 1
        //     }
        // }
    }

    addJdNameClickHandeler = (e) => {

        this.setState({ confirmAdd: false, showStructWAdd: false, jdname: e.target.value, levels: this.props.jobdgbycat ? this.props.jobdgbycat.length ? this.props.jobdgbycat[0].levels : null : null })
        let nodes = document.getElementsByClassName("jd");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.jdNameAdd.slice()
        newArr[index] = { value: e.target.value, key: index }
        let spNodes = document.getElementsByClassName("supbox")
        let spIndex = Array.prototype.indexOf.call(spNodes, e.target.parentNode.nextSibling.childNodes[0]);
        let newArrOfSp = this.state.empavailsup.slice()

        axios.get(`http://${process.env.REACT_APP_URL}/getavailsupbox/${e.target.parentNode.previousSibling.childNodes[0].value}/${e.target.value}`).then(res => {
            newArrOfSp[spIndex] = { data: res.data, IdNumSP: e.target.getAttribute("IdNumSP") }
            this.setState({
                empavailsup: newArrOfSp
            })

        })

        this.setState({
            jdNameAdd: newArr,
        })
        // if (this.refs.sps) {
        //     if (this.refs.sps.options) {
        //         this.refs.sps.options.selectedIndex = this.refs.sps.options.length - 1
        //     }
        // }

    }

    addSupboxClickHandeler = (e) => {
        let nodes = document.getElementsByClassName("supbox");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addSupbox.slice()
        let i = e.target.options.selectedIndex

        newArr[index] = { value: e.target.value, key: index, supboxid: e.target.options[i].getAttribute("supboxid") }
        this.setState({
            addSupbox: newArr,
            showStructWAdd: true,
            confirmAdd: false
        })
        // this.props.getUpJd(10, this.props.empname ? this.props.empname.length ? this.props.empname[0].SUP_BOX_ID : null : null))

        this.props.getUpJd(this.state.catnameAdd[index].value, e.target.value)
    }
    addGNameClickeHandeler = (e) => {
        let nodes = document.getElementsByClassName("gname");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addGName.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addGName: newArr,
            confirmAdd: false
        })
    }

    addJasiClickeHandeler = (e) => {
        let nodes = document.getElementsByClassName("jas");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addJasi.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addJasi: newArr,
            confirmAdd: false
        })
    }

    addIndClickeHandeler = (e) => {
        let nodes = document.getElementsByClassName("ind");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addInd.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addInd: newArr,
            confirmAdd: false
        })

    }

    addStationClickeHandeler = (e) => {
        let nodes = document.getElementsByClassName("station");
        let index = Array.prototype.indexOf.call(nodes, e.target);
        let newArr = this.state.addStation.slice()
        newArr[index] = { value: e.target.value, key: index }
        this.setState({
            addStation: newArr,
            confirmAdd: false
        })
    }

    handleArrToSend = (e) => {
        e.preventDefault()
        var state = this.state
        var arrays = state.addDate.concat(state.catnameAdd, state.jdNameAdd, state.addSupbox, state.addGName, state.addJasi, state.addInd, state.addStation)
        var emptyInputs = arrays.find(i => i.length <= 1) || null
        let arr = []
        console.log(this.state.addInd);

        if (emptyInputs) {
            console.log('hit');
        } else if (!emptyInputs && (this.state.empnameForAdd || this.state.empidForAdd)) {
            let i = arrays.length / 8
            while (i > 0) {
                let k = i
                let smallArr = []
                let arrloop = arrays.filter(el => el.key === k - 1)
                let nameOrId;
                if (this.state.empnameForAdd) {
                    nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${this.state.empnameForAdd}")`
                } else if (this.state.empidForAdd) {
                    nameOrId = `((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE EMPLOYEE_ID = ${this.state.empidForAdd})`
                }
                console.log(k, arrays.length, arrays);
                smallArr.push(arrloop[6].value)
                smallArr.push(nameOrId)
                smallArr.push(`"true"`)
                smallArr.push(`"${arrloop[0].value}"`)
                smallArr.push(`(SELECT CAT_ID FROM a_category WHERE CAT_NAME = "${arrloop[1].value}")`)
                smallArr.push(30)
                smallArr.push(`( SELECT MAIN_BOX_ID FROM a_sup_box WHERE SUP_BOX_ID = ${arrloop[3].supboxid})`)
                smallArr.push(`${arrloop[3].supboxid}`)
                smallArr.push(`(SELECT G_ID FROM a_job_groups WHERE G_NAME = "${arrloop[4].value}")`)
                smallArr.push(`"${arrloop[1].value}"`)
                smallArr.push(`(SELECT JOB_ASSIGNMENT_FORM FROM JOB_ASSIGNMENT_FORM WHERE JOB_ASSIGNMENT_FORM_ARABIC = "${arrloop[5].value}")`)
                smallArr.push(`(SELECT INDICATOR FROM indicators WHERE INDICATOR_NAME = "${arrloop[6].value}")`)
                smallArr.push(`(SELECT id FROM stations WHERE station_name = "${arrloop[7].value}")`)
                smallArr.push(`(SELECT area_id FROM stations WHERE station_name = "${arrloop[7].value}" )`)
                smallArr.push(`(SELECT GOVERNORATE_ID FROM stations WHERE station_name = "${arrloop[7].value}")`)
                smallArr.push(`"${arrloop[2].value}")`)
                arr.push(smallArr)
                i--
            }
            this.setState({
                confirmAdd: true, finalData: arr,
            })
            var addInputs = document.getElementsByClassName('add')
            for (let i = 0; i < addInputs.length; i++) {
                console.log(addInputs[0].tagName);
                if (addInputs[i].options) {
                    if (addInputs[i].value === '') {
                        this.setState({
                            confirmAdd: false, finalData: arr,
                        })
                    }
                }
            }

        }
    }
    ImportExcelHandler = (data) => {
        let newArr = []
        // newSArr.push(`SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = ${data[0][0]}`)
        data.forEach(arr => {
            let newSArr = []
            newSArr.push(`((SELECT NATIONAL_ID_CARD_NO FROM employee WHERE NAME_ARABIC = "${arr[0]}"), "${arr[1]}",
            (SELECT CAT_ID FROM a_category WHERE CAT_NAME = "${arr[2]}"),30,
            (SELECT a_main_box.MAIN_BOX_ID FROM a_main_box JOIN a_sup_box ON a_main_box.MAIN_BOX_ID = a_sup_box.MAIN_BOX_ID WHERE a_sup_box.SUP_BOX_NAME = "${arr[4]}" AND a_main_box.CAT_ID = (SELECT CAT_ID FROM a_category WHERE CAT_NAME = "${arr[2]}") ),
            (SELECT SUP_BOX_ID FROM a_sup_box WHERE SUP_BOX_NAME = "${arr[4]}" AND MAIN_BOX_ID = ( SELECT a_main_box.MAIN_BOX_ID FROM a_main_box JOIN a_sup_box ON a_main_box.MAIN_BOX_ID = a_sup_box.MAIN_BOX_ID WHERE a_sup_box.SUP_BOX_NAME = "${arr[4]}" AND a_main_box.CAT_ID = (SELECT CAT_ID FROM a_category WHERE CAT_NAME = "${arr[2]}"))),
            (SELECT G_ID FROM a_job_groups WHERE G_NAME = "${arr[5]}"),"${arr[2]}",(SELECT JOB_ASSIGNMENT_FORM FROM JOB_ASSIGNMENT_FORM WHERE JOB_ASSIGNMENT_FORM_ARABIC = "${arr[6]}"),
            (SELECT INDICATOR FROM indicators WHERE INDICATOR_NAME = "${arr[7]}"),"${arr[3]}"
            )`)
            newArr.push(newSArr)
        })
        axios({
            method: "POST",
            data: newArr,
            withCredentials: true,
            url: `http://${process.env.REACT_APP_URL}/newbulktrans`,
            headers: { "Content-Type": "application/json" },
        }).then((res) => {
            console.log(res);
        })
    }

    handelInsertNewTrans = (e) => {
        e.preventDefault()
        var addInputs = document.getElementsByClassName('add')
        for (let i = 0; i < addInputs.length; i++) {
            console.log(addInputs[0].tagName);
            if (addInputs[i].options) {
                addInputs[i].value = "... اختر"
            }
        }
        this.props.insertNewTrans({ data: this.state.finalData, ind: this.state.addInd })
        this.setState({
            confirmAdd: false
        })

    }


    idInputAddHandler = (e) => {
        this.setState({ showTransResult: false })
        this.props.getEmpName(e.target.value)

        let selectTags = document.getElementsByTagName('select')
        for (let index = 0; index < selectTags.length; index++) {
            document.getElementsByTagName('select')[index].selectedIndex = document.getElementsByTagName('select')[index].options.length - 1
        }
    }

    nameInputAddHandler = (e) => {
        this.setState({ showNamesResults: true, showTransResult: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        let selectTags = document.getElementsByTagName('select')
        for (let index = 0; index < selectTags.length; index++) {
            document.getElementsByTagName('select')[index].selectedIndex = document.getElementsByTagName('select')[index].options.length - 1
        }
    }



    closeAddConfirmHandler = (e) => {
        this.setState({ confirmAdd: false })
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


    /* 
     
    --------------------
    Delete Methods
    --------------------
     
    */


    /* 
     
    --------------------
    Shared Methods
    --------------------
     
    */

    // End Of Methods

    handleDataSet = () => {
        const dataSet = [];
        this.props.empTrans.map(inf => {
            return dataSet.push({ name: inf.NAME_ARABIC, date: inf.TRANS_DATE, dep: inf.CAT_NAME, job: inf.MAIN_BOX_NAME, jobdesc: inf.SUP_BOX_NAME, gname: inf.G_NAME, jas: inf.JOB_ASSIGNMENT_FORM_ARABIC, ind: inf.INDICATOR_NAME })
        })
        return dataSet;
    }


    closeEditConfirmHandler = (e) => {
        this.setState({ editConfirmed: false })
    }

    closeAddSectionHandler = (e) => {
        this.setState({ add: false, showStructWAdd: false })
    }

    /* search section handlers
    
    
    
    Methods to handle search
    ************************
    
    
    */

    idInputHandler = (e) => {
        if (this.refs.searchName) {
            if (this.refs.searchName.value) {
                this.refs.searchName.value = ''
            }
        }
        if (this.refs.searchName) {
            if (this.refs.searchName.placeholder) {
                this.refs.searchName.placeholder = null
            }
        }
        if (this.refs.insertNames) {
            if (this.refs.insertName.value) {
                this.refs.insertName.value = ''
            }
        }
        if (this.refs.insertName) {
            if (this.refs.insertName.placeholder) {
                this.refs.insertName.placeholder = ''
            }
        }
        this.setState({ showTransResult: false })
        if (e.key === 'Enter') {
            this.props.getEmpName(e.target.value)
            this.props.getEmpTrans(e.target.value, "")
            this.setState({ showStruct: false, showStructWAdd: false, edit: false, empid: e.target.value, showTransResult: true })
        }
    }


    nameInputHandler = (e) => {
        this.setState({ showNamesResults: true, showTransResult: false, edit: false })
        this.props.getEmpNameByName(e.target.value)
        this.refs.empid.value = ''
        if (this.refs.searchName) {
            if (this.refs.searchName.placeholder) {
                this.refs.searchName.placeholder = ''
            }
        }
        if (e.key === 'Enter') {
            this.props.getEmpTrans("", e.target.value)
            this.props.getCurrentJd(e.target.value)
            this.setState({ showTransResult: true, empid: e.target.value })
            // window.history.replaceState(null, "New Page Title", "/emptrans/goes/here")
            // this.props.history.push(window.location.pathname + "?" + currentUrlParams.toString());
        }
    }

    addNewButtonClickHandeler = () => {
        this.props.getStations()
        this.setState({ add: true })
        this.setState({ empid: null, empname: null, transdate: null, catname: null, jdname: null, supboxname: null, gname: null, jasi: null, indname: null, shoshowStructWAddw: false, showStruct: false, showNamesResults: false })
    }




    namesOptionshandler = (e) => {
        // this.refs.searchName.value = e.target.value
        if (this.refs.insertName) this.refs.insertName.value = e.target.value
        this.props.globalNameOrId(`${e.target.getAttribute('name')} = "${e.target.value}"`)

        this.props.getEmpNameByName(e.target.value)

        this.props.getEmpTrans(`${e.target.getAttribute('name')} = "${e.target.value}"`)
        this.setState({ showTransResult: true })
    }



    /* edit section handlers
    
    Methods to handle edit
    ************************
    
    */

    editHandler = (e) => {
        this.setState({ editConfirmed: true })
    }

    closeEditSectionHandler = (e) => {
        let tds = document.getElementById(e.target.getAttribute("transdate")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({ edit: false })
    }

    handelDateClick = (e) => {
        this.setState({ transdate: e.target.value })
    }


    catClickHandeler = (e) => {
        this.props.getJobDgByCat(e.target.value)

        this.setState({ catname: e.target.value, catnameChanged: true })
        if (this.refs.selected) {
            if (this.refs.selected.options) {
                this.refs.selected.options.selectedIndex = this.refs.selected.options.length - 1
            }
        }
    }

    jdNameClickHandeler = (e) => {
        this.setState({ showStructWAdd: false, jdname: e.target.value, levels: this.props.jobdgbycat ? this.props.jobdgbycat.length ? this.props.jobdgbycat[0].levels : null : null })
        this.props.getAvailSupBox(this.state.catname, e.target.value)
        if (this.refs.sps) {
            if (this.refs.sps.options) {
                this.refs.sps.options.selectedIndex = this.refs.sps.options.length - 1
            }
        }

    }

    supboxClickHandeler = (e) => {
        this.setState({
            supboxname: e.target.value,
            showStructWAdd: true
        })
        this.props.getUpJd(10, e.target.value)
    }
    gNameClickeHandeler = (e) => {
        this.setState({
            gname: e.target.value
        })
    }

    jasiClickeHandeler = (e) => {
        this.setState({
            jasi: e.target.value
        })
    }

    indClickeHandeler = (e) => {
        this.setState({
            indname: e.target.value
        })
    }
    stationClickHandler = (e) => {
        this.setState({
            station: e.target.value
        })
    }

    handelEdit_1 = (e) => {
        this.setState({ edit: true, rowTrans: e.target.getAttribute("transdate") })
        let tds = document.getElementById(e.target.getAttribute("transdate")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "white"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
            tds[tds.length - 2].childNodes[0].classList.add("fa-check")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
            tds[tds.length - 1].childNodes[0].classList.add("fa-times")
        }
        this.setState({ edit: true, id: e.target.getAttribute("id"), station: e.target.getAttribute("station"), mainboxid: e.target.getAttribute("mainboxid"), empname: e.target.getAttribute("empname"), transdate: e.target.getAttribute("transdate"), catname: e.target.getAttribute("catname"), catid: e.target.getAttribute("catid"), jdname: e.target.getAttribute("jdname"), supboxname: e.target.getAttribute("supboxname"), gname: e.target.getAttribute("jobgroup"), jasi: e.target.getAttribute("jasform"), indname: e.target.getAttribute("indname") })
    }

    editDate = (e) => {
        this.setState({ showDateUnlessEdit: false })
    }

    handelEdit_2 = (e) => {

        e.preventDefault()
        // let data = { empNat: this.state.empNat, appraisal: this.refs.newAppraisal.value, year: document.getElementById("year").placeholder }
        let data = { mainboxid: this.state.mainboxid, station: this.state.station, id: this.state.id, date: this.state.transdate, catname: this.state.catname, jdname: this.state.jdname, supboxname: this.state.supboxname, gname: this.state.gname, jasi: this.state.jasi, indname: this.state.indname, empid: this.state.empid, empname: this.state.empname }
        console.log(data);

        this.props.updateEmpTrans(data)
        let tds = document.getElementById(e.target.getAttribute("transdate")).childNodes
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



    showStruct = () => {
        this.setState({ showStruct: true })
        this.props.getUpJd(10, this.props.empTrans ? this.props.empTrans.length >= 1 ? this.props.empTrans[this.props.empTrans.length - 1].SUP_BOX_NAME : null : null)

    }


    deleteSTrans = (e) => {
        this.setState({ delete: true })
        let tds = document.getElementById(e.target.getAttribute("transdate")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "white"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
            tds[tds.length - 2].childNodes[0].classList.add("fa-check")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
            tds[tds.length - 1].childNodes[0].classList.add("fa-times")
        }
    }

    closeDeleteSSectionHandler = (e) => {
        let tds = document.getElementById(e.target.getAttribute("transdate")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({ delete: false })
    }

    confirmDeleteSTrans = (e) => {
        let query;
        if (e.target.getAttribute("indicator") === 1) {
            query = `
            is_shown = "false${e.target.getAttribute("id")}" WHERE ROW_ID = ${e.target.getAttribute("id")};
            UPDATE a_job_trans AS a2 SET INDICATOR = 1 WHERE TRANS_DATE =(SELECT
            MIN(TRANS_DATE) FROM (SELECT NATIONAL_ID_CARD_NO,INDICATOR,TRANS_DATE FROM a_job_trans WHERE NATIONAL_ID_CARD_NO
            = ${e.target.getAttribute("nat")} AND INDICATOR = 3 ) AS m3 ) AND NATIONAL_ID_CARD_NO = ${e.target.getAttribute("nat")};
            select *, a_job_trans.SUP_BOX_NAME AS catename from a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators
            JOIN a_sup_box JOIN a_category JOIN a_job_groups ON a_job_trans.G_ID = a_job_groups.G_ID
            AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID
            AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO 
            AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM
            AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE employee.NATIONAL_ID_CARD_NO = ${e.target.getAttribute("nat")}
            AND a_job_trans.is_shown = "true" ORDER by a_job_trans.TRANS_DATE
            `
        }
        else if (e.target.getAttribute("indicator") === 2) {
            query = ` 
            is_shown = "false" WHERE ROW_ID = ${e.target.getAttribute("id")};
            UPDATE a_job_trans AS a2 SET INDICATOR = 2 WHERE TRANS_DATE = (SELECT
            MAX(TRANS_DATE) FROM ( SELECT NATIONAL_ID_CARD_NO,INDICATOR,TRANS_DATE FROM
            a_job_trans WHERE NATIONAL_ID_CARD_NO = ${e.target.getAttribute("nat")} AND INDICATOR = 3 ) as m3
            ) and NATIONAL_ID_CARD_NO = ${e.target.getAttribute("nat")};
            select *, a_job_trans.SUP_BOX_NAME AS catename from a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators
            JOIN a_sup_box JOIN a_category JOIN a_job_groups ON a_job_trans.G_ID = a_job_groups.G_ID
            AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID
            AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO 
            AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM
            AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE employee.NATIONAL_ID_CARD_NO = ${e.target.getAttribute("nat")}
            AND a_job_trans.is_shown = "true" ORDER by a_job_trans.TRANS_DATE
            `
        }
        else if (e.target.getAttribute("indicator") === 3) {
            query = `
            is_shown = "false" WHERE ROW_ID = ${e.target.getAttribute("id")};
            select *, a_job_trans.SUP_BOX_NAME AS catename from a_job_trans JOIN employee JOIN job_assignment_form JOIN indicators
            JOIN a_sup_box JOIN a_category JOIN a_job_groups ON a_job_trans.G_ID = a_job_groups.G_ID
            AND a_category.CAT_ID = a_job_trans.CAT_ID AND a_sup_box.SUP_BOX_ID = a_job_trans.SUP_BOX_ID
            AND a_job_trans.NATIONAL_ID_CARD_NO = employee.NATIONAL_ID_CARD_NO 
            AND a_job_trans.JOB_ASSIGNMENT_FORM = JOB_ASSIGNMENT_FORM.JOB_ASSIGNMENT_FORM
            AND a_job_trans.INDICATOR = indicators.INDICATOR WHERE employee.NATIONAL_ID_CARD_NO = ${e.target.getAttribute("nat")}
            AND a_job_trans.is_shown = "true" ORDER by a_job_trans.TRANS_DATE
            `
        }
        this.props.deleteEmpTrans([query])
        this.setState({ delete: false })
        let tds = document.getElementById(e.target.getAttribute("transdate")).childNodes
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
    render() {
        console.log(this.props.empTrans);
        let expFunc = this.handleExpTime
        let jobDgByCat = this.state.jobDgByCat
        let firstRender = jobDgByCat.filter(el => el.IdNum === "0" && el.data.length >= 1)
        let secondRender = jobDgByCat.filter(el => el.IdNum === "1" && el.data.length >= 1)
        let thirdRender = jobDgByCat.filter(el => el.IdNum === "2" && el.data.length >= 1)
        let fourthRender = jobDgByCat.filter(el => el.IdNum === "3" && el.data.length >= 1)
        let fifthRender = jobDgByCat.filter(el => el.IdNum === "4" && el.data.length >= 1)
        let sixthRender = jobDgByCat.filter(el => el.IdNum === "5" && el.data.length >= 1)

        let empavailsup = this.state.empavailsup
        let firstRenderSp = empavailsup.filter(el => el.IdNumSP === "0" && el.data.length >= 1)
        let secondRenderSp = empavailsup.filter(el => el.IdNumSP === "1" && el.data.length >= 1)
        let thirdRenderSp = empavailsup.filter(el => el.IdNumSP === "2" && el.data.length >= 1)
        let fourthRenderp = empavailsup.filter(el => el.IdNumSP === "3" && el.data.length >= 1)
        let fifthRenderSp = empavailsup.filter(el => el.IdNumSP === "4" && el.data.length >= 1)
        let sixthRenderSp = empavailsup.filter(el => el.IdNumSP === "5" && el.data.length >= 1)

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
            <div id="page-wrapper" className="emptrans">
                {this.state.add ?
                    <div>
                        <div className="row">
                            <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div style={{ height: "100%", minWidth: 1000 }} className="panel panel-default">
                                    <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt", display: "flex", justifyContent: "space-between" }} className="panel-heading">
                                        {this.state.add ? <i onClick={this.closeAddSectionHandler} style={{ fontSize: 15 }} className="fas fa-times-circle"></i> : null}
                                        <span>إضافة تدرج جديد</span>
                                        <div></div>
                                    </div>
                                    <ImportExcel data={this.ImportExcelHandler} />
                                    <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div className="form-group" controlId="formBasicEmail">
                                                <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                                <input id="empid" ref="idadd" className="form-control add" onChange={this.idInputHandlerForAdd} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="first_name" />
                                            </div>
                                            <div className="form-group" controlId="formBasicEmail">
                                                <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                                <input id="name" ref="nameadd" className="form-control add" onChange={this.nameInputHandlerForAdd} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="first_name" />
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.showNamesResultsForAdd ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                                        <select onClick={this.namesOptionshandlerForAdd} style={styles} multiple name="pets" id="pet-select">
                                            {this.props.empNameByName.map((name => (
                                                <option key={name.EMPLOYEE_ID}>{name.NAME_ARABIC}</option>
                                            )))}
                                        </select>
                                    </div> : null}

                                    <table className="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>تاريخ الحركة</th>
                                                <th>الإدارة</th>
                                                <th>الوظيفة</th>
                                                <th>المسمى الوظيفي</th>
                                                <th>نوع التخصص</th>
                                                <th>طريقة شغل الوظيفة</th>
                                                <th>حالة الوظيفة</th>
                                                <th>المحطة</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input required className="date add" onChange={this.handelAddDateClick} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                </td>
                                                <td>
                                                    <select IdNum={0} className="cate add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 170 }} onChange={this.addCatClickHandeler}>
                                                        {this.props.cates.map(cate => (
                                                            <Fragment>
                                                                <option key={cate.CAT_ID} id={cate.CAT_ID}>
                                                                    {cate.CAT_NAME}
                                                                </option>
                                                            </Fragment>
                                                        ))}
                                                        <option selected>
                                                            اختر ...
                                                        </option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select IdNumSP={0} className="jd add" required ref="selected" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }} onChange={this.addJdNameClickHandeler}>
                                                        {/* {this.props.jobdgbycat ? this.props.jobdgbycat.length ? this.props.jobdgbycat[0].data.map(job => ( */}
                                                        {firstRender ? firstRender.length === 1 ? firstRender[0].data.map(job => (
                                                            <option >
                                                                {job.J_D_NAME}
                                                            </option>
                                                        )) : null : null}
                                                        <option selected>اختر ...</option>

                                                    </select>
                                                </td>
                                                <td>
                                                    <select required className="supbox add" ref="sps" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.addSupboxClickHandeler}>
                                                        {firstRenderSp ? firstRenderSp.length === 1 ? firstRenderSp[0].data.map(job => (
                                                            <option supboxid={job.SUP_BOX_ID}>
                                                                {job.SUP_BOX_NAME}
                                                            </option>
                                                        )) : null : null}
                                                        <option selected>اختر ...</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="gname add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 50 }} onChange={this.addGNameClickeHandeler}>
                                                        <option>فني</option>
                                                        <option>إداري</option>
                                                        <option selected>اختر ...</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="jas add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 120 }} onChange={this.addJasiClickeHandeler}>
                                                        <option>أخرى</option>
                                                        <option>تعيين</option>
                                                        <option>نقل</option>
                                                        <option>ندب</option>
                                                        <option>اعاره</option>
                                                        <option>تكليف</option>
                                                        <option>محدد المدة</option>
                                                        <option>تدريب</option>
                                                        <option>ترقية</option>
                                                        <option>تثبيت</option>
                                                        <option>نقل طبقا لتعديل تنظيمي</option>
                                                        <option>إعادة تعيين</option>
                                                        <option>إلغاء ندب</option>
                                                        <option>إلغاء تكليف</option>
                                                        <option>تسكين</option>
                                                        <option>تعديل مسمى الوظيفة</option>
                                                        <option>عقد مؤقت</option>
                                                        <option>مكافئة شاملة</option>
                                                        <option>تعديل ندب</option>
                                                        <option>إشراف</option>
                                                        <option>الحاق</option>
                                                        <option>عقد إختبار</option>
                                                        <option>إنهاء خدمة</option>
                                                        <option>أستيعاب</option>
                                                        <option selected>اختر ...</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="ind add" onKeyDown={this.tabhandler} required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 50 }} onChange={this.addIndClickeHandeler}>
                                                        <option>أصلية</option>
                                                        <option>حالية</option>
                                                        <option>سابقة</option>
                                                        <option selected>اختر  ...</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select className="station add" onChange={this.addStationClickeHandeler}>
                                                        {this.props.stations.map(station => (
                                                            <option>
                                                                {station.station_name}
                                                            </option>
                                                        ))}
                                                        <option selected>
                                                            اختر ...
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                            {this.state.trnasLength > 0 ?
                                                <Fragment>
                                                    <tr>
                                                        <td>
                                                            <input required className="date add" onChange={this.handelAddDateClick} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                        </td>
                                                        <td>
                                                            <select IdNum={1} className="cate add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 170 }} onChange={this.addCatClickHandeler}>
                                                                {this.props.cates.map(cate => (
                                                                    <Fragment>
                                                                        <option id={cate.CAT_ID}>
                                                                            {cate.CAT_NAME}
                                                                        </option>
                                                                    </Fragment>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select IdNumSP={1} className="jd transaddidjd add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }} onChange={this.addJdNameClickHandeler}>
                                                                {secondRender ? secondRender.length === 1 ? secondRender[0].data.map(job => (
                                                                    <option>
                                                                        {job.J_D_NAME}
                                                                    </option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>

                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="supbox add" required ref="sps" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.addSupboxClickHandeler}>
                                                                {secondRenderSp ? secondRenderSp.length === 1 ? secondRenderSp[0].data.map(job => (
                                                                    <option supboxid={job.SUP_BOX_ID}>
                                                                        {job.SUP_BOX_NAME}
                                                                    </option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="gname add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 50 }} onChange={this.addGNameClickeHandeler}>
                                                                <option>فني</option>
                                                                <option>إداري</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="jas add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 120 }} onChange={this.addJasiClickeHandeler}>
                                                                <option>أخرى</option>
                                                                <option>تعيين</option>
                                                                <option>نقل</option>
                                                                <option>ندب</option>
                                                                <option>اعاره</option>
                                                                <option>تكليف</option>
                                                                <option>محدد المدة</option>
                                                                <option>تدريب</option>
                                                                <option>ترقية</option>
                                                                <option>تثبيت</option>
                                                                <option>نقل طبقا لتعديل تنظيمي</option>
                                                                <option>إعادة تعيين</option>
                                                                <option>إلغاء ندب</option>
                                                                <option>إلغاء تكليف</option>
                                                                <option>تسكين</option>
                                                                <option>تعديل مسمى الوظيفة</option>
                                                                <option>عقد مؤقت</option>
                                                                <option>مكافئة شاملة</option>
                                                                <option>تعديل ندب</option>
                                                                <option>إشراف</option>
                                                                <option>الحاق</option>
                                                                <option>عقد إختبار</option>
                                                                <option>إنهاء خدمة</option>
                                                                <option>أستيعاب</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="ind add" onKeyDown={this.tabhandler} required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 50 }} onChange={this.addIndClickeHandeler}>
                                                                <option>أصلية</option>
                                                                <option>حالية</option>
                                                                <option>سابقة</option>
                                                                <option selected>اختر  ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="station add" onChange={this.addStationClickeHandeler}>
                                                                {this.props.stations.map(station => (
                                                                    <option selected>
                                                                        {station.station_name}
                                                                    </option>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </Fragment> : null}
                                            {this.state.trnasLength > 1 ?
                                                <Fragment>
                                                    <tr>
                                                        <td>
                                                            <input required className="date add" onChange={this.handelAddDateClick} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                        </td>
                                                        <td>
                                                            <select IdNum={2} className="cate add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 170 }} onChange={this.addCatClickHandeler}>
                                                                {this.props.cates.map(cate => (
                                                                    <Fragment>
                                                                        <option id={cate.CAT_ID}>
                                                                            {cate.CAT_NAME}
                                                                        </option>
                                                                    </Fragment>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select IdNumSP={2} className="jd transaddidjd add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }} onChange={this.addJdNameClickHandeler}>
                                                                {thirdRender ? thirdRender.length === 1 ? thirdRender[0].data.map(job => (
                                                                    <option>{job.J_D_NAME}</option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>

                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="supbox add" required ref="sps" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.addSupboxClickHandeler}>
                                                                {thirdRenderSp ? thirdRenderSp.length === 1 ? thirdRenderSp[0].data.map(job => (
                                                                    <option supboxid={job.SUP_BOX_ID}>
                                                                        {job.SUP_BOX_NAME}
                                                                    </option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="gname add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 50 }} onChange={this.addGNameClickeHandeler}>
                                                                <option>فني</option>
                                                                <option>إداري</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="jas add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 120 }} onChange={this.addJasiClickeHandeler}>
                                                                <option>أخرى</option>
                                                                <option>تعيين</option>
                                                                <option>نقل</option>
                                                                <option>ندب</option>
                                                                <option>اعاره</option>
                                                                <option>تكليف</option>
                                                                <option>محدد المدة</option>
                                                                <option>تدريب</option>
                                                                <option>ترقية</option>
                                                                <option>تثبيت</option>
                                                                <option>نقل طبقا لتعديل تنظيمي</option>
                                                                <option>إعادة تعيين</option>
                                                                <option>إلغاء ندب</option>
                                                                <option>إلغاء تكليف</option>
                                                                <option>تسكين</option>
                                                                <option>تعديل مسمى الوظيفة</option>
                                                                <option>عقد مؤقت</option>
                                                                <option>مكافئة شاملة</option>
                                                                <option>تعديل ندب</option>
                                                                <option>إشراف</option>
                                                                <option>الحاق</option>
                                                                <option>عقد إختبار</option>
                                                                <option>إنهاء خدمة</option>
                                                                <option>أستيعاب</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="ind add" onKeyDown={this.tabhandler} required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 50 }} onChange={this.addIndClickeHandeler}>
                                                                <option>أصلية</option>
                                                                <option>حالية</option>
                                                                <option>سابقة</option>
                                                                <option selected>اختر  ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="station add" onChange={this.addStationClickeHandeler}>
                                                                {this.props.stations.map(station => (
                                                                    <option>
                                                                        {station.station_name}
                                                                    </option>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </Fragment> : null}
                                            {this.state.trnasLength > 2 ?
                                                <Fragment>
                                                    <tr>
                                                        <td>
                                                            <input required className="date add" onChange={this.handelAddDateClick} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                        </td>
                                                        <td>
                                                            <select IdNum={3} className="cate add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 170 }} onChange={this.addCatClickHandeler}>
                                                                {this.props.cates.map(cate => (
                                                                    <Fragment>
                                                                        <option id={cate.CAT_ID}>
                                                                            {cate.CAT_NAME}
                                                                        </option>
                                                                    </Fragment>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select IdNumSP={3} className="jd transaddidjd add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }} onChange={this.addJdNameClickHandeler}>
                                                                {fourthRender ? fourthRender.length === 1 ? fourthRender[0].data.map(job => (
                                                                    <option>{job.J_D_NAME}</option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>

                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="supbox add" required ref="sps" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.addSupboxClickHandeler}>
                                                                {fourthRenderp ? fourthRenderp.length === 1 ? fourthRenderp[0].data.map(job => (
                                                                    <option supboxid={job.SUP_BOX_ID}>
                                                                        {job.SUP_BOX_NAME}
                                                                    </option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="gname add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 50 }} onChange={this.addGNameClickeHandeler}>
                                                                <option>فني</option>
                                                                <option>إداري</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="jas add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 120 }} onChange={this.addJasiClickeHandeler}>
                                                                <option>أخرى</option>
                                                                <option>تعيين</option>
                                                                <option>نقل</option>
                                                                <option>ندب</option>
                                                                <option>اعاره</option>
                                                                <option>تكليف</option>
                                                                <option>محدد المدة</option>
                                                                <option>تدريب</option>
                                                                <option>ترقية</option>
                                                                <option>تثبيت</option>
                                                                <option>نقل طبقا لتعديل تنظيمي</option>
                                                                <option>إعادة تعيين</option>
                                                                <option>إلغاء ندب</option>
                                                                <option>إلغاء تكليف</option>
                                                                <option>تسكين</option>
                                                                <option>تعديل مسمى الوظيفة</option>
                                                                <option>عقد مؤقت</option>
                                                                <option>مكافئة شاملة</option>
                                                                <option>تعديل ندب</option>
                                                                <option>إشراف</option>
                                                                <option>الحاق</option>
                                                                <option>عقد إختبار</option>
                                                                <option>إنهاء خدمة</option>
                                                                <option>أستيعاب</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="ind add" onKeyDown={this.tabhandler} required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 50 }} onChange={this.addIndClickeHandeler}>
                                                                <option>أصلية</option>
                                                                <option>حالية</option>
                                                                <option>سابقة</option>
                                                                <option selected>اختر  ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="station add" onChange={this.addStationClickeHandeler}>
                                                                {this.props.stations.map(station => (
                                                                    <option>
                                                                        {station.station_name}
                                                                    </option>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </Fragment> : null}
                                            {this.state.trnasLength > 3 ?
                                                <Fragment>
                                                    <tr>
                                                        <td>
                                                            <input required className="date add" onChange={this.handelAddDateClick} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                        </td>
                                                        <td>
                                                            <select IdNum={4} className="cate add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 170 }} onChange={this.addCatClickHandeler}>
                                                                {this.props.cates.map(cate => (
                                                                    <Fragment>
                                                                        <option id={cate.CAT_ID}>
                                                                            {cate.CAT_NAME}
                                                                        </option>
                                                                    </Fragment>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select IdNumSP={4} className="jd transaddidjd add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }} onChange={this.addJdNameClickHandeler}>
                                                                {fifthRender ? fifthRender.length === 1 ? fifthRender[0].data.map(job => (
                                                                    <option>{job.J_D_NAME}</option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>

                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="supbox add" required ref="sps" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.addSupboxClickHandeler}>
                                                                {fifthRenderSp ? fifthRenderSp.length === 1 ? fifthRenderSp[0].data.map(job => (
                                                                    <option supboxid={job.SUP_BOX_ID}>
                                                                        {job.SUP_BOX_NAME}
                                                                    </option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="gname add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 50 }} onChange={this.addGNameClickeHandeler}>
                                                                <option>فني</option>
                                                                <option>إداري</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="jas add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 120 }} onChange={this.addJasiClickeHandeler}>
                                                                <option>أخرى</option>
                                                                <option>تعيين</option>
                                                                <option>نقل</option>
                                                                <option>ندب</option>
                                                                <option>اعاره</option>
                                                                <option>تكليف</option>
                                                                <option>محدد المدة</option>
                                                                <option>تدريب</option>
                                                                <option>ترقية</option>
                                                                <option>تثبيت</option>
                                                                <option>نقل طبقا لتعديل تنظيمي</option>
                                                                <option>إعادة تعيين</option>
                                                                <option>إلغاء ندب</option>
                                                                <option>إلغاء تكليف</option>
                                                                <option>تسكين</option>
                                                                <option>تعديل مسمى الوظيفة</option>
                                                                <option>عقد مؤقت</option>
                                                                <option>مكافئة شاملة</option>
                                                                <option>تعديل ندب</option>
                                                                <option>إشراف</option>
                                                                <option>الحاق</option>
                                                                <option>عقد إختبار</option>
                                                                <option>إنهاء خدمة</option>
                                                                <option>أستيعاب</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="ind add" onKeyDown={this.tabhandler} required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 50 }} onChange={this.addIndClickeHandeler}>
                                                                <option>أصلية</option>
                                                                <option>حالية</option>
                                                                <option>سابقة</option>
                                                                <option selected>اختر  ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="station add" onChange={this.addStationClickeHandeler}>
                                                                {this.props.stations.map(station => (
                                                                    <option>
                                                                        {station.station_name}
                                                                    </option>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </Fragment> : null}
                                            {this.state.trnasLength > 4 ?
                                                <Fragment>
                                                    <tr>
                                                        <td>
                                                            <input required className="date add" onChange={this.handelAddDateClick} type="date" style={{ fontSize: "10pt", background: "white", marginTop: 5, marginRight: 5, height: 25, width: 130, border: "1px solid black" }} />
                                                        </td>
                                                        <td>
                                                            <select IdNum={5} className="cate add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 170 }} onChange={this.addCatClickHandeler}>
                                                                {this.props.cates.map(cate => (
                                                                    <Fragment>
                                                                        <option id={cate.CAT_ID}>
                                                                            {cate.CAT_NAME}
                                                                        </option>
                                                                    </Fragment>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select IdNumSP={5} className="jd transaddidjd add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 120 }} onChange={this.addJdNameClickHandeler}>
                                                                {sixthRender ? sixthRender.length === 1 ? sixthRender[0].data.map(job => (

                                                                    <option>{job.J_D_NAME}</option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>

                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="supbox add" required ref="sps" style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 188 }} onChange={this.addSupboxClickHandeler}>
                                                                {sixthRenderSp ? sixthRenderSp.length === 1 ? sixthRenderSp[0].data.map(job => (
                                                                    <option supboxid={job.SUP_BOX_ID}>
                                                                        {job.SUP_BOX_NAME}
                                                                    </option>
                                                                )) : null : null}
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="gname add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 50 }} onChange={this.addGNameClickeHandeler}>
                                                                <option>فني</option>
                                                                <option>إداري</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="jas add" required style={{ fontSize: "10pt", marginTop: 5, marginRight: 6, height: 25, width: 120 }} onChange={this.addJasiClickeHandeler}>
                                                                <option>أخرى</option>
                                                                <option>تعيين</option>
                                                                <option>نقل</option>
                                                                <option>ندب</option>
                                                                <option>اعاره</option>
                                                                <option>تكليف</option>
                                                                <option>محدد المدة</option>
                                                                <option>تدريب</option>
                                                                <option>ترقية</option>
                                                                <option>تثبيت</option>
                                                                <option>نقل طبقا لتعديل تنظيمي</option>
                                                                <option>إعادة تعيين</option>
                                                                <option>إلغاء ندب</option>
                                                                <option>إلغاء تكليف</option>
                                                                <option>تسكين</option>
                                                                <option>تعديل مسمى الوظيفة</option>
                                                                <option>عقد مؤقت</option>
                                                                <option>مكافئة شاملة</option>
                                                                <option>تعديل ندب</option>
                                                                <option>إشراف</option>
                                                                <option>الحاق</option>
                                                                <option>عقد إختبار</option>
                                                                <option>إنهاء خدمة</option>
                                                                <option>أستيعاب</option>
                                                                <option selected>اختر ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="ind add" onKeyDown={this.tabhandler} required style={{ fontSize: "10pt", marginTop: 5, marginRight: 5, height: 25, width: 50 }} onChange={this.addIndClickeHandeler}>
                                                                <option>أصلية</option>
                                                                <option>حالية</option>
                                                                <option>سابقة</option>
                                                                <option selected>اختر  ...</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <select className="station add" onChange={this.addStationClickeHandeler}>
                                                                {this.props.stations.map(station => (
                                                                    <option>
                                                                        {station.station_name}
                                                                    </option>
                                                                ))}
                                                                <option selected>
                                                                    اختر ...
                                                                </option>
                                                            </select>
                                                        </td>
                                                    </tr>
                                                </Fragment> : null}
                                        </tbody>
                                    </table>
                                    <button onClick={this.addTrans} style={{ float: "right", minWidth: 50, marginBottom: 5, marginRight: 12, maxHeight: 25 }}><i className="fas fa-plus"></i>
                                    </button>
                                    <button onClick={this.deleteTrans} style={{ float: "left", minWidth: 50, marginBottom: 5, marginLeft: 12, maxHeight: 25 }}><i className="fas fa-minus"></i>
                                    </button>
                                    <button onClick={this.handleArrToSend} className="btn btn-block">إضافة</button>


                                </div>
                                {this.state.confirmAdd ? <div style={{ width: "70%", display: "flex", justifyContent: "space-between" }} className="alert alert-warning" role="alert">
                                    <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15 }} className="fas fa-times-circle"></i>
                                    <p>هل انت متأكد من إضافة تدرج جديد ؟</p>
                                    <button onClick={this.handelInsertNewTrans} type="button" className="btn btn-warning">تأكيد</button>
                                </div> : null}
                            </div>
                        </div>


                        {this.props.upjd && this.state.showStructWAdd ? this.props.upjd.length ? this.props.upjd.length >= 1 ?
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {this.props.upjd.map(up => (
                                    <Fragment>
                                        {up.length ? up[0].boxname && up[0].boxname !== "null" ?
                                            <Fragment><div style={{ width: "50%", background: "#c3c3c3", borderRadius: 10, margin: 10 }}>
                                                <h3>{up[0].boxname}</h3></div><span style={{ fontSize: 30 }}>&#8593;</span></Fragment>
                                            : null : null}
                                    </Fragment>
                                ))}
                                <div style={{ width: "50%", background: "#c3c3c3", borderRadius: 10, margin: 10 }}>
                                    <h3>{this.state.supboxname}</h3>
                                </div>
                            </div> : null : null : null}
                    </div> : null}


                <div className="row">
                    <div className="col-lg-12">
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <h6 class="card-header  text-white bg-secondary" style={{ width: 450, background: "white", height: 30 }}>بحث</h6>
                        <div style={{ height: 100, width: 450 }} className="card-body">
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                                <div style={{ marginTop: 20, marginLeft: 0, width: "30%" }} className="input-group">
                                    <span>رقم الأداء : </span><input ref="empid" onKeyDown={this.idInputHandlerForSearch} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="EMPLOYEE_ID" />
                                </div>
                                <div style={{ marginTop: 20, marginRight: 0, width: "70%" }} className="input-group">
                                    <span >الإسم : </span><input ref="name" onKeyUp={this.nameInputHandlerForSearch} style={{ background: "white", width: "80%", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" />
                                </div>
                                <button onClick={this.addNewButtonClickHandeler} style={{ position: "relative", right: 20, top: 8 }} type="button" className="btn btn-primary">إضافة تدرج جديد</button>
                            </div>
                        </div>
                        {this.state.showNamesResultsForSearch ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                            <select onClick={this.namesOptionshandler} style={styles} multiple>
                                {this.props.empNameByName.map((name => (
                                    <option name="NAME_ARABIC">{name.NAME_ARABIC}</option>
                                )))}
                            </select>
                        </div> : null}
                    </div>


                    {
                        this.props.upjd ? this.props.upjd.length && this.state.showStruct ? this.props.upjd.length >= 1 ?
                            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {this.props.upjd.map(up => (
                                    <Fragment>
                                        {up.length >= 1 ? up[0].boxname ?
                                            <Fragment><div style={{ width: "50%", background: "#c3c3c3", borderRadius: 10, margin: 10 }}>
                                                <h3>{up[0].boxname}</h3></div><span style={{ fontSize: 30 }}>&#8593;</span></Fragment>
                                            : null : null}
                                    </Fragment>
                                ))}
                                <div style={{ width: "50%", background: "#c3c3c3", borderRadius: 10, margin: 10 }}>
                                    <h3>{this.props.empTrans ? this.props.empTrans.length >= 1 ? this.props.empTrans[this.props.empTrans.length - 1].SUP_BOX_NAME : null : null}</h3>
                                </div>
                            </div> : null : null : null
                    }
                </div>
                <div className="row">
                    {this.props.empTrans.length > 0 ?
                        <div className="col-lg-12">
                            <div className="card-header text-white bg-secondary" style={{ marginTop: 5, height: 30, display: "flex", justifyContent: "space-between" }}>
                                <div></div>
                                {this.props.empTrans.length > 0 ? <h6>بيان بالتدرج الوظيفي للسيد / {this.props.empTrans[0].NAME_ARABIC}</h6> : null}
                                <img onClick={this.showStruct} alt="img" src={structure} style={{ width: 30, height: 20 }} />

                            </div>
                            <div className="card-body" style={{ width: "100%" }}>

                                <div className="panel-heading" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                                    <ExcelSheet colNames={colNames} data={this.handleDataSet()} />
                                    {/* {this.props.empname && !this.state.edit && !this.state.add ? this.props.empname.length >= 1 ? <h3>  بيان بحركة السيد / {this.props.empname[0].NAME_ARABIC}</h3> : null : null || this.props.empNameByName ? this.props.empNameByName.length >= 1 ? `  ${this.props.empNameByName[0].NAME_ARABIC} ` : null : null} */}

                                </div>
                                <div className="panel-body">
                                    <div>
                                        <table className="table table-success table-bordered table-striped" style={{ fontSize: "10pt" }} >
                                            {this.state.edit ?
                                                <Fragment>
                                                    <thead>
                                                        <tr>
                                                            <th>الإدارة</th>
                                                            <th>الوظيفة</th>
                                                            <th>المسمى الوظيفي</th>
                                                            <th>تاريخ الحركة</th>
                                                            <th>طريقة شغل الوظيفة</th>
                                                            <th>نوع التخصص</th>
                                                            <th>حالة الوظيفة</th>
                                                            <th>المحطة</th>
                                                            <th>تعديل</th>
                                                            <th>حذف</th>
                                                        </tr>
                                                    </thead>
                                                    {this.props.empTrans.map(trans => (
                                                        <tbody key={trans.TRANS_DATE}>
                                                            <tr key={trans.TRANS_DATE} id={trans.TRANS_DATE}>
                                                                <td key={trans.TRANS_DATE}>{this.state.edit && this.state.rowTrans === trans.TRANS_DATE ? <select style={{ height: 34, width: 150, borderRadius: 5 }} onChange={this.catClickHandeler}>
                                                                    {this.props.cates.map(cate => (
                                                                        <Fragment>
                                                                            <option id={cate.CAT_ID}>
                                                                                {cate.CAT_NAME}
                                                                            </option>
                                                                        </Fragment>
                                                                    ))}
                                                                    <option selected>
                                                                        {this.state.catname}
                                                                    </option>
                                                                </select> : trans.catename}</td>
                                                                <td key={trans.TRANS_DATE}>
                                                                    {this.state.edit && this.state.rowTrans === trans.TRANS_DATE ? <select style={{ height: 34, width: 90, borderRadius: 5 }} onChange={this.jdNameClickHandeler}>
                                                                        {this.props.jobdgbycat.map(job => (
                                                                            <option>
                                                                                {job.J_D_NAME}
                                                                            </option>
                                                                        ))}
                                                                        <option selected>{this.state.catnameChanged ? "اختر الوظيفة" : this.state.jdname}</option>
                                                                    </select>
                                                                        :
                                                                        trans.MAIN_BOX_NAME}</td>
                                                                <td key={trans.TRANS_DATE}>{this.state.edit && this.state.rowTrans === trans.TRANS_DATE ? <select style={{ height: 34, width: 150, borderRadius: 5 }} required onChange={this.supboxClickHandeler}>
                                                                    {this.props.empavailsup.map(job => (
                                                                        <option>
                                                                            {job.SUP_BOX_NAME}
                                                                        </option>
                                                                    ))}
                                                                    <option selected>{this.state.catnameChanged ? "اختر المسمى الوظيفي" : this.state.supboxname}</option>
                                                                </select> : trans.SUP_BOX_NAME}</td>
                                                                <td key={trans.TRANS_DATE}>{this.state.edit && this.state.rowTrans === trans.TRANS_DATE ? <input type="date" onChange={this.handelDateClick} className="form-control" /> : trans.TRANS_DATE}</td>
                                                                <td key={trans.TRANS_DATE}>{this.state.edit && this.state.rowTrans === trans.TRANS_DATE ? <select style={{ height: 34, width: 90, borderRadius: 5 }} required onChange={this.jasiClickeHandeler}>
                                                                    <option>أخرى</option>
                                                                    <option>تعيين</option>
                                                                    <option>نقل</option>
                                                                    <option>ندب</option>
                                                                    <option>اعاره</option>
                                                                    <option>تكليف</option>
                                                                    <option>محدد المدة</option>
                                                                    <option>تدريب</option>
                                                                    <option>ترقية</option>
                                                                    <option>تثبيت</option>
                                                                    <option>نقل طبقا لتعديل تنظيمي</option>
                                                                    <option>إعادة تعيين</option>
                                                                    <option>إلغاء ندب</option>
                                                                    <option>إلغاء تكليف</option>
                                                                    <option>تسكين</option>
                                                                    <option>تعديل مسمى الوظيفة</option>
                                                                    <option>عقد مؤقت</option>
                                                                    <option>مكافئة شاملة</option>
                                                                    <option>تعديل ندب</option>
                                                                    <option>إشراف</option>
                                                                    <option>الحاق</option>
                                                                    <option>عقد إختبار</option>
                                                                    <option>إنهاء خدمة</option>
                                                                    <option>أستيعاب</option>
                                                                    <option selected>{this.state.jasi}</option>
                                                                </select> : trans.JOB_ASSIGNMENT_FORM_ARABIC}</td>
                                                                <td key={trans.TRANS_DATE}>{this.state.edit && this.state.rowTrans === trans.TRANS_DATE ? <select style={{ height: 34, width: 80, borderRadius: 5 }} required onChange={this.gNameClickeHandeler}>
                                                                    <option>فني</option>
                                                                    <option>إداري</option>
                                                                    <option selected>{this.state.gname}</option>
                                                                </select> : trans.G_NAME}</td>
                                                                <td key={trans.TRANS_DATE}>{this.state.edit && this.state.rowTrans === trans.TRANS_DATE ? <select style={{ height: 34, width: 80, borderRadius: 5 }} required onChange={this.indClickeHandeler}>
                                                                    <option>أصلية</option>
                                                                    <option>حالية</option>
                                                                    <option>سابقة</option>
                                                                    <option selected>{this.state.indname}</option>
                                                                </select> : trans.INDICATOR_NAME}</td>
                                                                <td key={trans.TRANS_DATE}>
                                                                    <select onClick={this.stationClickHandler} style={{ width: 50 }}>
                                                                        {this.props.stations.map(station => (
                                                                            <option>
                                                                                {station.station_name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </td>
                                                                <td key={trans.ROW_ID} id={trans.ROW_ID} transdate={trans.TRANS_DATE}><i onClick={this.state.edit ? this.handelEdit_2 : this.handelEdit_1} style={{ marginTop: 7 }} empname={trans.NAME_ARABIC} transdate={trans.TRANS_DATE} catid={trans.CAT_ID} station={trans.station} catname={trans.CAT_NAME} mainboxid={trans.MAIN_BOX_ID} jdname={trans.MAIN_BOX_NAME} supboxid={trans.SUP_BOX_ID} supboxname={trans.SUP_BOX_NAME} jobgroup={trans.G_NAME} jasform={trans.jobassignmentar} indname={trans.INDICATOR_NAME} className="fas fa-edit"></i></td>
                                                                <td key={trans.ROW_ID} id={trans.ROW_ID} transdate={trans.TRANS_DATE}><i onClick={this.state.edit ? this.closeEditSectionHandler : null} station={trans.station} transdate={trans.TRANS_DATE} style={{ marginTop: 7 }} className="fas fa-backspace"></i></td>
                                                            </tr>
                                                        </tbody>

                                                    ))}
                                                </Fragment> : <Fragment>
                                                    <thead>
                                                        <tr>
                                                            <th>الإدارة</th>
                                                            <th>الوظيفة</th>
                                                            <th>المسمى الوظيفي</th>
                                                            <th>تاريخ الحركة</th>
                                                            <th>طريقة شغل الوظيفة</th>
                                                            <th>نوع التخصص</th>
                                                            <th>حالة الوظيفة</th>
                                                            <th>المحطة</th>
                                                            <th>المنطقة</th>
                                                            <th>المحافظة</th>
                                                            <th>تعديل</th>
                                                            <th>حذف</th>
                                                        </tr>
                                                    </thead>
                                                    {this.props.empTrans.map(trans => (
                                                        <tbody>
                                                            <tr id={trans.TRANS_DATE}>
                                                                <td>{trans.catename}</td>
                                                                <td>{trans.MAIN_BOX_NAME}</td>
                                                                <td >{trans.SUP_BOX_NAME}</td>
                                                                <td>{trans.TRANS_DATE}</td>
                                                                <td>{trans.jobassignmentar}</td>
                                                                <td>{trans.G_NAME}</td>
                                                                <td>{trans.INDICATOR_NAME}</td>
                                                                <td>{trans.station}</td>
                                                                <td>{trans.AREA}</td>
                                                                <td>{trans.GOV}</td>
                                                                <td ><i onClick={this.state.delete ? this.confirmDeleteSTrans : this.state.edit ? this.handelEdit_2 : this.handelEdit_1} station={trans.station} style={{ marginTop: 7 }} id={trans.ROW_ID} nat={trans.NATIONAL_ID_CARD_NO} indicator={trans.INDICATOR} empname={trans.NAME_ARABIC} transdate={trans.TRANS_DATE} catid={trans.CAT_ID} catname={trans.CAT_NAME} mainboxid={trans.MAIN_BOX_ID} jdname={trans.MAIN_BOX_NAME} supboxid={trans.SUP_BOX_ID} supboxname={trans.SUP_BOX_NAME} jobgroup={trans.G_NAME} jasform={trans.jobassignmentar} indname={trans.INDICATOR_NAME} className="fas fa-edit"></i></td>
                                                                <td><i onClick={this.state.delete ? this.closeDeleteSSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteSTrans} id={trans.ROW_ID} nat={trans.NATIONAL_ID_CARD_NO} station={trans.station} indicator={trans.INDICATOR} transdate={trans.TRANS_DATE} style={{ marginTop: 7 }} className="fas fa-backspace"></i></td>
                                                            </tr>
                                                        </tbody>


                                                    ))}
                                                </Fragment>

                                            }

                                        </table>
                                        {this.props.empTrans.length < 1 ? <h1>عفواً لا توجد بييانات</h1> : null}
                                        {this.props.empTrans.length > 0 ?
                                            <table className="table table-striped table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th> مدة الخبرة للسيد / {this.props.empTrans[0].NAME_ARABIC} حتى {new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear()} </th>
                                                        <th>يوم</th>
                                                        <th>شهر</th>
                                                        <th>سنة</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>مدة الخبرة داخل الشركة</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[0].days()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[0].months()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[0].years()}</td>

                                                    </tr>
                                                    <tr>
                                                        <td>مدة الخبرة داخل الشركة بعد التسوية</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[1].days()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[1].months()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[1].years()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>مدة خبرة القوات المسلحة</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[2].days()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[2].months()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[2].years()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>مدة الخبرة داخل القطاع</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[3].days()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[3].months()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[3].years()}</td>

                                                    </tr>
                                                    <tr>
                                                        <td>مدة الخبرة خارج القطاع</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[4].days()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[4].months()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[4].years()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>إجمالي مدة الخبرة</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[5].days()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[5].months()}</td>
                                                        <td>{this.handleExpTime(this.props.empTrans[0].TRANS_DATE, this.props.empexp)[5].years()}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            :
                                            null
                                        }

                                    </div>
                                </div>

                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                {this.state.editConfirmed ? <div style={{ width: "100%" }} className="alert alert-warning" role="alert"> هل انت متأكد من تعديل هذا التدرج  ؟ <button onClick={this.handelEdit_2} style={{ position: "absolute", left: "3%", top: "78%" }} type="button" className="btn btn-warning">تأكيد</button> <i onClick={this.closeEditConfirmHandler} style={{ fontSize: 15, position: "relative", top: "7%", left: "56%" }} className="fas fa-times-circle"></i></div> : null}
                            </div>

                        </div>
                        :
                        null
                    }
                </div>


            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cates: state.posts.cates,
        jobdgbycat: state.posts.jobdgbycat,
        empTrans: state.trans.empTrans,
        empexp: state.trans.empexp,
        empname: state.posts.empname,
        empNameByName: state.posts.empNameByName,
        empcurrentjd: state.posts.empcurrentjd,
        empavailsup: state.posts.empavailsup,
        upjd: state.posts.upjd,
        downJd: state.posts.downJd,
        stations: state.posts.stations


    };
};
export default connect(mapStateToProps, {
    getEmpTrans, globalNameOrId, getEmpExp, getJobDgByCat, getEmpName, getEmpNameByName, getCurrentJd, getavailJd, getAvailSupBox, getUpJd, gitDownJd, updateEmpTrans
    , insertNewTrans, deleteEmpTrans, getStations
})(EmpTrans);