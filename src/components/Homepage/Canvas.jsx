// Canvas.js
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { updateComponent } from '../../redux/canvasSlice';
import SubComponent from './SubComponent';


function Canvas({ components, onDrop, onSelect }) {
    const dispatch = useDispatch();
    const [, drop] = useDrop({
        accept: "component",
        drop: (item) => onDrop(item),
    });

    const handleComponentChange = (id, updatedData) => {
        dispatch(updateComponent({ id, updatedData }));
    };

    return (
        <div ref={drop} className="canvas">
            {components.map((component) => (
                <CanvasItem
                    key={component.id}
                    component={component}
                    onSelect={() => onSelect(component)}
                    onChange={(updatedData) => handleComponentChange(component.id, updatedData)}
                />
            ))}
        </div>
    );
}

function CanvasItem({ component, onSelect, onChange }) {
    return (
        <div className="canvas-item" onClick={onSelect}>
            {component.subComponents.map((sub, i) => (
                <SubComponent key={i} sub={sub} />
            ))}
            {/* Add customization options if needed */}
        </div>
    );
}

export default Canvas;
