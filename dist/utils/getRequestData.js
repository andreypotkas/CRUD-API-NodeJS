export var getRequestData = function (req, res) {
    return new Promise(function (resolve, reject) {
        try {
            var body_1 = '';
            req.on('data', function (chunk) {
                body_1 += chunk.toString();
            });
            req.on('end', function () {
                if (JSON.parse(body_1).hobbies &&
                    JSON.parse(body_1).username &&
                    JSON.parse(body_1).age) {
                    resolve(JSON.parse(body_1));
                }
                else {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        message: "Request body doesn't contain required fields",
                    }));
                }
            });
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: 'Internal Server Error',
            }));
        }
    });
};
