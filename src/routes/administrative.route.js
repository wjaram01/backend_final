import {Router} from 'express'
import {loginAdmin, pendConductor, aprobarConduct, rechazarConduct} from '../controllers/administrative.controller.js'


const router = Router()


router.post('/Login', loginAdmin)
router.get('/Watchdog', pendConductor)
router.post('/watchdog/accept', aprobarConduct)
router.post('/watchdog/dismiss', rechazarConduct)









export default router