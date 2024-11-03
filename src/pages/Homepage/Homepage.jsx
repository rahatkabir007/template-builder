import React, { useEffect } from 'react';
import EmailTemplateBuilder from '../../components/Homepage/EmailTemplateBuilder';
import { useDispatch } from 'react-redux';
import { selectComponent } from '../../redux/canvasSlice';

const Homepage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // Clear selectedComponent on reload
        dispatch(selectComponent(null));
    }, [dispatch]);


    return <EmailTemplateBuilder />
};

export default Homepage;