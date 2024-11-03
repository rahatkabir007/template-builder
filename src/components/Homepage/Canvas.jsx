import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { selectComponent, setComponents } from '../../redux/canvasSlice';


const Canvas = () => {
    const components = useSelector(state => state.canvas.components);
    const dispatch = useDispatch();

    const [{ isOver }, drop] = useDrop({
        accept: 'component',
        drop: (item) => addComponent(item.component),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    useEffect(() => {
        // Load initial components from local storage if available
        const savedComponents = JSON.parse(localStorage.getItem('canvasComponents')) || [];
        dispatch(setComponents(savedComponents));
    }, [dispatch]);

    useEffect(() => {
        // Save components to local storage whenever they change
        localStorage.setItem('canvasComponents', JSON.stringify(components));
    }, [components]);

    const addComponent = (component) => {
        dispatch(setComponents([...components, component]));
    };

    const handleSelectComponent = (comp) => {
        dispatch(selectComponent(comp));
    };

    return (
        <div ref={drop} className="p-4">
            <h2 className="text-lg font-semibold">Canvas</h2>
            {components.map((comp, index) => (
                <div
                    key={index}
                    onClick={() => handleSelectComponent(comp)}
                    className="p-4 m-2 bg-white rounded shadow cursor-pointer flex flex-col items-center justify-center"
                >
                    {renderSubComponents(comp.subComponents)}
                </div>
            ))}
        </div>
    );
};

// Original renderSubComponents function
const renderSubComponents = (subComponents) => {
    return subComponents.map((subComp, index) => {
        const { type, src, alt, value, href, as, attributes } = subComp.componentInfo;
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
