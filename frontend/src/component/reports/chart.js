import React, { Component, Fragment } from "react";
import { Bar, Pie } from 'react-chartjs-2';
import { connect } from "react-redux";
var jp = require('jsonpath');



class Chart extends Component {

    render() {
        var names = jp.query(this.props.ceig, '$..result');
        return (
            <Fragment>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "30%" }}>
                        <Bar
                            data={{
                                labels: ['دراسات عليا', 'مؤهل عال', 'مؤهل فوق المتوسط', 'مؤهل متوسط', 'إعدادية', 'ابتدائية', 'محو أمية', 'بدونة مؤهل'],
                                datasets: [
                                    {
                                        label: 'مؤهلات',
                                        data: [
                                            this.props.qn.length ? this.props.qn[0][0].result : null, this.props.qn.length ? this.props.qn[1][0].result : null, this.props.qn.length ? this.props.qn[2][0].result : null, this.props.qn.length ? this.props.qn[3][0].result : null, this.props.qn.length ? this.props.qn[4][0].result : null, this.props.qn.length ? this.props.qn[5][0].result : null, this.props.qn.length ? this.props.qn[6][0].result : null, this.props.qn.length ? this.props.qn[7][0].result : null
                                        ],
                                        backgroundColor: [
                                            '#d1830e',
                                            'rgb(76, 104, 72)',
                                            '#0e92d1',
                                            'rgb(72, 106, 114)',
                                            '#7d0ed1',
                                            '#d10e8c',
                                            '#d10e0e',
                                            '#b3d10e',
                                        ]
                                    }
                                ]
                            }}
                            options={{
                                maintainAspectRatio: false, legend: {
                                    display: false
                                }, tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return tooltipItem.yLabel;
                                        }
                                    }
                                }
                            }}

                            width={200}
                            height={300}
                        />
                    </div>
                    <div style={{ width: "30%" }}>
                        <Pie data={{
                            labels: ['إناث', 'ذكور'],
                            datasets: [
                                {
                                    label: 'asdasdasd',
                                    data: [
                                        this.props.emps[1] ? this.props.emps[1].length ? this.props.emps[1][0].FEMALE : null : null,
                                        this.props.emps[0] ? this.props.emps[0].length ? this.props.emps[0][0].MALE : null : null
                                    ],
                                    backgroundColor: [
                                        'rgb(202, 184, 198)',
                                        'rgb(76, 104, 72)',

                                    ]
                                }
                            ]
                        }}
                            options={{
                                maintainAspectRatio: false, legend: {
                                    display: false
                                }, tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return tooltipItem.yLabel;
                                        }
                                    }
                                }
                            }}

                            width={200}
                            height={200}
                        />
                    </div>
                    {/* <div style={{ width: "30%", display: "flex" }}>
                        <div>
                            <i class="fas fa-male" style={{ fontSize: "150pt", color: "blue" }}></i>
                        </div>
                        <div>
                            <i class="fas fa-female" style={{ fontSize: "150pt", color: "pink" }}></i>
                        </div>
                    </div> */}
                    <div style={{ width: "30%" }}>
                        <Bar
                            data={{
                                labels: ['القاهرة', 'الأسكندرية', 'بورسعيد', 'السويس', 'الإسماعيلية', 'الدقهلية', 'الشرقية', 'الغربية', 'القليوبية', 'المنوفية', 'دمياط', 'الجيزة', 'الفيوم', 'بني سويف', 'المنيا', 'سوهاج', 'شمال سيناء'],
                                datasets: [
                                    {
                                        label: 'عدد العمالين بالمحافظات',
                                        data : names
                                        

                                            // this.props.ceig.length ? this.props.ceig[0][0] ? this.props.ceig[0][0].result : null : null, this.props.ceig.length ? this.props.ceig[1][0] ? this.props.ceig[1][0].result : null : null, this.props.ceig.length ? this.props.ceig[2][0] ? this.props.ceig[2][0].result : null : null, this.props.ceig.length ? this.props.ceig[3][0] ?this.props.ceig[3][0].result : null : null, this.props.ceig.length ? this.props.ceig[4][0].result : null, this.props.ceig.length ? this.props.ceig[5][0].result : null, this.props.ceig.length ? this.props.ceig[6][0].result : null, this.props.ceig.length ? this.props.ceig[7][0].result : null, this.props.ceig.length ? this.props.ceig[8][0].result : null, , this.props.ceig.length ? this.props.ceig[9][0].result : null, this.props.ceig.length ? this.props.ceig[10][0].result : null, this.props.ceig.length ? this.props.ceig[11][0].result : null, this.props.ceig.length ? this.props.ceig[12][0].result : null, this.props.ceig.length ? this.props.ceig[13][0].result : null, this.props.ceig.length ? this.props.ceig[14][0].result : null, this.props.ceig.length ? this.props.ceig[15][0].result : null, this.props.ceig.length ? this.props.ceig[16][0].result : null
                                        ,
                                        backgroundColor: [
                                            '#d1830e',
                                            'rgb(76, 104, 72)',
                                            '#0e92d1',
                                            'rgb(72, 106, 114)',
                                            '#7d0ed1',
                                            '#d10e8c',
                                            '#d10e0e',
                                            '#b3d10e',
                                            '#b3d10e',
                                            '#b3d10e',
                                            '#b3d10e',
                                            '#b3d10e',
                                            '#b3d10e',
                                            '#b3d10e',
                                            '#b3d10e',
                                            '#b3d10e',
                                            '#b3d10e',
                                        ]
                                    }
                                ]
                            }}
                            options={{
                                maintainAspectRatio: false, legend: {
                                    display: false
                                }, tooltips: {
                                    callbacks: {
                                        label: function (tooltipItem) {
                                            return tooltipItem.yLabel;
                                        }
                                    }
                                }
                            }}

                            width={200}
                            height={300}
                        />
                    </div>
                </div>



            </Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {

        qn: state.posts.qn,
        emps: state.posts.emps,
        ceig: state.reports.ceig
    };
};

export default connect(mapStateToProps, {
})(Chart);