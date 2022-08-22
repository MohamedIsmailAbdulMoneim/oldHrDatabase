import {
  NEW_APPRAISAL,
  fetchEmpTrans,
  updatetrans,
  updateAppraisal,
  FETCHEMPEXP,
  NEW_EXP,
  fetchEmpPenalties,
  postNewFamilyMember,
  fetchEmpFamily,
  postNewTrans,
  postEmpEdu,
  fetchEmpEdu,
  fetchEmpTraining,
  deleteTraining,
  deleteFamily,
  deletePenalty,
  deleteTrans,
  deleteAppraisal,
  deleteExperience,
  deleteEdu,
  fetchEmpAppraisal,
  updateExperience,
  editEmpFamily,
  clearEmpInf
} from "../actions/ActionTypes";
const initialState = {
  empTrans: [],
  msg: null,
  result: null,
  empApp: [],
  updatedInf: null,
  empexp: [],
  empsPenalties: [],
  empfamily: [],
  empEdu: [],
  empTraining: [],
};

export default function trans (state = initialState, action) {
  switch (action.type) {

    /* -------------------experience--------------------- */

    case NEW_EXP:
      return {
        ...state,

        empexp: action.payload.data[1],
        msg: action.payload.msg,
      };

    case FETCHEMPEXP:
      return {
        ...state,
        empexp: action.payload,
      };

    case updateExperience:
      return{
        ...state,
        empexp: action.payload.data
      }

    case deleteExperience:
      return {
        ...state,
        empexp: action.payload.data,
      };

    /* ------------end----of---experience--------------------- */


    /* -------------------Appraisal--------------------- */

    case NEW_APPRAISAL:
      return {
        ...state,
        empApp: action.payload.data[1],
        msg: action.payload.msg,
      };

    case fetchEmpAppraisal:
      return {
        ...state,
        empApp: action.payload,
      };

    case updateAppraisal:
      return {
        ...state,
        empApp: action.payload.data,
        result: action.payload.result,
      };


    case deleteAppraisal:
      return {
        ...state,
        empApp: action.payload.data
      };

    /* -------------------end of appraisal--------------------- */


    /*-------------------Transactiom--------------------------------*/

    case postNewTrans:
      return {
        ...state,
        empTrans: action.payload.data[2],
        msg: action.payload.msg,
      };

    case fetchEmpTrans:
      return {
        ...state,
        empTrans: action.payload,
      };

    case updatetrans:
      return {
        ...state,
        msg: action.payload,
        empTrans: action.payload[1],
      };


    case deleteTrans:
      return {
        ...state,
        empTrans: action.payload.data,
      };

    /*-------------------end of Transactiom--------------------------------*/

    /* -------------------------Education-------------------------*/

    case postEmpEdu:
      return {
        ...state,
        empEdu: action.payload.data[1],
        msg: action.payload.msg,
      };
    case fetchEmpEdu:
      return {
        ...state,
        empEdu: action.payload,
      };

    case deleteEdu:
      return {
        ...state,
        empEdu: action.payload.data,
      };

    /* -------------------------end of Education-------------------------*/

    /*-----------------------Family--------------------------------*/

    case postNewFamilyMember:
      return {
        ...state,
        empfamily: action.payload.data[1],
        msg: action.payload.msg,
      };

    case fetchEmpFamily:
      return {
        ...state,
        empfamily: action.payload,
      };

    case editEmpFamily:
      return {
        ...state,
        empfamily: action.payload.data
      }

    case deleteFamily:
      return {
        ...state,
        empfamily: action.payload.data,
      };

    /*-----------------------end of Family--------------------------------*/

    /*-----------------------Penalty--------------------------------*/


    case fetchEmpPenalties:
      return {
        ...state,
        empsPenalties: action.payload,
      };

    case deletePenalty:
      return {
        ...state,
      };

    /*-----------------------end of Penalty--------------------------------*/

    /*-----------------------Training--------------------------------*/

    case fetchEmpTraining:
      return {
        ...state,
        empTraining: action.payload,
      };


    case deleteTraining:
      return {
        ...state,
        empTraining: action.payload.data,

      };

    /*-----------------------end Training--------------------------------*/


    default:
      return state;
  }
}