import './App.css';
import Home from './component/Home';
import Sidebar from './component/Sidebar';
import Header from './component/Header';
import Table from './component/Table';
import React, { Fragment } from 'react'
import Form from './component/Form';
import MainBox from './component/mainCodes/MainBox';
import { Provider } from "react-redux";
import store from "./store";
import OrgStructre from './component/transactions/OrgStructre';
import EmpTrans from './component/transactions/EmpTrans'
import Employee from './component/Employee/Employee';
import Empbystation from './component/reports/Empbystation';
import EmpByDeps from './component/reports/Empbydeps';
import NatIdExpired from './component/reports/NatIdExpired';
import EmpsAppraisal from './component/transactions/EmpsAppraisal';
import EmpExperience from './component/transactions/EmpExperience'
import EmpEdu from './component/transactions/EmpEduDeg';
import EmpTraining from './component/transactions/EmpTraining';
import EmpFamily from './component/transactions/EmpFamily';
import outsourceEmployee from './component/outsource/outsourceEmployee';
import outsourceEmpEduDeg from './component/outsource/outSourceEmpEduDeg';
import outsourceEmpFamily from './component/outsource/outSourceEmpFamily';
import outsourceEmpPenalty from './component/outsource/outSourceEmpPenalty';
import outsourceEmpTraining from './component/outsource/outSourceEmpTraining';
import outsourceEmpsAppraisal from './component/outsource/outSourceEmpTraining';
import Login from './component/Login';
import Register from './component/register';
import EmpPenalty from './component/transactions/EmpPenalty';
import { loadUser, tokenConfig } from './actions/AuthActions';
import { getEmps, getGid } from './actions/Actions'
import { countEmpsInGoverns, getNatIdExpired } from './actions/ReportActions'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import axios from "./shared/axiosInterceptor";
import Employees from './component/reports/Employees';
import Department from './component/mainCodes/Department';
import AssisstantDepartment from './component/mainCodes/AssisstantDepartment';
import Supbox from './component/mainCodes/Supbox';
import ChairmanAssisstant from './component/mainCodes/ChairmanAssisstant';
import EmpReport from './component/reports/EmpReport/EmpReport'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAuth: false };

  }
  componentDidMount() {

    this.props.loadUser()
    var d = new Date();
    var n = d.getDate();
    if (!localStorage.getItem('day')) {

      localStorage.setItem('day', n)
    }
    if (d.getDate() > localStorage.getItem('day')) {
      store.dispatch(getNatIdExpired(1))
      localStorage.setItem('day', n)

    } else {
    }
  }
  render() {
    this.props.authgiven(process.env.REACT_APP_URL)
    return (
      <Provider store={store} >
        <div className="App" id="wrapper">
          <nav className="navbar" role="navigation" style={{ marginBottom: 0, marginTop: 0 }}>
            <Header />
          </nav>
          {this.props.isAuthenticated && this.props.user === "Admin" ?
            <Fragment>
              <Sidebar />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/table" exact component={Table} />
                <Route path="/form" exact component={Form} />
                <Route path="/mainbox" exact component={MainBox} />
                <Route path="/department" exact component={Department} />
                <Route path="/assisstantdepartment" exact component={AssisstantDepartment} />
                <Route path="/supbox" exact component={Supbox} />
                <Route path="/orgstructure" exact component={OrgStructre} />
                <Route path="/emptrans" exact component={EmpTrans} />
                <Route path="/employee" exact component={Employee} />
                <Route path="/empbystation" exact component={Empbystation} />
                <Route path="/empbydeps" exact component={EmpByDeps} />
                <Route path="/natidexpire" excact component={NatIdExpired} />
                <Route path="/empedudeg" exact component={EmpEdu} />
                <Route path="/EmpTraining" exact component={EmpTraining} />
                <Route path="/empfamily" exact component={EmpFamily} />
                <Route path="/empexperience" exact component={EmpExperience} />
                <Route path="/outsourceEmployee" exact component={outsourceEmployee} />
                <Route path="/outsourceEmpEduDeg" exact component={outsourceEmpEduDeg} />
                <Route path="/outsourceEmpFamily" exact component={outsourceEmpFamily} />
                <Route path="/outsourceEmpPenalty" exact component={outsourceEmpPenalty} />
                <Route path="/outsourceEmpTraining" exact component={outsourceEmpTraining} />
                <Route path="/outsourceEmpsAppraisal" exact component={outsourceEmpsAppraisal} />
                <Route path="/employees" exact component={Employees} />
                <Route path="/emppenalty" exact component={EmpPenalty} />
                <Route path="/empsappraisal" exact component={EmpsAppraisal} />
                <Route path="/register" exact component={Register} />
                <Route path="/chairmanassisstant" exact component={ChairmanAssisstant} />
              </Switch>
            </Fragment>
            :
            this.props.user === "Appraisal" ?
              <Fragment>
                <Sidebar />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/employee" exact component={Employee} />
                  <Route path="/employees" exact component={Employees} />
                  <Route path="/emppenalty" exact component={EmpPenalty} />
                  <Route path="/empsappraisal" exact component={EmpsAppraisal} />
                  <Route path="/register" exact component={Register} />
                </Switch>
              </Fragment>
              :
              <Fragment>
                <Sidebar />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/table" exact component={Table} />
                  <Route path="/form" exact component={Form} />
                  <Route path="/mainbox" exact component={MainBox} />
                  <Route path="/department" exact component={Department} />
                  <Route path="/assisstantdepartment" exact component={AssisstantDepartment} />
                  <Route path="/supbox" exact component={Supbox} />
                  <Route path="/orgstructure" exact component={OrgStructre} />
                  <Route path="/emptrans" exact component={EmpTrans} />
                  <Route path="/employee" exact component={Employee} />
                  <Route path="/empbystation" exact component={Empbystation} />
                  <Route path="/empbydeps" exact component={EmpByDeps} />
                  <Route path="/natidexpire" excact component={NatIdExpired} />
                  <Route path="/empedudeg" exact component={EmpEdu} />
                  <Route path="/EmpTraining" exact component={EmpTraining} />
                  <Route path="/empfamily" exact component={EmpFamily} />
                  <Route path="/empexperience" exact component={EmpExperience} />
                  <Route path="/outsourceEmployee" exact component={outsourceEmployee} />
                  <Route path="/outsourceEmpEduDeg" exact component={outsourceEmpEduDeg} />
                  <Route path="/outsourceEmpFamily" exact component={outsourceEmpFamily} />
                  <Route path="/outsourceEmpPenalty" exact component={outsourceEmpPenalty} />
                  <Route path="/outsourceEmpTraining" exact component={outsourceEmpTraining} />
                  <Route path="/outsourceEmpsAppraisal" exact component={outsourceEmpsAppraisal} />
                  <Route path="/employees" exact component={Employees} />
                  <Route path="/emppenalty" exact component={EmpPenalty} />
                  <Route path="/empsappraisal" exact component={EmpsAppraisal} />
                  <Route path="/register" exact component={Register} />
                  <Route path="/chairmanassisstant" exact component={ChairmanAssisstant} />
                  <Route path="/EmpReport" exact component={EmpReport} />
                </Switch>
              </Fragment>

          }
        </div>
      </Provider>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,

  };
};

export default connect(mapStateToProps, {
  loadUser
})(App);
