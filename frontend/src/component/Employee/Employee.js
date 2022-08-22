import React, { Fragment } from "react";
import {
    getEmpDetails, getStations, getUpJd, getEmpNameByName, newEmp, editEmpDetails, newEmpImg, globalNameOrId
} from "../../actions/Actions";
import { getEmpTrans, getEmpExp, getEmpFamily, getEmpEdu, getEmpAppraisal, getempspenalties, getEmpTraining } from "../../actions/TransActions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

var jp = require('jsonpath');




class Employee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            showMsgBeforSend: false, showMsg: false, showMsgOfChange: false, messege: "", add: false, addConfirmed: false, edit: false, EditConfirmed: false,
            showNamesResults: false, addEmpId: "", addEmpName: "", addContractType: "", addDoc: "", addDoj: "",
            addStation: "", addJS: "", addEmpNid: "",
            addPOIssuance: "", addDOIssuance: "", addinsuranceNum: "", addinsuranceOffice: "", addAddress: "", addMPhoneNum: "",
            addHPhoneNum: "", addOPhoneNum: "", addEmail: "", addMarStatus: "", addSyndicateType: "", addMemberShipNum: "",
            addMemberShipDate: "", addMirStatus: "", addDaysCountMir: "", addMonthsCountMir: "", addYearsCountMir: "", ExmpExpireDate: "",
            addReligous: "", addPob: "", addPic: "", milStatusIsTempEx: false, milStatusIsCompleted: false,
            syndicateAdded: false, confirmAdd: "", mainUpdateQuery: [], jtUpdateQuery: [], apUpdateQuery: "", img: ""
        };
    }

    escFunction = (event) => {
        if (event.keyCode === 27) {
            this.setState({
                add: false, edit: false
            })
        }
    }

    handleAge = (birthdate) => {
        const start = moment(birthdate);
        const endDate = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`
        const end = moment(endDate);
        const diff = end.diff(start)
        const diffDuration = moment.duration(diff);
        console.log(diffDuration);


        return diffDuration;


    }

    componentDidMount() {
        document.addEventListener("keydown", this.escFunction, false);
        this.props.getStations()
    }

    changeHandler = (e) => {

        if (e.target.value.length < 1) {
            let removedArrOfApQ = [...this.state.mainUpdateQuery]
            if (removedArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName"))) !== -1) {
                let removedIndex = removedArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                removedArrOfApQ.splice(removedIndex, 1)
                this.setState({
                    mainUpdateQuery: removedArrOfApQ
                })
            }
        } else if (e.target.value.length > 0) {
            let newArrOfApQ = [...this.state.mainUpdateQuery]
            if (newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName"))) !== -1) {
                if (e.target.getAttribute("colName") === "JOB_GOVERNORATE") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })
                }
                else if (e.target.getAttribute("colName") === "EMP_STATUS") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT EMP_STATUS FROM emp_status WHERE EMP_STATUS_NAME = "${e.target.value}")`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })
                }
                else if (e.target.getAttribute("colName") === "ADDRESS_GOVERNORATE") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })
                }
                else if (e.target.getAttribute("colName") === "MARITAL_STATUS") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT MARITAL_STATUS FROM marital_status WHERE STATUS_DESC = "${e.target.value}")`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })
                }
                else if (e.target.getAttribute("colName") === "SYNDICATE") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT SYNDICATE FROM syndicate WHERE SYNDICATE_NAME = "${e.target.value}")`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })
                }
                else if (e.target.getAttribute("colName") === "GENDER") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT GENDER FROM genders WHERE GENDER_NAME = "${e.target.value}")`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })
                }
                else if (e.target.getAttribute("colName") === "RELIGION") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT RELIGION FROM religions WHERE RELIGION_NAME = "${e.target.value}")`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })
                }
                else if (e.target.getAttribute("colName") === "GOVERNORATE_OF_BIRTH") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })

                }
                else if (e.target.getAttribute("colName") === "NATIONAL_ID_CARD_NO") {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = ${e.target.value}`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })

                }
                else {
                    let updatedIndexOfNew = newArrOfApQ.findIndex(s => s.includes(e.target.getAttribute("colName")))
                    newArrOfApQ[updatedIndexOfNew] = `${e.target.getAttribute("colName")} = "${e.target.value}"`
                    this.setState({
                        mainUpdateQuery: newArrOfApQ
                    })
                }
            } else {
                if (e.target.getAttribute("colName") === "JOB_GOVERNORATE") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })
                }
                else if (e.target.getAttribute("colName") === "EMP_STATUS") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = (SELECT EMP_STATUS FROM emp_status WHERE EMP_STATUS_NAME = "${e.target.value}")`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })
                }
                else if (e.target.getAttribute("colName") === "ADDRESS_GOVERNORATE") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })
                }
                else if (e.target.getAttribute("colName") === "MARITAL_STATUS") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = (SELECT MARITAL_STATUS FROM marital_status WHERE STATUS_DESC = "${e.target.value}")`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })
                }
                else if (e.target.getAttribute("colName") === "SYNDICATE") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = (SELECT SYNDICATE FROM syndicate WHERE SYNDICATE_NAME = "${e.target.value}")`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })
                }
                else if (e.target.getAttribute("colName") === "GENDER") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = (SELECT GENDER FROM genders WHERE GENDER_NAME = "${e.target.value}")`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })
                }
                else if (e.target.getAttribute("colName") === "RELIGION") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = (SELECT RELIGION FROM religions WHERE RELIGION_NAME = "${e.target.value}")`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })
                }
                else if (e.target.getAttribute("colName") === "GOVERNORATE_OF_BIRTH") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = (SELECT GOVERNORATE FROM governorate WHERE GOVERNORATE_ARABIC = "${e.target.value}")`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })

                }
                else if (e.target.getAttribute("colName") === "NATIONAL_ID_CARD_NO") {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = ${e.target.value}`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })

                }
                else {
                    let newArr = [...this.state.mainUpdateQuery]
                    newArr.push(`${e.target.getAttribute("colName")} = "${e.target.value}"`)
                    this.setState({
                        mainUpdateQuery: newArr
                    })
                }
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            EditConfirmed: true
        })
    }

    handleSendDataToChange = (e) => {
        this.props.editEmpDetails({ data: `${this.state.mainUpdateQuery} where employee_id = ${this.props.empdetails[0][0].EMPLOYEE_ID}`, employeeid: this.props.empdetails[0][0].EMPLOYEE_ID })
        this.setState({
            messege: this.props.msg,
            EditConfirmed: false,
            showMsgOfChange: true
        })
        let editInputs = document.getElementsByClassName('edit')
        for (let i = 0; i < editInputs.length; i++) {
            editInputs[i].value = ''
        }
    }

    clickHandler = (e) => {
        this.setState({
            edit: true
        })
    }


    handleArrToSend = (e) => {
        let state = this.state
        let addedSyndicate = this.state.syndicateAdded ? 'added' : ''
        let organization = `(30`
        let empid = state.addEmpId
        let empname = `"${state.addEmpName}"`
        let contractType = `(SELECT CONTRACT_TYPE FROM contract_type WHERE CONTRACT_TYPE_ARABIC = "${state.addContractType}")`
        let doc = `"${state.addDoc}"`
        let addStation = `"${state.addStation}"`
        let addArea = `(SELECT area_id FROM stations WHERE station_name = "${state.addStation}")`
        let addGovern = `(SELECT GOVERNORATE_ID FROM stations WHERE station_name = "${state.addStation}")`
        let addJS = `(SELECT EMP_STATUS FROM emp_status WHERE EMP_STATUS_NAME = "${state.addJS}")`
        let addEmpNid = `${state.addEmpNid}`
        let addPOIssuance = `"${state.addPOIssuance}"`
        let addDOIssuance = `"${state.addDOIssuance}"`
        let addinsuranceNum = `"${state.addinsuranceNum}"`
        let addinsuranceOffice = `"${state.addinsuranceOffice}"`
        let addAddress = `"${state.addAddress}"`
        let addMPhoneNum = `"${state.addMPhoneNum}"`
        let addHPhoneNum = `"${state.addHPhoneNum}"`
        let addOPhoneNum = `"${state.addOPhoneNum}"`
        let addEmail = `"${state.addEmail}"`
        let addMarStatus = `(SELECT MARITAL_STATUS FROM marital_status WHERE STATUS_DESC = "${state.addMarStatus}")`
        let addSyndicateType = `(SELECT SYNDICATE FROM syndicate WHERE SYNDICATE_NAME = "${state.addSyndicateType}")`
        let addMemberShipNum = `"${state.addMemberShipNum}"`
        let addMemberShipDate = `"${state.addMemberShipDate}"`
        let addMirStatus = `(SELECT MILITARY_SERVICE_STATUS FROM military_service_status WHERE STATUS_ARABIC ="${state.addMirStatus}")`
        let addDaysCountMir = `"${state.addDaysCountMir}"`
        let addMonthsCountMir = `${state.addMonthsCountMir}`
        let addYearsCountMir = `${state.addYearsCountMir}`
        let addSexType = `${this.state.addEmpNid[12] % 2 === 0 ? 2 : 1}`
        let addReligous = `(SELECT RELIGION FROM religions WHERE RELIGION_NAME = "${state.addReligous}")`
        let dateOfBirth = this.state.addEmpNid.slice(1, 7)
        let addDob = `${this.state.addEmpNid[0] === '2' ? '"19' : '"20'}${dateOfBirth.slice(0, 2)}-${dateOfBirth.slice(2, 4)}-${dateOfBirth.slice(4, 6)}"`
        let addPob = `"${state.addPob}"`
        let addGob = `${this.state.addEmpNid.slice(7, 9)})`

        let image = state.addPic
        let img = new FormData()
        img.append("avatar", image)


        let data = [
            addedSyndicate, organization, empid, empname, contractType, doc, addStation, addArea, addGovern
            , addJS, addEmpNid, addPOIssuance, addDOIssuance, addinsuranceNum, addinsuranceOffice, addAddress,
            addMPhoneNum, addHPhoneNum, addOPhoneNum, addEmail, addMarStatus, this.state.syndicateAdded ? addSyndicateType : '', this.state.syndicateAdded ? addMemberShipNum : '',
            this.state.syndicateAdded ? addMemberShipDate : '', addMirStatus, this.state.milStatusIsCompleted ? addDaysCountMir : '', this.state.milStatusIsCompleted ? addMonthsCountMir : '', this.state.milStatusIsCompleted ? addYearsCountMir : '', addSexType,
            addReligous, addDob, addPob, addGob
        ]

        if (
            state.addEmpId.length < 1 || state.addEmpName.length < 1 || state.addContractType.length < 1 || state.addDoc.length < 1 || state.addStation.length < 1 || state.addJS.length < 1 ||
            state.addEmpNid.length < 1 || state.addPOIssuance.length < 1 || state.addDOIssuance.length < 1 || state.addinsuranceNum.length < 1 ||
            state.addinsuranceOffice.length < 1 || state.addAddress.length < 1 || state.addMPhoneNum.length < 1 || state.addHPhoneNum.length < 1 ||
            state.addOPhoneNum.length < 1 || state.addEmail.length < 1 || state.addMarStatus.length < 1 || (state.syndicateAdded && (state.addSyndicateType.length < 1 ||
                state.addMemberShipNum.length < 1 || state.addMemberShipDate.length < 1)) || (state.milStatusIsCompleted && (state.addMirStatus.length < 1 || state.addDaysCountMir.length < 1 ||
                    state.addMonthsCountMir.length < 1 || state.addYearsCountMir.length < 1)) || (state.milStatusIsTempEx && state.ExmpExpireDate.length < 1) ||
            state.addReligous.length < 1 || state.addPob.length < 1
        ) {

            console.log('inputs are not completed');

        } else if (state.addEmpNid.length !== 14) {

            this.setState({
                messege: "رقم البطاقة غير صحيح",
                showMsgBeforSend: true
            })

        } else if (state.addMPhoneNum.length !== 11) {

            this.setState({
                messege: "رقم الموبايل غير صحيح",
                showMsgBeforSend: true
            })

        }
        else {
            this.setState({
                addConfirmed: true, finalData: data, img: img,
                showMsgBeforSend: false

            })
        }
    }

    handleSendData = (e) => {
        this.props.newEmp(this.state.finalData)
        console.log(this.state.img);

        this.setState({
            messege: this.props.msg,
            showMsg: true,
            addConfirmed: false
        })
        if (this.props.msg === "تم إدخال البيانات بنجاح") {
            this.setState({
                add: false
            })
        }

        let addinputs = document.getElementsByClassName('add')
        if (this.props.msg === "تم إدخال البيانات بنجاح") {
            for (let i = 0; i < addinputs.length; i++) {
                addinputs[i].value = ''
            }
        }
    }



    addButtonHandler = (e) => {
        this.setState({
            add: true
        })
    }
    addpicHandler = (e) => {
        let image = e.target.files[0]
        let img = new FormData()
        img.append("avatar", image)
        this.props.newEmpImg(img)

        this.setState({
            addPic: e.target.files[0]
        })

    }

    addEmpIdHandler = (e) => {
        this.setState({
            addEmpId: e.target.value
        })
    }


    addEmpNameHandler = (e) => {
        this.setState({
            addEmpName: e.target.value
        })
    }

    addContractTypeHandler = (e) => {
        this.setState({
            addContractType: e.target.value
        })
    }

    addDocHandler = (e) => {
        this.setState({
            addDoc: e.target.value
        })
    }

    addStationHandler = (e) => {
        this.setState({ addStation: e.target.value })

    }

    addJSHandler = (e) => {
        this.setState({ addJS: e.target.value })

    }

    addEmpNidHandler = (e) => {
        this.setState({ addEmpNid: e.target.value })

    }

    addPOIssuanceHandler = (e) => {
        this.setState({ addPOIssuance: e.target.value })

    }

    addDOIssuanceHandler = (e) => {
        this.setState({ addDOIssuance: e.target.value })

    }

    addinsuranceNumHandler = (e) => {
        this.setState({ addinsuranceNum: e.target.value })

    }

    addinsuranceOfficeHandler = (e) => {
        this.setState({ addinsuranceOffice: e.target.value })

    }

    addAddressHandler = (e) => {
        this.setState({ addAddress: e.target.value })

    }

    addMPhoneNumHandler = (e) => {
        this.setState({ addMPhoneNum: e.target.value })

    }

    addHPhoneNumHandler = (e) => {
        this.setState({ addHPhoneNum: e.target.value })

    }

    addOPhoneNumHandler = (e) => {
        this.setState({ addOPhoneNum: e.target.value })

    }

    addEmailNumHandler = (e) => {
        this.setState({ addEmail: e.target.value })

    }

    addMarStatusNumHandler = (e) => {
        this.setState({ addMarStatus: e.target.value })

    }

    addSyndicateTypeNumHandler = (e) => {
        this.setState({ addSyndicateType: e.target.value })

    }

    addMemberShipNumHandler = (e) => {
        this.setState({ addMemberShipNum: e.target.value })

    }

    addMemberShipDateHandler = (e) => {
        this.setState({ addMemberShipDate: e.target.value })

    }

    addMirStatusHandler = (e) => {
        if (e.target.value === "ادي الخدمه العسكرية") {
            this.setState({
                milStatusIsCompleted: true,
                milStatusIsTempEx: false
            })
        } else if (e.target.value === "معاف مؤقت") {
            this.setState({
                milStatusIsTempEx: true,
                milStatusIsCompleted: false
            })
        } else {
            this.setState({
                milStatusIsCompleted: false,
                milStatusIsTempEx: false
            })
        }
        this.setState({ addMirStatus: e.target.value })

    }

    addDaysCountMirHandler = (e) => {
        this.setState({ addDaysCountMir: e.target.value })
    }

    addMonthsCountMirHandler = (e) => {
        this.setState({ addMonthsCountMir: e.target.value })
    }

    addYearsCountMirHandler = (e) => {
        this.setState({ addYearsCountMir: e.target.value })
    }

    addExmpExpireDate = (e) => {
        this.setState({
            ExmpExpireDate: e.target.value
        })
    }

    addReligousHandler = (e) => {
        this.setState({ addReligous: e.target.value })
    }

    addPobHandler = (e) => {
        this.setState({ addPob: e.target.value })
    }

    /* _____________________________________________________ */






    empidHandler = (e) => {
        if (e.key === 'Enter') {
            this.props.globalNameOrId(`${e.target.name} = ${e.target.value}`)
            this.props.getEmpDetails(`${e.target.name} = ${e.target.value}`)

        }
    }


    nameInputHandler = (e) => {
        console.log(e.target.value);
        this.setState({ showNamesResults: true, showFamilyResult: false })
        if (e.target.value.length > 0) {
            this.props.getEmpNameByName(e.target.value)
        }
        if (e.key === 'Enter') {
            this.props.getEmpAppraisal("", e.target.value)
            this.setState({ showFamilyResult: true, showMaritalstate: true })
        }
    }

    namesOptionshandler = (e) => {
        this.props.globalNameOrId(`${e.target.name} = ${e.target.value}`)
        this.props.getEmpDetails(`${e.target.getAttribute('name')} = ${e.target.value}`)

        this.setState({ showNamesResults: false })
    }


    ds = (e) => {
        this.setState({
            syndicateAdded: false
        })
    }

    addSyndicateHandler = (e) => {
        this.setState({
            syndicateAdded: true
        })
    }




    render() {
        let marStatus = ["اعزب",
            "متزوج",
            "متزوج ويعول",
            "ارمل ويعول",
            "مطلق",
            "أرمل",
            "مطلق ويعول "
        ]
        let militaryStatus = ["لعدم اللياقة البدنية", "اعفاء من الخدمة العامة", "غير معروف", "ادي الخدمه العسكرية", "لم يصبه الدور", "مجند", "معاف مؤقت", "اعفاء نهائى", "أدى الخدمة العامة", "تحت الطلب", "ضابط عامل", "مستثنى من الخدمة", "عسكري سابق", "مستدعى", "تخلف عن التجنيد", "أمين شرطة سابقا", "ضابط سابق في شرطة"]
        let governorate = ["القاهرة", "الاسكندرية", "بورسعيد", "السويس", "البحرالاحمر", "الـوادى الجديد", "مرسى مطروح", "جنوب سيناء", "الاسماعيلية", "البحيرة", "الدقهليـة", "الشرقية", "الغربيـة", "كفرالشيخ", "القليوبيـة", "المنوفيـة", "دميـاط", "الجـيزة", "الفيـوم", "بنى سويف", "المنيـا", "اسيـوط", "سوهاج", "قنـا", "اسوان", "شمال سيناء", "الاقصر", "حلوان", "دول خارجية", "غيرمعروفه"]
        let emp_status = ['على قوة العمل',
            'أستقالة',
            'موقوف',
            'فصل',
            'معاش',
            'معاش مبكر',
            'وفاه',
            'أجازة بدون مرتب',
            'معار',
            'منتدب',
            'نقل',
            'إيقاف للتجنيد',
            'تفرغ',
            'عجز كلي',
            'نقل بقرار وزاري',
            'تعيين شركات شقيقة',
            'إعارة من الشركات للعمل بالشركة',
            'ندب من الشركات للعمل بالشركة',
            'تكليف من الشركات للعمل بالشركة',
        ]
        let syndicate = ['التجاريين',
            'الصحفين',
            'المهندسين',
            'نقابة المهن الاجتماعية',
            'نقابة الأطباء البشرين',
            'اطباء الاسنان',
            'نقابة الأطباء البيطرين',
            'النقابة العامة للنقل البحري',
            'نقابة التطبيقين',
            'البترول',
            'فنون تطبيقية',
            'التمريض',
            'نقابة الصيادلة',
            'الزراعيين                                        ',
            'العلميين',
            'المعلميين',
            'المحامين',
            'العامه للنقل البرى',
            'العلاج الطبيعى',
            'نقابة الفنانين التشكيلين',
            'المهن التعليمية',
            'المهن الرياضية',
            'نقابة المهن الصناعية',
            'المهنيين',
            'النقابة العامة للعاملين بالصناعات الهندسية والمعدن...',
            'العاملين بصناعات البناء والأخشاب',
            'غير محـدد له النقـابه',
            'نقابه الطيارين المدنيين المصريه',
            'النقابة العامة للنقل الجوي',
            'نقابة العاملين بهندسة صيانة الطائرات',
        ]

        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "90%",
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
            <div id="page-wrapper" className="employee">
                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                        <div style={{ height: "100%", width: 600 }} class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                <button onClick={this.addButtonHandler} style={{ float: "left" }} type="button" class="btn btn-primary">إضافة بيانات جديدة</button>
                            </div>
                            <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
                                        <input id="empid" ref="empid" className="form-control" onKeyDown={this.empidHandler} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="number" name="EMPLOYEE_ID" />
                                    </div>
                                    <div className="form-group" controlId="formBasicEmail">
                                        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>
                                        <input className="form-control" onKeyUp={this.nameInputHandler} style={{ background: "white", width: "100%", minWidth: "250px", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <input type="text" class="input-search" placeholder="رقم الأداء" style={{ width: 70, marginLeft: 5 }} />
                            <input type="text" class="input-search" placeholder="الإسم" />
                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {this.state.showNamesResults ?
                            <div>
                                <select onClick={this.namesOptionshandler} style={styles} multiple >
                                    {this.props.empNameByName.length > 0 ? this.props.empNameByName.map((name => (
                                        <option name="NAME_ARABIC">{name.NAME_ARABIC}</option>
                                    ))) : null}
                                </select>
                            </div> : null}
                        {jp.query(this.props.empdetails, '$..emp_image').length > 0 && !this.state.add ?
                            <>
                                <div style={{ width: 760, height: 200, }}>
                                    <img style={{ height: 200, borderTop: 3, float: "left", border: "10px outset  black" }} src={`http://${process.env.REACT_APP_URL}/${jp.query(this.props.empdetails, '$..emp_image')}`} alt="employee_image" width="150" />
                                </div>
                                <div>
                                    <button style={{ transform: "translateX(-300px)", marginTop: 5 }}>
                                        <a href={`http://${process.env.REACT_APP_URL}/${jp.query(this.props.empdetails, '$..box_card')}.pdf`} target="_blank" style={{color: "black"}}>بطاقة الوصف الوظيفي</a>
                                    </button>
                                </div>
                            </>

                            :
                            null
                        }


                        {this.state.add ?
                            <div className="col-lg-12" style={{ background: "transparent", height: "100%", width: "100%" }}>
                                <div className="data-wrapper">
                                    <h3 style={{ marginRight: 20, marginTop: 20, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable"> الإسم</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpNameHandler} ref="nameinput" className="form-control giant-input oneInputMargin add" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >الرقم القومي</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpNidHandler} className="form-control medium-medium-input add" type="number" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">جهة الإصدار</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addPOIssuanceHandler} className="form-control  medium-medium-input threeMediumBigInputsLableMargin add" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">تاريخ الإصدار</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDOIssuanceHandler} className="form-control  medium-medium-input add" type="date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable ">الرقم التأميني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addinsuranceNumHandler} className="form-control medium-input add" type="number" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">مكتب التأمينات</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addinsuranceOfficeHandler} className="form-control medium-input add" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >العنوان</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addAddressHandler} className="form-control giant-input oneInputMargin add" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >ت. المنزل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addHPhoneNumHandler} className="form-control medium-medium-input add" type="number" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable ">ت. المكتب</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addOPhoneNumHandler} className="form-control  medium-medium-input threeMediumBigInputsLableMargin add" type="number" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الموبايل</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMPhoneNumHandler} className="form-control  medium-medium-input threeMediumBigInputsLableMargin add" type="number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">البريد الأليكتروني</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmailNumHandler} className="form-control medium-input add" type="text" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">الحالة الإجتماعية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addMarStatusNumHandler} className="form-control medium-input add" type="text" list="brow90" />
                                                <datalist id="brow90">
                                                    {marStatus.map(marstatus => (
                                                        <option value={marstatus} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">الديانة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addReligousHandler} className="form-control medium-input add" list="brow6" />
                                                <datalist id="brow6">
                                                    <option value='مسلم' />
                                                    <option value='مسيحي' />
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="big-lable towMediumInputsLableMargin">جهة الميلاد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addPobHandler} className="form-control medium-input add" type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable" >الموقف من التجنيد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <select onChange={this.addMirStatusHandler} id="empapp" className="form-control medium-select oneInputMargin add">
                                                    {militaryStatus.map(status => (
                                                        <option>{status}</option>
                                                    ))}
                                                    <option selected>اختر</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.milStatusIsTempEx ?

                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable" >تاريخ انتهاء الإعفاء</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addExmpExpireDate} className="form-control giant-input oneInputMargin add" type="date" />
                                                </div>
                                            </div>
                                        </div>

                                        :
                                        null
                                    }

                                    {this.state.milStatusIsCompleted ?
                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable" >مدة التجنيد</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addDaysCountMirHandler} placeholder="يوم" className="form-control  medium-medium-input add" type="number" />
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addMonthsCountMirHandler} placeholder="شهر" className="form-control  medium-medium-input add" type="number" />
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addYearsCountMirHandler} placeholder="سنة" className="form-control  medium-medium-input add" type="number" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    {this.state.syndicateAdded ?
                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <i onClick={this.ds} class="fas fa-minus" ></i>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable" style={{ marginLeft: -14 }}>نوع النقابة</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addSyndicateTypeNumHandler} className="form-control medium-medium-input add" list="brow50" />
                                                    <datalist id="brow50">
                                                        {syndicate.map(synd => (
                                                            <option value={synd} />
                                                        ))}
                                                    </datalist>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable">رقم العضوية</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addMemberShipNumHandler} className="form-control medium-medium-input threeMediumBigInputsLableMargin add" type="number" />
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable">تاريخ العضوية </label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <input onChange={this.addMemberShipDateHandler} className="form-control medium-medium-input threeMediumBigInputsLableMargin add" type="date" />
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    {this.state.syndicateAdded === false ?
                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <label className="medium-lable" >إضافة نقابة</label>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                    <i onClick={this.addSyndicateHandler} style={{ marginTop: 10 }} class="fas fa-plus" ></i>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                </div>
                                                <div style={{ display: "table-cell" }}>
                                                </div>
                                            </div>
                                        </div>
                                        : null}
                                    <h3 style={{ marginRight: 20, marginTop: 8, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">رقم الأداء</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addEmpIdHandler} className="form-control medium-input add" type="number" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable ">نوع العقد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addContractTypeHandler} className="form-control  medium-input add" list="brow12" />
                                                <datalist id="brow12">
                                                    <option value="أخرى" />
                                                    <option value="دائم" />
                                                    <option value="عقد محدد المده" />
                                                    <option value="مكافأه شامله" />
                                                    <option value="عقد عمل بنظام على مشروع" />
                                                    <option value="معار" />
                                                    <option value="منتدب" />
                                                    <option value="عقد عمال مياومة شركات قطاع" />
                                                    <option value="عقد تدريب" />
                                                    <option value="عقد عمال مياومة من خارج القطاع" />
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable towMediumInputsLableMargin" >تاريخ العقد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addDocHandler} className=" form-control medium-input add" type="date" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable ">المحطة</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addStationHandler} className="form-control  medium-input add" list="brow1" />
                                                <datalist id="brow1">
                                                    {this.props.stations.map(stat => (
                                                        <option value={stat.station_name} />
                                                    ))}
                                                </datalist>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable towMediumInputsLableMargin add" >الحالة الوظيفية</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addJSHandler} className=" form-control medium-input add" list="brow4" />
                                                <datalist id="brow4">
                                                    {emp_status.map(empstatus => (
                                                        <option value={empstatus} />
                                                    ))}
                                                </datalist>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable ">صورة الموظف</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input onChange={this.addpicHandler} type="file" id="myFile" name="filename" className="oneInputMargin " />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <button style={{ marginRight: 100, marginTop: 20, width: 650 }} onClick={this.handleArrToSend} className="btn btn-primary btn-block">إضافة</button>
                                                {this.state.addConfirmed ?
                                                    <div style={{ display: "flex", justifyContent: "space-between", marginRight: 100, marginTop: 20, width: 650 }} role="alert">
                                                        <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15 }} class="fas fa-times-circle"></i>
                                                        هل انت متأكد من إضافة بيانات جديد ؟ <button onClick={this.handleSendData} type="button">تأكيد</button>
                                                    </div>
                                                    : null}
                                                {this.state.showMsg ? this.props.msg === "تم إدخال البيانات بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.props.msg}</div> : this.props.msg === "تم إدخال بيانات هذا الموظف من قبل" ?
                                                    <div id="showmsg" className="alert alert-danger" role="alert">{this.props.msg}</div> : this.state.messege === "رقم الموبايل غير صحيح" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : this.state.messege === "رقم البطاقة غير صحيح" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : null : null}
                                                {this.state.showMsgBeforSend ? this.state.messege === "رقم الموبايل غير صحيح" ? <div id="showmsgbeforsend" className="alert alert-danger" role="alert">{this.state.messege}</div> : this.state.messege === "رقم البطاقة غير صحيح" ? <div id="showmsgbeforsend" className="alert alert-danger" role="alert">{this.state.messege}</div> : null : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :

                            <div className="col-lg-8" style={{ background: "transparent", height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <div className="data-wrapper"  >
                                    {!this.state.edit ?
                                        <Fragment>
                                            <h3 style={{ marginRight: 20, marginTop: 20, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الإسم</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control giant-input" onChange={this.changeHandler} colName={"NAME_ARABIC"} value={jp.query(this.props.empdetails, '$..NAME_ARABIC')} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الرقم القومي</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input" onChange={this.changeHandler} colName={"NATIONAL_ID_CARD_NO"} value={jp.query(this.props.empdetails, '$..NATIONAL_ID_CARD_NO')} type="number" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">جهة الإصدار</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input" onChange={this.changeHandler} colName={"NATIONAL_ID_CARD_ISSUED_BY"} value={jp.query(this.props.empdetails, '$..NATIONAL_ID_CARD_ISSUED_BY')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">تاريخ الإصدار</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control  medium-medium-input" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].addressgov : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                        <input className="form-control medium-medium-input" list="brow300" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} value={jp.query(this.props.empdetails, '$..addressgov')} type="text" />
                                                        <datalist id="brow300">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الرقم التأميني</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" onChange={this.changeHandler} colName={"SOCIAL_INSURANCE_NUMBER"} value={jp.query(this.props.empdetails, '$..SOCIAL_INSURANCE_NUMBER')} type="number" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">مكتب التأمينات</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" onChange={this.changeHandler} colName={"INSURANCE_OFFICE"} value={jp.query(this.props.empdetails, '$..INSURANCE_OFFICE')} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">العنوان</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control giant-input oneInputMargin" onChange={this.changeHandler} colName={"ADDRESS"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].ADDRESS : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                    </div> */}
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">العنوان</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input" onChange={this.changeHandler} colName={"ADDRESS"} value={jp.query(this.props.empdetails, '$..ADDRESS')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">المنطقة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"NATIONAL_ID_CARD_ISSUED_BY"} value={jp.query(this.props.empdetails, '$..NATIONAL_ID_CARD_ISSUED_BY')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">المحافظة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control  medium-medium-input" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].addressgov : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                        <input className="form-control medium-medium-input" list="brow300" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} value={jp.query(this.props.empdetails, '$..addressgov')} type="text" />
                                                        <datalist id="brow300">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">ت. المنزل</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>

                                                        <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_2_HOME"} value={jp.query(this.props.empdetails, '$..PHONE_2_HOME') || "لا توجد بيانات"} type="number" />


                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">ت. المكتب</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {this.state.edit ?
                                                            <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_1_OFFICE"} value={jp.query(this.props.empdetails, '$..PHONE_1_OFFICE')} type="number" />
                                                            :
                                                            <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_1_OFFICE"} value={jp.query(this.props.empdetails, '$..PHONE_1_OFFICE')} type="number" />
                                                        }
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الموبايل</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PHONE_3_MOBILE"} value={jp.query(this.props.empdetails, '$..PHONE_3_MOBILE')} type="number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">البريد الأليكتروني</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" onChange={this.changeHandler} colName={"EMP_EMAIL"} value={jp.query(this.props.empdetails, '$..EMP_EMAIL')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">الحالة الإجتماعية</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control medium-input" onChange={this.changeHandler} colName={"MARITAL_STATUS"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].maritalstatear : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                        <input className="form-control medium-input" list="brow90" onChange={this.changeHandler} colName={"MARITAL_STATUS"} value={jp.query(this.props.empdetails, '$..maritalstatear')} type="text" />
                                                        <datalist id="brow90">
                                                            {marStatus.map(marstatus => (
                                                                <option value={marstatus} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">نوع النقابة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"SYNDICATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].syndicatear : null : null} readOnly={!this.state.edit} type="text" /> */}
                                                        <input className="form-control medium-medium-input" list="brow50" onChange={this.changeHandler} colName={"SYNDICATE"} value={jp.query(this.props.empdetails, '$..syndicatear')} type="text" />
                                                        <datalist id="brow50">
                                                            {syndicate.map(synd => (
                                                                <option value={synd} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">رقم العضوية</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"SYNDICATE_REGISTERATION"} value={jp.query(this.props.empdetails, '$..SYNDICATE_REGISTERATION')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">تاريخ العضوية </label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"SYNDICATE_REGISTERATION_DATE"} value={jp.query(this.props.empdetails, '$..SYNDICATE_REGISTERATION_DATE')} type="date" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">موقف التجنيد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control small-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input  className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">تاريخ التقاعد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" />
                                            </div>
                                        </div>
                                    </div> */}
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">النوع</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" list="brow5" onChange={this.changeHandler} colName={"GENDER"} value={jp.query(this.props.empdetails, '$..genderar')} type="text" />
                                                        <datalist id="brow5">
                                                            <option value='ذكر' />
                                                            <option value='أنثى' />
                                                        </datalist>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable towMediumInputsLableMargin">الديانة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" list="brow6" onChange={this.changeHandler} colName={"RELIGION"} value={jp.query(this.props.empdetails, '$..religinar')} type="text" />
                                                        <datalist id="brow6">
                                                            <option value='مسلم' />
                                                            <option value='مسيحي' />
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable ">تاريخ الميلاد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"BIRTH_DATE"} value={jp.query(this.props.empdetails, '$..BIRTH_DATE')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">جهة الميلاد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"PLACE_OF_BIRTH"} value={jp.query(this.props.empdetails, '$..PLACE_OF_BIRTH')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">محافظة الميلاد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" list="brow3" onChange={this.changeHandler} colName={"GOVERNORATE_OF_BIRTH"} value={jp.query(this.props.empdetails, '$..birthGov')} type="text" />
                                                        <datalist id="brow3">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable ">السن</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" value={this.handleAge(jp.query(this.props.empdetails, '$..BIRTH_DATE')).days()} placeholder="يوم" type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable"></label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" value={this.handleAge(jp.query(this.props.empdetails, '$..BIRTH_DATE')).months()} placeholder="شهر" type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable"></label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" list="brow3" value={this.handleAge(jp.query(this.props.empdetails, '$..BIRTH_DATE')).years()} placeholder="سنة" type="text" />
                                                        <datalist id="brow3">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">رقم الأداء</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control small-input" onChange={this.changeHandler} colName={'EMPLOYEE_ID'} value={jp.query(this.props.empdetails, '$..EMPLOYEE_ID')} type="number" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin" style={{ marginRight: 270 }} >تاريخ العقد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" onChange={this.changeHandler} colName={"SECTOR_JOIN_DATE"} value={jp.query(this.props.empdetails, '$..sectorjoindate')} type="date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">تاريخ التعيين</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input" list="brow50" value={jp.query(this.props.empdetails, '$..TRANS_DATE')} type="date" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">تاريخ التقاعد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" colName={"RETIRE_DATE"} value={jp.query(this.props.empdetails, '$..SYNDICATE_REGISTERATION')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الوظيفة الحالية </label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} value={jp.query(this.props.empdetails, '$..J_D_NAME')} type="text" />
                                                    </div>
                                                </div>
                                            </div>


                                            <div style={{ display: "table" }}>

                                                <div style={{ display: "table-row" }}>

                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">المسمى الوظيفي</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control giant-input oneInputMargin" onChange={this.changeHandler} colName={"JOB_ASSIGNMENT_FORM"} value={jp.query(this.props.empdetails, '$..SUP_BOX_NAME')} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>

                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">طريقة شغلها</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" onChange={this.changeHandler} colName={"MAIN_BOX_NAME"} value={jp.query(this.props.empdetails, '$..JOB_ASSIGNMENT_FORM_ARABIC')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">تاريخ شغلها</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" value={jp.query(this.props.empdetails, '$..curjobname')} type="date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الإدارة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control giant-input oneInputMargin" onChange={this.changeHandler} colName={"SUP_BOX_NAME"} value={jp.query(this.props.empdetails, '$..CAT_NAME')} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">المحطة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {this.state.edit ?
                                                            <input className="form-control  small-input" colName={"JOB_LOCATION"} onChange={this.changeHandler} value={jp.query(this.props.empdetails, '$..joblocation')} type="text" />
                                                            :
                                                            <input className="form-control  small-input" colName={"JOB_LOCATION"} onChange={this.changeHandler} value={jp.query(this.props.empdetails, '$..joblocation')} type="text" />
                                                        }
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable threeSmallLableMargin">المنطقة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  small-input" onChange={this.changeHandler} colName={"JOB_AREA"} value={jp.query(this.props.empdetails, '$..jobarea')} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable threeSmallLableMargin">المحافظة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control  small-input" onChange={this.changeHandler} colName={"JOB_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].jobGov : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                        <input className="form-control small-input" list="brow300" onChange={this.changeHandler} colName={"JOB_GOVERNORATE"} value={jp.query(this.props.empdetails, '$..jobGov')} type="text" />
                                                        <datalist id="brow300">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">نوع التخصص</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>

                                                        <input className="form-control medium-input" onChange={this.changeHandler} colName={"G_NAME"} value={jp.query(this.props.empdetails, '$..gname')} type="text" list="brow450" />
                                                        <datalist id="brow450">
                                                            {emp_status.map(empstatus => (
                                                                <option value={empstatus} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">الحالة الوظيفية</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {this.state.edit ?
                                                            <input className="form-control medium-input" onChange={this.changeHandler} colName={"EMP_STATUS"} value={jp.query(this.props.empdetails, '$..empstatusar')} type="text" />
                                                            :
                                                            <input className="form-control medium-input" onChange={this.changeHandler} colName={"EMP_STATUS"} value={jp.query(this.props.empdetails, '$..empstatusar')} type="text" />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <h3 style={{ marginRight: 20, marginTop: 20, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الشخصية</h3>

                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable" >الإسم</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input ref="nameinput" className="giant-input oneInputMargin edit" onChange={this.changeHandler} colName={"NAME_ARABIC"} placeholder={jp.query(this.props.empdetails, '$..NAME_ARABIC')} readOnly={!this.state.edit} type="text" style={{ marginBottom: 10 }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الرقم القومي</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input edit" onChange={this.changeHandler} colName={"NATIONAL_ID_CARD_NO"} placeholder={jp.query(this.props.empdetails, '$..NATIONAL_ID_CARD_NO')} readOnly={!this.state.edit} type="number" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">جهة الإصدار</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input edit" onChange={this.changeHandler} colName={"NATIONAL_ID_CARD_ISSUED_BY"} placeholder={jp.query(this.props.empdetails, '$..NATIONAL_ID_CARD_ISSUED_BY')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">تاريخ الإصدار</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control  medium-medium-input" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].addressgov : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                        <input className="form-control medium-medium-input edit" list="brow300" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} placeholder={jp.query(this.props.empdetails, '$..addressgov')} readOnly={!this.state.edit} type="date" />
                                                        <datalist id="brow300">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الرقم التأميني</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"SOCIAL_INSURANCE_NUMBER"} placeholder={jp.query(this.props.empdetails, '$..SOCIAL_INSURANCE_NUMBER')} readOnly={!this.state.edit} type="number" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">مكتب التأمينات</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"INSURANCE_OFFICE"} placeholder={jp.query(this.props.empdetails, '$..INSURANCE_OFFICE')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">العنوان</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control giant-input oneInputMargin" onChange={this.changeHandler} colName={"ADDRESS"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].ADDRESS : null : null} readOnly={!this.state.edit} type="text" />
                                            </div>
                                        </div>
                                    </div> */}
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">العنوان</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input edit" onChange={this.changeHandler} colName={"ADDRESS"} placeholder={jp.query(this.props.empdetails, '$..ADDRESS')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">المنطقة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"NATIONAL_ID_CARD_ISSUED_BY"} placeholder={jp.query(this.props.empdetails, '$..NATIONAL_ID_CARD_ISSUED_BY')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">المحافظة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control  medium-medium-input" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].addressgov : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                        <input className="form-control medium-medium-input edit" list="brow300" onChange={this.changeHandler} colName={"ADDRESS_GOVERNORATE"} placeholder={jp.query(this.props.empdetails, '$..addressgov')} readOnly={!this.state.edit} type="text" />
                                                        <datalist id="brow300">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">ت. المنزل</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>

                                                        {this.state.edit ?

                                                            <input className="form-control medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"PHONE_2_HOME"} placeholder={jp.query(this.props.empdetails, '$..PHONE_2_HOME')} readOnly={!this.state.edit} type="number" />
                                                            :
                                                            <input className="form-control medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"PHONE_2_HOME"} placeholder={jp.query(this.props.empdetails, '$..PHONE_2_HOME')} readOnly={!this.state.edit} type="number" />

                                                        }
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">ت. المكتب</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {this.state.edit ?
                                                            <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"PHONE_1_OFFICE"} placeholder={jp.query(this.props.empdetails, '$..PHONE_1_OFFICE')} readOnly={!this.state.edit} type="number" />
                                                            :
                                                            <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"PHONE_1_OFFICE"} placeholder={jp.query(this.props.empdetails, '$..PHONE_1_OFFICE')} readOnly={!this.state.edit} type="number" />
                                                        }
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الموبايل</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"PHONE_3_MOBILE"} placeholder={jp.query(this.props.empdetails, '$..PHONE_3_MOBILE')} readOnly={!this.state.edit} type="number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">البريد الأليكتروني</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"EMP_EMAIL"} placeholder={jp.query(this.props.empdetails, '$..EMP_EMAIL')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">الحالة الإجتماعية</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control medium-input" onChange={this.changeHandler} colName={"MARITAL_STATUS"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].maritalstatear : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                        <input className="form-control medium-input edit" list="brow90" onChange={this.changeHandler} colName={"MARITAL_STATUS"} placeholder={jp.query(this.props.empdetails, '$..maritalstatear')} readOnly={!this.state.edit} type="text" />
                                                        <datalist id="brow90">
                                                            {marStatus.map(marstatus => (
                                                                <option value={marstatus} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">نوع النقابة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} colName={"SYNDICATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].syndicatear : null : null} readOnly={!this.state.edit} type="text" /> */}
                                                        <input className="form-control medium-medium-input edit" list="brow50" onChange={this.changeHandler} colName={"SYNDICATE"} placeholder={jp.query(this.props.empdetails, '$..syndicatear')} readOnly={!this.state.edit} type="text" />
                                                        <datalist id="brow50">
                                                            {syndicate.map(synd => (
                                                                <option value={synd} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">رقم العضوية</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"SYNDICATE_REGISTERATION"} placeholder={jp.query(this.props.empdetails, '$..SYNDICATE_REGISTERATION')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">تاريخ العضوية </label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"SYNDICATE_REGISTERATION_DATE"} placeholder={jp.query(this.props.empdetails, '$..SYNDICATE_REGISTERATION_DATE')} readOnly={!this.state.edit} type="date" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div style={{ display: "table" }}>
                                        <div style={{ display: "table-row" }}>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">موقف التجنيد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control small-input" placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].JOB_LOCATION : null : null} type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input  className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" readonly="readonly" />
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <label className="medium-lable">تاريخ التقاعد</label>
                                            </div>
                                            <div style={{ display: "table-cell" }}>
                                                <input className="form-control  small-input" type="text" />
                                            </div>
                                        </div>
                                    </div> */}
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">النوع</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" list="brow5" onChange={this.changeHandler} colName={"GENDER"} placeholder={jp.query(this.props.empdetails, '$..genderar')} readOnly={!this.state.edit} type="text" />
                                                        <datalist id="brow5">
                                                            <option value='ذكر' />
                                                            <option value='أنثى' />
                                                        </datalist>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable towMediumInputsLableMargin">الديانة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" list="brow6" onChange={this.changeHandler} colName={"RELIGION"} placeholder={jp.query(this.props.empdetails, '$..religinar')} readOnly={!this.state.edit} type="text" />
                                                        <datalist id="brow6">
                                                            <option value='مسلم' />
                                                            <option value='مسيحي' />
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable ">تاريخ الميلاد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"BIRTH_DATE"} placeholder={jp.query(this.props.empdetails, '$..BIRTH_DATE')} readOnly={!this.state.edit} type="date" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">جهة الميلاد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin edit" onChange={this.changeHandler} colName={"PLACE_OF_BIRTH"} placeholder={jp.query(this.props.empdetails, '$..PLACE_OF_BIRTH')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">محافظة الميلاد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input threeMediumBigInputsLableMargin edit" list="brow3" onChange={this.changeHandler} colName={"GOVERNORATE_OF_BIRTH"} placeholder={jp.query(this.props.empdetails, '$..birthGov')} readOnly={!this.state.edit} type="text" />
                                                        <datalist id="brow3">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <h3 style={{ marginRight: 20, marginTop: 3, textAlign: "right", fontFamily: 'Markazi Text ,serif', fontWeight: 700 }}>البيانات الوظيفية</h3>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">رقم الأداء</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control small-input" onChange={this.changeHandler} colName={'EMPLOYEE_ID'} placeholder={jp.query(this.props.empdetails, '$..EMPLOYEE_ID')} type="number" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin" style={{ marginRight: 270 }} >تاريخ العقد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input" onChange={this.changeHandler} colName={"SECTOR_JOIN_DATE"} placeholder={jp.query(this.props.empdetails, '$..sectorjoindate')} type="date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">تاريخ التعيين</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-medium-input" list="brow50" placeholder={jp.query(this.props.empdetails, '$..TRANS_DATE')} type="date" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">تاريخ التقاعد</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" colName={"RETIRE_DATE"} placeholder={jp.query(this.props.empdetails, '$..SYNDICATE_REGISTERATION')} type="date" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الوظيفة الحالية </label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  medium-medium-input threeMediumBigInputsLableMargin" onChange={this.changeHandler} placeholder={jp.query(this.props.empdetails, '$..J_D_NAME')} type="text" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div style={{ display: "table" }}>

                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الوظيفة الحالية</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"MAIN_BOX_NAME"} placeholder={jp.query(this.props.empdetails, '$..J_D_NAME')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">المسمى الوظيفي</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"JOB_ASSIGNMENT_FORM"} placeholder={jp.query(this.props.empdetails, '$..SUP_BOX_NAME')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>

                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">طريقة شغلها</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"MAIN_BOX_NAME"} placeholder={jp.query(this.props.empdetails, '$..JOB_ASSIGNMENT_FORM_ARABIC')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">تاريخ شغلها</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control medium-input edit" placeholder={jp.query(this.props.empdetails, '$..curjobname')} readOnly={!this.state.edit} type="date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">الإدارة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control giant-input oneInputMargin edit" onChange={this.changeHandler} colName={"SUP_BOX_NAME"} placeholder={jp.query(this.props.empdetails, '$..CAT_NAME')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">المحطة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {this.state.edit ?
                                                            <input className="form-control  small-input edit" colName={"JOB_LOCATION"} onChange={this.changeHandler} placeholder={jp.query(this.props.empdetails, '$..joblocation')} readOnly={!this.state.edit} type="text" />
                                                            :
                                                            <input className="form-control  small-input edit" colName={"JOB_LOCATION"} onChange={this.changeHandler} placeholder={jp.query(this.props.empdetails, '$..joblocation')} readOnly={!this.state.edit} type="text" />
                                                        }
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable threeSmallLableMargin">المنطقة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <input className="form-control  small-input edit" onChange={this.changeHandler} colName={"JOB_AREA"} placeholder={jp.query(this.props.empdetails, '$..jobarea')} readOnly={!this.state.edit} type="text" />
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable threeSmallLableMargin">المحافظة</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {/* <input className="form-control  small-input" onChange={this.changeHandler} colName={"JOB_GOVERNORATE"} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].jobGov : null : null} readOnly={!this.state.edit} type="text" /> */}

                                                        <input className="form-control small-input edit" list="brow300" onChange={this.changeHandler} colName={"JOB_GOVERNORATE"} placeholder={jp.query(this.props.empdetails, '$..jobGov')} readOnly={!this.state.edit} type="text" />
                                                        <datalist id="brow300">
                                                            {governorate.map(gov => (
                                                                <option value={gov} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "table" }}>
                                                <div style={{ display: "table-row" }}>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="medium-lable">نوع التخصص</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>

                                                        <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"G_NAME"} placeholder={jp.query(this.props.empdetails, '$..gname')} readOnly={!this.state.edit} type="text" list="brow450" />
                                                        <datalist id="brow450">
                                                            {emp_status.map(empstatus => (
                                                                <option value={empstatus} />
                                                            ))}
                                                        </datalist>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        <label className="big-lable towMediumInputsLableMargin">الحالة الوظيفية</label>
                                                    </div>
                                                    <div style={{ display: "table-cell" }}>
                                                        {this.state.edit ?
                                                            <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"EMP_STATUS"} placeholder={jp.query(this.props.empdetails, '$..empstatusar')} readOnly={!this.state.edit} type="text" />
                                                            :
                                                            <input className="form-control medium-input edit" onChange={this.changeHandler} colName={"EMP_STATUS"} placeholder={jp.query(this.props.empdetails, '$..empstatusar')} readOnly={!this.state.edit} type="text" />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    }

                                    {this.state.edit ?
                                        <div style={{ display: "table" }}>
                                            <div style={{ display: "table-row" }}>
                                                <div style={{ display: "table-cell" }}>
                                                    <button style={{ marginRight: 100, marginTop: 20, width: 650 }} onClick={this.handleChange} className="btn btn-primary btn-block">تعديل</button>
                                                    {this.state.EditConfirmed ?
                                                        <div style={{ display: "flex", justifyContent: "space-between", marginRight: 100, marginTop: 20, width: 650 }} class="alert alert-warning" role="alert">
                                                            <i onClick={this.closeAddConfirmHandler} style={{ fontSize: 15 }} class="fas fa-times-circle"></i>
                                                            هل انت متأكد من إضافة بيانات جديد ؟ <input onClick={this.handleSendDataToChange} type="button" value="تأكيد" />
                                                        </div>
                                                        : null}

                                                    {this.state.showMsgOfChange ? this.state.messege === "تم إدخال البيانات بنجاح" ? <div id="showMsgOfChange" className="alert alert-success" role="alert"> {this.state.messege}</div> : this.state.messege === "يوجد خطاء بقاعدة البيانات" ? <div id="showMsgOfChange" className="alert alert-danger" role="alert">{this.state.messege}</div> : this.state.messege === "رقم البطاقة غير صحيح" ? <div id="showMsgOfChange" className="alert alert-danger" role="alert">{this.state.messege}</div> : this.state.messege === "البيانات غير كاملة" ? <div id="showMsgOfChange" className="alert alert-danger" role="alert">{this.state.messege}</div> : null : null}
                                                    {this.state.showMsg ? this.state.messege === "تم إدخال التدريب بنجاح" ? <div id="showmsg" className="alert alert-success" role="alert"> {this.state.messege}</div> : this.state.messege === "يوجد خطاء بقاعدة البيانات" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : this.state.messege === "يجب إدخال أي من الإسم ورقم الأداء" ? <div id="showmsg" className="alert alert-danger" role="alert">{this.state.messege}</div> : null : null}

                                                </div>
                                            </div>
                                        </div>
                                        :
                                        null
                                    }
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "650" }}>
                                        <button onClick={this.addButtonHandler} style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170, background: "#4f4f63", color: "white" }} type="button" class="btn btn-outline btn-lg btn-primary">إضافة موظف جديد</button>
                                        <button onClick={this.clickHandler} style={{ display: "block", border: "1px solid black", marginTop: 5, minWidth: 170, background: "#4f4f63", color: "white" }} type="button" class="btn btn-outline btn-lg btn-primary">تعديل البيانات</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>


                </div>



            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        empdetails: state.posts.empdetails,
        empNameByName: state.posts.empNameByName,
        msg: state.posts.msg,
        stations: state.posts.stations

    };
};
export default connect(mapStateToProps, {
    getEmpDetails, globalNameOrId, getStations, getEmpTrans, getUpJd, getEmpAppraisal, getEmpTraining, getEmpEdu, getEmpFamily, getEmpNameByName, getEmpExp, newEmp, editEmpDetails, newEmpImg, getempspenalties
})(Employee);