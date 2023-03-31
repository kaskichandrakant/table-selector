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
import {createDataRows, createHeaders} from "./utils";

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


const colorArray = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
];

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
            <h1>Example react-chartjs-2 Chart with the custom selectors</h1>
            <BubbleChartWrapper/>
            <LineChartWrapper/>
        </div>
    );
}


