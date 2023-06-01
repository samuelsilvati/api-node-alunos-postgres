"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// import Sequelize, { Model } from 'sequelize';
// import appConfig from '../config/appConfig';

// export default class Image extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         originalname: {
//           type: Sequelize.STRING,
//           defaultValue: '',
//           validate: {
//             notEmpty: {
//               msg: 'Campo não pode ficar vazio.',
//             },
//           },
//         },
//         filename: {
//           type: Sequelize.STRING,
//           defaultValue: '',
//           validate: {
//             notEmpty: {
//               msg: 'Campo não pode ficar vazio.',
//             },
//           },
//         },
//         url: {
//           type: Sequelize.VIRTUAL,
//           get() {
//             return `${appConfig.url}/img/${this.getDataValue('filename')}`;
//           },
//         },
//       },
//       {
//         sequelize,
//         tableName: 'images',
//       },
//     );
//     return this;
//   }

//   static associate(models) {
//     this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
//   }
// }

var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Image extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        url: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Campo não pode ficar vazio.',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'images',
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
} exports.default = Image;
