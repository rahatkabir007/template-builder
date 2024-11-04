import Sidebar from './Sidebar';
import Canvas from './Canvas';
import CustomizerPanel from './CustomizerPanel';
import { useDispatch } from 'react-redux';
import { setSelectedComponent } from '../../redux/canvasSlice';

const EmailTemplateBuilder = () => {

    const dispatch = useDispatch()

    const resetSelectedComponent = (e) => {
        e.stopPropagation()
        dispatch(setSelectedComponent(null));
    }
    return (
        <div className="flex h-screen">
            <div className="basis-[30%] bg-gray-100" onClick={(e) => resetSelectedComponent(e)}>
                <Sidebar />
            </div>
            <div className="basis-[40%] bg-gray-50 max-h-screen overflow-auto">
                <Canvas />
            </div>
            <div className="basis-[30%] bg-gray-100">
                <CustomizerPanel />
            </div>
        </div>
    );
};

export default EmailTemplateBuilder;
