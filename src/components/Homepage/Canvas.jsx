import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { selectComponent, setComponents } from '../../redux/canvasSlice';
import { v4 as uuidv4 } from 'uuid';

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

    const addComponent = (component) => {
        // Generate a unique instanceId
        const instanceId = uuidv4();

        // Create a deep copy of the component and assign the same instanceId
        const newComponentInstance = {
            ...component,
            instanceId: instanceId,
            subComponents: component.subComponents.map(sub => ({
                ...sub,
                instanceId: instanceId
            }))
        };
        // Dispatch the action to update components in the Redux state
        dispatch(setComponents([...components, newComponentInstance]));
    };

    const handleSelectComponent = (subComp) => {
        dispatch(selectComponent(subComp));
    };

    return (
        <div>
            <h2 className="text-lg font-semibold px-5 pt-5">Canvas</h2>
            <div
                ref={drop}
                className={`p-5 min-h-screen flex flex-col gap-3 ${isOver ? 'bg-gray-100 m-4 p-4 rounded-lg' : ''}`}
            >
                {components?.map((comp, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white rounded shadow cursor-pointer flex flex-col items-center justify-center"
                    >
                        {renderSubComponents(comp?.subComponents, handleSelectComponent)}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Render subcomponents function
const renderSubComponents = (subComponents, handleSelectComponent) => {
    return subComponents?.map((subComp, index) => {
        const { type, src, alt, value, as, attributes } = subComp.componentInfo;
        const style = attributes?.style || {};

        const handleClick = () => handleSelectComponent(subComp);

        switch (type) {
            case 'image':
                return (
                    <img
                        key={index}
                        src={src}
                        alt={alt}
                        style={style}
                        onClick={handleClick}
                        className="cursor-pointer"
                    />
                );
            case 'text':
                return (
                    <p
                        key={index}
                        style={style}
                        onClick={handleClick}
                        className="cursor-pointer"
                    >
                        {value}
                    </p>
                );
            case 'heading':
                const HeadingTag = as || 'h1';
                return (
                    <HeadingTag
                        key={index}
                        style={style}
                        onClick={handleClick}
                        className="cursor-pointer"
                    >
                        {value}
                    </HeadingTag>
                );
            case 'button':
                return (
                    <span
                        key={index}
                        // href={href}
                        style={style}
                        onClick={handleClick}
                        className="cursor-pointer"
                    >
                        {value}
                    </span>
                );
            default:
                return null;
        }
    });
};

export default Canvas;
