import {Router} from 'express'
import { welcome, getTipoCarsAll, createCar, getPlacaCarsAll,
createPunto, getPuntos, createAviso, getAvisos, listUserChat, 
getSuscripConductorGrup, createSuscription, 
rechazaSuscription, getListSuscripEstudiantes, updatePublicacion, deleteAviso, getAvisosId, editAviso, cancelarSuscription } from '../controllers/ConductorController.js'
const router = Router()


router.get('/welcome/:id', welcome)
router.get('/tipocar/', getTipoCarsAll)
router.get('/placacars/:id', getPlacaCarsAll)
router.get('/puntos/', getPuntos)
router.get('/avisos/:id', getAvisos)
router.get('/avisosid/:id', getAvisosId)
router.get('/listchat/:id', listUserChat)
router.get('/suscriptconductorgrup/:id', getSuscripConductorGrup)
router.get('/listsuscripestudate', getListSuscripEstudiantes)



router.post('/createcar/:id', createCar)
router.post('/ceartepunto/:id', createPunto)
router.post('/cearteaviso/:id', createAviso)
router.post('/ceartesuscription/:id', createSuscription)

router.put('/rechazarsuscrip/:id', rechazaSuscription)
router.put('/cancelarsuscrip/:id', cancelarSuscription)
router.put('/updatepublic/:id', updatePublicacion)
router.put('/editaviso/:id', editAviso)

router.delete('/deleteaviso', deleteAviso)










export default router