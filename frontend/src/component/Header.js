import React, { Fragment } from 'react'
import logo from './logo.png'
import dashboard from './dashboard.png'
import { logOut } from '../actions/AuthActions'
import { connect } from "react-redux";
import { getNatIdExpired } from "../actions/ReportActions"
import { Link } from "react-router-dom";
import { getEmpDetails, changeSideBar } from "../actions/Actions"
import StructureReport from './reports/StructureReport/StructureReport';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { notNum: 0, idCardExpired: false };

    }


    handleLogout = (e) => {
        e.preventDefault()
        this.props.logOut()
    }

    componentDidMount() {



        <ul className="dropdown-menu dropdown-alerts">
            <Fragment>
                <li>
                    <a href="/natidexpire">
                        <div>
                            {/* <i style={{marginTop: 5}} class="far fa-id-card"></i> */}
                            <div style={{ marginLeft: 5, color: "white" }} className="pull-right">بطاقات رقم قومي منتهية</div>
                        </div>
                    </a>
                </li>
            </Fragment>


            {/* <li>
        <a href="#">
            <div>
                <i className="fa fa-comment fa-fw"></i> New Comment
                <span className="pull-right text-muted small">4 minutes ago</span>
            </div>
        </a>
    </li>
    <li className="divider"></li> */}
        </ul>
        this.props.getNatIdExpired()


    }

    render() {
        return (
            <Fragment>
                <div style={{ background: "#042903", width: "100%", height: "50px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                    <img style={{ height: "100%", float: "left" }} src={logo} />
                    <Link to="/">
                        <span style={{ float: "right", color: "#9ca084", fontFamily: "'Noto Kufi Arabic'", fontWeight: "400", fontSize: "20pt", marginRight: 5 }}>الإدارة العامة للموارد البشرية</span>
                    </Link>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: 'white', background: "#042903", width: "100%", height: "40px", fontFamily: "'Noto Kufi Arabic'" }}>
                        {this.props.user === "Admin" ?
                            <div class="topnav">
                                <a href="#about">العمالة المؤقتة</a>
                                <Link to="#" onClick={() => this.props.changeSideBar('transactions')}>
                                    الحركات
                                </Link>
                                <Link to="#" onClick={() => this.props.changeSideBar('mainCodes')}>
                                    الأكواد الرئيسية
                                </Link>
                                {this.props.nameOrId.length > 0 ?
                                    <Link onClick={() => Number.isInteger(parseInt(this.props.nameOrId)) ? this.props.getEmpDetails(this.props.nameOrId) : this.props.getEmpDetails("", this.props.nameOrId)} to="/employee" className="menu-bars">
                                        الشاشة الرئيسية
                                    </Link>
                                    :
                                    <Link to="/employee" className="menu-bars">
                                        الشاشة الرئيسية
                                    </Link>
                                }
                            </div>
                            :

                            this.props.user === "Appraisal" ?

                                <div class="topnav">
                                    <a href="#contact">الحركات</a>
                                    {this.props.nameOrId.length > 0 ?
                                        <Link onClick={() => Number.isInteger(parseInt(this.props.nameOrId)) ? this.props.getEmpDetails(this.props.nameOrId) : this.props.getEmpDetails("", this.props.nameOrId)} to="/employee" className="menu-bars">
                                            الشاشة الرئيسية
                                        </Link>
                                        :
                                        <Link to="/employee" className="menu-bars">
                                            الشاشة الرئيسية
                                        </Link>
                                    }
                                </div>
                                :
                                <div class="topnav" style={{ display: "flex" }}>
                                    {this.props.nameOrId.length > 0 ?
                                        <Link onClick={() => Number.isInteger(parseInt(this.props.nameOrId)) ? this.props.getEmpDetails(this.props.nameOrId) : this.props.getEmpDetails("", this.props.nameOrId)} to="/employee" className="menu-bars">
                                            الشاشة الرئيسية
                                        </Link>
                                        :
                                        <Link to="/employee" className="menu-bars">
                                            الشاشة الرئيسية
                                        </Link>
                                    }
                                    <Link to="#" onClick={() => this.props.changeSideBar('transactions')}>
                                        الحركات
                                    </Link>
                                    <Link to="#" onClick={() => this.props.changeSideBar('mainCodes')}>
                                        الأكواد الرئيسية
                                    </Link>

                                    <StructureReport />
                                    
                                    <a href="#about">العمالة المؤقتة</a>


                                </div>
                        }



                        <div class="topnav">
                            {this.props.isAuthenticated ?
                                this.props.user === "Admin" ?
                                    <Fragment>
                                        <a onClick={this.handleLogout} href="/#">تسجيل خروج</a>
                                        <a href="/register">تسجيل مستخدم</a>
                                        <i class="fas fa-bell"></i>
                                        {/* <span>مرحباً : {this.props.user}</span> */}

                                    </Fragment>
                                    :
                                    this.props.user === "Appraisal" ?
                                        <Fragment>
                                            <a onClick={this.handleLogout} href="/#">تسجيل خروج</a>
                                            {/* <span style={{fontSize: "5pt"}}>مرحباً : {this.props.user}</span> */}
                                        </Fragment>

                                        :
                                        <a href="/login">تسجيل دخول</a>

                                :
                                <Fragment>
                                    <a onClick={this.handleLogout} href="/#">تسجيل خروج</a>
                                    <a href="/register">تسجيل مستخدم</a>
                                    <div class="button">
                                        <i className="fas fa-bell"></i>
                                        <span class="button__badge">2</span>
                                    </div>
                                    {/* <span>مرحباً : {this.props.user}</span> */}
                                </Fragment>
                            }

                        </div>
                    </div>
                </div>
            </Fragment >

        )
    }

}

const mapStateToProps = (state) => {
    return {
        expiredIdCard: state.reports.expiredIdCard,
        notification: state.reports.notification,
        nameOrId: state.posts.nameOrId,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    };
};

export default connect(mapStateToProps, {
    logOut, getNatIdExpired, getEmpDetails, changeSideBar
})(Header);