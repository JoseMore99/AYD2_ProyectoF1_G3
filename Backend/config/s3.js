const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    }
});

function generateName(oldName) {
    return Math.random().toString(36).substring(7);
}

const uploadFile = async (fileContent, fileName, Extension) => {
    const name = generateName(fileName);
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: 'archivos/' + name + '.' + Extension, // El nombre con el que se guardará en S3
        Body: fileContent
    };

    try {
        const data = await s3.send(new PutObjectCommand(params));
        console.log("Archivo subido con éxito.", data);
        const url = `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/archivos/${name + '.' + Extension}`;
        return url; // Retorna la URL del archivo subido
    } catch (err) {
        console.error("Error al subir archivo.", err);
        throw err;
    }
};

module.exports = {
    uploadFile
};
