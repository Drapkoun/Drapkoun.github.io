    //Debug
    function debug()
    {
      
      inventory[1]="IronSword";
      document.getElementById("item1").src = "pictures/items/IronSword.webp";
      itemInHand(1);
    }
    document.addEventListener("DOMContentLoaded", debug);
    //konec debugu
    

    var inventory = new Array(13);
    var inHand = "";
    var slotInHand = null;
    var currentRecipe="";

    function itemInHand(slot)
    {

        for(let i=0;i<=12;i++)
        {
          document.getElementById("item"+i).classList.remove("inhand-border");
        }

      switch(slot)
      {
        case 0: 
        {
          inHand="Shield";
          document.getElementById("item0").classList.add("inhand-border");
        };break;
        case 1: 
        {
          inHand=inventory[(slot)];
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
        case "Axe": 
        {
          inventory[3]="Axe";
          document.getElementById("item3").src = "pictures/items/Axe.webp";
          itemInHand(3);
        } break;
        case "Pickaxe": 
        {
          inventory[2]="Pickaxe";
          document.getElementById("item2").src = "pictures/items/Pickaxe.webp";
          itemInHand(2);
        };break;
        case "waterBucket":
          {
            if(inHand=="Bucket")
            {
              inHand="waterBucket";
              document.getElementById("item"+(slotInHand)).src = "pictures/items/WaterBucket.webp";
              inventory[slotInHand]="waterBucket";
            }
          }
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
                document.getElementById("item"+(i)).src = "pictures/materials/Stick.webp";
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
                document.getElementById("item"+(i)).src = "pictures/materials/RawIron.webp";
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
            document.getElementById("item"+(slotInHand)).src = "pictures/materials/IronIngot.webp";
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
      
      document.getElementById("recipe").src = "pictures/recipes/"+name+"Recipe.png";
      document.getElementById("recipe").style.display = "block";
      currentRecipe=name;

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
            for(let i=4;i<13&&sticksToDelete>0||ingotsToDelete>0;i++)
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

        case "Bucket":
          {
            var ironIngotCount=0;
            var ingotsToDelete=3;

            for(let i=4;i<13;i++)
              {
                if(inventory[i]=="IronIngot") ironIngotCount++;
              }

            if(ironIngotCount>=3)
              {
                for(let i=4;i<13&&ingotsToDelete>0;i++)
                {
                  if(inventory[i]=="IronIngot")
                  {
                    inventory[i]=null;
                    document.getElementById("item"+(i)).src = "";
                    ingotsToDelete--;
                  }
                }

                for(let i=4;i<13;i++)
                {
                  if(inventory[i]==null) 
                    {
                      inventory[i]="Bucket";
                      document.getElementById("item"+(i)).src = "pictures/items/Bucket.webp";
                      itemInHand(i);
                      break;
                    }
                }

              }else alert("You don't have enough materials!");
          };break;
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

    gotReward= false;

    function getReward()
    {
      if(!gotReward&&creeperDead&&zombieDead&&skeletonDead)
      {
        gotReward=true;
        document.getElementById("thanks").style.display = "block";
        setTimeout(() => {
          document.getElementById("thanks").style.display = "none";
          inventory[0]="Shield";
          document.getElementById("item0").src = "pictures/items/Shield.png";
        }, 2000);
      }
    }
    //fighting system

    function fight(damage)
    {
      if(inHand=="IronSword"||inHand=="DiamondSword") return true;
      else if(inHand=="Shield") return false;
      else DealDamage(damage);
    }

    var creeperDead=false;
    var zombieDead=false;
    var skeletonDead=false;

    function InCave(name)
    {
      if(fight(2))
      {
        document.getElementById(name+"Picture").style.opacity = "1";
            switch(name)
            {
              case "Creeper": creeperDead=true; break;
              case "Zombie": zombieDead=true; break;
              case "Skeleton": skeletonDead=true; break;
            }
            getReward();
      }
    }



    //health system
    var health=10;

    function DealDamage(amount)
    {
      health-=amount;
      for(let i=health+1;i<=10;i++)
      {
        document.getElementById("heart"+i).src = "pictures/utilities/heartEmpty.png";
      }
      if(health<=0) 
        {
          document.getElementById("deathMessage").style.display="block";
          setTimeout(() => {document.getElementById("deathMessage").style.display="none";
          respawn();
          },2000);
        }
    }

    function heal(amount)
    {
      
      for(let i=health+1;i<=health+amount&&i<=10;i++)
      {
        document.getElementById("heart"+i).src = "pictures/utilities/heartFull.png";
      }
      health+=amount;
      if(health>10) health=10;
    }

    function respawn()
    {
      window.scrollTo(0, 300);
      for(let i=0;i<13;i++)
      {
        document.getElementById("item"+(i)).src = "";
        document.getElementById("item"+i).classList.remove("inhand-border");
      }
      inventory = new Array(13);
      inHand = "";
      slotInHand = null;
      heal(10);
    }

      // utils 
      document.querySelectorAll(".crafting").forEach(el => {el.addEventListener("click", () => craftingUIOpen());});
      document.getElementById("craftingUIClose").addEventListener("click",()=>craftingUIClose());
      document.getElementById("Craft").addEventListener("click",()=>craft());
      document.getElementById("trashCan").addEventListener("click",()=>trashCan());

      //crafting recipes
      document.getElementById("IronSwordRecipe").addEventListener("click",()=>craftingRecipeShow("IronSword"));
      document.getElementById("DiamondSwordRecipe").addEventListener("click",()=>craftingRecipeShow("DiamondSword"));
      document.getElementById("BucketRecipe").addEventListener("click",()=>craftingRecipeShow("Bucket"));
      document.getElementById("NetheriteIngotRecipe").addEventListener("click",()=>craftingRecipeShow("NetheriteIngot"));
      document.getElementById("DiamondPickaxeRecipe").addEventListener("click",()=>craftingRecipeShow("DiamondPickaxe"));
      document.getElementById("NetheriteSwordRecipe").addEventListener("click",()=>craftingRecipeShow("NetheriteSword"));
      // clickables
      document.getElementById("sekera").addEventListener("click",()=>getItem("Axe"));
      document.getElementById("Strom").addEventListener("click",()=>getMaterial("Wood"));
      document.getElementById("Krump").addEventListener("click",()=>getItem("Pickaxe"));
      document.getElementById("IronOre").addEventListener("click",()=>getMaterial("RawIron"));
      document.getElementById("Furnace").addEventListener("click",()=>workingStation("Furnace"));
      document.getElementById("Water").addEventListener("click",()=>getItem("waterBucket"));

      //monsters
      document.getElementById("Creeper").addEventListener("click",()=>InCave("Creeper"));
      document.getElementById("Zombie").addEventListener("click",()=>InCave("Zombie"));
      document.getElementById("Skeleton").addEventListener("click",()=>InCave("Skeleton"));