//Modelo da dados da tabela tarefas
const tarefa_list = (sequelize, DataTypes) =>{
    const Tarefa_list = sequelize.define('Tarefa_list',{
        id_tarefa_list:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },

        id_usuario:{
            type: DataTypes.INTEGER,
            allowNull: false
        },

        nome_lista:{
            type: DataTypes.STRING,
        },

        data_inicio:{
            type: DataTypes.DATE,
            get() {
                const value = this.getDataValue('data_inicio');
                if (value){
                    const dataFormatada = value.toISOString().split('T')[0]
                    return dataFormatada === '1000-01-01'? '00/00/0000' : dataFormatada.split('-').reverse().join('/')
                }
            },
        },

        data_fim:{
            type: DataTypes.DATE,
            get() {
                const value = this.getDataValue('data_fim');
                if (value){
                    const dataFormatada = value.toISOString().split('T')[0]
                    return dataFormatada === '1000-01-01'? '00/00/0000' : dataFormatada.split('-').reverse().join('/')
                }
            },
        },

        hora_inicio:{
            type: DataTypes.TIME,
        },

        hora_fim:{
            type: DataTypes.TIME,
        },

    }, {
        createdAt: false,
        updatedAt: false,
        id:false,
        tableName: 'tarefa_list',
        foreignKey: false
    })

    Tarefa_list.associate = function(models) {
        Tarefa_list.belongsTo(models.Usuario, {
          foreignKey: 'id_usuario',
          as: 'usuario'
        });
        Tarefa_list.hasMany(models.Item, {
          foreignKey: 'id_tarefa_list',
          as: 'itens'
        });
      };
    
    return Tarefa_list
}

module.exports = tarefa_list