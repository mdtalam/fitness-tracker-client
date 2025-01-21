import React from 'react';
import { Navigate } from 'react-router-dom';
import useRole from '../Hooks/useRole';
import Spinner from '../OthersComponent/Spinner';

const TrainerRoute = ({children}) => {
    const [role, isLoading] = useRole();
    if(isLoading){
        return <Spinner></Spinner>
    }
    if(role === 'trainer'){
        return children;
    }
    return <Navigate to="/dashboard"></Navigate>
};

export default TrainerRoute;