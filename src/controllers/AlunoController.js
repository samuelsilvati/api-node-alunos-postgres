import Aluno from '../models/Aluno';
import Image from '../models/Image';

class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: [
        'id',
        'nome',
        'sobrenome',
        'email',
        'idade',
        'peso',
        'altura',
      ],
      order: [
        ['nome', 'ASC'], // Ordena a lista de alunos em ordem alfabética
        [Image, 'id', 'DESC'],
      ], // Ordena os alunos e imagens
      include: {
        model: Image,
        attributes: ['url'],
      },
    });
    res.json(alunos);
  }

  async store(req, res) {
    try {
      const aluno = await Aluno.create(req.body);
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          'id',
          'nome',
          'sobrenome',
          'email',
          'idade',
          'peso',
          'altura',
        ],
        order: [
          ['id', 'DESC'],
          [Image, 'id', 'DESC'],
        ], // Ordena os alunos e imagens
        include: {
          model: Image,
          attributes: ['url'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não Existe'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não Existe'],
        });
      }

      await aluno.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não Existe'],
        });
      }

      const newStudent = await aluno.update(req.body);

      return res.json(newStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
