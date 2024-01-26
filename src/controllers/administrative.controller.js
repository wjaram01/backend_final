import { pool } from '../db.js'
import {sendEmailRechazo, sendEmailAceptacion} from '../../functions/index.js'

export const loginAdmin = async (req, res) => {
    const { uid } = req.body
    const [result] = await pool.query('select id_estado as result, id_rol as rol from gen_usuario_administrativo where id_usuario_admin = ?', [uid])
    console.log(result)
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


export const pendConductor = async (req, res) => {
    try {
      const [result] = await pool.query('SELECT C.id_conductor, G.descripcion, C.cedula, C.nombre, C.apellidos, C.foto, C.foto_cedula, C.correo_electronico FROM cdr_conductor C JOIN gen_estado_dato G ON C.id_estado = G.id_estado WHERE C.id_estado = 5');
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }
  
      res.setHeader('Content-Type', 'application/json');

      result.forEach(row => {
        // Aquí puedes hacer algo con cada fila
        const bufferFoto = row.foto;
        const base64Foto = bufferFoto.toString('base64');
        row.foto = base64Foto;
        
        const bufferFoto_cedula = row.foto_cedula;
        const base64Foto_cedula = bufferFoto_cedula.toString('base64');
        row.foto_cedula = base64Foto_cedula;
      });
  

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };
  

// export const  updateestudiante = async (req,res)=>{ ///PATH parcial, PUT COmMPLETO
//     const {id} = req.params
//     const {nombres, uid, ip} = req.body
//     const [result] = await pool.query('UPDATE est_estudiante SET nombres = IFNULL(?,nombres), fecha_modificacion = NOW(), usuario_modificacion = ?, direccion_ip_modificacion = ?  WHERE id_estudiante = ?', [nombres,uid,ip, uid])
//     if (result.insertedRows <= 0) return res.status(404).json({
//         message:'No se ha insertado'
//     })
//     res.json(result[0]) 
// }


export const aprobarConduct = async (req, res) => {
    try {
        const {id, uid, ip, nombre, correo} = req.body
    const [result] = await pool.query('Update cdr_conductor SET id_estado = 1, fecha_modificacion = NOW(), usuario_modificacion = ?, direccion_ip_modificacion = ? where id_conductor = ?', [uid,ip,id]);
  
    if (result.affectedRows <= 0){
        res.send({result:'fallo'})
    }
  

      res.json(result);

      //Envio de correo mediante POST
      sendEmailAceptacion({email: correo, name:nombre}).then((response) => {
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })



    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send(error.message);
    }
  };

  export const rechazarConduct = async (req, res) => {
    try {
      const {id, uid, ip, nombre, correo, razon} = req.body
      const [result] = await pool.query('Update cdr_conductor SET id_estado = 4, fecha_modificacion = NOW(), usuario_modificacion = ?, direccion_ip_modificacion = ? where id_conductor = ?', [uid,ip,id]);
  
    if (result.affectedRows <= 0){
        res.send({result:'fallo'})
    }
  

      res.json(result);
      //Envio de email por metodo post

      sendEmailRechazo({email: correo, name:nombre, reason:razon}).then((response) => {
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })
      
    } catch (error) {

      res.status(500).send(error.message);
    }
  };