module.exports = {
    Tag: sql.define('tags', {
        id: { type: Sequelize.INTEGER, autoIncrement: true },
        tagname: { type: Sequelize.STRING, validate: { max: 25, min: 1 }},
        description: { type: Sequelize.STRING, validate: { max: 75, min: 1 }},
        guild_id: { type: Sequelize.INTEGER },
        created_by: { type: Sequelize.INTEGER }
        created_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    });
}
