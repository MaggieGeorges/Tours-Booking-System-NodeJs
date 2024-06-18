
import express,{ json } from 'express'
import authRouter from './routes/authRoutes'
import toursRouter from './routes/toursRoutes'
import hotelsRouter from './routes/hotelsRoutes'
import bookingRouter from './routes/bookingsRoutes';


const app = express()

//middlewares
app.use(json())
app.use("/auth", authRouter)
app.use("/tours", toursRouter);
app.use('/hotels', hotelsRouter);
app.use('/bookings', bookingRouter);
//start


app.listen(3000, ()=>{ console.log("Server Running..")})
