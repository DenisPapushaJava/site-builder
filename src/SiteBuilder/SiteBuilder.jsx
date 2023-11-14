import React from 'react';
import GridLayout from 'react-grid-layout';

const parseGridLayoutStructure = (structure, onLayoutChange) => {
    const createComponent = (item) => {
        const { component, children, props, content } = item;

        if (component === 'GridLayout') {
            return (
                <GridLayout key={item.i} {...props}>
                    {children && children.map(createComponent)}
                </GridLayout>
            );
        }

        return React.createElement(
            component,
            { key: item.i, ...props },
            content,
            children && children.map(createComponent)
        );
    };

    return structure.map(createComponent);
};

const onLayoutChange = (layout) => {
    console.log('Layout changed:', layout);
};

const SiteBuilder = () => {
    const gridLayoutStructure = [
        {
            i: '1',
            x: 0,
            y: 0,
            w: 1,
            h: 2,
            component: 'div',
            props: { style: { backgroundColor: 'lightblue' } },
            children: [
                {
                    i: '2',
                    x: 0,
                    y: 0,
                    w: 1,
                    h: 2,
                    component: 'GridLayout',
                    props: {
                        className: 'layout',
                        cols: 12,
                        rowHeight: 100,
                        width: 300,
                        onLayoutChange: onLayoutChange,
                    },
                    children: [
                        {
                            i: '3',
                            x: 0,
                            y: 0,
                            w: 1,
                            h: 2,
                            component: 'div',
                            props: { style: { backgroundColor: 'lightgreen' } },
                            content: 'Block 2',
                        },
                        {
                            i: '4',
                            x: 1,
                            y: 0,
                            w: 1,
                            h: 2,
                            component: 'div',
                            props: { style: { backgroundColor: 'lightcoral' } },
                            content: 'Block 3',
                        },
                    ],
                },
            ],
        },
        {
            i: '5',
            x: 1,
            y: 0,
            w: 1,
            h: 2,
            component: 'div',
            props: { style: { backgroundColor: 'lightgreen' } },
            content: 'Block 4',
        },
        {
            i: '6',
            x: 2,
            y: 0,
            w: 1,
            h: 2,
            component: 'div',
            props: { style: { backgroundColor: 'lightcoral' } },
            content: 'Block 5',
        },
    ];


    return (
        <GridLayout className="layout" layout={gridLayoutStructure} cols={12} rowHeight={100} width={300} onLayoutChange={onLayoutChange}>
            {parseGridLayoutStructure(gridLayoutStructure, onLayoutChange)}
        </GridLayout>
    );
};

export default SiteBuilder;
