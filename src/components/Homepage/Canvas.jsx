import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { setSelectedComponent, setComponents, undo, redo } from '../../redux/canvasSlice';
import { v4 as uuidv4 } from 'uuid';
import { renderSubComponents } from '../../utils/renderSubComponents';

const Canvas = () => {
    const selectedComponent = useSelector(state => state.canvas.selectedComponent);
    const undoStack = useSelector(state => state.canvas.undoStack);
    const redoStack = useSelector(state => state.canvas.redoStack);

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

    const handleUndo = () => {
        dispatch(undo());
    };

    const handleRedo = () => {
        dispatch(redo());
    };

    return (
        <div>
            <div className='flex items-center justify-between px-5'>
                <h2 className="text-lg font-semibold pt-5">Canvas</h2>
                <div className="flex gap-2 mt-4">
                    <button onClick={handleUndo} disabled={undoStack.length === 0} className={`${undoStack.length === 0 ? 'opacity-50' : 'opacity-100'} bg-gray-200 p-2 rounded}`}>
                        Undo
                    </button>
                    <button onClick={handleRedo} disabled={redoStack.length === 0} className={`${redoStack.length === 0 ? 'opacity-50' : 'opacity-100'} bg-gray-200 p-2 rounded}`}>
                        Redo
                    </button>
                </div>
            </div>
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
