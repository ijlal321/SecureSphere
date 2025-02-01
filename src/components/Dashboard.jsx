import React, { useEffect } from 'react';

import { JsonRpcClient } from '@calimero-network/calimero-client';
import { getNodeUrl, getApplicationId, getConfigAndJwt } from '../helpers/helper';

const Dashboard = () => {



    useEffect(() => {
        const loadDummy = async () => {
            // Initialize client
            const rpcClient = new JsonRpcClient(
                getNodeUrl(),
                '/jsonrpc',
            );

            const { jwtObject, config, error } = getConfigAndJwt();
            if (error) {
                return { error };
            }
            console.log(jwtObject)
            console.log(config)
            // Execute a method
            const response = await rpcClient.execute({
                contextId: jwtObject.context_id,
                method: "get_all_entries",
                argsJson: {username:"ijlal123", content:"A super man"},
                executorPublicKey: jwtObject.executor_public_key,
            },
                config,
            );
            console.log(response);
        }
        loadDummy();
    }, []);

    return (
        <div>
            Dashboard
        </div>
    );
};

export default Dashboard;
