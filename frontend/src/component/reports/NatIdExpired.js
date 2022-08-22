import React from "react";
import {
    getEmpByDeps
} from "../../actions/Actions";
import {
    getNatIdExpired
} from "../../actions/ReportActions"
import { connect } from "react-redux";

class NatIdExpired extends React.Component {
    constructor(props) {
        super(props);
        this.state = { govern: null, station: null }

    }

    componentDidMount() {
        this.props.getNatIdExpired()
    }


    handel = (e) => {
        this.props.getEmpByDeps(e.target.getAttribute('depart'))
    }


    render() {

        console.log(this.props.empdep);
        

        return (
            <div id="page-wrapper" className="natidexpire">
                <div class="row">

                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                بيان ببطاقات الرقم القومي المنتهية
                            </div>
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                                        <thead>
                                            <tr>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>رقم الأداء</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>الإسم</th>
                                                <th style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>رقم البطاقة</th>
                                            </tr>
                                        </thead>

                                        {this.props.expiredIdCard.map(card => (
                                            <tbody>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{card.EMPLOYEE_ID}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{card.NAME_ARABIC}</td>
                                                <td style={{ fontFamily: 'Markazi Text ,serif', fontWeight: 700, fontSize: "15pt" }}>{card.NATIONAL_ID_CARD_EXPIRE_DATE}</td>
                                            </tbody>
                                        ))}

                                    </table>
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
        expiredIdCard: state.reports.expiredIdCard


    };
};
export default connect(mapStateToProps, {
    getEmpByDeps,getNatIdExpired
})(NatIdExpired);