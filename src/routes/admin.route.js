import {Router} from 'express'
import {AgregarRol, AgregarTipoAuto, ObtenerTipoAuto, ObtenerRol, 
EliminarRol, ModificarTipoAuto, EliminarTipoAuto, ObtenerUbicacion, 
AgregarUbicacion, ModificarUbicacion, EliminarUbicacion, ModificarRol, 
ObtenerUser, AgregarUser, ModificarUser, EliminarUser, ObtenerStudent, AgregarStudent, ModificarStudent, EliminarStudent, ObtenerDriver, AgregarDriver, ModificarDriver, EliminarDriver, ObtenerCar, AgregarCar, ModificarCar, EliminarCar, validUser} from '../controllers/admin.controller.js'

const router = Router()

router.get('/tipoAuto/:id', ObtenerTipoAuto)
router.post('/tipoAuto/add', AgregarTipoAuto)
router.patch('/tipoAuto/mod', ModificarTipoAuto)
router.delete('/tipoAuto/del', EliminarTipoAuto)

router.get('/ubicacion/:id', ObtenerUbicacion)
router.post('/ubicacion/add', AgregarUbicacion)
router.patch('/ubicacion/mod', ModificarUbicacion)
router.delete('/ubicacion/del', EliminarUbicacion)

router.get('/rolAdmin/get/:id', ObtenerRol)
router.post('/rolAdmin/add', AgregarRol)
router.patch('/rolAdmin/mod', ModificarRol)
router.delete('/rolAdmin/delete', EliminarRol)

router.get('/userAdmin/get/:id', ObtenerUser)
router.get('/userAdmin/valid/:id', validUser)
router.post('/userAdmin/add/:id', AgregarUser)
router.patch('/userAdmin/mod', ModificarUser)
router.delete('/userAdmin/delete', EliminarUser)

router.get('/studentAdmin/get/:id', ObtenerStudent)
router.post('/studentAdmin/add', AgregarStudent)
router.patch('/studentAdmin/mod', ModificarStudent)
router.delete('/studentAdmin/delete', EliminarStudent)

router.get('/driverAdmin/get/:id', ObtenerDriver)
router.post('/driverAdmin/add', AgregarDriver)
router.patch('/driverAdmin/mod', ModificarDriver)
router.delete('/driverAdmin/delete', EliminarDriver)

router.get('/carAdmin/get/:id', ObtenerCar)
router.post('/carAdmin/add', AgregarCar)
router.patch('/carAdmin/mod', ModificarCar)
router.delete('/carAdmin/delete', EliminarCar)










export default router