import { Endpoint, HTTPMethod } from '../../enums';
import { LoaderOptions } from '../../types';

class Loader {
    constructor(
        private baseLink: string | undefined,
        private options?: LoaderOptions
    ) {}

    protected getResponse<T>(
        { endpoint, options = {} }: { endpoint: Endpoint; options?: LoaderOptions },
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load<T>(HTTPMethod.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(endpoint: Endpoint, options: LoaderOptions) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: HTTPMethod, endpoint: Endpoint, callback: (data: T) => void, options: LoaderOptions = {}) {
        fetch(this.makeUrl(endpoint, options), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: T) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
