ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey: "public_sE0aGOiHRxkULOzsVf88/8jz4MU=",
    privateKey: "private_9pMD1GBVp3tml0+zLhu+dbxz3I0=",
    urlEndpoint: "https://ik.imagekit.io/5unycwb22/"
});

async function generateLink(url) {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: url,
            fileName: "map.png",
            folder: "/maps/",
        }, (error, result) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(result.url)
            }
        });
    });
}

module.exports = { generateLink };