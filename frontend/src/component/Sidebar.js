import React from "react";
import {
    getJobDgreeCodes, getMainCodes, getJobGovern, getDeps, getEmpName, getCates, getStations
} from "../actions/Actions";
import {
    getEmpAppraisal, getEmpEdu, getEmpExp, getEmpFamily, getempspenalties, getEmpTraining, getEmpTrans
} from "../actions/TransActions"
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { setNameOrId } from "../actions/ActionTypes";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { mainName: null, sidebar: false }
    }
    componentDidMount() {
        this.props.getCates()
        this.props.getStations()
    }

    handleSidebarClick = (e) => {
        this.setState({ mainName: e.target.innerHTML })
        this.props.getJobDgreeCodes(e.target.innerHTML)
    }

    showSidebar = (e) => {
        this.setState({
            sidebar: !this.state.sidebar
        })
    }

    setTableName = (tableName) => {
        let nameOrId = `${tableName}.NATIONAL_ID_CARD_NO = (SELECT NATIONAL_ID_CARD_NO FROM employee WHERE ${this.props.nameOrId})`
        console.log(nameOrId);

        return nameOrId;
    }

    render() {
        console.log(this.props.sidebarVar);
        // this.props.getMainCodes(this.props.posts)
        console.log(Number.isInteger(parseInt(this.props.nameOrId)), this.props.nameOrId);
        const styles = {
            width: "100%",
        }

        return (
            <div className="sidebar" role="navigation" id="sidebar">
                <nav className="sidebar-nav navbar-collapse">
                    <ul onClick={this.showSidebar}>
                        <li>
                            {this.props.user === "Admin" ?
                                this.props.sidebarVar === "mainCodes" ?
                                    <ul className="nav nav-first-level">
                                        <NavLink style={styles} to={`/chairmanassisstant`}>
                                            مساعد <i class="fas fa-star"></i>
                                        </NavLink>
                                        <NavLink style={styles} to={`/department`}>
                                            الإدارات <i class="fas fa-building"></i>
                                        </NavLink>
                                        <NavLink style={styles} to={`/assisstantdepartment`}>
                                            الإدارات العامة المساعدة <i class="fas fa-hands-helping"></i>
                                        </NavLink>
                                        <NavLink style={styles} to={`/mainbox`}>
                                            الوظائف بالإدارات
                                        </NavLink>
                                        <NavLink style={styles} to={`/supbox`}>
                                            المسمى الوظيفي
                                        </NavLink>
                                        <NavLink style={styles} to={`/#`}>
                                            المحطات
                                        </NavLink>
                                        <NavLink style={styles} to={`/#`}>
                                            المناطق
                                        </NavLink>
                                        <NavLink style={styles} to={`/#`}>
                                            مكاتب التأمينات
                                        </NavLink>
                                    </ul>
                                    :
                                    <ul className="nav nav-first-level">
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getEmpTrans(this.props.nameOrId)} style={styles} to={`/EmpTrans`}>
                                                تدرج <i class="fas fa-walking"></i>
                                            </NavLink>
                                            :
                                            <NavLink style={styles} to={`/EmpTrans`}>
                                                تدرج <i class="fas fa-walking"></i>
                                            </NavLink>
                                        }
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getEmpEdu(this.props.nameOrId)} style={styles} to={`/empedudeg`}>
                                                مؤهلات الموظفين <i class="fas fa-university"></i>
                                            </NavLink >
                                            :
                                            <NavLink style={styles} to={`/empedudeg`}>
                                                مؤهلات الموظفين <i class="fas fa-university"></i>
                                            </NavLink >
                                        }
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getEmpExp(this.setTableName("employee_experince"))} style={styles} to={`/empexperience`}>
                                                خبرات سابقة <i class="fas fa-dumbbell"></i>
                                            </NavLink>
                                            :
                                            <NavLink onClick={() => this.props.getEmpExp(1)} style={styles} to={`/empexperience`}>
                                                خبرات سابقة <i class="fas fa-dumbbell"></i>
                                            </NavLink>
                                        }
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getEmpAppraisal(this.setTableName("employee_appraisal"))} style={styles} to={`/empsappraisal`}>
                                                تقييمات سنوية <i class="fas fa-percentage"></i>
                                            </NavLink>
                                            :
                                            <NavLink onClick={() => this.props.getEmpAppraisal(1)} style={styles} to={`/empsappraisal`}>
                                                تقييمات سنوية <i class="fas fa-percentage"></i>
                                            </NavLink>
                                        }
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getempspenalties(this.props.nameOrId)} style={styles} to={`/emppenalty`}>
                                                جزاءات <i class="far fa-calendar-times"></i>
                                            </NavLink>
                                            :
                                            <NavLink style={styles} to={`/emppenalty`}>
                                                جزاءات <i class="far fa-calendar-times"></i>
                                            </NavLink>
                                        }
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getEmpFamily(this.props.nameOrId)} style={styles} to={`/empfamily`}>
                                                البيانات العائلية <i class="fas fa-home"></i>
                                            </NavLink>
                                            :
                                            <NavLink style={styles} to={`/empfamily`}>
                                                البيانات العائلية <i class="fas fa-home"></i>
                                            </NavLink>
                                        }
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getEmpTraining(this.setTableName("employee_training"))} style={styles} to={`/EmpTraining`}>
                                                تدريب العاملين <i class="fas fa-certificate"></i>
                                            </NavLink>
                                            :
                                            <NavLink style={styles} to={`/EmpTraining`}>
                                                تدريب العاملين <i class="fas fa-certificate"></i>
                                            </NavLink>
                                        }
                                        <NavLink style={styles} to={`/orgstructure`}>
                                            الهيكل <i class="fas fa-sitemap"></i>
                                        </NavLink>
                                        <NavLink style={styles} to={`/employees`}>
                                            بيان بالموظفين <i class="fas fa-user-friends"></i>
                                        </NavLink>
                                    </ul>

                                :
                                this.props.user === "Appraisal" ?
                                    <ul className="nav nav-first-level">
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getempspenalties(this.props.nameOrId)} style={styles} to={`/emppenalty`}>
                                                جزاءات
                                            </NavLink>
                                            :
                                            <NavLink style={styles} to={`/emppenalty`}>
                                                جزاءات
                                            </NavLink>
                                        }
                                        {this.props.nameOrId.length > 0 ?
                                            <NavLink onClick={() => this.props.getEmpAppraisal(this.setTableName("employee_appraisal"))} style={styles} to={`/empsappraisal`}>
                                                تقييمات سنوية
                                            </NavLink>
                                            :
                                            <NavLink onClick={() => this.props.getEmpAppraisal(1)} style={styles} to={`/empsappraisal`}>
                                                تقييمات سنوية
                                            </NavLink>
                                        }
                                        <NavLink style={styles} to={`/employees`}>
                                            بيان بالموظفين
                                        </NavLink>
                                    </ul>
                                    :

                                    this.props.sidebarVar === "mainCodes" ?
                                        <ul className="nav nav-first-level">
                                            <NavLink style={styles} to={`/chairmanassisstant`}>
                                                مساعد <i class="fas fa-star"></i>
                                            </NavLink>
                                            <NavLink style={styles} to={`/department`}>
                                                الإدارات <i class="fas fa-building"></i>
                                            </NavLink>
                                            <NavLink style={styles} to={`/assisstantdepartment`}>
                                                الإدارات العامة المساعدة <i class="fas fa-hands-helping"></i>
                                            </NavLink>
                                            <NavLink style={styles} to={`/mainbox`}>
                                                الوظائف بالإدارات
                                            </NavLink>
                                            <NavLink style={styles} to={`/supbox`}>
                                                المسمى الوظيفي
                                            </NavLink>
                                            <NavLink style={styles} to={`/#`}>
                                                المحطات
                                            </NavLink>
                                            <NavLink style={styles} to={`/#`}>
                                                المناطق
                                            </NavLink>
                                            <NavLink style={styles} to={`/#`}>
                                                مكاتب التأمينات
                                            </NavLink>
                                        </ul>
                                        :
                                        <ul className="nav nav-first-level">
                                            {this.props.nameOrId.length > 0 ?
                                                <NavLink onClick={() => this.props.getEmpTrans(this.props.nameOrId)} style={styles} to={`/EmpTrans`}>
                                                    تدرج <i class="fas fa-walking"></i>
                                                </NavLink>
                                                :
                                                <NavLink style={styles} to={`/EmpTrans`}>
                                                    تدرج <i class="fas fa-walking"></i>
                                                </NavLink>
                                            }
                                            {this.props.nameOrId.length > 0 ?
                                                <NavLink onClick={() => this.props.getEmpEdu(this.props.nameOrId)} style={styles} to={`/empedudeg`}>
                                                    مؤهلات الموظفين <i class="fas fa-university"></i>
                                                </NavLink >
                                                :
                                                <NavLink style={styles} to={`/empedudeg`}>
                                                    مؤهلات الموظفين <i class="fas fa-university"></i>
                                                </NavLink >
                                            }
                                            {this.props.nameOrId.length > 0 ?
                                                <NavLink onClick={() => this.props.getEmpExp(this.setTableName("employee_experince"))} style={styles} to={`/empexperience`}>
                                                    خبرات سابقة <i class="fas fa-dumbbell"></i>
                                                </NavLink>
                                                :
                                                <NavLink style={styles} to={`/empexperience`}>
                                                    خبرات سابقة <i class="fas fa-dumbbell"></i>
                                                </NavLink>
                                            }
                                            {this.props.nameOrId.length > 0 ?
                                                <NavLink onClick={() => this.props.getEmpAppraisal(this.setTableName("employee_appraisal"))} style={styles} to={`/empsappraisal`}>
                                                    تقييمات سنوية <i class="fas fa-percentage"></i>
                                                </NavLink>
                                                :
                                                <NavLink style={styles} to={`/empsappraisal`}>
                                                    تقييمات سنوية <i class="fas fa-percentage"></i>
                                                </NavLink>
                                            }
                                            {this.props.nameOrId.length > 0 ?
                                                <NavLink onClick={() => this.props.getempspenalties(this.props.nameOrId)} style={styles} to={`/emppenalty`}>
                                                    جزاءات <i class="far fa-calendar-times"></i>
                                                </NavLink>
                                                :
                                                <NavLink style={styles} to={`/emppenalty`}>
                                                    جزاءات <i class="far fa-calendar-times"></i>
                                                </NavLink>
                                            }
                                            {this.props.nameOrId.length > 0 ?
                                                <NavLink onClick={() => this.props.getEmpFamily(this.props.nameOrId)} style={styles} to={`/empfamily`}>
                                                    البيانات العائلية <i class="fas fa-home"></i>
                                                </NavLink>
                                                :
                                                <NavLink style={styles} to={`/empfamily`}>
                                                    البيانات العائلية <i class="fas fa-home"></i>
                                                </NavLink>
                                            }
                                            {this.props.nameOrId.length > 0 ?
                                                <NavLink onClick={() => this.props.getEmpTraining(this.setTableName("employee_training"))} style={styles} to={`/EmpTraining`}>
                                                    تدريب العاملين <i class="fas fa-certificate"></i>
                                                </NavLink>
                                                :
                                                <NavLink style={styles} to={`/EmpTraining`}>
                                                    تدريب العاملين <i class="fas fa-certificate"></i>
                                                </NavLink>
                                            }
                                            <NavLink style={styles} to={`/orgstructure`}>
                                                الهيكل <i class="fas fa-sitemap"></i>
                                            </NavLink>
                                            <NavLink style={styles} to={`/employees`}>
                                                بيان بالموظفين <i class="fas fa-user-friends"></i>
                                            </NavLink>
                                            <NavLink style={styles} to={`/EmpReport`}>
                                                تقرير <i class="fas fa-walking"></i>
                                            </NavLink>
                                        </ul>
                            }

                        </li>

                    </ul>
                </nav>
            </div>
        )

    }

}


const mapStateToProps = (state) => {
    return {
        posts: state.posts.items,
        nameOrId: state.posts.nameOrId,
        user: state.auth.user,
        sidebarVar: state.posts.sidebarVar

    };
};
export default connect(mapStateToProps, {
    getJobDgreeCodes, getMainCodes, getJobGovern, getDeps, getEmpName, getCates, getStations, getEmpAppraisal, getEmpEdu, getEmpExp, getEmpFamily, getempspenalties, getEmpTraining, getEmpTrans
})(Sidebar);