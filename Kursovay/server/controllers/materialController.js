const uuid = require('uuid')
const path = require('path');
const {Material, MaterialInfo} = require('../models/models')
const ApiError = require('../error/ApiError');

class MaterialController {
    async create(req, res, next) {
        try {
            let {name, price, manufacturerId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const material = await Material.create({name, price, manufacturerId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    MaterialInfo.create({
                        title: i.title,
                        description: i.description,
                        materialId: material.id
                    })
                )
            }

            return res.json(material)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {manufacturerId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let materials;
        if (!manufacturerId && !typeId) {
            materials = await Material.findAndCountAll({limit, offset})
        }
        if (manufacturerId && !typeId) {
            materials = await Material.findAndCountAll({where:{manufacturerId}, limit, offset})
        }
        if (!manufacturerId && typeId) {
            materials = await Material.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (manufacturerId && typeId) {
            materials = await Material.findAndCountAll({where:{typeId, manufacturerId}, limit, offset})
        }
        return res.json(materials)
    }

    async getOne(req, res) {
        const {id} = req.params
        const material = await Material.findOne(
            {
                where: {id},
                include: [{model: MaterialInfo, as: 'info'}]
            },
        )
        return res.json(material)
    }
}

module.exports = new MaterialController()
