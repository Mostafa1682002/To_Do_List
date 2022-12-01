//Variable 
let inputText=document.getElementById("text"),
    submit=document.getElementById("submit"),
    noTask=document.getElementById("no-tasks"),
    tasks=document.querySelector(".tasks"),
    count=document.querySelector(".count"),
    complete=document.querySelector(".complete");

let arr=[];

window.onload=function(){
    inputText.focus();
    if(localStorage.length>0){
        let date=JSON.parse(localStorage.getItem('tasks'));
        
        date.forEach(task => {
            count.innerHTML++;
            deleteNoTasks();
            tasks.innerHTML+=`<div class="task" data-name='${task}'>
                                ${task}
                                <span class="delete">delete</span>
                            </div>`;
        });
        arr=date;
    }else{
        arr=[];
    }
}


//function to add Task
submit.onclick=function(e){
    e.preventDefault();
    if(inputText.value==''){
        alert("Please Add Task")
    }else{
            //check if text are exit
            if(arr.indexOf(inputText.value)>-1){
                alert("This is Task already found")
            }else{
                tasks.innerHTML+=`<div class="task" data-name='${inputText.value}'>
                                    ${inputText.value}
                                    <span class="delete">delete</span>
                                </div>`;
                arr.push(inputText.value);
                //Input Empty
                inputText.value='';
                //increment count
                count.innerHTML++;
                inputText.focus();
                //Delete Message No Task
                deleteNoTasks();

                //Add Array to local Storage
                localStorage.setItem('tasks',JSON.stringify(arr));
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
        //Delete Element From Array
        arr=arr.filter((task)=>task!=e.target.parentElement.getAttribute("data-name"));
        //Delete Element From Page
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

    //Add Array to local Storage
    localStorage.setItem('tasks',JSON.stringify(arr));
})

