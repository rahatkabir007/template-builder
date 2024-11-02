const callFetch = async (url, requestOptions) => {
    return new Promise((resolve) => {
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log('res', result);
                if (result?.statusCode >= 400) {
                    resolve({
                        res: null,
                        err: result.message || 400,
                    });
                } else {
                    resolve({
                        res: result,
                        err: null,
                    });
                }
            })
            .catch((error) => {
                resolve({
                    res: null,
                    err: error,
                });
            });
    });
};

export default callFetch;
