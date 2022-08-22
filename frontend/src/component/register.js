import React, { Component } from "react";
import { connect } from "react-redux";
import {
    register,
} from "../actions/AuthActions";
import { clearErrors } from "../actions/ErrorActions"
import PropTypes from 'prop-types';


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { username: null, password: null, userType: null, msg: null };

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErorrs: PropTypes.func.isRequired
    }

    usernameHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            username: e.target.value
        })
    }

    passwordHandler = (e) => {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        })
    }

    userTypehandler = (e) => {
        this.setState({
            userType: e.target.value
        })
    }

    newUserHandler = (e) => {
        e.preventDefault()
        const { username, password, userType } = this.state
        console.log(userType);
        const newUser = {
            uname: username,
            pw: password,
            userType
        }
        this.props.register(newUser)
        // window.location.reload()

    }

    componentDidUpdate(prevProps) {
        const { error } = this.props
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL') {
                console.log('hit');

                this.setState({ msg: error.msg.msg })
            } else {
                this.setState({ msg: null })
            }
        }
    }

    render() {
        console.log(this.state.msg);
        return (

            <div className="row">
                <div >
                    <div className="card-body" style={{ margin: "0 auto", width: 500 }}>
                        <h4 className="card-header bg-secondary">تسجيل مستخدم جديد</h4>
                        <div className="panel-body" style={{padding: 10}}>
                                {this.state.msg ? <div className="alert alert-danger" role="alert">{this.state.msg}</div> : null}

                                <div className="form-group">
                                    <input onChange={this.usernameHandler} className="form-control reg" placeholder="username" type="text" autofocus required />
                                </div>
                                <div class="form-group">
                                    <input onChange={this.passwordHandler} className="form-control reg" placeholder="Password" type="password" required />
                                </div>
                                <div class="form-group">
                                    <select onChange={this.userTypehandler} className="form-control reg" placeholder="User Type" type="text" required>
                                        <option>Admin</option>
                                        <option>Sub Admin</option>
                                        <option>Appraisal</option>
                                        <option>Training</option>
                                    </select>
                                </div>
                                <a onClick={this.newUserHandler} href="index.html" className="btn btn-lg btn-success btn-block">Register</a>                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        error: state.error
    };
};

export default connect(mapStateToProps, {
    register, clearErrors
})(Register);