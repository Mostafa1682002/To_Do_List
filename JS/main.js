//Variable 
let inputText=document.getElementById("text"),
    submit=document.getElementById("submit"),
    noTask=document.getElementById("no-tasks"),
    tasks=document.querySelector(".tasks"),
    count=document.querySelector(".count"),
    complete=document.querySelector(".complete");



window.onload=function(){
    inputText.focus();
}


//function to add Task
let arr=[];
let index=0;
submit.onclick=function(e){
    e.preventDefault();
    if(inputText.value==''){
        alert("Please Add Task")
    }else{
            //check if text are exit
            if(arr.indexOf(inputText.value)>-1){
                alert("This is Task already found")
            }else{
                //create Task 
                let div=document.createElement("div");
                //add class to div
                div.className="task ";
                //add data-index to div
                div.setAttribute("data-index",index++);
                div.appendChild(document.createTextNode(inputText.value));
                arr.push(inputText.value);
                let dele=document.createElement("span");
                dele.className="delete";
                dele.appendChild(document.createTextNode("Delete"));
                div.appendChild(dele);
                tasks.appendChild(div);
                //Input Empty
                inputText.value='';
                //increment count
                count.innerHTML++;
                inputText.focus();
                //Delete Message No Task
                deleteNoTasks();
            }
    }
}


function deleteNoTasks(){
    if(count.innerHTML>0){
        noTask.style.display='none';
    }else{
        noTask.style.display='block';
    }
}


document.addEventListener("click",function(e){
    //delete Element
    if(e.target.className=='delete'){
        arr.splice(parseInt(e.target.parentElement.getAttribute("data-index")),1);
        // arr[parseInt(e.target.parentElement.getAttribute("data-index"))]='';
        e.target.parentElement.remove();
        //decremnt count
        count.innerHTML--;
        deleteNoTasks();
    }

    //check task if finish
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("finish");
    }

    //Tasks Are Completed
    let allFinshed=document.querySelectorAll(".task.finish");
    complete.innerHTML=allFinshed.length;

})

