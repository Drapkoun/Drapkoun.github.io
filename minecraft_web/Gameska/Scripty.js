
    var inventory = new Array(13);
    var inHand = "";
    var slotInHand = null;
    var currentRecipe="";

    function itemInHand(slot)
    {

        for(let i=1;i<=12;i++)
        {
          document.getElementById("item"+i).classList.remove("inhand-border");
        }

      switch(slot)
      {
        
        case 1: 
        {
          inHand="Sword"; 
          document.getElementById("item1").classList.add("inhand-border");
        };break;
        case 2: 
        {
          inHand="Pickaxe";
          document.getElementById("item2").classList.add("inhand-border");
        }; break;
        case 3: 
        {
          inHand="Axe";
          document.getElementById("item3").classList.add("inhand-border");
        }; break;
        default: 
        {
          inHand=inventory[(slot)];
          document.getElementById("item"+(slot)).classList.add("inhand-border");
        }; break;

      }
      slotInHand=slot;
    }

    function getItem(name)
    {
      switch(name)
      {
        case "Sword": 
        {
          inventory[1]="Sword";
          document.getElementById("item1").src = "pictures/items/Sword.webp";
        } break;
        case "Axe": 
        {
          inventory[2]="Axe";
          document.getElementById("item3").src = "pictures/items/Axe.webp";
        } break;
        case "Pickaxe": 
        {
          inventory[1]="Pickaxe";
          document.getElementById("item2").src = "pictures/items/Pickaxe.webp";
        };break;
      }
    }

    function getMaterial(name)
    {
      switch(name)
      {
        case "Wood": 
        {
          if(inHand=="Axe")
          {
            for(let i=4;i<13;i++)
            {
              if(inventory[i]==null)
              {
                inventory[i]="Stick";
                document.getElementById("item"+(i)).src = "pictures/items/Stick.webp";
                break;
              }
            }
          }
        }; break;

        
        case "RawIron": 
        {
          if(inHand=="Pickaxe")
          {
            for(let i=4;i<13;i++)
            {
              if(inventory[i]==null)
              {
                inventory[i]="RawIron";
                document.getElementById("item"+(i)).src = "pictures/items/RawIron.webp";
                break;
              }
            }
          }
        };break;
      }
    }

    function workingStation(name)
    {
      switch(name)
      {
        case "Furnace": 
        {
          if(inHand=="RawIron")
          {
            inHand="IronIngot";
            document.getElementById("item"+(slotInHand)).src = "pictures/items/IronIngot.webp";
            inventory[slotInHand]="IronIngot";
          }
        }; break;
      }
    }

    function getChest(number)
    {
      switch(number)
      {
        
      }
    }

    function craftingUIOpen()
    {
      document.getElementById("craftingUI").style.display = "block";
      document.getElementById("craftingUImap").style.display = "block";
    }

    function craftingUIClose()
    {
      document.getElementById("craftingUI").style.display = "none";
      document.getElementById("craftingUImap").style.display = "none";
      document.getElementById("recipe").style.display = "none";
      document.getElementById("recipe").src = "";
    }

    function craftingRecipeShow(name)
    {
      switch(name)
      {
        case "IronSword": 
        {
          document.getElementById("recipe").src = "pictures/recipes/IronSwordRecipe.png";
          document.getElementById("recipe").style.display = "block";
          currentRecipe="IronSword";
        }; break;

        case "DiamondSword": 
        {
          document.getElementById("recipe").src = "pictures/recipes/DiamondSwordRecipe.png";
          document.getElementById("recipe").style.display = "block";
          currentRecipe="DiamondSword";
        }; break;
      }
    }

    function craft()
    {
      switch(currentRecipe)
      {
        case "IronSword": 
        {
          var stickCount=0;
          var ironIngotCount=0;
          var ingotsToDelete=2;
          var sticksToDelete=1;

          for(let i=4;i<13;i++)
          {
            if(inventory[i]=="Stick") stickCount++;
            if(inventory[i]=="IronIngot") ironIngotCount++;
          }

          if(stickCount>=1 && ironIngotCount>=2)
          {
            console.log("Proslo IF");
            for(let i=4;i<13;i++)
            {
              if(inventory[i]=="Stick"&&sticksToDelete>0)
              {
                inventory[i]=null;
                document.getElementById("item"+(i)).src = "";
                sticksToDelete--;
              }
              else if(inventory[i]=="IronIngot"&&ingotsToDelete>0)
              {
                inventory[i]=null;
                document.getElementById("item"+(i)).src = "";
                ingotsToDelete--;
              }
            }

            inventory[1]="IronSword";
            document.getElementById("item1").src = "pictures/items/IronSword.webp";
            itemInHand(1);
          }
          else alert("You don't have enough materials!");
        }; break;
      }
    }

    function trashCan()
    {

        inventory[slotInHand]=null;
        document.getElementById("item"+(slotInHand)).src = "";
        inHand="";
        document.getElementById("item"+(slotInHand)).classList.remove("inhand-border");
        slotInHand=null;
    }

      // utils 
      document.querySelectorAll(".crafting").forEach(el => {el.addEventListener("click", () => craftingUIOpen());});
      document.getElementById("craftingUIClose").addEventListener("click",()=>craftingUIClose());
      document.getElementById("Craft").addEventListener("click",()=>craft());
      document.getElementById("trashCan").addEventListener("click",()=>trashCan());

      //crafting recipes
      document.getElementById("IronSwordRecipe").addEventListener("click",()=>craftingRecipeShow("IronSword"));
      document.getElementById("DiamondSwordRecipe").addEventListener("click",()=>craftingRecipeShow("DiamondSword"));

      // clickables
      document.getElementById("sekera").addEventListener("click",()=>getItem("Axe"));
      document.getElementById("chesta").addEventListener("click",()=>getChest(1));
      document.getElementById("Strom").addEventListener("click",()=>getMaterial("Wood"));
      document.getElementById("Krump").addEventListener("click",()=>getItem("Pickaxe"));
      document.getElementById("IronOre").addEventListener("click",()=>getMaterial("RawIron"));
      document.getElementById("Chest2").addEventListener("click",()=>getChest(2));
      document.getElementById("Furnace").addEventListener("click",()=>workingStation("Furnace"));