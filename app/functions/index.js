const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const { uuid } = require('uuidv4');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'polonio-ig-project',
  keyFilename: './ig-react.json',
});

exports.uploadFirebaseImage = functions.https.onRequest((request, response) => {
    try {
      console.log(request.body.image)
      fs.writeFileSync('/tmp/imageToSave.jpg', 
        request.body.image, 'base64')
        
        const bucket = storage.bucket('polonio-ig-project.appspot.com');
        const id = uuid();
        bucket.upload('/tmp/imageToSave.jpg', {
          uploadType: 'media',
          destination: `posts/${id}.jpg`,
          metadata: {
            metadata: {
              contentType: 'image/jpeg',
              firebaseStorageDownloadTokens: id
            }
          }
        }, (err, file) => {
          if (err) {
            console.log(err)
            return response.status(500).json({ error: err })
          } else {
            const fileName = encodeURIComponent(file.name)
            const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/'
              + bucket.name + '/o/' + fileName + '?alt=media&token=' + id
            return response.status(201).json({ imageUrl: imageUrl })
          }
        })
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: err })
    }
});