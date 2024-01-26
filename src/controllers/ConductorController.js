import { sendEmailAcptarSuscription, sendEmailRechazarSuscription, sendEmailCancelarSuscription } from '../../functions/index.js'
import { pool } from '../db.js'

export const welcome = async (req, res) => {
    const {id} = req.params
    const [result] = await pool.query('SELECT id_conductor, id_estado, cedula, nombre, apellidos, correo_electronico, foto, foto_cedula FROM cdr_conductor WHERE id_conductor=?', [id]);
    
    if(result[0].foto){
        const bufferFoto = result[0].foto;
        const base64Foto = bufferFoto.toString('base64');
        result[0].foto = base64Foto;
    }

    if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }
    res.json(result)
}

export const getTipoCarsAll = async (req, res) => {
    //const {id} = req.params
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT * FROM cdr_tipo_auto WHERE id_estado=1')
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/
    res.json(result)
  
}

export const getPlacaCarsAll = async (req, res) => {
    const {id} = req.params
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT * FROM cdr_auto WHERE id_estado=1 AND id_conductor=?', [id])
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/
    res.json(result)
  
}

export const getPuntos = async (req, res) => {
    //const {id} = req.params
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT * FROM gen_punto WHERE id_estado=1')
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/
    res.json(result)
  
}

export const getAvisos = async (req, res) => {
    const {id} = req.params
    const {estaAviso} = req.query
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT gen_aviso.id_aviso, gen_aviso.titulo, gen_aviso.precio, gen_aviso.ruta_detallada, gen_punto_ini.id_punto as id_punto_inicio, gen_punto_ini.descripcion as punto_inicio, gen_punto_fin.id_punto as id_punto_fin, gen_punto_fin.descripcion as punto_fin, cdr_auto.id_auto, cdr_auto.modelo, cdr_auto.marca, cdr_conductor.nombre, cdr_conductor.apellidos, cdr_conductor.foto , cdr_auto.foto_auto, gen_aviso.hora_salida, cdr_auto.capacidad, cdr_auto.placa, cdr_conductor.id_conductor, gen_aviso.id_estado_aviso FROM gen_aviso INNER JOIN cdr_auto ON gen_aviso.id_auto = cdr_auto.id_auto INNER JOIN cdr_conductor ON gen_aviso.id_conductor = cdr_conductor.id_conductor INNER JOIN gen_punto AS gen_punto_ini ON gen_aviso.id_punto_inicio = gen_punto_ini.id_punto INNER JOIN gen_punto AS gen_punto_fin ON gen_aviso.id_punto_fin = gen_punto_fin.id_punto WHERE gen_aviso.id_estado=? AND gen_aviso.id_conductor=? order by gen_aviso.fecha_creacion desc;', [estaAviso, id])
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/
    
    result.forEach(row => {
        if(row.foto){
            const bufferFoto = row.foto;
            const base64Foto = bufferFoto.toString('base64');
            row.foto = base64Foto;
        }
        
        if(row.foto_auto){
            const bufferFotoAuto = row.foto_auto;
            const base64FotoAuto = bufferFotoAuto.toString('base64');
            row.foto_auto = base64FotoAuto;
        }
    });
    

    

    res.json(result)
  
}

export const getAvisosId = async (req, res) => {
    const {id} = req.params
    //const {estaAviso} = req.query
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT * FROM gen_aviso WHERE gen_aviso.id_aviso=?;', [id])
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/

    res.json(result[0])
  
}

export const createCar = async (req, res) => {
    try {
        const { id } = req.params;
        /*const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
    
        if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
        }*/
    
        const {  modelo, marca, tipo, placa, color, capacidad, ip } = req.body;
        
        const foto_car_base64 = req.body.fotoCar;
        const foto_car = Buffer.from(foto_car_base64, 'base64');
    
        const [result] = await pool.query('INSERT INTO `cdr_auto` ( `id_estado`, `id_conductor`, `id_tipo_auto`, `foto_auto`, `marca`, `modelo`, `color`, `capacidad`, `placa`, `fecha_creacion`, `usuario_creacion`, `direccion_ip_creacion`) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)', [id, tipo, foto_car, marca, modelo, color, capacidad, placa, id, ip]);
    
        res.json(result[0]);
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}

export const createAviso = async (req, res) => {
    try {
        const { id } = req.params;
        /*const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
    
        if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
        }*/
    
        const {idAuto, idPuntoInicio, idPuntoFin, titulo, horaSalida, precio, referencia, rutaDetalle, ip} = req.body;
        
    
        const [result] = await pool.query('INSERT INTO `gen_aviso`(`id_estado`, `id_estado_aviso`, `id_conductor`, `id_auto`, `id_punto_inicio`, `id_punto_fin`, `titulo`, `hora_salida`, `precio`, `referencia`, `ruta_detallada`, `fecha_creacion`, `usuario_creacion`, `direccion_ip_creacion`) VALUES (1, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)', [id, idAuto, idPuntoInicio, idPuntoFin, titulo, horaSalida, precio, referencia, rutaDetalle, id, ip]);
    
        res.json(result[0]);
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}

export const editAviso = async (req, res) => {
    try {
        const { id } = req.params;
        /*const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
    
        if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
        }*/
    
        const {idAuto, idPuntoInicio, idPuntoFin, titulo, horaSalida, precio, rutaDetalle, userUid, ip} = req.body;
        
    
        const [result] = await pool.query('UPDATE `gen_aviso` SET `id_auto` = ?, `id_punto_inicio` = ?, `id_punto_fin` = ?, `titulo` = ?, `hora_salida` = ?, `precio` = ?, `ruta_detallada` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_aviso` = ?);', [ idAuto, idPuntoInicio, idPuntoFin, titulo, horaSalida, precio, rutaDetalle, userUid, ip, id]);
    
        res.json(result.affectedRows);
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}

export const createSuscription = async (req, res) => {
    try {
        const { id } = req.params;
        const {idAviso, idsuscrip, description, ip} = req.body;
        
        const [resultAsientosOcupados] = await pool.query('SELECT COUNT(*) AS asientos_ocupados FROM gen_suscripcion INNER JOIN  gen_dia_suscrito ON gen_dia_suscrito.id_suscripcion=gen_suscripcion.id_suscripcion INNER JOIN gen_aviso ON gen_suscripcion.id_aviso=gen_aviso.id_aviso WHERE gen_aviso.id_aviso=?;', [idAviso]);
        const [resultAsientosDisponibles] = await pool.query('SELECT cdr_auto.capacidad FROM gen_aviso INNER JOIN cdr_auto ON cdr_auto.id_auto = gen_aviso.id_auto WHERE gen_aviso.id_aviso=?;', [idAviso]);
        
        if(resultAsientosOcupados[0].asientos_ocupados >= resultAsientosDisponibles[0].capacidad){
            //console.log('resultAsientosOcupados: ', resultAsientosOcupados[0].asientos_ocupados)
            //console.log('resultAsientosDisponibles: ', resultAsientosDisponibles[0].capacidad)
            res.send({code:0})
        }else{
            const [resultSuscrip] = await pool.query('SELECT est_estudiante.correo_electronico, est_estudiante.nombres, gen_aviso.titulo, gen_aviso.hora_salida FROM gen_suscripcion INNER JOIN est_estudiante ON gen_suscripcion.id_estudiante=est_estudiante.id_estudiante INNER JOIN gen_aviso ON gen_suscripcion.id_aviso=gen_aviso.id_aviso WHERE gen_suscripcion.id_suscripcion=?;', [idsuscrip]);
            const [user_status] = await pool.query('UPDATE `gen_suscripcion` SET `id_estado` = 1, `fecha_modificacion`=NOW(), `usuario_modificacion`=?, `direccion_ip_modificacion`=?  WHERE (`id_suscripcion` = ?);', [id, ip, idsuscrip]);
            const [result] = await pool.query('INSERT INTO `gen_dia_suscrito` (`id_estado`, `id_suscripcion`, `descripcion`, `fecha_creacion`, `usuario_creacion`, `direccion_ip_creacion`) VALUES (1, ?, ?, NOW(), ?, ?);', [idsuscrip, description, id, ip]);
            if (!result[0] && user_status[0] && resultSuscrip) {
                sendEmailAcptarSuscription({email: resultSuscrip[0].correo_electronico, 
                name:resultSuscrip[0].nombres, title: resultSuscrip[0].titulo, hora:resultSuscrip[0].hora_salida})
                .then((response) => {
                    //console.log(response)
                    res.send({code:1})
                })
                .catch((e) => {
                    console.log(e)
                })
            }else{
                res.send({code:0})
            }
        }
        
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}

export const  rechazaSuscription = async (req, res) => {
    try {
        const { id } = req.params;
        /*const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
    
        if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
        }*/
    
        const {user, ip} = req.body;
        
        const [resultSuscrip] = await pool.query('SELECT est_estudiante.correo_electronico, est_estudiante.nombres, gen_aviso.titulo, gen_aviso.hora_salida FROM gen_suscripcion INNER JOIN est_estudiante ON gen_suscripcion.id_estudiante=est_estudiante.id_estudiante INNER JOIN gen_aviso ON gen_suscripcion.id_aviso=gen_aviso.id_aviso WHERE gen_suscripcion.id_suscripcion=?;', [id]);
        const [result] = await pool.query('UPDATE `gen_suscripcion` SET `id_estado` = 4, `fecha_modificacion`=NOW(), `usuario_modificacion`=?, `direccion_ip_modificacion`=?  WHERE (`id_suscripcion` = ?);', [ user, ip, id]);
        
        if (!result[0] && resultSuscrip) {
            sendEmailRechazarSuscription({email: resultSuscrip[0].correo_electronico, 
            name:resultSuscrip[0].nombres, title: resultSuscrip[0].titulo})
            .then((response) => {
                console.log(response)
                res.send({code:1})
            })
            .catch((e) => {
                console.log(e)
            })
        }else{
            res.send({code:0})
        }

        //res.json(result[0]);
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}

export const cancelarSuscription = async (req, res) => {
    try {
        const { id } = req.params;
        /*const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
    
        if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
        }*/
    
        const {ticketId, description,user, ip} = req.body;
        
        const [resultSuscrip] = await pool.query('SELECT est_estudiante.correo_electronico, est_estudiante.nombres, gen_aviso.titulo, gen_aviso.hora_salida FROM gen_suscripcion INNER JOIN est_estudiante ON gen_suscripcion.id_estudiante=est_estudiante.id_estudiante INNER JOIN gen_aviso ON gen_suscripcion.id_aviso=gen_aviso.id_aviso WHERE gen_suscripcion.id_suscripcion=?;', [id]);
        const [resultGenSus] = await pool.query('UPDATE `gen_suscripcion` SET `id_estado` = 4, `fecha_modificacion`=NOW(), `usuario_modificacion`=?, `direccion_ip_modificacion`=?  WHERE (`id_suscripcion` = ?);', [ user, ip, id]);
        const [result] = await pool.query('UPDATE `gen_dia_suscrito` SET `id_estado` = 4, `descripcion` =?,  `fecha_modificacion`=NOW(), `usuario_modificacion`=?, `direccion_ip_modificacion`=?  WHERE (`id_aviso` = ?);', [description, user, ip, ticketId]);
        
        if (result.affectedRows>=1 && resultGenSus.affectedRows>=1 && resultSuscrip) {
            sendEmailCancelarSuscription({email: resultSuscrip[0].correo_electronico, 
            name:resultSuscrip[0].nombres, title: resultSuscrip[0].titulo})
            .then((response) => {
                //console.log(response)
                res.send({code:1})
            })
            .catch((e) => {
                console.log(e)
            })
        }else{
            res.send({code:0})
        }

        //res.json(result[0]);
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}



export const createPunto = async (req, res) => {
    try {
        const { id } = req.params;
        /*const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
    
        if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
        }*/
    
        const { description, ip } = req.body;

        const [result] = await pool.query('INSERT INTO `gen_punto` (`id_estado`, `descripcion`, `fecha_creacion`, `usuario_creacion`, `direccion_ip_creacion`) VALUES ( 1, ?, NOW(), ?, ?)', [description, id, ip]);
    
        res.json(result[0]);
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}


export const listUserChat = async (req, res) => {
    try {
        const { id } = req.params;
        const { est } = req.query;
        const [result] = await pool.query('SELECT gen_cabecera_mensaje.titulo, est_estudiante.id_estudiante AS uid_user, est_estudiante.nombres AS user_mane, cdr_conductor.id_conductor, CONCAT ( cdr_conductor.nombre, " ", cdr_conductor.apellidos) AS nombres, cdr_conductor.foto AS user_foto FROM gen_cabecera_mensaje INNER JOIN est_estudiante ON gen_cabecera_mensaje.id_estudiante=est_estudiante.id_estudiante INNER JOIN cdr_conductor ON cdr_conductor.id_conductor=gen_cabecera_mensaje.id_conductor WHERE gen_cabecera_mensaje.id_estado=? AND gen_cabecera_mensaje.id_conductor=?;', [est, id]);
    
        if (result.length>=1) {
            res.json(result);
        }else{
            res.send({code:0})
        }
        
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}

export const getListSuscripEstudiantes = async (req, res) => {
    const {idaviso, estadoaviso} = req.query
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT gen_suscripcion.id_suscripcion, gen_aviso.titulo, '+
    'gen_aviso.hora_salida, gen_aviso.ruta_detallada, '+
    'gen_suscripcion.id_estado, est_estudiante.nombres, '+
    'est_estudiante.correo_electronico, est_estudiante.id_estudiante, '+
    'gen_suscripcion.id_aviso, gen_dia_suscrito.id_aviso AS id_ticket, '+
    'DATE_FORMAT(gen_dia_suscrito.fecha_creacion,  "%Y%m%d") AS fecha_ticket, '+
    'gen_dia_suscrito.descripcion AS descrip_ticket, gen_aviso.id_estado AS aviso_estado '+
    'FROM gen_suscripcion '+
    'INNER JOIN gen_aviso ON gen_suscripcion.id_aviso = gen_aviso.id_aviso '+
    'INNER JOIN est_estudiante ON gen_suscripcion.id_estudiante = est_estudiante.id_estudiante '+
    'left join gen_dia_suscrito on gen_suscripcion.id_suscripcion=gen_dia_suscrito.id_suscripcion '+
    'WHERE gen_suscripcion.id_aviso=? AND gen_suscripcion.id_estado=? order by gen_dia_suscrito.fecha_creacion desc', [idaviso, estadoaviso])
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/
    res.json(result)
  
}

export const getSuscripConductorGrup = async (req, res) => {
    const {id} = req.params
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    const {est} = req.query
    //res.send(result)
    const [result] = await pool.query('SELECT gen_suscripcion.id_suscripcion, gen_aviso.titulo, gen_aviso.hora_salida,   gen_aviso.ruta_detallada, gen_suscripcion.id_estado, COUNT(gen_suscripcion.id_suscripcion) AS numestudiante, cdr_auto.capacidad, gen_suscripcion.id_aviso FROM gen_suscripcion INNER JOIN gen_aviso ON gen_suscripcion.id_aviso = gen_aviso.id_aviso INNER JOIN cdr_auto ON gen_aviso.id_auto = cdr_auto.id_auto WHERE gen_aviso.id_estado=? AND gen_aviso.id_conductor=? GROUP BY gen_suscripcion.id_aviso order by gen_aviso.fecha_creacion desc;', [est, id])
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/
    res.json(result)
  
}

export const updatePublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        /*const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
    
        if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
        }*/
    
        const {estaviso, uiduser, ip} = req.body;
        
    
        const [result] = await pool.query('UPDATE `gen_aviso` SET `id_estado_aviso` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_aviso` = ?);', [ estaviso, uiduser, ip, id]);
       
        //res.json(result);
        res.json(result[0]);
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}

export const deleteAviso = async (req, res) => {
    try {
        //const { id } = req.params;
        /*const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
    
        if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
        }*/
    
        const { estaAviso, uiduser, ip, id} = req.query;
        
    
        const [result] = await pool.query('UPDATE `gen_aviso` SET `id_estado` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_aviso` = ?);', [estaAviso, uiduser, ip, id]);
    
        res.json(result.affectedRows);
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}