let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
 
let mood = 'creat'
let temp;

// get total

function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'; 
    }else{
        total.innerHTML = "";
        total.style.background = 'red'
    }
}

// creat data
let product;

if(localStorage.product != null){
    product = JSON.parse(localStorage.product);
}else{
    product = [];
}

// save data

submit.addEventListener('click',function(){
    let prw = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    // count
    if(mood=="creat"){
        if(prw.count > 1 ){
            for(let i = 0; i < prw.count; i++){
                product.push(prw);
            }
        }else{
            product.push(prw);
        }
    }else{
        product[temp] = prw;
        mood = 'creat';
        submit.innerHTML = "craet";
        total.style.background = "#040";
        count.style.display = "block";
    }
   

    localStorage.setItem('product',  JSON.stringify(product));
    clearData();
    showData();
   
    
})
//clear data after submit
function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
// show data

 function showData(){
    getTotal();
     let table = "";

     for(let i = 0 ; i < product.length ; i++){
         table += `
         <tr>
         <td>${[i]}</td>
         <td>${product[i].title}</td>
         <td>${product[i].price}</td>
         <td>${product[i].taxes}</td>
         <td>${product[i].ads}</td>
         <td>${product[i].discount}</td>
         <td>${product[i].total}</td>
         <td>${product[i].category}</td>
         <td><button onclick="updateData(${i})" id="update">update</button></td>
         <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
         </tr> 
      `
         }
        document.getElementById('table').innerHTML = table;
        let btnDall = document.getElementById('deleteAll');
        if(product.length > 0 ){
            btnDall.innerHTML = `
            <button onclick="deleteAll()">DeleteAll(${product.length})</button>
            `
        }else{
            btnDall.innerHTML = '';
        }
 }

 showData();
// delete

function deleteData(i){
    product.splice(i,1);
    localStorage.product = JSON.stringify(product);
    showData()
}

// deleteAll

function deleteAll()
{
    product.splice(0);
    localStorage.clear();
    showData()
}
// update
function updateData(i){
    title.value = product[i].title;
    price.value = product[i].price;
    taxes.value = product[i].taxes;
    ads.value = product[i].ads;
    discount.value = product[i].discount;
    total.innerHTML = product[i].total;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = "updat"
    category.value = product[i].category;
    mood = 'update';
    temp = i;

}
// search
let searchMood = 'title'; 

function getSearchMMood(id){
    let search = document.getElementById('search');

    if(id == "searchTitle"){
        searchMood = 'title'
        search.placeholder = 'search by title'
    }else{
        searchMood = 'category'
        search.placeholder = 'search by category'
    }
    search.focus()
}

function searchData(value){
    let table ='';
    if(searchMood == 'title'){
        
   
    for(let i = 0 ; i < product.length; i++){
        if(product[i].title.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${[i]}</td>
            <td>${product[i].title}</td>
            <td>${product[i].price}</td>
            <td>${product[i].taxes}</td>
            <td>${product[i].ads}</td>
            <td>${product[i].discount}</td>
            <td>${product[i].total}</td>
            <td>${product[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr> 
           `
        
        
    }
}
}else{
    for(let i = 0 ; i < product.length; i++){
        if(product[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
            <td>${[i]}</td>
            <td>${product[i].title}</td>
            <td>${product[i].price}</td>
            <td>${product[i].taxes}</td>
            <td>${product[i].ads}</td>
            <td>${product[i].discount}</td>
            <td>${product[i].total}</td>
            <td>${product[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr> 
           `
        
        
    }
}

}
document.getElementById('table').innerHTML = table;
}