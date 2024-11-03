import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';

const Canvas = ({ onSelectComponent }) => {
    const [components, setComponents] = useState(
        JSON.parse(localStorage.getItem('canvasComponents')) || []
    );

    useEffect(() => {
        localStorage.setItem('canvasComponents', JSON.stringify(components));
    }, [components]);

    const [drop] = useDrop({
        accept: 'component',
        drop: (item) => addComponent(item.component),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const addComponent = (component) => {
        setComponents([...components, component]);
    };

    const selectComponent = (component) => {
        onSelectComponent(component);
    };

    return (
        <div ref={drop} className="p-4">
            <h2 className="text-lg font-semibold">Canvas</h2>
            {components.map((comp, index) => (
                <div
                    key={index}
                    onClick={() => selectComponent(comp)}
                    className="p-4 m-2 bg-white rounded shadow cursor-pointer flex flex-col justify-center items-center"
                >
                    {renderSubComponents(comp.subComponents)}
                </div>
            ))}
        </div>
    );
};

// Function to render each subcomponent based on its type and attributes
const renderSubComponents = (subComponents) => {
    return subComponents.map((subComp, index) => {
        const { type, src, alt, value, href, as, attributes } = subComp.componentInfo;

        // Common style attribute handling
        const style = attributes?.style || {};

        switch (type) {
            case 'image':
                return <img key={index} src={src} alt={alt} style={style} />;
            case 'text':
                return (
                    <p key={index} style={style}>
                        {value}
                    </p>
                );
            case 'heading':
                const HeadingTag = as || 'h1';
                return (
                    <HeadingTag key={index} style={style}>
                        {value}
                    </HeadingTag>
                );
            case 'button':
                return (
                    <a key={index} href={href} style={style}>
                        {value}
                    </a>
                );
            default:
                return null;
        }
    });
};

export default Canvas;
