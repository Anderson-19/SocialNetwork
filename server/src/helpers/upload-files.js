const { v2 } = require('cloudinary');

v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

const uploadFile = async (tempFilePath, folder) => {
    const { secure_url } = await v2.uploader.upload(tempFilePath, { folder: `social-network/${folder}` });
    return secure_url;
}

const destroyFile = async (file, folder) => {
    return await v2.uploader.destroy(`social-network/${folder}/${file}`);
}

const deleteFile = async (file, folder) => {
    return await v2.api.delete_resources([`social-network/${folder}/${file}`], { type: 'upload', resource_type: 'image' })
}

module.exports = { uploadFile, destroyFile, deleteFile }
