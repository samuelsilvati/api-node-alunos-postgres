"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
// import multerConfig from '../config/multerConfig';
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);

const upload = _multer2.default.call(void 0, ).single('file');

// class ImageController {
//   store(req, res) {
//     return upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({
//           errors: [err.code],
//         });
//       }

//       try {
//         const { originalname, filename } = req.file;
//         const { aluno_id } = req.body;
//         const image = await Image.create({ originalname, filename, aluno_id });

//         return res.json(image);
//       } catch (e) {
//         return res.status(400).json({
//           errors: ['Aluno não existe'],
//         });
//       }
//     });
//   }
// }

class ImageController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          errors: [err.code],
        });
      }
      try {
        const { aluno_id } = req.body;
        const { file } = await req;

        // eslint-disable-next-line no-undef
        const formData = new FormData();
        formData.append('file', file);
        console.log(typeof formData);
        formData.append('fileName', 'filename.jpg');
        formData.append('folder', 'cadastro-alunos');
        console.log(req.file, req.body);

        const uploadResponse = await _axios2.default.post(
          'https://upload.imagekit.io/api/v1/files/upload',
          formData,
          {
            headers: {
              Authorization: `Basic ${process.env.IMAGEKIT_PRIVATE_KEY}`,
            },
          },
        );
        // eslint-disable-next-line prefer-destructuring
        const url = uploadResponse.data.url;
        // console.log(url, aluno_id);
        const image = await _Image2.default.create({ url, aluno_id });

        return res.json(image);
      } catch (e) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }
    });
  }
}

exports. default = new ImageController();

// publicKey: 'public_8ezlRRDXePIf0wr9aff+GgdT5X8=',
// privateKey: 'private_xmZfEOb26L2S/HeYsm8J6ScrJws=',
// urlEndpoint: 'https://ik.imagekit.io/pcgkpnxy2',

// import multer from 'multer';
// // import axios from 'axios';
// import ImageKit from 'imagekit';
// import Image from '../models/Image';

// const upload = multer().single('file');

// const imageKit = new ImageKit({
//   publicKey: 'public_eWv/7t05OxgaR82VVa6d6UMpmz4=',
//   privateKey: 'private_VCR0c7H5QC4nsHXah3g+xf1QiPI=',
//   urlEndpoint: 'https://upload.imagekit.io/api/v1/files/upload',
// });

// class ImageController {
//   store(req, res) {
//     return upload(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({
//           errors: [err.code],
//         });
//       }
//       try {
//         const { aluno_id } = req.body;
//         const { file } = req;
//         console.log(file);

//         const uploadResponse = imageKit.upload({
//           file,
//           fileName: file.originalname,
//           folder: 'cadastro-alunos',
//         }, (error, result) => {
//           if (error) console.log(error);
//           else console.log(result);
//         });
//         const { url } = uploadResponse;
//         const image = await Image.create({ url, aluno_id });
//         console.log(url);

//         return res.json(image);
//       } catch (e) {
//         console.log(e);
//         return res.status(400).json({
//           errors: ['Aluno não existe'],
//         });
//       }
//     });
//   }
// }

// export default new ImageController();
