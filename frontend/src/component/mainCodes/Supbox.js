import React, { Component } from 'react';
import { getSupbox } from "../../actions/Actions";
import { connect } from "react-redux";
import Pagination from "../Pagination";
import BasicTable from '../general/BasicTable'



class Supbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false, edit: false, delete: false,
            firstArg: 0, secondArg: 20, currentPage: 1,
            firstArgPerBtn: 0, secondArgPerBtn: 10
        }
    }

    componentDidMount() {
        this.props.getSupbox()
    }

    addHandler = (e) => {
        this.setState({
            add: true
        })
    }

    changeArgs = (i) => (e) => {
        e.preventDefault()
        this.setState({ currentPage: i })
        if (i === 1) {
            this.setState({ firstArg: (i - 1) * 20, secondArg: i * 20 })

        }
        else if (i > 1) {
            this.setState({ firstArg: (i - 1) * 20, secondArg: i * 20 })

        }

    }

    minusFirstArg = (e) => {
        e.preventDefault()

        if (this.state.firstArgPerBtn > 0) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn - 1, secondArgPerBtn: prevState.secondArgPerBtn - 1, firstArg: prevState.firstArg - 20, secondArg: prevState.secondArg - 20, currentPage: prevState.currentPage - 1 }
            })
        }
    }

    plusSecondArg = (e) => {
        e.preventDefault()
        let itemsPerPage = Math.ceil(this.props.supbox.length / 20)
        if (this.state.secondArgPerBtn < itemsPerPage) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn + 1, secondArgPerBtn: prevState.secondArgPerBtn + 1, firstArg: prevState.firstArg + 20, secondArg: prevState.secondArg + 20, currentPage: prevState.currentPage + 1 }
            })

        }
    }

    render() {
        return (
            <div id="page-wrapper" className="emptrans">
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">مسمى وظيفي جديد</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <label>مساعد رئيس الشركة</label>
                                <select>
                                    <option>
                                        1
                                    </option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                                <BasicTable />
                            </div>
                        </div>
                    </div>
                    
                </div>
               

                <div className="row">
                    <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <table className="table table-striped table-hover " style={{ fontSize: "10pt", border: "1px solid black" }}>
                            <thead>
                                <tr style={{ color: "red" }}>
                                    <th>م</th>
                                    <th>مساعد رئيس الشركة</th>
                                    <th>الإدارة</th>
                                    <th>الإدارة العامة المساعدة</th>
                                    <th>الدرجة الوظيفية</th>
                                    <th>المسمى الوظيفي</th>
                                    <th>#</th>
                                    <th>المسمى الوظيفي المسئول</th>
                                    <th>مفعل / غير مفعل</th>
                                    <th>شاغر / مشغول</th>
                                    <th>فني / إداري</th>
                                </tr>
                            </thead>
                            <tbody style={{ border: "1px dotted black" }}>
                                {this.props.supbox.slice(this.state.firstArg, this.state.secondArg).map((sup, i) => (
                                    <tr>
                                        <td>{((this.state.currentPage - 1) * 20) + i + 1}</td>
                                        <td>{sup.hasAssisstant === "true" ? "يوجد" : "لا يوجد"}</td>
                                        <td>{sup.catename}</td>
                                        <td></td>
                                        <td>{sup.jdname}</td>
                                        <td>{sup.emp_box_name}</td>
                                        <td><span style={{
                                            border: "1px solid black",
                                            borderRadius: "24px",
                                            width: "25px",
                                            marginRight: "5px",
                                            display: "inline-block",
                                            height: "26px",
                                            background: "#c4c4c4"
                                        }}>{sup.emp_box_id}</span></td>
                                        <td>{sup.manager_box_name}</td>
                                        <td>{sup.ACTIV_NOT === 0 ? "مفعل" : sup.ACTIV_NOT === 1 ? "غير مفعل" : "غير معروف"}</td>
                                        <td>{sup.VAC_NOT === 0 ? "مشغول" : sup.VAC_NOT === 1 ? "شاغر" : "غير معروف"}</td>
                                        <td>{sup.G_ID === 1 ? "فني" : sup.G_ID === 2 ? "إداري" : "غير معروف"}</td>
                                    </tr>
                                ))}
                                {this.state.add ?
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><input style={{ width: 150, fontSize: "11pt" }} /></td>
                                        <td><input style={{ width: 150, fontSize: "11pt" }} /></td>
                                        <td><input style={{ width: 100, fontSize: "11pt" }} /></td>
                                        <td><input style={{ width: 250, fontSize: "11pt" }} /></td>
                                        <td></td>
                                        <td><input style={{ width: 200, fontSize: "11pt" }} /></td>
                                        <td><input style={{ width: 40, fontSize: "11pt" }} /></td>
                                        <td><input style={{ width: 80, fontSize: "11pt" }} /></td>
                                        <td><input style={{ width: 80, fontSize: "11pt" }} /></td>

                                    </tr>
                                    :
                                    null

                                }
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={this.addHandler} style={{ minWidth: 50, maxHeight: 25 }}><i className="fas fa-plus"></i></button>
                            </tbody>
                        </table>

                        <Pagination minusFirstArg={this.minusFirstArg} plusSecondArg={this.plusSecondArg}
                            firstArgPerBtn={this.state.firstArgPerBtn} secondArgPerBtn={this.state.secondArgPerBtn}
                            changargs={this.changeArgs} pagesLength={this.props.supbox.length} currentPage={this.state.currentPage} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        supbox: state.posts.supbox
    };
};
export default connect(mapStateToProps, {
    getSupbox
})(Supbox);