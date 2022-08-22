import {
  fetchCates,
  fetchJobDgreeCodes, fetchMainCodes, fetchJobByCat, fetchSupBoxNamesandmanager,
  fetchJobGovern, fetchJobStation, fetchEmpStationAndGovern, fetchDeps, fetchEmpByDeps,
  fetchEmpName, fetchEmpNameByName, fetchCurrentjd, fetchavailjd,
  fetchavailsupbox, fetchupjd, fetchEmpDetails, fetchDownJd, fetchqn, fetchemps, fetchgid,
  fetchStations, fetchOutsourceEmpDetails, fetchOutsourceEmpNameByName, addnewEmp,
  updateEmpDetails, addnewOutsourceEmp,
  updateOutsourceEmpDetails,setNameOrId,fetchEmpsDetails,changeSideBarVar,insertCates,fetchjobdgree,
  insertIntoMainbox, fetchMainBox, deletemainbox,fetchAssisstantDepartment, insertAssisstantDepartment,
  fetchSupBox,insertChairmanAssisstant, fetchChairmanAssisstant, insertDepartmentIntoChairman,fetchChairmanDeps,
  deleteDepFromA, updateChairmanAssistant, deleteChairmanAssistant, editCate, deleteCate, clearEmpInf
} from "../actions/ActionTypes";

const initialState = {
  items: [],
  mainCodes: [],
  cates: [],
  jobdgbycat: [],
  supandmang: [],
  jobgovern: [],
  jobstation: [],
  empstationandgovern: [],
  deps: [],
  empdep: [],
  empavailjd: [],
  empavailsup: [],
  empcurrentjd: [],
  upjd: [],
  empdetails: [[],[],[],[]],
  msg: null,
  outsourceEmpDetails: [],
  downJd: [],
  empNameByName: [],
  outsourceNameByName: [],
  qn: [],
  emps: [],
  gid: [],
  empname: [],
  stations: [],
  nameOrId: [],
  empsdetails: [],
  jobdgree: [],
  sidebarVar: null,
  mainbox: [],
  assisstantDepartment: [],
  supbox: [],
  chairmanAssisstant: [],
  chairmanDepartments: []
  
};

export default function post (state = initialState, action) {
  switch (action.type) {

    case addnewEmp:
      return {
        ...state,
        empdetails: action.payload.data[1],
        msg: action.payload.msg
      }

    case updateEmpDetails:
      return {
        ...state,
        empdetails: [action.payload.data[1],action.payload.data[2],action.payload.data[3]],
        msg: action.payload.msg

      }

    case fetchEmpDetails:
      return {
        ...state,
        empdetails: action.payload.data
      }

    case addnewOutsourceEmp:
      return {
        ...state,
        outsourceEmpDetails: action.payload.data[1],
        msg: action.payload.msg
      }

    case updateOutsourceEmpDetails:
      return {
        ...state,
        outsourceEmpDetails: action.payload.data[1],
        msg: action.payload.msg

      }

    case fetchJobDgreeCodes:
      return {
        ...state,
        items: action.payload.data,
      };

    case fetchMainCodes:
      return {
        ...state,
        mainCodes: action.payload.data
      }
    case fetchJobByCat:
      return {
        ...state,
        jobdgbycat: action.payload.data
      }

    case fetchSupBoxNamesandmanager:
      return {
        ...state,
        supandmang: action.payload
      }
    case fetchJobGovern:
      return {
        ...state,
        jobgovern: action.payload.data
      }
    case fetchJobStation:
      return {
        ...state,
        jobstation: action.payload.data
      }

    case fetchEmpStationAndGovern:
      return {
        ...state,
        empstationandgovern: action.payload.data
      }

    case fetchDeps:
      return {
        ...state,
        deps: action.payload
      }

    case fetchEmpByDeps:
      return {
        ...state,
        empdep: action.payload
      }

    case fetchEmpName:
      return {
        ...state,
        empname: action.payload
      }

    case fetchCurrentjd:
      return {
        ...state,
        empcurrentjd: action.payload
      }
    case fetchEmpNameByName:
      return {
        ...state,
        empNameByName: action.payload
      }

    case fetchOutsourceEmpNameByName:
      return {
        ...state,
        outsourceNameByName: action.payload
      }

    case fetchavailjd:
      return {
        ...state,
        empavailjd: action.payload
      }

    case fetchavailsupbox:
      return {
        ...state,
        empavailsup: action.payload
      }

    case fetchupjd:
      return {
        ...state,
        upjd: action.payload
      }

    case fetchOutsourceEmpDetails:
      return {
        ...state,
        outsourceEmpDetails: action.payload.data

      }

    case fetchDownJd:
      return {
        ...state,
        downJd: action.payload.data
      }

    case fetchqn:
      return {
        ...state,
        qn: action.payload
      }

    case fetchemps:
      return {
        ...state,
        emps: action.payload
      }
    case fetchgid:
      return {
        ...state,
        gid: action.payload
      }
    case fetchStations:
      return {
        ...state,
        stations: action.payload.data

      }

    case setNameOrId:
      return {
        ...state,
        nameOrId: action.payload
      }

    case fetchEmpsDetails:
      return {
        ...state,
        empsdetails: action.payload
      }

    case changeSideBarVar:
      return {
        ...state,
        sidebarVar: action.payload
      }

      case fetchjobdgree:
        return { 
          ...state,
          jobdgree: action.payload.data
        }
 
      case insertCates:
      return {
        ...state,
        cates: action.payload.data,
        msg: action.payload.msg
      }

      case fetchCates:
        return {
          ...state,
          cates: action.payload.data
        }

        
      case editCate:
        return {
          ...state,
          cates: action.payload.data
        }

      case deleteCate:
        return {
          ...state,
          cates: action.payload.data
        }

      case fetchMainBox:
        return{
          ...state,
          mainbox: action.payload
        }

      case insertIntoMainbox:
        return { 
          ...state,
          mainbox: action.payload[1]
        }

      case deletemainbox:
        return{
          ...state,
          mainbox: action.payload[1]
        }
      
      case fetchAssisstantDepartment:
        return{
          ...state,
          assisstantDepartment: action.payload
        }
      
      case insertAssisstantDepartment:
        return{
          ...state,
          assisstantDepartment: action.payload[1]
        }
      
      case fetchSupBox:
        return {
          ...state,
          supbox: action.payload
        }
      case insertChairmanAssisstant:
        return {
          ...state,
          chairmanAssisstant: action.payload[1]
        }
      case fetchChairmanAssisstant:
        return {
          ...state,
          chairmanAssisstant: action.payload
        }
      
      case updateChairmanAssistant:
        return {
          ...state,
          chairmanAssisstant: action.payload
        }

      case deleteChairmanAssistant:
        return {
          ...state,
          chairmanAssisstant: action.payload
        }

      case insertDepartmentIntoChairman:
        return {
          ...state,
          chairmanDepartments: action.payload
        }

      case fetchChairmanDeps:
        return {
          ...state,
          chairmanDepartments: action.payload
        }

      case deleteDepFromA:
        return {
          ...state,
          chairmanDepartments: action.payload
        }
      
      case clearEmpInf:
        return {
          ...state,
          empdetails: [[],[],[],[]]
        }
      

    default:
      return state;
  }
}
