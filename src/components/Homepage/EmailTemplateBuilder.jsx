import Sidebar from './Sidebar';
import Canvas from './Canvas';
import CustomizerPanel from './CustomizerPanel';

const EmailTemplateBuilder = () => {


    return (
        <div className="flex h-screen">
            <div className='basis-[30%] bg-gray-100'>
                <Sidebar />
            </div>
            <div className='basis-[40%] bg-gray-50 max-h-screen overflow-auto'>
                <Canvas o />
            </div>
            <div className='basis-[30%] bg-gray-100'>
                <CustomizerPanel />
            </div>
        </div>
    );
};

export default EmailTemplateBuilder;
