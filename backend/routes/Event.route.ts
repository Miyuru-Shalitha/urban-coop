// import { Router, Request, Response } from "express";
// const router = Router();

// //GET EVENT DETAILS
// router.get('/',(req: Request, res: Response)=>{
//     res.json({mssg:'get Events'})
// })

// //GET BY ID
// router.get('/:id',(req: Request, res: Response)=>{
//     res.json({mssg:'get by id Events'})
// })

// // POST NEW EVENT
// router.post('/',(req: Request, res: Response)=>{
//     res.json({mssg:'Post Event'})
// })

// // DELETE EVENT
// router.delete('/',(req: Request, res: Response)=>{
//     res.json({mssg:'delete request'})
// })

// // UPDATE EVENT
// router.patch('/:id',(req: Request, res: Response)=>{
//     res.json({mssg:'Update request'})
// })
import { Router } from "express";
import EventController from "../controllers/Event.controler";

class EventRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', EventController.getEvents);
    this.router.get('/:id', EventController.getEventById);
    this.router.post('/', EventController.postEvent);
    this.router.delete('/', EventController.deleteEvent);
    this.router.patch('/:id', EventController.updateEvent);
  }
}

export default new EventRouter().router;