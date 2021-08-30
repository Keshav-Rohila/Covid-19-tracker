import React from 'react';
import "./InfoBox.css";
import { Card, CardContent,  Typography} from "@material-ui/core";
import numeral from "numeral";

function InfoBox(props) {
    const {title, cases, total, active, isRed, onClick} = props;

    const prettyPrintCases = (cases) => cases ? `${numeral(cases).format("+0.0 a")}` : "+0";
    const prettyPrintTotal = (total) => total ? `${numeral(total).format("0,0")}` : "0";

    return (

        <Card className = {`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick = {onClick}>
          <CardContent>
            <Typography className = "infoBox__title" color = "textSecondary">{title}</Typography>
            <h2 className = {`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{prettyPrintCases(cases)}</h2>
            <Typography className = "infoBox__total" color = "textSecondary">{prettyPrintTotal(total)} Total</Typography>
          </CardContent>
         </Card>

    )
}

export default InfoBox;
