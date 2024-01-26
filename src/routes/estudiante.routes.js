import { Router } from "express";
import { createEstudiante, updateEstudiante, eliminarEstudiante, 
    getSuscripcion, validSuscripcion, getEsteAvisos, dowloadTicket, createMessages, listUserChat } from "../controllers/estudiantes.controller.js";


const router = Router()

router.get('/suscription/:id', getSuscripcion)
router.get('/validsuscription', validSuscripcion)
router.get('/avisoseste', getEsteAvisos)
router.get('/dowloadticket/:id', dowloadTicket)
router.get('/listchat/:id', listUserChat)


router.post('/messages/:id', createMessages)
router.post('/estudiante',createEstudiante)

router.put('/estudiante',updateEstudiante)

router.delete('/estudiante', eliminarEstudiante)


export default router