import express from 'express';
import { genAI } from './service/fetchAI';


export class Server {
    readonly app = express();
    
    Run() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        this.app.get('/summary',async (_, res) =>{
          const summary =  await genAI();
          res.send({data: summary});
        });
        
        this.app.listen(8080, () => {
          console.log('listening on port 8080!');
        });
    }
}