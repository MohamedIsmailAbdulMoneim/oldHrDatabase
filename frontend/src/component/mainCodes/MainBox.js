import React from "react";
import {
    getCates,
    getJobDgByCat,
    getSupBoxNamesandmanager,
    getJobDgree,
    addToMainBox,
    getMainbox,
    deleteFromMainBox
} from "../../actions/Actions";
import { connect } from "react-redux";
import axios from "axios";

class MainBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {add: false , delete: false, jobdgbycat: "", chosenJd: "" , deletedMain: "", deletedJd: "" ,jdidp: "", joblevel: "" ,catid: null };

    }

    componentDidMount() {
        this.props.getCates()
        this.props.getJobDgree()
        console.log('hit');
    }

    clickHandler = (e) => {
        console.log('hit');
        this.props.getMainbox(e.target.options[e.target.options.selectedIndex].getAttribute("catid"))
        console.log(e.target.getAttribute("catid"));
        this.setState({ catid: e.target.getAttribute("catid") })
        console.log(e.target.value);
    }

    clickHandler_2 = (e) => {
        this.props.getSupBoxNamesandmanager(e.target.getAttribute("jdid"), this.state.catid)
    }

    choseToAddHandler = (e) => {
        this.setState({
            chosenJd: e.target.getAttribute('jdid'),
            jdidp: e.target.getAttribute('jdidp'),
            joblevel: e.target.getAttribute('joblevel')
        })
    }

    choseToDeleteHandler = (e) => {
        this.setState({
            deletedMain: e.target.getAttribute('mainbox'),
            deletedJd: e.target.getAttribute('jdid')
        })
        console.log(e.target.getAttribute('mainbox'));
    }

    addHandler = (e) => {
        if(this.state.chosenJd.length > 0)  this.setState({ add: true, delete: false })
    }

    deleteHandler = (e) => {
        if(this.state.deletedMain.length > 0)  this.setState({ delete: true, add: false })
    }

    confirmAdd = (e) => {
        const data = {catid: this.state.catid, jdid: this.state.chosenJd, jdidp: this.state.jdidp, joblevel: this.state.joblevel}
        this.props.addToMainBox(data)
        this.setState({
            add: false
        })
    }

    confirmDelete = (e) => {
        this.props.deleteFromMainBox({catid: this.state.catid, mainboxid: this.state.deletedMain,jdid: this.state.deletedJd})
        this.setState({
            add: false,
            delete: false

        })
    }

    closeConfirm = (e) => {
        this.setState({
            add: false,
            delete: false
        })
    }

    render() {
        const styles = {
            display: "block",
            padding: "0.375rem 2.25rem 0.375rem 0.75rem",
            width: "100%",
            height: 250,
            backgroundColor: "#fff",
            color: "#212529",
            fontSize: "1rem",
            lineHeight: 1.5,
            fontWeight: "bold",
            border: "1px solid #ced4da",
            borderRadius: "0.25rem",
            appearance: "none",
            transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"

        }
        return (
            <div id="page-wrapper" className="orgstructure" >
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="card-body">
                                <select onChange={this.clickHandler} >
                                    {this.props.cates.map((cat) => (
                                        <option  catname={cat.CAT_NAME} catid={cat.CAT_ID} >{cat.CAT_NAME}</option>
                                    ))}
                                </select>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "48%" }}>
                                        <label style={{ display: "block" }} for="pet-select">الوظائف</label>
                                        <select onChange={this.choseToAddHandler} style={styles} multiple name="pets" id="pet-select">
                                            {this.props.jobdgree.map((job => (
                                                <option jdid={job.J_D_ID} jdidp={job.J_D_ID_P} joblevel={job.JOB_LEVEL} >{job.J_D_NAME}</option>
                                            )))}
                                        </select>
                                        <button onClick={this.addHandler} style={{ width: "100%" }}>اضف</button>
                                    </div>
                                    {this.state.add || this.state.delete ? 
                                    <div style={{ margin: "auto 0" }}>
                                        <i style={{ display: "block", marginBottom: 15, color: "#376237" }} onClick={this.state.add ? this.confirmAdd : this.state.delete ? this.confirmDelete : null}  className="fas fa-check"></i>
                                        <i style={{ display: "block", color: "#970f0f" }} onClick={this.closeConfirm} className="fas fa-times"></i>
                                    </div>
                                    :
                                    null
                                    }
                                    <div style={{ width: "48%" }}>
                                        <label style={{ display: "block" }} for="pet-select">الوظائف بالإدارة المختارة</label>
                                        <select onChange={this.choseToDeleteHandler} style={styles} multiple name="pets" id="pet-select">
                                            {this.props.mainbox.map((job) => (
                                                <option jdid={job.J_D_ID} mainbox={job.MAIN_BOX_ID}>{job.J_D_NAME}</option>
                                            ))}
                                        </select>
                                        <button onClick={this.deleteHandler} style={{ width: "100%" }}>حذف</button>
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
        jobdgree: state.posts.jobdgree,
        mainbox: state.posts.mainbox
    };
};
export default connect(mapStateToProps, {
    getCates, getJobDgByCat, getSupBoxNamesandmanager, getJobDgree,addToMainBox,getMainbox,deleteFromMainBox
})(MainBox);