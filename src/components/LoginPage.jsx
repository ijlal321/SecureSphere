import React from 'react';
import { ClientLogin } from '@calimero-network/calimero-client';
import { useNavigate } from 'react-router-dom';
import { SetupModal } from '@calimero-network/calimero-client';
import { getNodeUrl, getApplicationId } from '../helpers/helper';
const LoginPage = () => {
    const navigate = useNavigate();


    return (
        <>

            <ClientLogin
                getNodeUrl={getNodeUrl}
                getApplicationId={getApplicationId}
                sucessRedirect={() => navigate('/dashboard')}
            />
        </>
    );
};

export default LoginPage;


// meroctl  --node-name node1 context create --application-id 9kkPCkcV4f3KvNNaKBfstt5m8nu8BgG89NW2zAKr5Yh1 --protocol near

// context invite 7qaGHLTUWg7S9vurLohkTQArYiEb3KAuwMP9L5ZwSRUH 9NLECz1PNBBeZvfRv3awx41cH3sY9cbGefkqeS34D3dS 62kKbaHLFoAnEhxHsZZwd1BbHhJWobzPW9GKPTKwDGbn

// identity ls 7qaGHLTUWg7S9vurLohkTQArYiEb3KAuwMP9L5ZwSRUH


// > Invited 62kKbaHLFoAnEhxHsZZwd1BbHhJWobzPW9GKPTKwDGbn to context 7qaGHLTUWg7S9vurLohkTQArYiEb3KAuwMP9L5ZwSRUH
// >> Invitation Payload: ivZdrfeDEt7zXDbznAr6omBwcRyc1jjp3DwPEsR1ZQGVSFt7Ph4hE7LkJMMnGqxbQ8nVT5CcSNyvF8SeSfQGTMF7r8ysMiHTUBSBWEsJeYPzve6rVfbLsp3WJe6RJDs9AjYUgwYmkAwAc3GupiqdEPz8tTY2St7Mm

// context join AzrgaCbDSfxi3a1KNRsqe7v4Xy6knhs3WdgFezhU2BAa ivZdrfeDEt7zXDbznAr6omBwcRyc1jjp3DwPEsR1ZQGVSFt7Ph4hE7LkJMMnGqxbQ8nVT5CcSNyvF8SeSfQGTMF7r8ysMiHTUBSBWEsJeYPzve6rVfbLsp3WJe6RJDs9AjYUgwYmkAwAc3GupiqdEPz8tTY2St7Mm
