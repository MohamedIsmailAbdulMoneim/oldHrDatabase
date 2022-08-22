import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import download from 'js-file-download';

import axios from "axios";


const StructureReport = () => {
    const clickHandler = (e) => {
        axios.get(`http://${process.env.REACT_APP_URL}/getStructRep`).then(data => {
            console.log(data);
            axios({
                method: "POST",
                data,
                withCredentials: true,
                responseType: 'arraybuffer',
                url: `http://${process.env.REACT_APP_URL}/postStructRep`,
            }).then(resp => {
                download(resp.data, 'struct.xlsx');
            });
        }
        )
    }




    return (
        <Link to="#" onClick={clickHandler}>
            تقرير بالهيكل
        </Link>
    )

}

export default StructureReport;