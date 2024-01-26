import { pool } from '../db.js'


export const ObtenerTipoAuto = async (req, res) => {
    try {
      const {id} = req.params
      const [result] = await pool.query('SELECT * FROM cdr_tipo_auto WHERE id_estado=? ORDER BY id_estado asc', id);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

export const AgregarTipoAuto = async (req, res) => {
    try {
    const {id, desc, ip } = req.body
      const [result] = await pool.query('INSERT into cdr_tipo_auto(id_estado, descripcion, fecha_creacion, usuario_creacion, direccion_ip_creacion) VALUES (1, ?, NOW(), ?, ?) ', [desc, id, ip]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };
  

  export const ModificarTipoAuto = async (req, res) => {
    try {
    const {uid, desc, ip, element_id } = req.body
      const [result] = await pool.query('Update cdr_tipo_auto SET descripcion = IFNULL(?, descripcion), id_estado = 1, usuario_modificacion = ?, fecha_modificacion = NOW(), direccion_ip_modificacion=? WHERE (id_tipo_auto = ?)', [desc, uid, ip, element_id]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  export const EliminarTipoAuto = async (req, res) => {
    try {
      const {id_estado, uid, ip, element_id } = req.query
      const [result] = await pool.query('Update cdr_tipo_auto SET  id_estado = ?, usuario_modificacion = ?, fecha_modificacion = NOW(), direccion_ip_modificacion=? WHERE (id_tipo_auto = ?)', [ id_estado, uid, ip, element_id]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  //Rol administrative
  export const AgregarRol = async (req, res) => {
    try {
    const {id, desc, ip } = req.body
      const [result] = await pool.query('INSERT into gen_rol_administrativo(id_estado, descripcion, fecha_creacion, usuario_creacion, direccion_ip_creacion) VALUES (1, ?, NOW(), ?, ?) ', [desc, id, ip]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const ObtenerRol = async (req, res) => {
    try {
      const {id} = req.params
      const [result] = await pool.query('SELECT * FROM gen_rol_administrativo WHERE id_estado=? ORDER BY id_estado asc', id);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  export const ModificarRol = async (req, res) => {
    try {
    const {uid, desc, ip, element_id } = req.body
      const [result] = await pool.query('Update gen_rol_administrativo SET descripcion = IFNULL(?, descripcion), id_estado = 1, usuario_modificacion = ?, fecha_modificacion = NOW(), direccion_ip_modificacion=? WHERE (id_rol = ?)', [desc, uid, ip, element_id]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const EliminarRol = async (req, res) => {
    try {
      const {id_estado, uid, ip, element_id} = req.query
      const [result] = await pool.query('UPDATE gen_rol_administrativo SET id_estado = ?, fecha_modificacion =NOW(), usuario_modificacion = ?, direccion_ip_modificacion = ? where id_rol=?', [id_estado, uid, ip, element_id]);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  // Administracion de ubicaciones
  export const ObtenerUbicacion = async (req, res) => {
    try {
      const {id} = req.params
      const [result] = await pool.query('SELECT * FROM gen_punto WHERE id_estado=? ORDER BY id_estado asc', id);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

export const AgregarUbicacion = async (req, res) => {
    try {
    const {id, desc, ip } = req.body
      const [result] = await pool.query('INSERT INTO `gen_punto` (`id_estado`, `descripcion`, `fecha_creacion`, `usuario_creacion`, `direccion_ip_creacion`) VALUES ( 1, ?, NOW(), ?, ?)', [desc, id, ip]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };
  

  export const ModificarUbicacion = async (req, res) => {
    try {
    const {uid, desc, ip, element_id } = req.body
      const [result] = await pool.query('Update gen_punto SET descripcion = IFNULL(?, descripcion), id_estado = 1, usuario_modificacion = ?, fecha_modificacion = NOW(), direccion_ip_modificacion=? WHERE (id_punto = ?)', [desc, uid, ip, element_id]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  export const EliminarUbicacion = async (req, res) => {
    try {
      const {id_estado,uid, ip, element_id } = req.query
      const [result] = await pool.query('Update gen_punto SET  id_estado = ?, usuario_modificacion = ?, fecha_modificacion = NOW(), direccion_ip_modificacion=? WHERE (id_punto = ?)', [ id_estado, uid, ip, element_id]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  //User Admin administrative
  export const AgregarUser = async (req, res) => {
    try {
      const {id} = req.params
      const {iudUserAdmin, idEstado, idRol, nombresAdmin, email, ip } = req.body
      const [result] = await pool.query('INSERT into gen_usuario_administrativo (id_usuario_admin, id_estado, id_rol, nombres, correo_electronico, fecha_creacion, usuario_creacion, direccion_ip_creacion ) VALUES (?, ?, ?, ?, ?, NOW(), ?, ?) ', [iudUserAdmin, idEstado, idRol, nombresAdmin, email, id, ip]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result.affectedRows);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const ObtenerUser = async (req, res) => {
    try {
      const {id} = req.params
      const [result] = await pool.query('SELECT * FROM gen_usuario_administrativo WHERE id_estado=? ORDER BY id_estado asc', id);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  export const validUser = async (req, res) => {
    try {
      const {id} = req.params
      const [result] = await pool.query('SELECT * FROM gen_usuario_administrativo WHERE correo_electronico=?', id);
  
      if (result.length <= 0) {
        return res.send({ result: 'no existe' })
      }
      res.send(result[0])

    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  export const ModificarUser = async (req, res) => {
    try {
    const {idEstado, idRol, nombres, email, uidUser, ip, id} = req.body
      const [result] = await pool.query('UPDATE `gen_usuario_administrativo` SET `id_estado` = ?, `id_rol` = ?, `nombres` = ?, `correo_electronico` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_usuario_admin` = ?);', [idEstado, idRol, nombres, email, uidUser ,ip, id]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const EliminarUser = async (req, res) => {
    try {
      const {id_estado, uid, ip, element_id} = req.query
      const [result] = await pool.query('UPDATE `gen_usuario_administrativo` SET `id_estado` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_usuario_admin` = ?)', [id_estado, uid, ip, element_id]);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  //Student administrative
  export const AgregarStudent= async (req, res) => {
    try {
    const {id, desc, ip } = req.body
      const [result] = await pool.query('INSERT into est_estudiante(id_estado, descripcion, fecha_creacion, usuario_creacion, direccion_ip_creacion) VALUES (1, ?, NOW(), ?, ?) ', [desc, id, ip]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const ObtenerStudent = async (req, res) => {
    try {
      const {id} = req.params
      const [result] = await pool.query('SELECT * FROM est_estudiante WHERE id_estado=? ORDER BY id_estado asc', id);
      
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  export const ModificarStudent = async (req, res) => {
    try {
      
      const {idEstado, nombres, email, uidUser, ip, id} = req.body
      const [result] = await pool.query('UPDATE `cdr_conductor` SET `id_estado` = ?, `nombres` = ?, `correo_electronico` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_estudiante` = ?);', [idEstado, nombres, email, uidUser ,ip, id]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const EliminarStudent = async (req, res) => {
    try {
      const {id_estado, uid, ip, element_id} = req.query
      const [result] = await pool.query('UPDATE `est_estudiante` SET `id_estado` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_estudiante` = ?)', [id_estado, uid, ip, element_id]);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


   //Driver administrative
   export const AgregarDriver= async (req, res) => {
    try {
    const {id, desc, ip } = req.body
      const [result] = await pool.query('INSERT into est_estudiante(id_estado, descripcion, fecha_creacion, usuario_creacion, direccion_ip_creacion) VALUES (1, ?, NOW(), ?, ?) ', [desc, id, ip]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const ObtenerDriver = async (req, res) => {
    try {
      const {id} = req.params
      const [result] = await pool.query('SELECT * FROM cdr_conductor WHERE id_estado=? ORDER BY id_estado asc', id);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      result.forEach(row => {
        if(row.foto){
            const bufferFoto = row.foto;
            const base64Foto = bufferFoto.toString('base64');
            row.foto = base64Foto;
        }
        
        if(row.foto_cedula){
            const bufferFotoCedula = row.foto_cedula;
            const base64FotoCedula = bufferFotoCedula.toString('base64');
            row.foto_cedula = base64FotoCedula;
        }
      });

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  export const ModificarDriver = async (req, res) => {
    try {
      const {idEstado, cedulaDriver, nombres, apellidos, email, uidUser, ip, id} = req.body
      const [result] = await pool.query('UPDATE `cdr_conductor` SET `id_estado` = ?,   `cedula` = ?, `nombre` = ?, `apellidos` = ?, `correo_electronico` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_conductor` = ?);', [idEstado, cedulaDriver, nombres, apellidos, email, uidUser ,ip, id]);
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const EliminarDriver = async (req, res) => {
    try {
      const {id_estado, uid, ip, element_id} = req.query
      const [result] = await pool.query('UPDATE `cdr_conductor` SET `id_estado` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_conductor` = ?)', [id_estado, uid, ip, element_id]);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


   //Car administrative
   export const AgregarCar= async (req, res) => {
    try {
    const {id, desc, ip } = req.body
      const [result] = await pool.query('INSERT into est_estudiante(id_estado, descripcion, fecha_creacion, usuario_creacion, direccion_ip_creacion) VALUES (1, ?, NOW(), ?, ?) ', [desc, id, ip]);
  
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const ObtenerCar = async (req, res) => {
    try {
      const {id} = req.params
      const [result] = await pool.query('SELECT * FROM cdr_auto WHERE id_estado=? ORDER BY id_estado asc', id);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      result.forEach(row => {
        if(row.foto_auto){
            const bufferFotoAuto = row.foto_auto;
            const base64FotoAuto = bufferFotoAuto.toString('base64');
            row.foto_auto = base64FotoAuto;
        }
      });

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };

  export const ModificarCar = async (req, res) => {
    try {
      const {idEstado, idTipoCar, marcaCar, modeloCar, colorCar, capacidadCar, placaCar, uidUser, ip, id} = req.body
      
      const foto_car_base64 = req.body.fotoAuto;
      const foto_car = Buffer.from(foto_car_base64, 'base64');

      const [result] = await pool.query('UPDATE `cdr_auto` SET `id_estado` = ?, `id_tipo_auto` = ?, `foto_auto` = ?, `marca` = ?, `modelo` = ?, `color` = ?, `capacidad` = ?, `placa` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_auto` = ?);', [idEstado, idTipoCar, foto_car, marcaCar, modeloCar, colorCar, capacidadCar, placaCar, uidUser ,ip, id]);
      if (result.affectedRows <= 0) {
        throw new Error('No se ha ingresado');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };


  export const EliminarCar = async (req, res) => {
    try {
      const {id_estado, uid, ip, element_id} = req.query
      const [result] = await pool.query('UPDATE `cdr_auto` SET `id_estado` = ?, `fecha_modificacion` = NOW(), `usuario_modificacion` = ?, `direccion_ip_modificacion` = ? WHERE (`id_auto` = ?)', [id_estado, uid, ip, element_id]);
  
      if (result.length <= 0) {
        throw new Error('No se encontraron datos');
      }

      res.json(result);
    } catch (error) {
      console.error('Error en la consulta:', error.message);
      res.status(500).send({message: error.message});
    }
  };