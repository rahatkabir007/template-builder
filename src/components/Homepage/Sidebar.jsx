import React from 'react';
import { useDrag } from 'react-dnd';
import { COMPONENTS } from '../../datas/componentData';

const Sidebar = () => (
    <div className="p-4">
        <h2 className="text-lg font-semibold">Components</h2>
        <ul>
            {COMPONENTS.map((comp) => (
                <DraggableComponent key={comp.id} component={comp} />
            ))}
        </ul>
    </div>
);

const DraggableComponent = ({ component }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: { component },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <li
            ref={drag}
            className={`bg-white p-2 my-2 shadow rounded cursor-pointer ${isDragging ? 'opacity-50' : ''}`}
        >
            {component?.componentInfo?.name}
        </li>
    );
};

export default Sidebar;
