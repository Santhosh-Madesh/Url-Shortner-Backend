

const generateShortUrl = (length) => {

    let results = "";
    const allCharacters = "abcdefghigklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charLength = allCharacters.length;

    for(i=0; i<length; i++){
        results += allCharacters.charAt(Math.floor(Math.random() * charLength));
    }

    return results;
}


module.exports = generateShortUrl;