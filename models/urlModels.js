
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    shortUrl : {
        type: String,
        unique:true,
        required: true,
        index: true,
    },
    accessCount : {
        type: Number,
        default: 0
    }

},{
    timestamps: true
});

const urlModel = mongoose.model("url", urlSchema);


const createShortUrlModel = async(url, shortUrl) => {

    const createdUrl = await urlModel.create({
        url: url,
        shortUrl: shortUrl
    })

    return createdUrl;
}

const isShortUrlExists = async (shortUrl) => {

    const urlExists = await urlModel.findOne({shortUrl: shortUrl});

    if(urlExists){
        return true;
    } else {
        return false;
    }
}

const retriveUrlModel = async(shortUrl) => {

    const retrivedData = await urlModel.findOne({shortUrl: shortUrl});

    return retrivedData;
}

const increaseAccessCountByOne = async(shortUrl) => {

    const url = await urlModel.findOne({shortUrl: shortUrl})

    const accessCount = url.accessCount + 1;
    const id = url.id;

    await urlModel.findByIdAndUpdate(id, {accessCount: accessCount});

    return

}

const updateUrlModel = async(shortUrl, url)=>{

    const urlData = await urlModel.findOne({shortUrl: shortUrl});
    const id = urlData.id;

    const updatedUrl = await urlModel.findByIdAndUpdate(id, {url: url});

    const result = await urlModel.findOne({shortUrl: shortUrl});


    return result;
}

const deleteUrlModel = async(shortUrl) => {

    const url = await urlModel.findOne({shortUrl: shortUrl});

    const deletedUrl = await urlModel.findByIdAndDelete(url.id);

    return deletedUrl;
}


const getUrlStatsModel = async(shortUrl)=>{

    const url = await urlModel.findOne({shortUrl:shortUrl});

    return url;
}

module.exports = {
    createShortUrlModel,
    isShortUrlExists,
    retriveUrlModel,
    increaseAccessCountByOne,
    updateUrlModel,
    deleteUrlModel,
    getUrlStatsModel,
}