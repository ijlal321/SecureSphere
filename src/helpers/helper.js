
import { getAccessToken } from "@calimero-network/calimero-client";

export const getNodeUrl = () => {
    const res = localStorage.getItem('nodeUrl');
    return res
}

export const setNodeUrl = (url) => {
    localStorage.setItem('nodeUrl', url)
}

export const removeNodeUrl = () => {
    localStorage.removeItem('nodeUrl')
}


export const getApplicationId = () => {
    const res = localStorage.getItem('appId');
    return res
}

export const setApplicationId = (id) => {
    localStorage.setItem('appId', id)
}

export const removeApplicationId = () => {
    localStorage.removeItem('appId')
}



export function getJsonRpcClient() {
    return new JsonRpcClient(
        getAppEndpointKey()?.toString(),
        process.env['NEXT_PUBLIC_RPC_PATH'],
    );
}

export const getJWTObject = () => {
    const token = getAccessToken();
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) {
        console.error('Invalid JWT token');
        return;
    }
    const payload = JSON.parse(atob(parts[1]));
    return payload;
};

export function createJwtHeader() {
    const token = getAccessToken();

    if (!token) {
        return null;
    }

    const headers = {
        authorization: `Bearer ${token}`,
    };
    return headers;
}

export function getConfigAndJwt() {
    const jwtObject = getJWTObject();
    const headers = createJwtHeader();
    if (!jwtObject) {
        return {
            error: { message: 'Failed to get JWT token', code: 500 },
        };
    }
    if (jwtObject.executor_public_key === null) {
        return {
            error: { message: 'Failed to get executor public key', code: 500 },
        };
    }

    const config = {
        headers: headers,
    };

    return { jwtObject, config };
}