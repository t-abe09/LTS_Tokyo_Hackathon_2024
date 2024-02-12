import express from 'express';

export class Server {
    readonly app = express();
    
    Run() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        
        this.app.get('/', (_, res) => {
          res.send('Hello World!');
        });
        
        this.app.listen(8080, () => {
          console.log('Example app listening on port 3000!');
        });
    }
}