

//////////////          C . R . U . D . S            //////////////
/////    creat      read     update    dellete    search  /////////


// get total 
// creat product
// save in local storage
// clear inputs
// read
// count
// delete
// update
// search
// clead data






 let title = document.getElementById('title');
 let price = document.getElementById('price');
 let taxes = document.getElementById('taxes');
//  let ads = document.getElementById('ads');
 let discount = document.getElementById('discount');
 let category = document.getElementById('category');
 let categoryy = document.getElementById('categoryy');
 let count = document.getElementById('count');
//  let total = document.getElementById('total');
 let submit = document.getElementById('submit');

// to change the mood of if from creat to update
 let mood = "create"; 
 // global variable to reuse index from function to another function 
 let tmp;

// // // // // // get total 

// function getTotal(){
//   if(price.value != ''){
//     let result = (+price.value + +taxes.value + +ads.value) - +discount.value
//     total.innerHTML = result;
//     total.style.background = 'rgb(50 181 50)';
//   }else{
//     total.innerHTML = '';
//     total.style.background = 'red';
//   }
// }

// // creat product 
let dataPro ;
if(localStorage.product != null){
  dataPro = JSON.parse( localStorage.product)
}else{
  dataPro = [];
}

submit.onclick = function(){
  let newPro = {
    title : title.value.toLowerCase(),
    price : price.value,
    taxes : taxes.value,
    // ads : ads.value,
    discount : discount.value,
    // total: total.innerHTML,
    count :count.value,
    category: category.value.toLowerCase(),
    categoryy: categoryy.value.toLowerCase(),
  }

  if(title.value != '' 
  && price.value != ''
  && category.value != ''
  && newPro.count < 100){
    if(mood === "create"){
      if(newPro.count > 1){
        for(let z = 0; z < newPro.count; z++){
            dataPro.push(newPro);
        }
      }else{
            dataPro.push(newPro);
      }
    }else{
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    clearData();
  }
 
  localStorage.setItem('product', JSON.stringify(dataPro));
  showData();
}

// // clear inputs
function clearData(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  // ads.value = '';
  discount.value = '';
  // total.innerHTML = '';
  count.value = '';
  category.value = '';
  categoryy.value = '';
}

// // read data
function showData(){
  let table = '';
  for(let i = 0; i < dataPro.length; i++){
    table += 
    `
    <tr>
      <td>${i+1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].category}</td>
      <td>${dataPro[i].categoryy}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let btnDelete = document.getElementById('deleteAll');
  if(dataPro.length > 0){
    btnDelete.innerHTML = 
    `<button onclick="deletAll()">Delete All ${dataPro.length}</button>`;
  }else{
    btnDelete.innerHTML = '';
  }
  // getTotal();
}
showData();

// // delete Data 
function deleteData(i){

let test_value = prompt('plese enter ALT number');

if( test_value == dataPro[i].category){
  dataPro.splice(i,1);
  localStorage.product = JSON.stringify(dataPro);
}else{
  showData();
}
  
  // dataPro.splice(i,1);
  // localStorage.product = JSON.stringify(dataPro);
  showData();
}

// // deleteAll
function deletAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// // updateData
function updateData(i){
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  // ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  categoryy.value = dataPro[i].categoryy;
  // getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top:0,
    behavior: "smooth",
  })
}

// // serach
let searchMood = 'title';
  // bring mood
function getSearchMood(id){
  let search = document.getElementById('search');
  if(id =='searchCategory'){
    searchMood = 'category';
  }else{
    searchMood = 'title';
  }
  search.Placeholder = 'search by' + searchMood;
  search.focus();
  search.value = '';
  showData();
}

function searchData(value){
  let table = '';
  if(searchMood == 'title'){
    for( let i = 0; i < dataPro.length; i++){
      if (dataPro[i].title.toLowerCase().includes(value)){
        table += 
    `
    <tr>
      <td>${i}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].category}</td>
      <td>${dataPro[i].categoryy}</td>
      <td><button onclick="updateData(${i})" id="update">update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
      }
    }
  }else{
      for( let i = 0; i < dataPro.length; i++){
        if (dataPro[i].category.toLowerCase().includes(value)){
          table += 
      `
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>
      `;
        }
      }
  }
  document.getElementById('tbody').innerHTML = table;
}

//-----------------------------------------Update Data Functions-----------------------------------------------
//clean Data

// validation function

// let deletebtn = document.getElementById('delete');

// deletebtn.addEventListener('click' , function(event){
//   prompt('plese enter ALT number');
// })



