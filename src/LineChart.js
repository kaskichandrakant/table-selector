import {Line} from "react-chartjs-2";
import React, {useState} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {colorArray, createDataRows, createHeaders} from "./utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

let datapointsCount = 10
const labels = Array.from(Array(datapointsCount).keys())

function generateData() {
    return Array.from(Array(5).keys()).map((label) => {
        const color = colorArray[Math.ceil(Math.random() * 50)]
        return {
            data: [0, ...Array.from(Array(datapointsCount).keys()).map(() => Math.random() * 100)],
            borderColor: color,
            backgroundColor: color,
            label: label,
            checked: true,
        };
    });
}

export const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
};


const LineChart = (props) => {
    return (
        <div>
            <Line options={options} data={props.data}/>
        </div>
    );
};


export default function LineChartWrapper() {
    let initialDataSet = generateData()
    let [dataSets, setDataSets] = useState(initialDataSet);
    const handleDelete = (id) => {
        let updatedData = dataSets.filter((d) => d.label !== id);
        setDataSets(updatedData);
    };

    const handleCheck = (id) => {
        let current = dataSets.findIndex((d) => d.label === id);
        const updated = {...dataSets[current]};
        updated.checked = !updated.checked;
        const newData = [...dataSets];
        newData[current] = updated;
        setDataSets(newData);
    };


    function createIndexTable() {
        return (
            <table style={{width: '100%'}}>
                {createHeaders()}
                {dataSets
                    .filter((d) => d.backgroundColor !== undefined)
                    .map((item, index) => {
                        return createDataRows(index, item, handleCheck, handleDelete);
                    })}
            </table>
        );
    }

    return (
        <div style={{width: '1000px', margin: '30px'}}>
            <h1>Line Chart with custom selectors</h1>
            <LineChart data={{labels, datasets: dataSets.filter(d => d.checked)}}/>
            {createIndexTable()}
        </div>
    );
}