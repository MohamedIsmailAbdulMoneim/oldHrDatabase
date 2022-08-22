import {
  fetchJobDgreeCodes,
  fetchMainCodes,
  fetchCates,
  insertCates,
  fetchJobByCat,
  fetchSupBoxNamesandmanager,
  fetchJobGovern,
  fetchJobStation,
  fetchEmpStationAndGovern,
  fetchDeps,
  fetchEmpByDeps,
  fetchEmpName,
  fetchEmpNameByName,
  fetchOutsourceEmpNameByName,
  fetchCurrentjd,
  fetchavailjd,
  fetchavailsupbox,
  fetchupjd,
  fetchEmpDetails,
  fetchDownJd,
  fetchqn,
  fetchemps,
  fetchgid,
  fetchStations,
  fetchOutsourceEmpDetails,
  addnewEmp,
  addnewOutsourceEmp,
  updateEmpDetails,
  updateOutsourceEmpDetails,
  setNameOrId,
  fetchEmpsDetails,
  changeSideBarVar,
  editCate,
  deleteCate,
  fetchjobdgree,
  fetchMainBox,
  insertIntoMainbox,
  deletemainbox,
  fetchAssisstantDepartment,
  insertAssisstantDepartment,
  fetchSupBox,
  insertChairmanAssisstant,
  fetchChairmanAssisstant,
  insertDepartmentIntoChairman,
  fetchChairmanDeps,
  deleteDepFromA,
  updateChairmanAssistant,
  deleteChairmanAssistant,
  clearEmpInf
} from "../actions/ActionTypes";
import axios from "axios";


export const changeSideBar = (sideBarVar) => {
  return ({
    type: changeSideBarVar,
    payload: sideBarVar
  })
}

export const newEmp = (data) => (dispatch) => {
  axios({
    method: "POST",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/insertnewemp`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    dispatch({
      type: addnewOutsourceEmp,
      payload: res.data
    })
  })
}

export const globalNameOrId = (nameOrId) => {
  return ({
    type: setNameOrId,
    payload: nameOrId
  })
}

export const clearEmpData = () => {
  return({
    type: clearEmpInf,
    payload: []
  })
}


export const newEmpImg = (formData) => (dispatch) => {
  axios({
    method: "POST",
    data: formData,
    url: `http://${process.env.REACT_APP_URL}/insertempimg`,
    headers: { "Content-Type": "multipart/form-data" },
  }).then(data => {
    dispatch({
      type: addnewEmp,
      payload: data.data
    })
  }
  )
}
export const newOutsourceEmp = (data) => (dispatch) => {
  axios({
    method: "POST",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/insertnewoutsourceemp`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    dispatch({
      type: addnewOutsourceEmp,
      payload: res.data
    })

  })
}

export const editEmpDetails = (data) => (dispatch) => {

  axios({
    method: "PUT",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/updateempdata`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: updateEmpDetails,
      payload: res.data
    })
  })
}

export const getEmpDetails = (data) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getempdetails/?data=${data}`).then((res) => {
    dispatch({
      type: fetchEmpDetails,
      payload: { data: res.data },
    });
  });

}

export const editOutsourceEmpDetails = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/updateoutsourceempdata`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    dispatch({
      type: updateOutsourceEmpDetails,
      payload: res.data
    })
  })
}

export const gitDownJd = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/gitDownJd`).then((res) => {
    console.log(res.data.length);
    var obj = []
    for (var i = 0; i < res.data.length; i++) {
      for (var b = 0; b < res.data.length; b++) {
        if (res.data[i].SUP_BOX_ID === res.data[i].SUP_BOX_ID_P)
          obj.push(res.data[i].SUP_BOX_NAME)

      }
    }
    console.log(obj);
    dispatch({
      type: fetchDownJd,
      payload: { data: res.data },
    });
  });

}


export const getOutSourceEmpDetails = (empid, empname) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/outsourceempdetails/?empid=${empid}&empname=${empname}`).then((res) => {
    dispatch({
      type: fetchOutsourceEmpDetails,
      payload: { data: res.data },
    });
  });

}

export const getJobDgreeCodes = (value) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getjobdgreecodes/${value}`).then((res) => {
    dispatch({
      type: fetchJobDgreeCodes,
      payload: { data: res.data[0].J_D_ID },
    });
  });
};

export const getMainCodes = (value) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getmaincodes/${value}`).then((res) => {
    dispatch({
      type: fetchMainCodes,
      payload: { data: res.data },
    });
  });
};

export const getStations = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/stations`).then((res) => {
    dispatch({
      type: fetchStations,
      payload: { data: res.data },
    });
  });
}

/* ------------------cates--------------------------------------------------------*/

export const getCates = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/category`).then((res => {
    dispatch({
      type: fetchCates,
      payload: { data: res.data }
    })
  }))
}

export const addCates = (data) => (dispatch) => {
  console.log(process.env.REACT_APP_URL);
  axios({
    method: "POST",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/category`,
    headers: { "Content-Type": "application/json" },
  }).then(res => {

    console.log(res.data.data.affectedRows, res.data);
    if(res.data.data.affectedRows === 1) {
      axios({
        method: "POST",
        data: {catid: res.data.data.insertId},
        withCredentials: true,
        url: `http://${process.env.REACT_APP_URL}/cateorg`,
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        console.log(res.data);
        dispatch({
          type: insertCates,
          payload: {data: res.data.data[1], msg: res.data.msg}
        })
      })
    }
  })
}

export const updateCate = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/category`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: editCate,
      payload: {data: res.data.data[4], msg: res.data.msg}
    })
  })
}

export const removeCate = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/deletecategory`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: deleteCate,
      payload: {data: res.data.data[1], msg: res.data.msg}
    })
  })
}


/* ------------------cates--------------------------------------------------------*/

export const getJobDgByCat = (val) => async (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getjobdgbycat/${val}`).then((res => {
    dispatch({
      type: fetchJobByCat,
      payload: { data: res.data }
    })
  }))
}

export const getSupBoxNamesandmanager = (val1, val2) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getmaincode/${val1}/${val2}`).then(res => {
    axios.get(`http://${process.env.REACT_APP_URL}/getboxandmangers/${res.data[0].MAIN_BOX_ID}`).then((data => {
      dispatch({
        type: fetchSupBoxNamesandmanager,
        payload: data.data
      })
    }))
  })

}

export const getDeps = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getdeps`).then(res => {
    dispatch({
      type: fetchDeps,
      payload: res.data
    })
  })
}

export const getEmpByDeps = (val) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getempbydeps/${val}`).then(res => {
    dispatch({
      type: fetchEmpByDeps,
      payload: res.data
    })
  })
}



export const getJobGovern = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getjobgovern`).then(res => {
    dispatch({
      type: fetchJobGovern,
      payload: { data: res.data }
    })
  })
}

export const getJobStation = (val) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getjobstation/${val}`).then(res => {
    dispatch({
      type: fetchJobStation,
      payload: { data: res.data }
    })
  })
}



export const getEmpStationAndGovern = (val_1, val_2) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getempstationandgovern/${val_1}/${val_2}`).then(res => {
    dispatch({
      type: fetchEmpStationAndGovern,
      payload: { data: res.data }
    })
  })
}

export const getEmpName = (val) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/empnamebyid/${val}`).then(res => {
    dispatch({
      type: fetchEmpName,
      payload: res.data
    })
  })
}

export const getEmpNameByName = (val) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/empnamebyName/${val}`).then(res => {
    dispatch({
      type: fetchEmpNameByName,
      payload: res.data
    })
  })
}

export const getOutsourceEmpNameByName = (val) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/outsourceempnamebyName/${val}`).then(res => {
    dispatch({
      type: fetchOutsourceEmpNameByName,
      payload: res.data
    })
  })
}



export const getCurrentJd = (empid) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/currentjd/${empid}`).then(res => {
    dispatch({
      type: fetchCurrentjd,
      payload: res.data
    })
  })
}

export const getavailJd = (catname, jdname) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/availjd/${catname}/${jdname}`).then(res => {
    dispatch({
      type: fetchavailjd,
      payload: res.data
    })
  })
}

export const getAvailSupBox = (catname, jdname) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getavailsupbox/${catname}/${jdname}`).then(res => {
    dispatch({
      type: fetchavailsupbox,
      payload: res.data
    })
  })
}

export const getUpJd = (catename, supboxname) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getUpJd/${catename}/${supboxname}`).then(res => {
    dispatch({
      type: fetchupjd,
      payload: res.data
    })
  })

}


export const getQn = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getqn`).then(res => {
    dispatch({
      type: fetchqn,
      payload: res.data
    })
  })

}

export const getempsdetails = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getempsdetails`).then(res => {
    dispatch({
      type: fetchEmpsDetails,
      payload: res.data
    })
  })
}

export const getGid = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getgid`).then(res => {
    dispatch({
      type: fetchgid,
      payload: res.data
    })
  })
}

export const getJobDgree = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getjobdgree`).then(res => {
    console.log(res.data);
    dispatch({
      type: fetchjobdgree,
      payload: {data: res.data}
    })
  })
}


export const getEmps = () => (dispatch) => {

  axios.get(`http://${process.env.REACT_APP_URL}/getemps`).then(res => {
    dispatch({
      type: fetchemps,
      payload: res.data
    })
  })
}

export const getMainbox = (catid) => (dispatch) => {
  console.log('hit');
   axios.get(`http://${process.env.REACT_APP_URL}/getJobdgbycatfororgstructure/?catid=${catid}`).then(res => {
     console.log(res.data);
    dispatch({
      type: fetchMainBox,
      payload: res.data
    })
   })

}

export const addToMainBox = (data) => (dispatch) => {
  axios({
    method: "POST",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/mainbox`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    console.log(res.data);
    dispatch({
      type: insertIntoMainbox,
      payload: res.data
    })
  })
}

export const deleteFromMainBox = (data) => (dispatch) => {
  axios({
    method: "PUT",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/mainbox`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    dispatch({
      type: deletemainbox,
      payload: res.data
    })
  })
}

export const addAssisstantDepartment = (data) => (dispatch) => {
  axios({
    method: "POST",
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/addassisstantdepartment`,
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    dispatch({
      type: insertAssisstantDepartment,
      payload: res.data
    })
  })
}

export const getAssisstantDepartment = () => (dispatch) => {
  
  axios.get(`http://${process.env.REACT_APP_URL}/getassisstantdepartment`).then(res => {
    console.log(res.data);
    dispatch({
      type: fetchAssisstantDepartment,
      payload: res.data
    })
  })
}

export const getSupbox = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getsupbox`).then(res => {
    dispatch({
      type: fetchSupBox,
      payload: res.data
    })
  })
}

/*--------------------------chairmanassistant-----------------------------*/

export const addChairmanAssisstant = (data) => (dispatch) => {
  axios({
    method: 'POST',
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/addchairmanassisstant`,
    headers: { "Content-Type": "application/json" },
  }).then(res => {
    console.log(res.data);
    dispatch({
      type: insertChairmanAssisstant,
      payload: res.data
    })
  })
}

export const getChairmanAssisstant = () => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getchairmanassisstant`).then(res => {
    dispatch({
      type: fetchChairmanAssisstant,
      payload: res.data
    })
  })
}

export const editeChairmanAssistant = (data) => (dispatch) => {
  axios({
    method: 'PUT',
    data,
    url: `http://${process.env.REACT_APP_URL}/editechairmanassistant`,
    headers: { "Content-Type": "application/json" },
  }).then(res => {
    console.log(res.data);
    dispatch({
      type: updateChairmanAssistant,
      payload: res.data[1]
    })
  })
}

export const removeChairmanAssistant = (data) => (dispatch) => {
  axios({
    method: 'PUT',
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/removeChairmanAssistant`,
    headers: { "Content-Type": "application/json" },
  }).then(res => {
    console.log(res.data);
    dispatch({
      type: deleteChairmanAssistant,
      payload: res.data[1]
    })
  })
}



export const addDepToAssistant = (data) => (dispatch) => {
  axios({
    method: 'POST',
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/adddeptoassistant`,
    headers: { "Content-Type": "application/json" },
  }).then(res => {
    dispatch({
      type: insertDepartmentIntoChairman,
      payload: res.data[1]
    })
  })
}

export const getChairmanDeps = (caid) => (dispatch) => {
  axios.get(`http://${process.env.REACT_APP_URL}/getchairmandeps/?caid=${caid}`).then(res => {
  console.log(res.data);
  dispatch({
    type: fetchChairmanDeps,
    payload: res.data
  })

  })
}

export const delDepFA = (data) => (dispatch) => {
  axios({
    method: 'PUT',
    data,
    withCredentials: true,
    url: `http://${process.env.REACT_APP_URL}/deldepfa`,
    headers: { "Content-Type": "application/json" },
  }).then(res => {
    dispatch({
      type: deleteDepFromA,
      payload: res.data[1]
    })
  })
}

/*--------------------------chairmanassistant-----------------------------*/