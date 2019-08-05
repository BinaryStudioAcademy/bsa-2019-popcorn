// @ts-ignore
import qs from 'qs';

interface RequestInit {
    endpoint: string,
    query?: any,
    method: string,
    skipAuthorization?: boolean,
    body?: any
}

export default async (args: RequestInit) => {
    try {
        const result =  await fetch(
            getUrl(args),
            getArgs(args)
        );

        return result;
        
    } catch (err) {
        throw err;
    }
};

const getUrl = (args: any): string => args.endpoint + (args.query ? `?${qs.stringify(args.query)}` : '');


const getArgs = (args: any): object => {
    const headers: any = {};

    const token = localStorage.getItem('token');
    if (token && !args.skipAuthorization) {
        headers['Authorization']  = `Bearer ${token}`;
    }

    let body = {};

    if (args.body) {
        if (args.method === 'GET') {
            throw new Error('GET request does not support request body.');
        }
        body = JSON.stringify(args.body);
        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';
    }

    return {
        method: args.method,
        headers,
        ...(args.method === 'GET' ? {} : {body})
    };
};
