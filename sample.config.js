// sould be false for prod
const DEV = true;


if (DEV === true){
    // dev env config
    module.exports ={
    
        server_host = 'https://host:port',
        connect_mongoclient = 'mongodb://username@password@host:port/db'
        
    }
}
else{
    // prod env config
    module.exports ={
    
        server_host = 'https://host:port',
        connect_mongoclient = 'mongodb://username@password@host:port/db'
    }
}