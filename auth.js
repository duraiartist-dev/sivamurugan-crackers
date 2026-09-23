/* Shared helpers for login.html, register.html, orders.html */
const API_URL="https://script.google.com/macros/s/AKfycbzn1nLD5nbDDpSSsAyyKy25qdJ4yzKvmbOGkP2OSKPBvZ82e1bfgyFeOICpjXPoswkr/exec";
const SKEY="ssc_session";

const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt=n=>"Rs. "+Math.round(n).toLocaleString("en-IN");

function getSession(){try{return JSON.parse(localStorage.getItem(SKEY)||"null")}catch(e){return null}}
function saveSession(r){
  try{localStorage.setItem(SKEY,JSON.stringify({token:r.token,name:r.name,phone:r.phone}))}catch(e){}
  /* pre-fill the order form on index.html */
  try{
    const d=JSON.parse(localStorage.getItem("ssc_details")||"null")||{};
    localStorage.setItem("ssc_details",JSON.stringify({name:r.name,phone:r.phone,addr:d.addr||""}));
  }catch(e){}
}
function clearSession(){try{localStorage.removeItem(SKEY)}catch(e){}}
function logout(){clearSession();location.href="index.html"}

async function api(payload){
  try{
    const res=await fetch(API_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(payload)});
    return await res.json();
  }catch(e){
    return {ok:false,error:"Could not reach the shop server. Check your internet and try again."};
  }
}
const errMsg=r=>(r&&(r.error||r.msg))||"Something went wrong. Please try again.";

/* only allow going back to our own pages, like orders.html */
function safeNext(){
  const n=new URLSearchParams(location.search).get("next")||"";
  return /^[a-z0-9_-]+\.html$/i.test(n)?n:"index.html";
}

function fmtDate(v){
  const d=new Date(v);
  return isNaN(d)?String(v||""):d.toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"numeric",minute:"2-digit"});
}
function statusClass(s){
  s=String(s||"").toLowerCase();
  if(/cancel|reject/.test(s))return"bad";
  if(/deliver|complete|done|dispatch/.test(s))return"good";
  return"wait";
}
