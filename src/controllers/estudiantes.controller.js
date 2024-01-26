import { pool } from '../db.js';
//import { sendEmailSuscriptionConductor } from '../../functions/index.js';


export const getSuscripcion = async (req, res) => {
    const {id} = req.params
    const {est} = req.query
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT gen_suscripcion.id_suscripcion, gen_aviso.titulo, gen_aviso.hora_salida, '+
    'gen_aviso.ruta_detallada, gen_suscripcion.id_estado,  gen_dia_suscrito.id_aviso AS id_ticket, '+
    'est_estudiante.nombres, DATE_FORMAT(gen_dia_suscrito.fecha_creacion,  "%Y%m%d") AS fecha_ticket, '+
    'gen_dia_suscrito.descripcion AS descrip_ticket, gen_aviso.id_estado AS aviso_estado '+
    'FROM gen_suscripcion '+
    'INNER JOIN gen_aviso ON gen_suscripcion.id_aviso = gen_aviso.id_aviso '+
    'INNER JOIN est_estudiante ON gen_suscripcion.id_estudiante = est_estudiante.id_estudiante '+
    'left join gen_dia_suscrito on gen_suscripcion.id_suscripcion=gen_dia_suscrito.id_suscripcion '+ 
    'WHERE gen_aviso.id_estado=? AND gen_suscripcion.id_estudiante=? order by gen_suscripcion.fecha_creacion desc', [est, id])
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/
    res.json(result)
  
}

export const validSuscripcion = async (req, res) => {
    const {idaviso, uiduser} = req.query
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT * FROM gen_suscripcion WHERE id_aviso=? AND id_estudiante=?', [idaviso, uiduser])
    if (result.length <= 0) {
        return res.send({ result: 0 })
    }
    res.send(result[0])
  
}

export const getEsteAvisos = async (req, res) => {
    //const {id} = req.params
    //const [result] = await pool.query('SELECT * FROM pinafy.cdr_tipo_auto;')
    
    //res.send(result)
    const [result] = await pool.query('SELECT gen_aviso.id_aviso, gen_aviso.titulo, gen_aviso.precio, gen_aviso.ruta_detallada, gen_punto_ini.descripcion as punto_inicio, gen_punto_fin.descripcion as punto_fin, cdr_auto.modelo, cdr_auto.marca, cdr_conductor.nombre, cdr_conductor.apellidos, cdr_conductor.foto, cdr_auto.foto_auto, gen_aviso.hora_salida, cdr_auto.capacidad, cdr_auto.placa, cdr_conductor.id_conductor, gen_aviso.id_estado_aviso, count(gen_dia_suscrito.id_aviso) AS ocupados FROM gen_aviso '+
    'INNER JOIN cdr_auto ON gen_aviso.id_auto = cdr_auto.id_auto '+
    'INNER JOIN cdr_conductor ON gen_aviso.id_conductor = cdr_conductor.id_conductor '+
    'INNER JOIN gen_punto AS gen_punto_ini ON gen_aviso.id_punto_inicio = gen_punto_ini.id_punto '+
    'INNER JOIN gen_punto AS gen_punto_fin ON gen_aviso.id_punto_fin = gen_punto_fin.id_punto '+
    'left join gen_suscripcion on gen_aviso.id_aviso=gen_suscripcion.id_aviso '+
    'left join gen_dia_suscrito on gen_suscripcion.id_suscripcion=gen_dia_suscrito.id_suscripcion '+
    'WHERE gen_aviso.id_estado_aviso=1 group by gen_aviso.id_aviso order by gen_aviso.fecha_creacion desc;')
    //res.setHeader('Content-Type', 'application/json');
    
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
    /*if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }*/
    res.json(result)
  
}

export const dowloadTicket = async (req, res) => {
    try{
        const {id} = req.params
        const [result] = await pool.query('SELECT gen_dia_suscrito.id_aviso, est_estudiante.correo_electronico, est_estudiante.nombres, gen_aviso.titulo, TIME_FORMAT(gen_aviso.hora_salida,  "%H:%i") AS hora, DATE_FORMAT(gen_dia_suscrito.fecha_creacion, "%d - %b") AS mes, DATE_FORMAT(gen_dia_suscrito.fecha_creacion,  "%Y%m%d") AS fecha FROM gen_suscripcion INNER JOIN gen_dia_suscrito ON gen_suscripcion.id_suscripcion=gen_dia_suscrito.id_suscripcion INNER JOIN est_estudiante ON gen_suscripcion.id_estudiante=est_estudiante.id_estudiante INNER JOIN gen_aviso ON gen_suscripcion.id_aviso=gen_aviso.id_aviso WHERE gen_dia_suscrito.id_aviso=?;',[id])
        /*if (result.affectedRows <= 0){
          res.send({result:'fallo'})
        }
        res.json(result);*/
        let nomb=result[0].nombres
        let num=result[0].id_aviso.toString()
        let separa = nomb.split(" ",4);
        //console.log(result[0].mes)
        const params={ title:result[0].titulo, hora:result[0].hora, mes: result[0].mes, codigo:separa[0].substring(0,1)+separa[1].substring(0,1)+separa[2].substring(0,1)+separa[3].substring(0,1)+'-'+ result[0].fecha+"-"+num.padStart(4, 0)}
        //console.log(separa)
        //Envio de email por metodo post
        res.render('index',params);
        //res.send(info)
    } catch (error){
        res.status(500).send(error.message);
    } 
}

export const createMessages = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_conductor, titulo, ip } = req.body;
        const [resultSuscrip] = await pool.query('SELECT * FROM gen_cabecera_mensaje WHERE id_estado=1 AND titulo=?;', [titulo]);
    
        if (resultSuscrip.length<=0) {
            const [result] = await pool.query('INSERT INTO `gen_cabecera_mensaje` (`id_estado`, `id_estudiante`, `id_conductor`, `titulo`, `hora_ultimo_mensaje`, `fecha_creacion`, `usuario_creacion`, `direccion_ip_creacion`) VALUES (1, ?, ?, ?,  CURTIME(), NOW(), ?, ?);', [ id, id_conductor, titulo, id, ip]); // Lanza un error si el conductor no existe
            res.json(result[0]);
        }else{
            res.send({code:0})
        }
        
    } catch (error) {
        console.error('Error al crear el auto:', error.message);
        res.status(500).send({ error: 'Error en el servidor' });
    }
}

export const listUserChat = async (req, res) => {
    try {
        const { id } = req.params;
        const { est } = req.query;
        const [result] = await pool.query('SELECT gen_cabecera_mensaje.titulo, est_estudiante.id_estudiante, est_estudiante.nombres, cdr_conductor.id_conductor as uid_user, CONCAT ( cdr_conductor.nombre, " ", cdr_conductor.apellidos) AS user_mane, cdr_conductor.foto AS user_foto FROM gen_cabecera_mensaje INNER JOIN est_estudiante ON gen_cabecera_mensaje.id_estudiante=est_estudiante.id_estudiante INNER JOIN cdr_conductor ON cdr_conductor.id_conductor=gen_cabecera_mensaje.id_conductor WHERE gen_cabecera_mensaje.id_estado=? AND gen_cabecera_mensaje.id_estudiante=?;', [est, id]);
    
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
export const createEstudiante = (req,res) => res.send('creando empleados')

export const updateEstudiante = (req,res) => res.send('actualizar empleados')

export const eliminarEstudiante = (req,res) => res.send('eliminar estudiante')