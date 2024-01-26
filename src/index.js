import express from 'express'
import estudiantesRouter from './routes/estudiante.routes.js'
import indexRouter from './routes/index.router.js'
import systemRouter from './routes/administrative.route.js'
import conductorRouter from './routes/conductor.route.js'
import AdminRoutes from './routes/admin.route.js'
import cors from 'cors'
import bodyParser from 'body-parser'


const app = express()
app.set('view engine','ejs');
//app.use('assets', express.static('assets'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cors());
app.use('/estudiante/api', estudiantesRouter)
app.use('/login/api',indexRouter)
app.use('/system', systemRouter)
app.use('/conductor/api', conductorRouter)
app.use('/admin', AdminRoutes)


app.listen(3001)