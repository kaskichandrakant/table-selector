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
import {createDataRows, createHeaders} from "./utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Line Chart - Multi Axis',
        },
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.random() * 1000),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y',
            checked: true,
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => Math.random() * 1000),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1',
            checked: true
        },
    ],
};


const LineChart = (props) => {
    return (
        <div>
            <Line options={options} data={props.data}/>
        </div>
    );
};


export default function LineChartWrapper() {
    let initialDataSet = [...data.datasets]
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
            <LineChart data={{...data, datasets: dataSets.filter(d => d.checked)}}/>
            {createIndexTable()}
        </div>
    );
}