const createError = require("http-errors")

const generateShortUrl = require("../utils/shortCodeGenerator");

const {
    createShortUrlModel,
    isShortUrlExists,
    retriveUrlModel,
    increaseAccessCountByOne,
    updateUrlModel,
    deleteUrlModel,
    getUrlStatsModel,
} = require("../models/urlModels");

const demoController = async(req, res, next) => {
    res.json({
        success: true,
        message: "Demo controller here! wassup"
    })
}


const createShortUrl = async(req, res, next)=>{

    try{

        const { url } = req.body;

        if(!url){
            return next(createError(400, "Invalid input"))
        }

        let shortUrl;
        let flag = true;

        while(flag){

            shortUrl = generateShortUrl(5);

            // call model to check if short url already exists
            const shortUrlExists = await isShortUrlExists(shortUrl);

            // yes?
            if(shortUrlExists){
                continue;
            } else {
                flag=false;
                break;
            }
        }

        const data = await createShortUrlModel(url, shortUrl);

        res.status(201).json({
            success: true,
            message: "Short Url generated for the given url successfully!",
            data: data
        })

    } catch(error){
        next(error);
    }
}

const retriveUrl = async(req, res, next)=>{

    try{

        const shortUrl = req.params.shorturl;

        // Check if shortUrl exists

        const shortUrlExists = await isShortUrlExists(shortUrl);

        if(!shortUrlExists){
            return next(createError(404, "Short url not found"))
        }

        const retrivedUrl = await retriveUrlModel(shortUrl);

        if(!retrivedUrl){
            return next(createError(404, "The short url is not found"));
        }

        await increaseAccessCountByOne(shortUrl);

        res.json({
            success: true,
            message: "The full url retrived for the corresponding short url",
            data: retrivedUrl
        })

    } catch(error){
        next(error);
    }

}

const updateUrl = async(req, res, next) => {

    try{

        const shortUrl = req.params.shorturl;
        const { url } = req.body;

        if(!url){
            return next(createError(400, "Invalid Input"));
        }

        // Check if shortUrl exists

        const shortUrlExists = await isShortUrlExists(shortUrl);

        if(!shortUrlExists){
            return next(createError(404, "Short url not found"))
        }

        const updatedUrl = await updateUrlModel(shortUrl, url);


        res.json({
            success: true,
            message: "Url updated successfully",
            data: updatedUrl
        })


    } catch(error){
        next(error)
    }
}

const deleteUrl = async(req, res, next)=>{

    try{

        const shortUrl = req.params.shorturl;

        const urlExists = await isShortUrlExists(shortUrl);

        if(!urlExists){
            return next(createError(404, "Url not found"));
        }

        const deletedUrl = await deleteUrlModel(shortUrl);

        res.status(204).json({
            success:true,
            message: "Url data deleted successfully",
            data: deletedUrl
        })


    } catch(error){
        next(error);
    }
}

const getUrlStats = async(req, res, next)=>{

    try{

        const shortUrl = req.params.shorturl;

        const shortUrlExists = await isShortUrlExists(shortUrl);

        if(!shortUrlExists){
            return next(createError(404, "Url not found"));
        }

        const url = await getUrlStatsModel(shortUrl);


        res.json({
            success:true,
            message:"Url stats retrived successfully",
            data: url
        })


    } catch(error){
        next(error);
    }
}


module.exports = {
    demoController,
    createShortUrl,
    retriveUrl,
    updateUrl,
    deleteUrl,
    getUrlStats
}