// Sidebar.js
import React from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENTS } from '../../datas/componentData';


function Sidebar({ onDrop }) {
    return (
        <div className="sidebar">
            <h3>Components</h3>
            {COMPONENTS.map((component) => (
                <SidebarItem key={component.id} component={component} />
            ))}
        </div>
    );
}

function SidebarItem({ component }) {
    const [{ isDragging }, drag] = useDrag({
        type: "component",
        item: component,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className="sidebar-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {component.componentInfo.name}
        </div>
    );
}

export default Sidebar;
