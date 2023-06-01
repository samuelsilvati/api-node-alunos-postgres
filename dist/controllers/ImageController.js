"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);

class ImageController {
  async store(req, res) {
    try {
      const { url, aluno_id } = req.body;
      const image = await _Image2.default.create({ url, aluno_id });

      return res.json(image);
    } catch (e) {
      return res.status(400).json({
        errors: ['Aluno não existe'],
      });
    }
  }
}

exports. default = new ImageController();
