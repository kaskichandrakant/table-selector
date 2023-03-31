import React from "react";


const centerValueStyles = {
    border: '1px solid black',
    display: 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
};

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
