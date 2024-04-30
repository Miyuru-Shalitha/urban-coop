import Item from "../models/item.model";
import { Request, Response} from "express";

//create item
const createItem = async(req:Request , res:Response) => {

    try {
       const{ itemCode,itemName,itemBrand,category,quantity} =req.body;

        //console.log(req.body);

        const foundItem=await Item.findOne({itemCode:itemCode})
        if(foundItem){
            return res.status(409).json({message : "Item already exist!"});
        }

        const newItem = new Item({
            itemCode : itemCode,
            itemName:itemName,
            itemBrand :itemBrand,
            category:category,
            quantity:quantity
        });
        newItem.save();

        return res.status(201).json({message:"Item create successfully !"})
    } catch (error:any) {
       return res.status(500).json({message:error.message});
    }
};
// const  = async (req: Request, res: Response) => {
//     try {
//         const items = await Item.find({}, 'itemCode');
//         const itemCodes = items.map(item => item.itemCode);
//         return res.status(200).json({ itemCodes: itemCodes });
//     } catch (error: any) {
//         return res.status(500).json({ message: error.message });
//     }
// };
const getAllItemCodes = async (req: Request, res: Response) => {

    try {
      const item = await Item.find();
      if(!item) {
        res.status(400).json({ message: 'No events found' });
      }
      res.status(200).json(item);
    } catch (error) {
      res.status(500).json({ error: error })
    }

  };
  const deleteItemById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
  
      const item = await Item.findById(id);
      if(!item) {
  
        res.status(400).json({ message: 'No event found' });
      }
      const deletedata = await Item.findByIdAndDelete(id);
      res.status(200).json(deletedata);
    } catch (error) {
      res.status(500).json({ error: error })
    }
  }
export{
    createItem,
    getAllItemCodes,
    deleteItemById
}