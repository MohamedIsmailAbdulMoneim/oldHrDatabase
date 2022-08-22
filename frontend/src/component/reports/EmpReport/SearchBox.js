const SearchBox = (props) => {
    const { getUserInput } = props
    return (
        <div className="col-lg-12" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h6 class="card-header  text-white bg-secondary" style={{ width: 450, background: "white", height: 30 }}>بحث</h6>
            <div style={{ height: 100, width: 450 }} className="card-body">
                <div style={{ marginRight: 20, display: "flex", justifyContent: "center", alignItems: "center", marginLeft: 40 }}>
                    <div style={{ marginTop: 20, marginLeft: 0, width: "30%" }} className="input-group">
                        <span>رقم الأداء : </span><input onKeyUp={getUserInput} style={{ background: "white", width: "40%", marginBottom: 5, marginRight: 5, border: "1px solid black" }} type="text" name="EMPLOYEE_ID" />
                    </div>
                    <div style={{ marginTop: 20, marginRight: 0, width: "70%" }} className="input-group">
                        <span >الإسم : </span><input onKeyUp={getUserInput} style={{ background: "white", width: "80%", marginBottom: 5, marginRight: 0, marginLeft: "5%", border: "1px solid black" }} type="text" name="NAME_ARABIC" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;