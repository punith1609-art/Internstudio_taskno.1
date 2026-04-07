<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Algorithm Visualizer</title>

<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
--bg:#0d1117;
--card:#161b22;
--card2:#1c2333;
--border:#30363d;
--text:#e6edf3;
--muted:#8b949e;
--c-unsorted:#3b82f6;
--c-comparing:#f59e0b;
--c-swapping:#ef4444;
--c-sorted:#22c55e;
--c-notchecked:#374151;
--c-searchspace:#3b82f6;
--c-checking:#f59e0b;
--c-eliminated:#ef4444;
--c-found:#22c55e;
}

body{
background:var(--bg);
color:var(--text);
font-family:Segoe UI,system-ui,sans-serif;
min-height:100vh;
}

button,input,select{
font-family:inherit;
cursor:pointer;
}

/* pages */

.page{
display:none;
min-height:100vh;
}

/* home */

#home{
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
padding:60px 24px;
}

.home-title{
font-size:3rem;
font-weight:700;
background:linear-gradient(135deg,#818cf8,#c084fc,#f472b6);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
margin-bottom:12px;
}

.home-sub{
color:var(--muted);
margin-bottom:50px;
}

.home-cards{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
width:100%;
max-width:700px;
}

.home-card{
background:var(--card);
border:1px solid var(--border);
border-radius:10px;
padding:25px;
cursor:pointer;
transition:.2s;
}

.home-card:hover{
transform:translateY(-3px);
border-color:#555;
}

.home-card-icon{
width:50px;
height:50px;
border-radius:10px;
display:flex;
align-items:center;
justify-content:center;
font-size:22px;
margin-bottom:15px;
}

.icon-sort{background:linear-gradient(135deg,#3b82f6,#06b6d4)}
.icon-search{background:linear-gradient(135deg,#a855f7,#ec4899)}

.viz-top{
text-align:center;
padding:25px;
position:relative;
}

.back-btn{
position:absolute;
left:20px;
top:25px;
background:none;
border:1px solid var(--border);
color:var(--muted);
padding:5px 12px;
border-radius:6px;
}

.viz-title{
font-size:1.7rem;
font-weight:700;
}

.viz-body{
max-width:1000px;
margin:auto;
padding:20px;
}

.ctrl-row{
background:var(--card);
border:1px solid var(--border);
border-radius:10px;
padding:12px;
display:flex;
flex-wrap:wrap;
gap:12px;
margin-bottom:15px;
}

.ctrl-grp{
display:flex;
align-items:center;
gap:8px;
}

.ctrl-lbl{
color:var(--muted);
font-size:.85rem;
}

.ctrl-sel,.ctrl-num{
background:var(--card2);
border:1px solid var(--border);
border-radius:6px;
color:var(--text);
padding:5px 8px;
}

.gen-btn{
background:#2563eb;
border:none;
color:white;
padding:6px 14px;
border-radius:6px;
margin-left:auto;
}

.pb-row{
display:flex;
gap:8px;
align-items:center;
margin-bottom:14px;
}

.pb-btn{
width:36px;
height:36px;
border-radius:50%;
border:none;
display:flex;
align-items:center;
justify-content:center;
}

.pb-home{background:#374151;color:white}
.pb-play{background:#16a34a;color:white}
.pb-step{background:#1d4ed8;color:white}
.pb-reset{background:#dc2626;color:white}

.canvas-box{
background:var(--card);
border:1px solid var(--border);
border-radius:10px;
padding:15px;
}

.search-box{
background:var(--card);
border:1px solid var(--border);
border-radius:10px;
padding:20px;
}

.s-grid{
display:flex;
flex-wrap:wrap;
gap:7px;
}

.s-cell{
background:var(--c-notchecked);
border-radius:8px;
width:60px;
padding:5px;
text-align:center;
}

.s-cell.ss{background:var(--c-searchspace)}
.s-cell.chk{background:var(--c-checking)}
.s-cell.elim{background:var(--c-eliminated)}
.s-cell.found{background:var(--c-found)}

.s-result{
text-align:center;
padding-top:15px;
}

.r-found{color:#3fb950}
.r-notfound{color:#f85149}
</style>
</head>

<body>

<div id="home" class="page" style="display:flex">

<h1 class="home-title">Algorithm Visualizer</h1>
<p class="home-sub">Interactive visualizations to understand algorithms</p>

<div class="home-cards">

<div class="home-card" onclick="goSort()">
<div class="home-card-icon icon-sort">📊</div>
<h3>Sorting Algorithms</h3>
<p>Visualize sorting algorithms step by step</p>
</div>

<div class="home-card" onclick="goSearch()">
<div class="home-card-icon icon-search">🔍</div>
<h3>Searching Algorithms</h3>
<p>Watch how searching algorithms find values</p>
</div>

</div>
</div>

<!-- SORT PAGE -->

<div id="sort-page" class="page">

<div class="viz-top">
<button class="back-btn" onclick="goHome()">← Back</button>
<span class="viz-title">Sorting Visualizer</span>
</div>

<div class="viz-body">

<div class="ctrl-row">

<div class="ctrl-grp">
<span class="ctrl-lbl">Algorithm</span>

<select id="sort-algo">
<option value="bubble">Bubble Sort</option>
<option value="selection">Selection Sort</option>
<option value="insertion">Insertion Sort</option>
</select>
</div>

<div class="ctrl-grp">
<span class="ctrl-lbl">Size</span>
<input type="range" id="sort-size" min="10" max="80" value="40">
</div>

<button class="gen-btn" onclick="generateSort()">Generate</button>

</div>

<div class="pb-row">
<button class="pb-btn pb-home" onclick="goHome()">🏠</button>
<button class="pb-btn pb-play" onclick="playSort()">▶</button>
<button class="pb-btn pb-reset" onclick="generateSort()">↺</button>
</div>

<div class="canvas-box">
<canvas id="sort-canvas" height="330"></canvas>
</div>

</div>
</div>

<!-- SEARCH PAGE -->

<div id="search-page" class="page">

<div class="viz-top">
<button class="back-btn" onclick="goHome()">← Back</button>
<span class="viz-title">Searching Visualizer</span>
</div>

<div class="viz-body">

<div class="ctrl-row">

<div class="ctrl-grp">
<span class="ctrl-lbl">Algorithm</span>

<select id="search-algo">
<option value="linear">Linear</option>
<option value="binary">Binary</option>
</select>
</div>

<div class="ctrl-grp">
<span class="ctrl-lbl">Size</span>
<input type="range" id="search-size" min="5" max="30" value="20">
</div>

<button class="gen-btn" onclick="generateSearch()">Generate</button>

</div>

<div class="search-box">

<div class="s-grid" id="grid"></div>

<div class="s-result">
<div>Target: <span id="target"></span></div>
<div id="result"></div>
</div>

</div>

</div>
</div>

<script>

"use strict"

const $ = id => document.getElementById(id)

/* page nav */

function show(id){
$('home').style.display='none'
$('sort-page').style.display='none'
$('search-page').style.display='none'
$(id).style.display='block'
}

function goHome(){show('home')}
function goSort(){show('sort-page');generateSort()}
function goSearch(){show('search-page');generateSearch()}

/* sorting */

let arr=[]
let timer=null

function generateSort(){

clearTimeout(timer)

const size=$('sort-size').value
arr=[]

for(let i=0;i<size;i++){
arr.push(Math.floor(Math.random()*100)+5)
}

draw()
}

function draw(){

const canvas=$('sort-canvas')
if(!canvas) return

const ctx=canvas.getContext('2d')

const width=canvas.offsetWidth
canvas.width=width
canvas.height=330

const barWidth=width/arr.length

ctx.clearRect(0,0,width,330)

const max=Math.max(...arr)

arr.forEach((v,i)=>{

const h=(v/max)*300
const x=i*barWidth
const y=330-h

ctx.fillStyle='#3b82f6'
ctx.fillRect(x,y,barWidth-2,h)

})

}

async function playSort(){

const algo=$('sort-algo').value

if(algo==="bubble") await bubbleSort()
if(algo==="selection") await selectionSort()
if(algo==="insertion") await insertionSort()

}

function sleep(ms){
return new Promise(r=>setTimeout(r,ms))
}

async function bubbleSort(){

for(let i=0;i<arr.length;i++){

for(let j=0;j<arr.length-i-1;j++){

if(arr[j]>arr[j+1]){

[arr[j],arr[j+1]]=[arr[j+1],arr[j]]

draw()

await sleep(30)

}

}

}

}

async function selectionSort(){

for(let i=0;i<arr.length;i++){

let min=i

for(let j=i+1;j<arr.length;j++){

if(arr[j]<arr[min]) min=j

}

[arr[i],arr[min]]=[arr[min],arr[i]]

draw()

await sleep(40)

}

}

async function insertionSort(){

for(let i=1;i<arr.length;i++){

let j=i

while(j>0 && arr[j]<arr[j-1]){

[arr[j],arr[j-1]]=[arr[j-1],arr[j]]

j--

draw()

await sleep(35)

}

}

}

/* search */

let searchArr=[]
let target=0

function generateSearch(){
const size=$('search-size').value
searchArr=[]
for(let i=0;i<size;i++){
searchArr.push(Math.floor(Math.random()*90)+1)
}
searchArr.sort((a,b)=>a-b)
target=searchArr[Math.floor(Math.random()*size)]
$('target').textContent=target
renderGrid()
}

function renderGrid(){

const grid=$('grid')

grid.innerHTML=''

searchArr.forEach((v,i)=>{

const div=document.createElement('div')
div.className='s-cell'
div.innerHTML=`<div>${v}</div>`
grid.appendChild(div)

})

}

</script>

</body>
</html>