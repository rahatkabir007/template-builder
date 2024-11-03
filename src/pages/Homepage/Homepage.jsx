import React, { useEffect } from 'react';
import EmailTemplateBuilder from '../../components/Homepage/EmailTemplateBuilder';
import { useDispatch } from 'react-redux';
import { setSelectedComponent } from '../../redux/canvasSlice';

const Homepage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Clear selectedComponent on reload
        dispatch(setSelectedComponent(null));
    }, [dispatch]);


    return <EmailTemplateBuilder />
};

export default Homepage;