import express, { Response, Request } from 'express'
import cors from "cors"


const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'funcionou'
    })
})

export default app