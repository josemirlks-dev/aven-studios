const {ipcRenderer}=require("electron");

const editor=document.getElementById("editor");
const lines=document.getElementById("lines");

editor.addEventListener("input",()=>{
let total=editor.value.split("\n").length;
lines.innerText="Linhas: "+total;
});

async function openFile(){
const data=await ipcRenderer.invoke("openFile");

if(data){
editor.value=data;
}
}

async function saveFile(){
await ipcRenderer.invoke(
"saveFile",
editor.value
);
}
