
import {Router} from 'express'
import { actualizarFormulario, crearConductorUid, crearestudiante, 
getconductorUid, getestudianteUid, sendMail} from '../controllers/index.controller.js'


const router = Router()


router.get('/estudiante/:id', getestudianteUid)
//router.get('/estudianteall/', getestudianteAll)

router.post('/estudiante/:id', crearestudiante)

router.get('/conductor/:id', getconductorUid)

router.post('/conductor/:id', crearConductorUid)

router.patch('/conductor/:id', actualizarFormulario)

router.post('/sendmail/:id', sendMail)









export default router