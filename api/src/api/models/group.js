module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define(
    "Group",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
      },

      code: {
        type: DataTypes.STRING(50),
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      phones: {
        type: DataTypes.ARRAY(DataTypes.STRING(25)),
        defaultValue: [],
      },

      details: {
        type: DataTypes.JSONB,
        defaultValue: {},
      },
    },
    { timestamps: false }
  );

  Group.associate = (model) => {
    Group.belongsToMany(model.User, {
      through: model.UserGroup,
      foreignKey: {
        name: "codeGroup",
      },
    });

    Group.belongsTo(model.Organization, {
      foreignKey: "codeOrganization",
    });
  };

  return Group;
};
