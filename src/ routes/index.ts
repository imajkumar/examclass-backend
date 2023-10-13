import express,{Request, Response} from "express";
import redisClient from '../utils/connectRedis'

var router = express.Router();

/* GET home page. */
router.get("/", function (req: Request, res: Response) {
  res.send("API : HOME ");
});
router.get('/checkme', async (req:Request,res:Response) => {
  const message = await redisClient.get('try');

  res.status(200).json({
    status: 'success',
    message,
  });
});
export default router;