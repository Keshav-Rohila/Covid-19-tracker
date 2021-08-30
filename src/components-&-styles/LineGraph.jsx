import React, { useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";
import "./LineGraph.css";


const buildChartData = (data, casesType = 'cases') => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if(lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] > 0 ? data[casesType][date] - lastDataPoint : data[casesType][date],
            }
            chartData.push(newDataPoint);
            }
        lastDataPoint = data[casesType][date];
        }
        
    return chartData;
}

function LineGraph(props) {
    const {casesType, country} = props;

    const [data, setData] = useState({});
    

    useEffect(async() => {
      if(country === "worldwide"){
          let url = "https://disease.sh/v3/covid-19/historical/all?lastdays=30"; 
          await fetch(url)
          .then(response => response.json())
          .then(data => {
                let chartData = buildChartData(data, casesType);
                setData(chartData);
          })
      }else {
          let url = `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`;
          await fetch(url)
          .then(response => response.json())
          .then(data => {
                let chartData = buildChartData(data.timeline, casesType);
                setData(chartData);
          })
      }
      
    }, [country, casesType])
    

    return (
        <div>
            {data?.length > 0 && (
              <Line className = "line-graph" 
              data = {{
                datasets:[{
                  label: casesType,
                  fill: true,
                  data: data,
                  borderColor: casesType === "cases" || casesType === "deaths" ? "#CC1034" : "#31ac0c" ,
                  backgroundColor: casesType === "cases" || casesType === "deaths" ? "rgba(204, 16, 52, 0.5)" : "rgba(90, 236, 22, 0.5)",
                  tension: 0.5,
                }]
              }}
              
              />
            )}
        </div>
    )
}

export default LineGraph;
