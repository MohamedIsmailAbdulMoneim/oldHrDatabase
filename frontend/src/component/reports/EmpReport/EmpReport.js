import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import axios from 'axios';
import download from 'js-file-download';
import { getEmpDetails, globalNameOrId } from '../../../actions/Actions'
import { getEmpEdu, getEmpTrans, getEmpAppraisal, getEmpExp } from '../../../actions/TransActions'
import SearchBox from './SearchBox';
import { initJsPath } from './methods';
import moment from "moment";
const jp = require('jsonpath');

const EmpReport = () => {
    const dispatch = useDispatch()
    const { empTrans, empApp, empexp, empEdu } = useSelector((state) => state.trans)
    const empdetails = useSelector((state) => state.posts.empdetails)
    const getUserInput = (e) => {
        if (e.key === 'Enter') {
            const arg = e.target.name === 'EMPLOYEE_ID' ? `${e.target.name} = ${e.target.value}` : `${e.target.name} = "${e.target.value}"`
            const arg2 = `employee_appraisal.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE ${arg})`
            dispatch(getEmpDetails(arg))
            dispatch(globalNameOrId(arg))
            dispatch(getEmpTrans(arg))
            dispatch(getEmpEdu(arg))
            dispatch(getEmpAppraisal(arg2))
            dispatch(getEmpExp(`employee_experince.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE ${arg})`))
        }
    }
    const handleExpTime = (startDate, empexp) => {

        function handleMoment(start, end) {
            const startMoment = moment(start)
            const endDate = end ?? `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
            const endMoment = moment(endDate);
            const diff = endMoment.diff(startMoment)
            const diffDuration = moment.duration(diff)
            return { diffDuration, diff };
        }

        let editjobdesc = empTrans.find(el => el.JOB_ASSIGNMENT_FORM === 16) || []
        const diffDurationWithout = handleMoment(startDate)
        const diffDurationWith = handleMoment(editjobdesc.TRANS_DATE)
        const objOfEndAndStart = [{ name: 'militer', code: 1 }, { name: 'outer', code: 3 }, { name: 'inner', code: 4 }]
            .reduce((prev, cur) => {
                const query = empexp.filter(el => el.EXP_TYP_CODE === cur.code)
                prev[cur.name] = { start: query[0]?.START_DATE || 0, end: query[0]?.END_DATE || 0 }
                return prev;
            }, {})
        const diffDurationMiliter = handleMoment(objOfEndAndStart.militer.start, objOfEndAndStart.militer.end)
        const diffDurationInner = handleMoment(objOfEndAndStart.inner.start, objOfEndAndStart.inner.end)
        const diffDurationOuter = handleMoment(objOfEndAndStart.outer.start, objOfEndAndStart.outer.end)

        let total = diffDurationWith.diff > 0 ?
            moment.duration(diffDurationWith.diff + diffDurationMiliter.diff + diffDurationInner.diff + diffDurationOuter.diff)
            : moment.duration(diffDurationWithout.diff + diffDurationMiliter.diff + diffDurationInner.diff + diffDurationOuter.diff)

        return ([diffDurationWithout.diffDuration, editjobdesc.TRANS_DATE ? diffDurationWith.diffDuration : {
            days: function () {
                return 0;
            }, months: function () {
                return 0;
            }, years: function () {
                return 0;
            }
        },
        diffDurationMiliter.diffDuration, diffDurationOuter.diffDuration, diffDurationInner.diffDuration, total
        ]);
    }

    const argu = {
        empdetails: {
            data: ['EMPLOYEE_ID', 'NAME_ARABIC', 'BIRTH_DATE', 'genderar', 'religinar',
                'maritalstatear', 'SOCIAL_INSURANCE_NUMBER', 'milstatus', 'NATIONAL_ID_CARD_NO',
                'emp_image', 'ADDRESS', 'SUP_BOX_NAME', 'CAT_NAME', 'curjobdate', 'TRANS_DATE_First',
                'SECTOR_JOIN_DATE', 'contacttype', 'SYNDICATE_REGISTERATION', 'NATIONAL_ID_CARD_EXPIRE_DATE'
            ]
        },
        empEdu: {
            data: [
                'DEGREE_ARABIC', 'SPECIALITY_ARABIC', 'SPECIALITY_DETAIL_ARABIC', 'GRADE_ARABIC',
                'GRADUATION_YEAR', 'UNIVERSITY_SCHOOL_ARABIC'
            ]
        }
    }
    const handleExpFunc = handleExpTime(empTrans[0]?.TRANS_DATE, empexp)
    const data = {
        ...initJsPath(argu, empdetails, empEdu),
        empexp, empTrans, empApp,
        expCompanyWithoutD: handleExpFunc[0].days(),
        expCompanyWithD: handleExpFunc[1].days(),
        expMiliterD: handleExpFunc[2].days(),
        expOutD: handleExpFunc[3].days(),
        expInnerD: handleExpFunc[4].days(),
        totalExpD: handleExpFunc[5].days(),
        expCompanyWithoutM: handleExpFunc[0].months(),
        expCompanyWithM: handleExpFunc[1].months(),
        expMiliterM: handleExpFunc[2].months(),
        expOutM: handleExpFunc[3].months(),
        expInnerM: handleExpFunc[4].months(),
        totalExpM: handleExpFunc[5].months(),
        expCompanyWithoutY: handleExpFunc[0].years(),
        expCompanyWithY: handleExpFunc[1].years(),
        expMiliterY: handleExpFunc[2].years(),
        expOutY: handleExpFunc[3].years(),
        expInnerY: handleExpFunc[4].years(),
        totalExpY: handleExpFunc[5].years(),
    }

    useEffect(() => {
        if (empTrans.length > 0 && empApp.length > 0 && empEdu.length > 0 && empdetails.length > 0) {
            axios({
                method: "POST",
                data,
                withCredentials: true,
                responseType: 'arraybuffer',
                url: `http://${process.env.REACT_APP_URL}/getEmpReport`,
            }).then(resp => {
                download(resp.data, '2.xlsx');
            });
        }
    }, [JSON.stringify(data)])

    return (

        <SearchBox getUserInput={getUserInput} />

    )
}

export default EmpReport;