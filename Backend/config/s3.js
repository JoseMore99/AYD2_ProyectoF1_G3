const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION
});

const s3 = new AWS.S3();

function generateName(oldName){
    const newName = Math.random().toString(36).substring(7)

    return newName
}

const uploadFile = async (fileContent,fileName,Extension) => {
    const name = generateName(fileName)
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: 'archivos/'+name+'.'+Extension, // El nombre con el que se guardará en S3
        Body: fileContent
    };

    const retorno = await s3.upload(params, function (err, data) {
        if (err) {
            console.log("Error al subir archivo:", err);
        } else {
            console.log(`Archivo subido con éxito. URL: ${data.Location}`);
        }
    }).promise();
    console.log(retorno)
    return retorno.Location
};

module.exports={
    uploadFile
}