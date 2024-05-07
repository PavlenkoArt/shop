const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketMaterial = sequelize.define('basket_material', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Material = sequelize.define('material', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false},
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Manufacturer = sequelize.define('manufacturer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})

const MaterialInfo = sequelize.define('material_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})

const TypeManufacturer = sequelize.define('type_manufacturer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(MaterialInfo)
MaterialInfo.belongsTo(Basket)

Type.hasMany(Material)
Material.belongsTo(Type)

Manufacturer.hasMany(Material)
Material.belongsTo(Manufacturer)

Material.hasMany(Rating)
Rating.belongsTo(Material)

Material.hasMany(BasketMaterial)
BasketMaterial.belongsTo(Material)

Material.hasMany(MaterialInfo, {as: 'info'});
MaterialInfo.belongsTo(Material)

Type.belongsToMany(Manufacturer, {through: TypeManufacturer })
Manufacturer.belongsToMany(Type, {through: TypeManufacturer })

module.exports = {
    User,
    Basket,
    BasketMaterial,
    Material,
    Type,
    Manufacturer,
    Rating,
    TypeManufacturer,
    MaterialInfo
}





