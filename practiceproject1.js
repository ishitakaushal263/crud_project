let globaltaskdata = [];
taskcontents = document.getElementById("taskcontents");

const addcart=() =>{
    const newtaskdetails = {
        id: `${Date.now()}`,                              //act as parameter for generatecard
        url: document.getElementById("rememberedimageURL").value,
        title: document.getElementById("heading").value,
        type : document.getElementById("topic").value,
        description: document.getElementById("Description").value
    }
    taskcontents = document.getElementById("taskcontents");
    taskcontents.insertAdjacentHTML('beforeend' , generatetaskcard(newtaskdetails));
    globaltaskdata.push(newtaskdetails)
    savetolocalstorage();
}
const generatetaskcard = ({id,url,title,type,description}) =>                           //destructure first as we are passing object
    `<div class="col-md-6 col-lg-4 mt-3 id=${id} key=${id}">
    <div class="card">
       <div class="card-header">
           <div class="card-header d-flex justify-content-end"> <!--d is display flex-->
               <button onclick="edittask(this)" type="button" class="btn btn-outline-info">
                    <i onclick="edittask(this)" class="fas fa-pencil-alt"></i>
                </button>
               <button name=${id} onclick="deletetask(this)" type="button" class="btn btn-outline-danger">
                    <i onclick="deletetask(this)" class="fas fa-trash-alt"></i>
               </button>
           </div>
       </div>
       <img src=${url} class="card-iamge-top" alt="image" />
       <div  class="card-body">
           <h5 class="card-title">${title}</h5>
           <p class="card-text">${description}</p>
           <span class="badge bg-primary">${type}</span>
       </div>
       <div class="card-footer">
             <button class="btn btn-outline-primary float-end" >open</button>
       </div>
    </div>
    </div>`
    

    const savetolocalstorage = () =>{
        localStorage.setItem("tasky", JSON.stringify({tasks: globaltaskdata}))
    }
    const reloadtaskcard= () =>{
        const localstoragecopy = JSON.parse(localStorage.getItem("tasky"))
        console.log(localstoragecopy);
        if(localstoragecopy){
            globaltaskdata = localstoragecopy.tasks
        }
        console.log(globaltaskdata);
        globaltaskdata.map((e) => {              //to show in front end
        taskcontents.insertAdjacentHTML('beforeend' , generatetaskcard(e));
        })
    }
    const deletetask = (e) => {         //current object from window object that is this
        console.log(e);
       const targetid = e.getAttribute("name");
       console.log(targetid);
       const removetask = globaltaskdata.filter((e) => e.id!==targetid);
       globaltaskdata = removetask;
       console.log(globaltaskdata);
       savetolocalstorage();
       window.location.reload();    //reload the page 
    }
     
    const edittask = (e) =>{
        const targetid = e.getAttribute("name");
        console.log(targetid);
        console.log(e);
        console.log(e.parentNode);
        console.log(e.parentNode.parentNode.parentNode.childNodes); 
        //child node counting as alternate
        console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]);   //one parent many child // [2] index of child
        console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3]);
        console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5]);

        console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")); // attribute and value
        console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true"));
        console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true"));
        
        console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1]);
        e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML = "SAVE CHANGES"
        e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick", "savededittask(this)")
        // window.location.reload();    //reload the page 
    }
    const saveEditTask = (e) => {
        const targetID = e.getAttribute("name");
        const newTaskDetails = {
            id: e.parentNode.parentNode.parentNode.getAttribute("id"),
            url: e.parentNode.parentNode.childNodes[3].getAttribute("name"),
            title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
            type: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
            description: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML
        }
        const refid = e.parentNode.parentNode.parentNode.getAttribute("id")
        console.log(refid)
        objIndex = globalTaskData.findIndex((obj => obj.id == refid));
        console.log(objIndex)
        globalTaskData[objIndex] = newTaskDetails
    
        saveToLocalStorage()
        window.location.reload();
    }