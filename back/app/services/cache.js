/* const {
    createClient
} = require('redis');

const client = createClient();

const {
    promisify
} = require('util');

const redis = {
    del: promisify(client.del).bind(client),
    get: promisify(client.get).bind(client),
    set: promisify(client.set).bind(client),
    setex: promisify(client.setex).bind(client),
    exists: promisify(client.exists).bind(client)
};

const keysIndex = [];

const cacheGenerator = (options) => {
    return {
        cache: async (request, response, next) => {

            const theKey = `${options.prefix}:${request.originalUrl}`;
        

            if (await redis.exists(theKey)) {
                // on sort la clé du registre
                const theValue = await redis.get(theKey).then(JSON.parse);
                
                // on répond à l'utilisateur
                response.json(theValue);

            } else {

                console.log("je passe par la requete SQL ");

                const originalResponseJson = response.json.bind(response);

                response.json = (theResponse) => {
                    // on garde une trace des clés qu'on utilise
                    keysIndex.push(theKey);
                    // on stocke la réponse dans le cache
                    redis.setex(theKey, options.ttl, JSON.stringify(theResponse));
                    // puis on appelle la version originale de response.json
                    originalResponseJson(theResponse);
                }

                next();
            }
        },
        flush: async (request, response, next) => {

            // pour redéfinir une TTL trop long empechant de faire des tests
             //client.setex(theKey, 10, JSON.stringify(keysIndex));
             //client.del(theKey);



            for (const index in keysIndex) {
                await redis.del(keysIndex[index]);
            
                delete keysIndex[index];
            }
            console.log("je passe par le flush ");
            next();
        },

 
        // Les clés disponibles
        keys : async (request, response, next) => {

            const allRegisteredKeys = [];
            //console.log("---------------------");
            client.keys('*', function (err, keys) {
                if (err) return console.log(err);
              
            for(var i = 0, len = keys.length; i < len; i++) {
                  //console.log(keys[i]);
                  allRegisteredKeys.push(keys[i]);
                }
                
            }); 


            next();
        }
    }
};

module.exports = cacheGenerator; */