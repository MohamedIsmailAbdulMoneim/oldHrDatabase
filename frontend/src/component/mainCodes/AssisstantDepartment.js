import React from "react";
import {
    getAssisstantDepartment, addAssisstantDepartment
} from "../../actions/Actions";
import { connect } from "react-redux";
import Pagination from "../Pagination";


class AssisstantDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add: false, edit: false, delete: false, firstArg: 0, secondArg: 20, currentPage: 1, rowId: null,
            firstArgPerBtn: 0, secondArgPerBtn: 10, catename: "", assisstantCatename: "" ,showMsg: false, editCatName: "", editAssisstantCatName: ""
        };

    }

    componentDidMount() {
        this.props.getAssisstantDepartment()
    }

    addHandler = (e) => {
        this.setState({
            add: true
        })
    }

    closeAddHandler = (e) => {
        this.setState({
            add: false
        })
    }

    addCateNameHandler = (e) => {
        this.setState({
            catename: e.target.value
        })
        console.log(e.target.value);
    }

    addAssisstantCateNameHandler = (e) => {
        this.setState({
            assisstantCatename: e.target.value
        })
    }

    submitNewCate = (e) => {
        this.setState({
            showMsg: true
        })
         this.props.addAssisstantDepartment({ catename: this.state.catename, assisstantcatename: this.state.assisstantCatename })
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
        let itemsPerPage = Math.ceil(this.props.assisstantDepartment.length / 20)
        if (this.state.secondArgPerBtn < itemsPerPage) {
            this.setState(prevState => {
                return { firstArgPerBtn: prevState.firstArgPerBtn + 1, secondArgPerBtn: prevState.secondArgPerBtn + 1, firstArg: prevState.firstArg + 20, secondArg: prevState.secondArg + 20, currentPage: prevState.currentPage + 1 }
            })

        }
    }

    editCatNameHandler = (e) => {
        this.setState({
            editCatName: e.target.value
        })
    }

    editAssisstantCatNameHandler = (e) => {
        this.setState({
            editAssisstantCatName: e.target.value
        })
    }

    handelEdit_1 = (e) => {
        console.log(e.target.getAttribute("tableId"));
        this.setState({ edit: true, rowId: e.target.getAttribute("tableId"), editCatId: e.target.getAttribute("tableId"), editCatName: e.target.getAttribute('catename'), oldCateId: e.target.getAttribute('oldCateId') })
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "white"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-edit")
            tds[tds.length - 2].childNodes[0].classList.add("fa-check")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-backspace")
            tds[tds.length - 1].childNodes[0].classList.add("fa-times")
        }
    }

    closeEditSectionHandler = (e) => {
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({ edit: false })
    }

    handelEdit_2 = (e) => {
        e.preventDefault()
        console.log('hit');
        let data = { cateid: this.state.editCatId, catename: this.state.editCatName, oldCateId: this.state.oldCateId }
        this.props.updateCate(data)
        let tds = document.getElementById(e.target.getAttribute("tableId")).childNodes
        for (let i = 0; i < tds.length; i++) {
            tds[i].style.background = "transparent"
            tds[tds.length - 2].childNodes[0].classList.remove("fa-check")
            tds[tds.length - 2].childNodes[0].classList.add("fa-edit")
            tds[tds.length - 1].childNodes[0].classList.remove("fa-times")
            tds[tds.length - 1].childNodes[0].classList.add("fa-backspace")
        }
        this.setState({
            edit: false
        })
    }

    render() {
        return (
            <div id="page-wrapper" className="department">
                <div className="row">
                    <div className="card-body">
                        <div style={{ height: "100%" }}>
                            <table className="table table-striped" style={{ textAlign: "right" }}>
                                <thead>
                                    <tr>
                                        <th>م</th>
                                        <th>الإدارة</th>
                                        <th>كود الإدارة العامة المساعدة</th>
                                        <th>الإدارة العامة المساعدة</th>
                                        <th>تعديل</th>
                                        <th>حذف</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.assisstantDepartment.slice(this.state.firstArg, this.state.secondArg).map((cate, i) => (
                                        <tr id={cate.CAT_ID}>
                                            <td>{((this.state.currentPage - 1) * 20) + i + 1}</td>
                                            <td>{this.state.edit && JSON.parse(this.state.rowId) === JSON.parse(cate.CAT_ID) ?
                                                <select onClick={this.editCatNameHandler} >
                                                    {this.props.cates.map((cat => (
                                                        <option catname={cat.CAT_NAME} catid={cat.CAT_ID} >{cat.CAT_NAME}</option>
                                                    )))}
                                                </select>
                                                : cate.CAT_NAME}</td>
                                            <td>{cate.ID}</td>
                                            <td>{this.state.edit && JSON.parse(this.state.rowId) === JSON.parse(cate.CAT_ID) ? <input onKeyUp={this.editAssisstantCatNameHandler} type="text" style={{ height: 30, width: 300 }} className="form-control" placeholder={this.state.editCatName} /> : cate.General_Administration_Assistant}</td>
                                            <td tableId={cate.CAT_ID} onClick={this.state.delete ? this.confirmDelete : this.state.edit ? this.handelEdit_2 : this.handelEdit_1}><i tableId={cate.CAT_ID} oldCateId={cate.CAT_ID} catename={cate.CAT_NAME} style={{ fontSize: 20 }} class="fas fa-edit"></i></td>
                                            <td tableId={cate.CAT_ID} onClick={this.state.delete ? this.closeDeleteSectionHandler : this.state.edit ? this.closeEditSectionHandler : this.deleteHandler}><i tableId={cate.CAT_ID} catename={cate.CAT_NAME} class="fas fa-backspace"></i></td>
                                        </tr>
                                    ))
                                    }
                                    {this.state.add ?
                                        <tr>
                                            <td></td>
                                            <td>
                                                <select onClick={this.addCateNameHandler} >
                                                    {this.props.cates.map((cat => (
                                                        <option catname={cat.CAT_NAME} catid={cat.CAT_ID} >{cat.CAT_NAME}</option>
                                                    )))}
                                                </select>
                                            </td>
                                            <td></td>
                                            <td><input onKeyUp={this.addAssisstantCateNameHandler} type="text" style={{ height: 30, width: 300 }} className="form-control" /></td>
                                            <td onClick={this.submitNewCate}><i className="fas fa-check"></i></td>
                                            <td><i onClick={this.closeAddHandler} className="fas fa-times"></i></td>
                                        </tr>
                                        :
                                        null
                                    }

                                </tbody>

                            </table>

                            {this.state.showMsg ? this.props.msg === "تم إدخال البيانات بنجاح" ? <div id="showmsg" style={{ width: "100%" }} className="alert alert-success" role="alert"> {this.props.msg}</div> : null : null}
                            <Pagination minusFirstArg={this.minusFirstArg} plusSecondArg={this.plusSecondArg}
                                firstArgPerBtn={this.state.firstArgPerBtn} secondArgPerBtn={this.state.secondArgPerBtn}
                                changargs={this.changeArgs} pagesLength={this.props.assisstantDepartment.length} currentPage={this.state.currentPage} />
                        </div>
                        <button onClick={this.addHandler} style={{ float: "right", minWidth: 50, marginBottom: 5, marginRight: 12, maxHeight: 25 }}><i className="fas fa-plus"></i></button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        cates: state.posts.cates,
        msg: state.posts.msg,
        assisstantDepartment: state.posts.assisstantDepartment

    };
};
export default connect(mapStateToProps, {
    getAssisstantDepartment,addAssisstantDepartment
})(AssisstantDepartment);