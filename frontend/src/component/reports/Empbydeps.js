import React from "react";
import {

    getEmpByDeps

} from "../../actions/Actions";
import { connect } from "react-redux";


class EmpByDeps extends React.Component {
    constructor(props) {
        super(props);
        this.state = { govern: null, station: null }

    }


    handel = (e) => {
        this.props.getEmpByDeps(e.target.getAttribute('depart'))
    }


    render() {

        console.log(this.props.empdep);
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

        return (
            <div id="page-wrapper" className="empbydeps">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Tables</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                الإدارات
                            </div>
                            <label for="pet-select" style={{display: "block", fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>اضغط للعرض باعتبار الإدارات</label>
                            <select style={styles} multiple name="pets" id="pet-select">
                                {this.props.deps.map((dep) => (
                                    <option depart={dep.SUP_BOX_NAME} style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} onClick={this.handel}>{dep.SUP_BOX_NAME}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Striped Rows
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>رقم الأداء</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الوظيفة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإدارة</th>
                                            </tr>
                                        </thead>

                                        {this.props.empdep.map(empdep => (
                                            <tbody>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{empdep.EMPLOYEE_ID}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{empdep.NAME_ARABIC}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{empdep.MAIN_BOX_NAME}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{empdep.SUP_BOX_NAME}</td>

                                            </tbody>
                                        ))}

                                    </table>
                                    <p>{this.props.empdep.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}


const mapStateToProps = (state) => {
    return {

        deps: state.posts.deps,
        empdep: state.posts.empdep,


    };
};
export default connect(mapStateToProps, {
    getEmpByDeps
})(EmpByDeps);