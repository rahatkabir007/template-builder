import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { setSelectedComponent, setComponents } from '../../redux/canvasSlice';
import { v4 as uuidv4 } from 'uuid';
import { renderSubComponents } from '../../utils/renderSubComponents';

const Canvas = () => {
    const selectedComponent = useSelector(state => state.canvas.selectedComponent);
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
        const instanceId = uuidv4();

        const newComponentInstance = {
            ...component,
            instanceId: instanceId,
            subComponents: component.subComponents.map(sub => ({
                ...sub,
                instanceId: instanceId
            }))
        };
        dispatch(setComponents([...components, newComponentInstance]));
    };

    const handleSelectedComponent = (subComp) => {
        dispatch(setSelectedComponent(subComp));
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
                        {renderSubComponents(comp?.subComponents, handleSelectedComponent, selectedComponent)}
                    </div>
                ))}
            </div>
        </div>
    );
};




export default Canvas;
