import Image from '../models/Image';

class ImageController {
  async store(req, res) {
    try {
      const { url, aluno_id } = req.body;
      const image = await Image.create({ url, aluno_id });

      return res.json(image);
    } catch (e) {
      return res.status(400).json({
        errors: ['Aluno não existe'],
      });
    }
  }
}

export default new ImageController();
