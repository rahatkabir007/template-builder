import React from 'react';
//react-router
import { Route, Routes } from 'react-router-dom';
import { mainroutes } from '../../utils/allroutes';



const MainRoutes = () => {

    return (
        <>
            <Routes>
                {
                    mainroutes.map(route => {
                        return (
                            <Route key={route.path} path={route.path} element={route.element}> </Route>
                        )
                    })
                }

            </Routes>
        </>
    );
};

export default MainRoutes;