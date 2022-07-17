const controllerBarang = require('../controller/barangController')
const router = require('express').Router()

const utilsApps = require('../utils/utils_apps')
const multer = require('multer')
const uploadFile = multer({
    storage: utilsApps.uploadFile
}).single("gambar")

router.post('/input-barang', uploadFile, (req, res) => {
    if (req.file === undefined) {
        res.json({
            status: false,
            msg: 'File tidak boleh kosong'
        })
    } else {
        Object.assign(req.body, {
            gambar: req.file.filename
        })
    }
    controllerBarang.inputBarang(req.body)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.get('/get-barang', (req, res) => {
    controllerBarang.getAllBarang()
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.get('/get-barang/:id', (req, res) => {
    controllerBarang.getBarangById(req.params.id)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.put('/update-barang/:id', (req, res) => {
    controllerBarang.updateBarang(req.params.id, req.body)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.put('/update-gambar/:id', uploadFile, (req, res) => {
    if (req.file === undefined) {
        res.json({
            status: false,
            msg: 'File tidak boleh kosong'
        })
    } else {
        req.body.gambar = req.file.filename
    }
    controllerBarang.updateGambar(req.params.id, req.body.gambar)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

router.delete('/delete-barang/:id', (req, res) => {
    controllerBarang.deleteBarang(req.params.id)
        .then((result) => {
            res.json(result)
        }).catch(err => {
            res.json(err)
        })
})

module.exports = router