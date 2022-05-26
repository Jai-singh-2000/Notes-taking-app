let addButton=document.querySelector("#add-item");
let inputBox=document.querySelector(".input-wrapper");
let container=document.querySelector(".container");
let submitButton=document.querySelector("[type='submit']");
let inputName=document.querySelector(".input-name>input");
let inputDesc=document.querySelector(".input-desc>input");
let inputSize=document.querySelector(".input-size>input");
let taskDiv=document.querySelector(".task");
let completeDiv=document.querySelector(".complete");
let sortIcon=document.querySelector("#sort");
let dropdown=document.querySelector("ul");
let space=document.querySelector(".three");

let ascending=document.querySelector("#ascending");
let descending=document.querySelector("#descending");
let defaultOption=document.querySelector("#default");

let dropListFlag=true;
let addFlag=false;
let notes=[];

let ascendingArr=[];
let descendingArr=[];



load();

//Load at beginning

function load(obj)
{   
    if(obj==undefined||obj=="")
    {

        if(localStorage.getItem("notes"))
        {
            let stringArr=localStorage.getItem("notes");
            let arr=JSON.parse(stringArr);
            notes=arr;
    
            for(let i=0;i<notes.length;i++)
            {
                if(notes[i].status=="todo")
                {
                    createTask(notes[i].name,notes[i].desc,notes[i].size,notes[i].id); 
                }
            }   
        }

    }else{


        for(let i=0;i<obj.length;i++)
            {
                if(obj[i].status=="todo")
                {
                    createTask(obj[i].name,obj[i].desc,obj[i].size,obj[i].id); 
                }
            }  





    }
    
}






taskDiv.addEventListener("click",function(){
    removeAllTaskFromWebsite();
    load(); 

    //Task and complete style
    taskDiv.style.background="#0363f4";
    taskDiv.style.color="white";
    completeDiv.style.background="#1d74f9";
    completeDiv.style.color="#f5f5f5";
    
    //Sort icon remove css
    sortIcon.style.display="unset";
    
    //Size align query
    space.style.display="flex";
    space.style.marginRight="0";
});


    

// Complete filter
completeDiv.addEventListener("click",function(){

    let filterArr=[];

    for(let i=0;i<notes.length;i++)
    {
            if(notes[i].status=="done")
            {
                filterArr.push(notes[i]);
            }
    }  
    

    removeAllTaskFromWebsite();
   

     console.log(filterArr);
     for(let i=0;i<filterArr.length;i++)
     {
         showTask(filterArr[i].name,filterArr[i].desc,filterArr[i].size,filterArr[i].id)
     }


    //Task and complete style
     completeDiv.style.background="#0363f4";
     completeDiv.style.color="white";
     taskDiv.style.background="#1d74f9";
     taskDiv.style.color="#f5f5f5";

     //Sort icon remove css
     sortIcon.style.display="none";

      //Size align query
     space.style.display="unset";
     space.style.marginRight="3rem";

})




sortIcon.addEventListener("click",function(){
    if(dropListFlag)
    {
        dropdown.style.display="unset";
    }else{
        dropdown.style.display="none";
    }
    dropListFlag=!dropListFlag;
})




//Ascending sort event listener
ascending.addEventListener("click",function(){
    // if(dropListFlag)
    // {
    //     dropdown.style.display="unset";
    // }else{
    //     dropdown.style.display="none";
    // }
    // dropListFlag=!dropListFlag;
    
    setDropDown();

    removeAllTaskFromWebsite();


    ascendingArr=[...notes];

    //Insertion sort
    for(let i=1;i<ascendingArr.length;i++)
    {
        for(let j=i;j>0;j--)
        {

            if(parseInt(ascendingArr[j-1].size)>parseInt(ascendingArr[j].size))
            {
                swapObjects(ascendingArr,j-1,j);
            }else{
                break;
            }
        
        }
    }
    
    load(ascendingArr);

})






//descending sort event listener
descending.addEventListener("click",function(){
    
    setDropDown();
    
    removeAllTaskFromWebsite();


    descendingArr=[...notes];

    //Insertion sort
    for(let i=1;i<descendingArr.length;i++)
    {
        for(let j=i;j>0;j--)
        {

            if(parseInt(descendingArr[j-1].size)<parseInt(descendingArr[j].size))
            {
                swapObjects(descendingArr,j-1,j);
            }else{
                break;
            }
        
        }
    }
    
    console.log(ascendingArr.reverse());
    load(descendingArr);

})




//Default option in sort
defaultOption.addEventListener("click",function(){
    setDropDown();
    removeAllTaskFromWebsite();
    load(); 

})





//Add notes event
addButton.addEventListener("click",function(){
    if(addFlag==false)
    {
        inputBox.style.display="unset";
    }else{
        inputBox.style.display="none";
    }
    addFlag=!addFlag;
})


//Jump to next input box after click enter
inputName.addEventListener("keydown",function(e){
    let key= e.key;
   
    if(key=="Enter")
    {
        inputDesc.focus();  
    }
})


//Jump to next input box after click enter
inputDesc.addEventListener("keydown",function(e){
    let key= e.key;
    if(key=="Enter")
    { 
        inputSize.focus();  
    }
})



//Submit button event
submitButton.addEventListener("click",function(){
     var name=inputName.value;
     var desc=inputDesc.value;
     var size=inputSize.value;
    
     createTask(name,desc,size);
     inputName.value="";
     inputDesc.value="";
     inputSize.value="";
     
     inputBox.style.display="none";
     addFlag=!addFlag;

})



//Show only completed task 
function showTask(name,desc,size,id)
{   
    

    //Show it on ui
    let noteWrapper=document.createElement("div");
    noteWrapper.setAttribute("class","content");
    noteWrapper.innerHTML=`
        <div class="name"><p>${name}</p></div>
        <div class="desc"><p>${desc}</p></div>
        <div class="size"><p>${size}</p></div>
        <div class="button">
            <i class="material-icons" id="delete">delete</i>
        </div>`;

    container.appendChild(noteWrapper);



    //Delete event listener apply
    let deleteIcon=noteWrapper.querySelector("#delete");
    deleteIcon.addEventListener("click",function(e){
    
        //Remove from website
        console.log(e.path[2]);
        e.path[2].remove(); 
    
        //find and remove index from array
        let pos=findArrayByIndex(id);
        notes.splice(pos,1); 
    
        //update new array on localstorage
        updateLocalStorage(notes);
    })



  
}



//Create new and show all task
function createTask(name,desc,size,id)
{   

    if(name==""&&desc==""&&size=="")
    {
        console.log("empty");
        return;
    }

    if(name=="")
    {
        name="random";
    }
    
    if(desc=="")
    {
        desc="not defined";
    }

    if(size=="")
    {
        size=0;
    }

    let currStatus="todo";
    let uniqueId=0;
    if(id==""||id==undefined)
    {
        uniqueId=generate();

    }else{
        uniqueId=id;
    }
    

        let noteWrapper=document.createElement("div");
        noteWrapper.setAttribute("class","content");
        noteWrapper.innerHTML=`
            <div class="name"><p>${name}</p></div>
            <div class="desc"><p>${desc}</p></div>
            <div class="size"><p>${size}</p></div>
            <div class="button">
                <i class="material-icons" id="done">check_circle</i>
                <i class="material-icons" id="delete">delete</i>
            </div>`;
    
        container.appendChild(noteWrapper);




    //Delete event listener apply
    let deleteIcon=noteWrapper.querySelector("#delete");
    deleteIcon.addEventListener("click",function(e){
    let id=uniqueId;
    
    //Remove from website
    console.log(e.path[2]);
    e.path[2].remove(); 

    //find and remove index from array
    let pos=findArrayByIndex(id);
    notes.splice(pos,1); 

    //update new array on localstorage
    updateLocalStorage(notes);
    })



    //Done icon event listener apply
    let doneIcon=noteWrapper.querySelector("#done");
    doneIcon.addEventListener("click",function(e){
        let id=uniqueId;
        let pos=findArrayByIndex(id);
        e.path[2].remove();

        
        notes[pos].status="done";
        console.log(notes[pos]);
        updateLocalStorage(notes);
    })


    if(id==""||id==undefined)
    {
        let obj={
            "id":uniqueId,
            "name":name,
            "desc":desc,
            "size":size,
            "status":currStatus
        }
    
        notes.push(obj);
    
        updateLocalStorage(notes);    
    }
   


  
}





function generate() {
    let id = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
      return id();
}


function updateLocalStorage(notes)
{
    let notesJson=JSON.stringify(notes);
    localStorage.setItem("notes",notesJson);
    console.log(localStorage.getItem("notes"));
}

function findArrayByIndex(id)
{
    let pos=-1;
    for(let i=0;i<notes.length;i++)
    {
        if(notes[i].id==id)
        {
            pos=i;
            return pos;
        }
    }
}

function removeAllTaskFromWebsite()
{
    let contentDiv=document.querySelectorAll(".content");
    for(let i=0;i<contentDiv.length;i++)
    {
        // console.log(contentDiv[i]);
        contentDiv[i].remove();
    }
}

function swapObjects(obj,i,j)
{
    let temp=obj[i];
    obj[i]=obj[j];
    obj[j]=temp;
}



function setDropDown(){
    if(dropListFlag)
    {
        dropdown.style.display="unset";
    }else{
        dropdown.style.display="none";
    }
    dropListFlag=!dropListFlag;
}