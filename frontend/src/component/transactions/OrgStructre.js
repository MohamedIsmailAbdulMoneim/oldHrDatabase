import React from "react";
import {
    getCates,
    getJobDgByCat,
    getSupBoxNamesandmanager
} from "../../actions/Actions";
import { connect } from "react-redux";
import axios from "axios";

class OrgStructre extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jobdgbycat: "", jobbycat: null || this.props.jobdgbycat, catid: null };

    }

    componentDidMount() {
        this.props.getCates()
    }

    clickHandler = (e) => {
        axios.get(`http://${process.env.REACT_APP_URL}/getJobdgbycatfororgstructure/?catid=${e.target.getAttribute("catid")}`).then(data=> {
            this.setState({
                jobdgbycat: data.data
            })
        })
        // this.props.getJobDgByCat(e.target.getAttribute("catid"))
        this.setState({ catid: e.target.getAttribute("catid") })
        this.setState({ clicked: true })
    }

    clickHandler_2 = (e => {
        this.props.getSupBoxNamesandmanager(e.target.getAttribute("jdid"), this.state.catid)
    })

    render() {

        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "100%",
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
        console.log(this.props.supandmang);

        return (
            <div id="page-wrapper" className="orgstructure" >
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Forms</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                أكواد مديري العموم
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label style={{ display: "block" }} for="pet-select">الإدارة</label>
                                        <select style={styles} multiple name="pets" id="pet-select">
                                            {this.props.cates.map((cat => (
                                                <option onClick={this.clickHandler} catname={cat.CAT_NAME} catid={cat.CAT_ID} >{cat.CAT_NAME}</option>
                                            )))}
                                        </select>
                                    </div>
                                    <div className="col-lg-6">
                                        <label style={{ display: "block" }} for="pet-select">الوظائف</label>
                                        <select style={styles} multiple name="pets" id="pet-select">
                                            {this.state.clicked === false ? null : this.state.jobdgbycat.length > 0 ? this.state.jobdgbycat.map((job) => (
                                                <option onClick={this.clickHandler_2} jdid={job.J_D_ID}>{job.J_D_NAME}</option>
                                            )) : null}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                Striped Rows
                                            </div>
                                            <div className="panel-body">
                                                <div style={{ overflow: "scroll", height: 320 }} className="table-responsive">
                                                    <table className="table table-striped">
                                                        <thead style={{ textAlign: "center" }}>
                                                            <tr>
                                                                <th>رقم البوكس</th>
                                                                <th>المسمى الوظيفي</th>
                                                                <th>اسم شاغل البوكس</th>
                                                                <th>عدد شاغلي البوكس</th>
                                                                <th>كود المستوى الإشرافي الأعلى</th>
                                                                <th>المستوى الإشرافي الأعلى</th>
                                                                <th>مفعل / عير مفعل</th>
                                                                <th>مشغول / شاغر</th>
                                                                <th>نوع الوظيفة</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {this.props.supandmang ? this.props.supandmang.map(box => (
                                                                <tr>
                                                                    <td>{box.emp_box_id}</td>
                                                                    <td>{box.emp_box_name}</td>
                                                                    <td>{box.NAME_ARABIC}</td>
                                                                    <td></td>
                                                                    <td>{box.manager_box_id}</td>
                                                                    <td>{box.manager_box_name}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>

                                                                </tr>
                                                            )) : null}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


const mapStateToProps = (state) => {
    return {

        cates: state.posts.cates,
        jobdgbycat: state.posts.jobdgbycat,
        supandmang: state.posts.supandmang

    };
};
export default connect(mapStateToProps, {
    getCates, getJobDgByCat, getSupBoxNamesandmanager
})(OrgStructre);