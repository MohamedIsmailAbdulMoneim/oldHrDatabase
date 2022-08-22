import {
  NEW_APPRAISAL, updatetrans, fetchEmpTrans, updateAppraisal, fetchEmpFamily,
  FETCHEMPEXP, NEW_EXP, fetchEmpPenalties, postNewFamilyMember, postNewTrans, postEmpEdu, fetchEmpEdu, fetchEmpTraining, deleteTraining, deleteFamily,
  deletePenalty, deleteTrans, deleteAppraisal, deleteExperience, deleteEdu, fetchEmpAppraisal, addEmpTraining, updateExperience, editEmpFamily

} from "../actions/ActionTypes";
import axios from "../shared/axiosInterceptor";



/* --------------------------------Experience------------------- */


export const newEmpExp = (data) => (dispatch) => {
  axios({
    method: "POST",
    data: data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/newempexp`,
    headers: { "Content-Type": "application/json" },
  }).then(res => {
    console.log(res.data);
    dispatch({
      type: NEW_EXP,
      payload: {
        data: res.data.data,
        msg: res.data.msg
      }
    })
  })
}

export const getEmpExp = (data) => (dispatch) => {
  console.log('hit');
  axios.get(`http://${process.env.REACT_APP_URL}/getempexp/?data=${data}`).then(res => {
    dispatch({
      type: FETCHEMPEXP,
      payload: res.data
    })
  })
}

export const editeEmpExperience = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: `http://${process.env.REACT_APP_URL}/editempexp`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: updateExperience,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}


export const deleteEmpExperience = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: `http://${process.env.REACT_APP_URL}/deleteexp`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deleteExperience,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}


/* ----------------------end-----of-----Experience------------------- */

/*---------------------Appraisal--------------------------------*/


export const getEmpAppraisal = (data) => (dispatch) => {
  
  if (data != 1) {
    axios.get(`http://${process.env.REACT_APP_URL}/empappraisal/?data=${data}`).then(res => {
      console.log(res.data);
      dispatch({
        type: fetchEmpAppraisal,
        payload: res.data
      })
    })
  }

}

export const newAppraisal = (obj) => (dispatch) => {

  axios({
    method: "POST",
    data: obj,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/empappraisal`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: NEW_APPRAISAL,
      payload: {
        data: res.data.data,
        msg: res.data.msg
      }
    })
  })
}


export const updateEmpAppraisal = (obj) => (dispatch) => {
  axios({
    method: "PUT",
    data: obj,
    url: `http://${process.env.REACT_APP_URL}/appraisalupdate`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    console.log(data.data.data[1]);
    dispatch({
      type: updateAppraisal,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}

export const deleteEmpAppraisal = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: `http://${process.env.REACT_APP_URL}/deleteappraisal`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deleteAppraisal,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}

/*----------end-------of----Appraisal--------------------------------*/

/*-------------------Transactiom--------------------------------*/

export const insertNewTrans = (data) => (dispatch) => {
  axios({
    method: "POST",
    data: data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/postnewtrans`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    dispatch({
      type: postNewTrans,
      payload: res.data
    })
  })
}

export const getEmpTrans = (data) => (dispatch) => {
  let nameOrId = `(SELECT NATIONAL_ID_CARD_NO FROM employee WHERE ${data})`

  axios.get(`http://${process.env.REACT_APP_URL}/getemptrans/?nameOrId=${nameOrId}`).then(res => {
    dispatch({
      type: fetchEmpTrans,
      payload: res.data
    })
  })
  dispatch(getEmpAppraisal(1))
}

export const updateEmpTrans = (obj) => (dispatch) => {
  axios({
    method: "PUT",
    data: obj,
    url: `http://${process.env.REACT_APP_URL}/updateemptrans`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    console.log(data);
    dispatch({
      type: updatetrans,
      payload: data.data
    })
  })
}

export const deleteEmpTrans = (query) => (dispatch) => {
  axios({
    method: "PUT",
    data: query,
    url: `http://${process.env.REACT_APP_URL}/deletetrans`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    console.log(data);
    dispatch({
      type: deleteTrans,
      payload: { data: data.data.data[2], result: data.data.status }
    })
  })
}

/*------------end---of----Transactiom--------------------------------*/



/* -------------------------Education-------------------------*/

export const InsertNewEdu = (data) => (dispatch) => {
  axios({
    method: "POST",
    data: data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/postnewempedu`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: postEmpEdu,
      payload: res.data
    })
  })
}

export const getEmpEdu = (data) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getempedu/?data=${data}`).then(res => {
    dispatch({
      type: fetchEmpEdu,
      payload: res.data
    })
  })
}

export const deleteEmpEdu = (id, nat) => (dispatch) => {
  axios({
    method: "PUT",
    data: id,
    url: `http://${process.env.REACT_APP_URL}/deleteedu`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deleteEdu,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}

/* ------------------end---of----Education-------------------------*/


/*-----------------------Family--------------------------------*/

export const submitNewFamily = (data) => async (dispatch) => {
  let res = await axios({
    method: "POST",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/newfamily`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: postNewFamilyMember,
      payload: res.data
    })
  })
  return res;
}

export const getEmpFamily = (empid, empname) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getempfamily/?empid=${empid}&empname=${empname}`).then(res => {
    dispatch({
      type: fetchEmpFamily,
      payload: res.data
    })
  })

}

export const updateEmpFamily = (data) => (dispatch) => {

  axios({
    method: "PUT",
    data: data,
    url: `http://${process.env.REACT_APP_URL}/editfamily`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    console.log(data.data.data[1]);
    dispatch({
      type: editEmpFamily,
      payload: { data: data.data.data[1], result: data.data.status }
    })
    // if (data.data.msg === "تم إدخال البيانات بنجاح") {
    //     this.setState({
    //         updated: true
    //     })
    // } else {
    //     this.setState({
    //         updated: false
    //     })
    // }
  })
}

export const deleteEmpFamily = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: `http://${process.env.REACT_APP_URL}/deleteempfamily`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deleteFamily,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}

/*-----------------end---of---Family--------------------------------*/

/*-----------------------Penalty--------------------------------*/

export const getempspenalties = (data) => (dispatch) => {

  axios.get(`http://${process.env.REACT_APP_URL}/getempspenalties/?data=${data}`).then(res => {
    console.log(res.data);

    dispatch({
      type: fetchEmpPenalties,
      payload: res.data
    })
  })

}

export const deleteEmpPenalty = (id) => (dispatch) => {
  axios({
    method: "PUT",
    data: id,
    url: `http://${process.env.REACT_APP_URL}/deletepenalty`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    dispatch({
      type: deletePenalty,
      payload: { data: data.data, result: data.data.status }
    })
  })
}

/*------------end-----of------Penalty--------------------------------*/


/*-----------------------Training--------------------------------*/

export const insertEmpTraining = (data) => (dispatch) => {
  axios({
    method: "POST",
    data: data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/postnewtraining`,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      dispatch({
        type: addEmpTraining,
        payload: res.data
      })
    })
}

export const getEmpTraining = (nameOrId) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getemptraining/?nameOrId=${nameOrId}`).then(res => {
    dispatch({
      type: fetchEmpTraining,
      payload: res.data
    })
  })
}

export const deleteEmpTraining = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data: data,
    url: `http://${process.env.REACT_APP_URL}/deleteemptraining`,
    headers: { "Content-Type": "application/json" },
  }).then(data => {
    console.log(data.data.data[1]);
    dispatch({
      type: deleteTraining,
      payload: { data: data.data.data[1], result: data.data.status }
    })
  })
}

/*-----------------------end of Training--------------------------------*/
