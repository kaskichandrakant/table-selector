import React from 'react';
import {useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Bubble} from 'react-chartjs-2';

import annotationPlugin from 'chartjs-plugin-annotation';
import LineChartWrapper from "./LineChart";
import {colorArray, createDataRows, createHeaders} from "./utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    annotationPlugin,
);
const maxColoredValues = 5;
function generateData() {
    return Array.from(Array(1000).keys()).map((label) => {
        return {
            data: [
                {
                    x: Math.random() * 1000,
                    y: Math.random() * 1000,
                    r: 10,
                },
            ],
            backgroundColor:
                maxColoredValues > label
                    ? colorArray[Math.ceil(Math.random() * 70)]
                    : undefined,
            label: label,
            checked: true,
        };
    });
}

const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
};

const BubbleChart = (props) => {
    const renderThis = {
        datasets: props.data,
    };
    return (
        <div>
            <Bubble data={renderThis} options={options}/>
        </div>
    );
};

export function BubbleChartWrapper() {
    let initialDataSet = generateData();
    let [dataSets, setDataSets] = useState(initialDataSet);

    const handleCheck = (id) => {
        let current = dataSets.findIndex((d) => d.label === id);
        const updated = {...dataSets[current]};
        updated.checked = !updated.checked;
        const newData = [...dataSets];
        newData[current] = updated;
        setDataSets(newData);
    };

    const handleDelete = (id) => {
        let updatedData = dataSets.filter((d) => d.label !== id);
        setDataSets(updatedData);
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
            <h1>Bubble Chart with custom selectors</h1>
            <BubbleChart data={dataSets.filter((d) => d.checked)}/>
            {createIndexTable()}
        </div>
    );
}


export default function App() {
    return (
        <div style={{display: "flex", flexDirection: "column",alignItems:"center"}}>
            <BubbleChartWrapper/>
            <LineChartWrapper/>
        </div>
    );
}


