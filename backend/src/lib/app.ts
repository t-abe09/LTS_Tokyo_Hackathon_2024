import express from 'express';
// import { genAI } from './service/fetchAI';


export class Server {
    readonly app = express();
    
    Run() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        this.app.get('/summary',async (_, res) =>{
          // const summary =  await genAI("test");
          res.send({data: "test"});
        });
        
        const port:number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
        this.app.listen(port, () => {
          console.log('listening on port 8080!');
        });
    }
}