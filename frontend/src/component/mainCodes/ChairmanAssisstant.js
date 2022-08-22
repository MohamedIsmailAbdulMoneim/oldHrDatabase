import React from "react";
import {
    addChairmanAssisstant, getChairmanAssisstant, getCates, addDepToAssistant, editeChairmanAssistant, removeChairmanAssistant ,getChairmanDeps, delDepFA
} from "../../actions/Actions";
import { connect } from "react-redux";
import axios from "axios";

class ChairmanAssisstant extends React.Component {
    constructor(props) {
        super(props);
        this.state = { add: false, delete: false, addA: false, editA: false, deleteA: false, addAssisstant: "", catchDepartmentToAssisstant: "", updateAssisstant: "", addDepToAssistant: "", adddeptoAClicked: false, deleteDep: "", DetuctedAssistant: "" ,sharedChairmanId: "", sharedChairmanName: "" }
    }

    componentDidMount() {

        this.props.getChairmanAssisstant()
        this.props.getCates()
    }

    typeAssisstantHandler = (e) => {
        this.setState({
            addAssisstant: e.target.value
        })
    }

    submitAssisstantHandler = (e) => {
        this.props.addChairmanAssisstant({ chairmanAssisstant: this.state.addAssisstant })
    }

    editAssisstanthandler = (e) => {
        this.refs.change.value = e.target.value
        this.setState({sharedChairmanId: e.target.options[e.target.options.selectedIndex].getAttribute("caid"), sharedChairmanName: e.target.options[e.target.options.selectedIndex].getAttribute("cname")})
    }

    deleteAssisstanthandler = (e) => {
        this.refs.delete.value = e.target.value
        this.setState({sharedChairmanId: e.target.options[e.target.options.selectedIndex].getAttribute("caid")})
    }

    changeAssisstanthandler = (e) => {

    }

    // clickHandler = (e) => {
    //     console.log('hit');
    //     this.props.getMainbox(e.target.options[e.target.options.selectedIndex].getAttribute("catid"))
    //     console.log(e.target.getAttribute("catid"));
    //     this.setState({ catid: e.target.getAttribute("catid") })
    //     console.log(e.target.value);
    // }

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
            deleteDep: e.target.options[e.target.options.selectedIndex].getAttribute("catid"),
            DetuctedAssistant: e.target.options[e.target.options.selectedIndex].getAttribute("caid")
        })
    }

    addHandler = (e) => {
        if (this.state.addDepToAssistant.length > 0 && this.state.catchDepartmentToAssisstant) this.setState({ add: true, delete: false })
    }

    deleteHandler = (e) => {
        if (this.state.deleteDep.length > 0) this.setState({ delete: true, add: false })
    }

    confirmAdd = (e) => {
        const data = { catid: this.state.catid, jdid: this.state.chosenJd, jdidp: this.state.jdidp, joblevel: this.state.joblevel }
        this.props.addToMainBox(data)
        this.setState({
            add: false
        })
    }

    addDepToAssistantHandler = (e) => {
        this.setState({
            addDepToAssistant: e.target.value
        })
    }

    confirmDelete = (e) => {
        this.props.deleteFromMainBox({ catid: this.state.catid, mainboxid: this.state.deletedMain, jdid: this.state.deletedJd })
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

                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <div onClick={(e) => this.setState({ addA: !this.state.addA, editA: false, deleteA: false })} style={{ width: 150, height: 35, background: "#fff", display: "flex", alignItems: "center", cursor: "pointer" }}> <h6 style={{ margin: 0, transform: "translateX(-2px)" }}>إضـافة مساعـد جديـد</h6> <i class="far fa-plus-square" style={{ transform: "translateX(-25px)" }}></i></div>
                                        {this.state.addA ?
                                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                                <input onKeyUp={this.typeAssisstantHandler} className="form-control" style={{ margin: "5px 0", width: 200, height: 38 }} />
                                                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ minWidth: 100, height: 35, transform: "translateY(7px)" }}>اضف</button>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        <div onClick={(e) => this.setState({ editA: !this.state.editA, addA: false, deleteA: false })} style={{ width: 70, height: 35, background: "#fff", display: "flex", alignItems: "center", cursor: "pointer", }}> <h6 style={{ margin: 0, transform: "translateX(-2px)" }}>تعديـــل</h6> <i class="fas fa-marker" style={{ transform: "translateX(-5px)" }}></i></div>
                                        {this.state.editA ?
                                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                                <input ref="change" onKeyUp={(e) => this.setState({sharedChairmanName: e.target.value})} className="form-control" style={{ margin: "5px 0", width: 200, height: 38 }} />
                                                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal_2" style={{ minWidth: 100, height: 35, transform: "translateY(7px)" }}>عدل</button>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                    <div>
                                        <div onClick={(e) => this.setState({ deleteA: !this.state.deleteA, editA: false, addA: false })} style={{ width: 70, height: 35, background: "#fff", display: "flex", alignItems: "center", cursor: "pointer", }}> <h6 style={{ margin: 0, transform: "translateX(-2px)" }}>حــذف</h6> <i class="far fa-minus-square" style={{ transform: "translateX(-15px)" }}></i></div>
                                        {this.state.deleteA ?
                                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                                <input ref="delete" onKeyUp={this.typeAssisstantHandler} className="form-control" style={{ margin: "5px 0", width: 200, height: 38 }} />
                                                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal_3" style={{ minWidth: 100, height: 35, transform: "translateY(7px)" }}>حذف</button>
                                            </div>
                                            :
                                            null
                                        }
                                    </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                                    <div>
                                        <div onClick={(e) => {
                                            this.setState({ adddeptoAClicked: !this.state.adddeptoAClicked })
                                        }} style={{ width: 150, height: 35, background: "#fff", display: "flex", alignItems: "center", cursor: "pointer" }}> <h6 style={{ margin: 0, transform: "translateX(-2px)" }}>إضافة إدارة إلى مساعد</h6> <i class="far fa-plus-square" style={{ transform: "translateX(-25px)" }}></i></div>
                                    </div>
                                </div>

                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div className="modal-header">
                                                <div></div>
                                                <h5 className="modal-title" id="exampleModalLabel">إضافة مساعد جديد</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" ariaLabel="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                هل أنت متأكد من إضافة البيانات
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                                                <button onClick={this.submitAssisstantHandler} type="button" class="btn btn-primary" data-bs-dismiss="modal">تأكيد</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="exampleModal_2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div className="modal-header">
                                                <div></div>
                                                <h5 className="modal-title" id="exampleModalLabel">تعديل مساعد</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" ariaLabel="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                هل أنت متأكد من تعديل البيانات
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                                                <button onClick={() => this.props.editeChairmanAssistant({caname: this.state.sharedChairmanName, id: this.state.sharedChairmanId})} type="button" class="btn btn-primary" data-bs-dismiss="modal">تأكيد</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="exampleModal_3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div className="modal-header">
                                                <div></div>
                                                <h5 className="modal-title" id="exampleModalLabel">حذف مساعد</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" ariaLabel="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                هل أنت متأكد من حذف البيانات
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إلغاء</button>
                                                <button onClick={() => this.props.removeChairmanAssistant({id :this.state.sharedChairmanId})} type="button" class="btn btn-primary" data-bs-dismiss="modal">تأكيد</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {this.state.adddeptoAClicked ?
                                    <>
                                        <select onChange={(e) => this.setState({
                                            catchDepartmentToAssisstant: e.target.options[e.target.options.selectedIndex].getAttribute("caid")
                                        })} >
                                            {this.props.chairmanAssisstant.map(data => (
                                                <>
                                                    <option caid={data.id}>{data.ca_name}</option>
                                                </>
                                            ))}
                                            <option selected>اختر</option>
                                        </select>
                                    </>
                                    :
                                    null
                                }

                                {!this.state.adddeptoAClicked ?
                                    <div style={{ width: "100%" }}>
                                        <label style={{ display: "block" }} for="pet-select">المساعدون</label>
                                        <select onChange={this.state.editA ? this.editAssisstanthandler : this.state.deleteA ? this.deleteAssisstanthandler : (e) => {this.props.getChairmanDeps(e.target.options[e.target.options.selectedIndex].getAttribute("caid"))
                                    }} style={styles} multiple name="pets" id="pet-select">
                                            {this.props.chairmanAssisstant.map(data => (
                                                <>
                                                    <option cname={data.ca_name} caid={data.id}>{data.ca_name}</option>
                                                </>
                                            ))}
                                        </select>
                                    </div>
                                    :
                                    null
                                }
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div style={{ width: "48%" }}>
                                        <label style={{ display: "block" }} for="pet-select">الإدارات</label>
                                        <select onChange={(e) => this.setState({ addDepToAssistant: e.target.options[e.target.options.selectedIndex].getAttribute("catid") })} style={styles} multiple name="pets" id="pet-select">
                                            {this.props.cates.map(cate => (
                                                <option catid={cate.CAT_ID}>{cate.CAT_NAME}</option>
                                            ))}
                                        </select>
                                        <button onClick={this.addHandler} style={{ width: "100%" }}>اضف</button>
                                    </div>
                                    {this.state.add || this.state.delete ?
                                        <div style={{ margin: "auto 0" }}>
                                            <i style={{ display: "block", marginBottom: 15, color: "#376237" }} onClick={this.state.add ? (e) => {this.props.addDepToAssistant({ caid: this.state.catchDepartmentToAssisstant, catid: this.state.addDepToAssistant })
                                             this.setState({add: false})} : this.state.delete ? (e) => {this.props.delDepFA({caid: this.state.DetuctedAssistant , catid: this.state.deleteDep })
                                             this.setState({add:false, delete: false})} : null} className="fas fa-check"></i>
                                            <i style={{ display: "block", color: "#970f0f" }} onClick={this.closeConfirm} className="fas fa-times"></i>
                                        </div>
                                        :
                                        null
                                    }
                                    <div style={{ width: "48%" }}>
                                        <label style={{ display: "block" }} for="pet-select">إدارات المساعد</label>
                                        <select onChange={this.choseToDeleteHandler} style={styles} multiple name="pets" id="pet-select">
                                            {this.props.chairmanDepartments.map(dep => (
                                                <option caid={dep.ca_id} catid={dep.CAT_ID}>{dep.catname}</option>
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
        chairmanAssisstant: state.posts.chairmanAssisstant,
        cates: state.posts.cates,
        chairmanDepartments: state.posts.chairmanDepartments
    };
};
export default connect(mapStateToProps, {
    addChairmanAssisstant, getChairmanAssisstant, getCates, addDepToAssistant, getChairmanDeps, editeChairmanAssistant, removeChairmanAssistant ,delDepFA
})(ChairmanAssisstant);