/* index.html-la mattum: cart button pakkathula "Login" / "My orders" button add pannum.
   Idhu thaniya file, index.html-oda code-oda mothaadhu. */
(function(){
  function add(){
    var cart=document.getElementById("cartBtn");
    if(!cart||document.querySelector(".acct"))return;
    var st=document.createElement("style");
    st.textContent=".acct{color:var(--ink);text-decoration:none;font-weight:600;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:8px 14px;white-space:nowrap;font-size:15px}.acct:hover{border-color:var(--marigold)}";
    document.head.appendChild(st);
    var s=null;
    try{s=JSON.parse(localStorage.getItem("ssc_session")||"null")}catch(e){}
    var a=document.createElement("a");
    a.className="acct";
    if(s&&s.token){a.href="orders.html";a.textContent="My orders";a.title="Logged in as "+(s.name||"")}
    else{a.href="login.html";a.textContent="Login"}
    cart.parentNode.insertBefore(a,cart);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",add);else add();
})();
