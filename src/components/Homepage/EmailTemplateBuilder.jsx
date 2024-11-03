import { useState } from 'react';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import CustomizerPanel from './CustomizerPanel';

const EmailTemplateBuilder = () => {

    const [selectedComponent, setSelectedComponent] = useState(null);

    const handleSelectComponent = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className="flex h-screen">
            <div className='basis-[30%] bg-gray-100'>
                <Sidebar />
            </div>
            <div className='basis-[40%] bg-gray-50 max-h-screen overflow-auto'>
                <Canvas onSelectComponent={handleSelectComponent} />
            </div>
            <div className='basis-[30%] bg-gray-100'>
                <CustomizerPanel component={selectedComponent} />
            </div>
        </div>
    );
};

export default EmailTemplateBuilder;
