import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SetupModal } from '@calimero-network/calimero-client';

import { getNodeUrl, setNodeUrl, getApplicationId, setApplicationId } from '../helpers/helper';

const SetUpPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <SetupModal
                successRoute={() => navigate('/login')}
                getNodeUrl={getNodeUrl}
                setNodeUrl={setNodeUrl}
                getApplicationId={getApplicationId}
                setApplicationId={setApplicationId}
            />
        </>
    );
};

export default SetUpPage;
