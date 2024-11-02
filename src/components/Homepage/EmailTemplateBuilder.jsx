// EmailTemplateBuilder.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import CustomizerPanel from './CustomizerPanel';
import { addComponent, undo, redo } from '../../redux/canvasSlice';


function EmailTemplateBuilder() {
    const dispatch = useDispatch();
    const components = useSelector((state) => state.canvas.components);
    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleDrop = (component) => {
        dispatch(addComponent({ ...component, id: `${component.id}-${Date.now()}` }));
    };

    const handleSelect = (component) => {
        setSelectedComponent(component);
    };

    const handleUndo = () => dispatch(undo());
    const handleRedo = () => dispatch(redo());

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="email-template-builder">
                <Sidebar />
                <Canvas components={components} onDrop={handleDrop} onSelect={handleSelect} />
                <CustomizerPanel component={selectedComponent} />
                <div className="toolbar">
                    <button onClick={handleUndo}>Undo</button>
                    <button onClick={handleRedo}>Redo</button>
                </div>
            </div>
        </DndProvider>
    );
}

export default EmailTemplateBuilder;
