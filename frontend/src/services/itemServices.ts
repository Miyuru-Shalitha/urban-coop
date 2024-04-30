interface Item {
   // id: string;
    itemCode: string;
    itemName: string;
    itemBrand: string;
    category: string;
    quantity: number;
  }
  
  const getAllItems = async () => {
    const items: Item[] = [
      {
       
        itemCode: "I001",
        itemName: "Pedigree",
        itemBrand: "Dog Food",
        category: "Dog Food",
        quantity: 100,
      },
      {
     
        itemCode: "I002",
        itemName: "Fancy Feast",
        itemBrand: "Cat Food",
        category: "Cat Food",
        quantity: 75,
      },
      {
        
        itemCode: "I003",
        itemName: "Kong",
        itemBrand: "Dog Accessory",
        category: "Dog Accessory",
        quantity: 30,
      },
      {
        
        itemCode: "I004",
        itemName: "Jackson Galaxy",
        itemBrand: "Cat Accessory",
        category: "Cat Accessory",
        quantity: 50,
      },
      {
        
        itemCode:  "I005",
        itemName: "Nylabone",
        itemBrand: "Dog Accessory",
        category: "Dog Accessory",
        quantity: 100,
      },
      {
        
        itemCode:  "I006",
        itemName: "Yeowww!",
        itemBrand: "Cat Accessory",
        category: "Cat Accessory",
        quantity: 40,
      },
    ];
  
    return items;
  };
  
  export { type Item, getAllItems };
  