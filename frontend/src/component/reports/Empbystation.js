import React from "react";
import {
    getCates,
    getJobDgByCat,
    getSupBoxNamesandmanager,
    getJobStation,
    getEmpStationAndGovern

} from "../../actions/Actions";
import { connect } from "react-redux";

class EmpByStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = { govern: null, station: null }

    }

    componentDidMount() {
        this.props.getCates()

    }


    handelClick = (e) => {
        this.props.getJobStation(e.target.getAttribute("governNum"))
        this.setState({ station: e.target.getAttribute("station") })
        this.props.getEmpStationAndGovern(e.target.getAttribute("governNum"), e.target.getAttribute("station"))


    }


    render() {

        console.log(this.state.station);

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
            <div id="page-wrapper" className="empbystation">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Tables</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                المحافظات
                            </div>
                            <label for="pet-select" style={{ display: "block", fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>اضغط للعرض باعتبار المحافظة</label>
                            <select style={styles} multiple name="pets" id="pet-select">
                                {this.props.governsJob.map((govern) => (
                                    <option style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} onClick={this.handelClick} governNum={govern.JOB_GOVERNORATE} >{govern.GOVERNORATE_ARABIC}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div class="panel panel-default">
                            <div style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} class="panel-heading">
                                المحطات
                            </div>
                            <label  for="pet-select" style={{ display: "block", fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>اضغط للعرض بالمحطة</label>
                            <select style={styles} multiple name="pets" id="pet-select">
                                {this.props.jobstation.map((station) => (
                                    <option style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }} onClick={this.handelClick} governNum={station.JOB_GOVERNORATE} station={station.JOB_LOCATION} >{station.JOB_LOCATION}</option>
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
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>المحطة</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>المحافظة</th>
                                            </tr>
                                        </thead>

                                        {this.state.station === null ? this.props.empstationandgovern.map(emp => (
                                            <tbody>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{emp.EMPLOYEE_ID}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{emp.NAME_ARABIC}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{emp.JOB_LOCATION}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{emp.GOVERNORATE_ARABIC}</td>

                                            </tbody>
                                        )) : this.props.empstationandgovern.map(emp => (
                                            <tbody>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{emp.EMPLOYEE_ID}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{emp.NAME_ARABIC}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{emp.JOB_LOCATION}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{emp.GOVERNORATE_ARABIC}</td>

                                            </tbody>

                                        ))}

                                    </table>
                                    <p>{this.props.empstationandgovern.length}</p>
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

        cates: state.posts.cates,
        jobdgbycat: state.posts.jobdgbycat,
        supandmang: state.posts.supandmang,
        governsJob: state.posts.jobgovern,
        jobstation: state.posts.jobstation,
        empstationandgovern: state.posts.empstationandgovern,

    };
};
export default connect(mapStateToProps, {
    getCates, getJobDgByCat, getSupBoxNamesandmanager, getJobStation, getEmpStationAndGovern
})(EmpByStation);