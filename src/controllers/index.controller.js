import { sendEmailSuscriptionConductor, sendEmailSuscriptionEstudiante } from '../../functions/index.js'
import { pool } from '../db.js'
//import nodemailer from 'nodemailer'



export const getestudianteAll = async (req, res) => {
    const [result] = await pool.query('select * from est_estudiante')
    res.json(result[0])
}

export const getestudianteUid = async (req, res) => {
    const [result] = await pool.query('select id_estado as result from est_estudiante where id_estudiante = ?', [req.params.id])
    if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }
    res.send(result[0])

}

// export const  eliminarestudianteUid = async (req,res)=>{
//     const [result] = await pool.query('Delete from est_estudiante WHERE id_estudiante = ?', [req.params.id])
//     if (result.affectedRows <= 0) return res.status(404).json({
//         message:'Estudiante no encontrado'
//     })
//     res.sendStatus(204) //responder que se ha eliminado sin una respuesta

// }


export const crearestudiante = async (req, res) => {
    const { id } = req.params
    const { nombres, correo, ip } = req.body
    const [result] = await pool.query('INSERT INTO est_estudiante(id_estudiante, id_estado, nombres,correo_electronico, fecha_creacion, usuario_creacion, direccion_ip_creacion) values(?, 1, ?, ?, NOW(), ?, ?)', [id, nombres, correo, id, ip])
    if (result.insertedRows <= 0){
        return res.send({ result: 'hubo un problema en la insercion' })
    }
    res.json(result[0])
}

// export const  updateestudiante = async (req,res)=>{ ///PATH parcial, PUT COmMPLETO
//     const {id} = req.params
//     const {nombres, uid, ip} = req.body
//     const [result] = await pool.query('UPDATE est_estudiante SET nombres = IFNULL(?,nombres), fecha_modificacion = NOW(), usuario_modificacion = ?, direccion_ip_modificacion = ?  WHERE id_estudiante = ?', [nombres,uid,ip, uid])
//     if (result.insertedRows <= 0) return res.status(404).json({
//         message:'No se ha insertado'
//     })
//     res.json(result[0]) 
// }

export const getconductorUid = async (req, res) => {
    const {id} = req.params
    const [result] = await pool.query('select id_estado as result from cdr_conductor where correo_electronico = ?', [id])
    if (result.length <= 0) {
        return res.send({ result: 'no existe' })
    }
    res.send(result[0])

}


export const crearConductorUid = async (req, res) => {
    try {
      const { id } = req.params;
      const [user_status] = await pool.query('SELECT id_estado as result FROM cdr_conductor WHERE id_conductor = ?', [req.params.id]);
  
      if (user_status.length <= 0) {
        res.send({result:'no existe'}); // Lanza un error si el conductor no existe
      }
  
      const { nombres, apellidos, cedula, correo, ip } = req.body;
      const foto_base64 = req.body.foto;
      const foto = Buffer.from(foto_base64, 'base64');
  
      const foto_cedula_base64 = req.body.foto_cedula;
      const foto_cedula = Buffer.from(foto_cedula_base64, 'base64');
  
      const [result] = await pool.query('INSERT INTO `cdr_conductor`(`id_conductor`, `id_estado`, `cedula`, `nombre`, `apellidos`, `correo_electronico`, `fecha_creacion`, `usuario_creacion`, `direccion_ip_creacion`, foto, foto_cedula) VALUES (?,5,?, ?, ?, ?, NOW(), ?,?, ?, ? )', [id, cedula, nombres, apellidos, correo, id, ip, foto, foto_cedula]);
  
      res.json(result[0]);
    } catch (error) {
      console.error('Error al crear conductor:', error.message);
      res.status(500).send({ error: 'Error en el servidor' });
    }
};
  



  export const actualizarFormulario = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verificar el estado del usuario
      const [userStatus] = await pool.query(
        'SELECT id_estado AS result FROM cdr_conductor WHERE id_conductor = ?',
        [id]
      );
  
      if (userStatus.length > 0 && userStatus[0].result === 4) {
        const { nombres, apellidos, cedula, correo, ip, foto, foto_cedula } = req.body;
  
        // Actualizar el formulario si el estado del usuario es '4'
        const [result] = await pool.query(
          'UPDATE cdr_conductor SET nombre = IFNULL(?, nombre), apellidos = IFNULL(?, apellidos), correo_electronico = IFNULL(?, correo_electronico), cedula = IFNULL(?, cedula), foto_cedula = IFNULL(?, foto_cedula), id_estado = 5, foto = IFNULL(?, foto), fecha_modificacion = NOW(), usuario_modificacion = ?, direccion_ip_modificacion = ?  WHERE id_conductor = ?',
          [nombres, apellidos, correo, cedula, foto_cedula, foto, id, ip, id]
        );
  
        res.json(result[0]);
      } else {
        throw new Error('No se encontraron datos');
      }
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).json({message: error.message});
    }
  };


  export const sendMail = async (req, res) => {
    try {
      const { id } = req.params;
      //let email  = 'wjaram@unemi.edu.ec';
      //const nodemailer = require("nodemailer")
      const { email, idAviso, ip } = req.body;
      
      const [resultAsientosOcupados] = await pool.query('SELECT COUNT(*) AS asientos_ocupados FROM gen_suscripcion INNER JOIN  gen_dia_suscrito ON gen_dia_suscrito.id_suscripcion=gen_suscripcion.id_suscripcion INNER JOIN gen_aviso ON gen_suscripcion.id_aviso=gen_aviso.id_aviso WHERE gen_aviso.id_aviso=?;', [idAviso]);
      const [resultAsientosDisponibles] = await pool.query('SELECT cdr_auto.capacidad FROM gen_aviso INNER JOIN cdr_auto ON cdr_auto.id_auto = gen_aviso.id_auto WHERE gen_aviso.id_aviso=?;', [idAviso]);

      if(resultAsientosOcupados[0].asientos_ocupados >= resultAsientosDisponibles[0].capacidad){
        res.send({code:0})
      }else{
        //res.send({code:0})
        
        const [resultAviso] = await pool.query('SELECT gen_aviso.id_aviso, gen_aviso.titulo, cdr_conductor.nombre, cdr_conductor.apellidos, cdr_conductor.foto, gen_aviso.hora_salida, cdr_conductor.id_conductor, cdr_conductor.correo_electronico, gen_aviso.id_estado_aviso FROM gen_aviso INNER JOIN cdr_conductor ON gen_aviso.id_conductor = cdr_conductor.id_conductor WHERE gen_aviso.id_aviso=?', [idAviso]);
        const [resultEstudiante] = await pool.query('SELECT nombres FROM est_estudiante WHERE id_estudiante=?', [id]);
        //res.send(resultEstudiante[0].nombres)
        const [result] = await pool.query('INSERT INTO `gen_suscripcion` (`id_estado`, `id_aviso`, `id_estudiante`, `fecha_creacion`, `usuario_creacion`, `direccion_ip_creacion`) VALUES (5, ?, ?, NOW(), ?, ?)', [idAviso, id, id, ip]);

        if(!result[0] && resultAviso && resultEstudiante){
          //res.send(resultEstudiante[0].nombres)
          sendEmailSuscriptionEstudiante({email: email, name:resultEstudiante[0].nombres, title: resultAviso[0].titulo})
          .then((response) => {
            console.log(response)
            sendEmailSuscriptionConductor({email: resultAviso[0].correo_electronico, 
            name:resultAviso[0].nombre+' '+resultAviso[0].apellidos, title: resultAviso[0].titulo})
            .then((response) => {
              console.log(response)
              res.send({code:200})
            })
            .catch((e) => {
              console.log(e)
            })
          })
          .catch((e) => {
            console.log(e)
          })
        }else{
          res.send({code:500})
        }
      }

    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).json({message: error.message});
    }
  };
  
  