import React from "react";
import {
    getCates,
    getJobDgByCat,
    getQn

} from "../actions/Actions";
import { connect } from "react-redux";
import Chart from "./reports/chart"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { jobbycat: null || this.props.jobdgbycat, catid: null };

    }

    componentDidMount(){
        this.props.getCates()
        this.props.getQn()
    }

    render(){
        return (
            <div id="page-wrapper">
                <div className="chart">
                <Chart />
                </div>

            </div>
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
    getCates, getJobDgByCat,getQn
})(Home);