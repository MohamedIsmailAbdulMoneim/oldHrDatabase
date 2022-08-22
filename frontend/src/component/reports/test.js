<div style={{ display: "table" }}>
    <div style={{ display: "table-row" }}>
        <div style={{ display: "table-cell" }}>
            <label style={{ width: "100%", textAlign: "right" }}>رقم الأداء : </label>
        </div>
        <div style={{ display: "table-cell" }}>
            <input className="form-control" style={{ width: "70%" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].EMPLOYEE_ID : null : null} readonly="readonly" type="number" />
        </div>
        
        <div style={{ display: "table-cell" }}>
        <label style={{ width: "100%", textAlign: "right" }}>الإسم : </label>        </div>
        <div style={{ display: "table-cell" }}>
        <input ref="nameinput" className="form-control" style={{ width: "130%", marginLeft: 30 }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].NAME_ARABIC : null : null} readonly="readonly" type="text" />
        </div>
    </div>
    <div style={{ display: "table-row", marginTop: 20 }}>
        <div style={{ display: "table-cell" }}>
        <label style={{ width: "100%", textAlign: "right" }}>تاريخ العقد : </label>
        </div>
        <div style={{ display: "table-cell" }}>
        <input className="form-control" style={{ width: "100%", color: "red" }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].SECTOR_JOIN_DATE : null : null} type="text" readonly="readonly" />
        </div>
        <div style={{ display: "table-cell" }}>
        <label style={{ width: "100%", textAlign: "right" }}>تاريخ التعيين : </label>
        </div>
        <div style={{ display: "table-cell" }}>
        <input className="form-control" style={{ width: "100%", marginLeft: 30 }} placeholder={this.props.empdetails ? this.props.empdetails.length ? this.props.empdetails[0].TRANS_DATE : null : null} type="text" readonly="readonly" />
        </div>
    </div>
</div>