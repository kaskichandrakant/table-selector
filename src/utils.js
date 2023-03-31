import React from "react";


const centerValueStyles = {
    border: '1px solid black',
    display: 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
};

export const colorArray = [
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
export function createHeaders() {
    return (
        <tr style={{display: 'flex'}}>
            <th
                style={{
                    width: '20.5%',
                    ...centerValueStyles,
                }}
            >
                Actions
            </th>
            <th
                style={{
                    width: '40%',
                    ...centerValueStyles,
                }}
            >
                data
            </th>
            <th
                style={{
                    width: '40%',
                    ...centerValueStyles,
                }}
            >
                Comment
            </th>
        </tr>
    );
}

export function createDataRows(index, item, handleCheck, handleDelete) {
    return (
        <tr
            key={index}
            style={{background: item.backgroundColor, display: 'flex'}}
        >
            <td
                style={{
                    width: '10%',
                    ...centerValueStyles,
                }}
            >
                <input
                    key={'ip-' + index}
                    checked={item.checked}
                    type='checkbox'
                    name={item.label}
                    id={'ip-id-' + index}
                    onChange={() => {
                        handleCheck(item.label);
                    }}
                />
            </td>
            <td
                style={{
                    width: '10%',
                    ...centerValueStyles,
                }}
            >
                <div onClick={() => handleDelete(item.label)} style={{cursor: "pointer"}}> delete</div>
            </td>

            <td
                style={{
                    width: '40%',
                    ...centerValueStyles,
                }}
            >
                {item.label}
            </td>

            <td
                style={{
                    width: '40%',
                    ...centerValueStyles,
                }}
            >
                {item.label + ' one more data'}
            </td>
        </tr>
    );
}
