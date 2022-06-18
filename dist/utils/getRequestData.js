export const getRequestData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                if (JSON.parse(body).hobbies &&
                    JSON.parse(body).username &&
                    JSON.parse(body).age) {
                    resolve(JSON.parse(body));
                }
                else {
                    throw new Error('awdawdawd');
                }
            });
            req.on('error', (error) => {
                console.error(error);
            });
        }
        catch (error) {
            console.log(error);
            reject({ message: 'test' });
        }
    });
};
