
/* Http Request  */ 

var parent_counter = document.getElementById('images');

let arraystrorage = [] ; /// to put the favourate images in local storage 

 if(localStorage.getItem('fav_img')=== null){
     console.log('yes');
    arraystrorage=[];
 }
 else{
    arraystrorage=JSON.parse(localStorage.getItem("fav_img"));
 }
 console.log(arraystrorage);



var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(xhttp.responseText);
      myFunction(myArr);
    }
};
xhttp.open("GET", "https://jsonplaceholder.typicode.com/photos", true);
xhttp.send();

// https://picsum.photos/v2/list 
// https://jsonplaceholder.typicode.com/photos
 
let newArray = [] ; // to add the urls from api // 

let myFunction = (arr) =>{
   for (let i = 0; i < arr.length; i++) {
    let myurl = arr[i].url;
    newArray.push(myurl) ;
   }

}

function createElements (myarr ) {
    for (let ii = 0; ii < myarr.length; ii++) {
     div = document.createElement('div');
    div.setAttribute('class' ,'image' );
     i  = document.createElement('i');
     i.setAttribute('class' , 'fas fa-star fa-2x') ; 

     if(arraystrorage.includes(myarr[ii])){
        i.classList.add('fa-active'); 
     }

    img = document.createElement('img');

    img.setAttribute('src' , myarr[ii]);
    img.setAttribute('alt' , Math.floor(Math.random() * myarr.length));
    div.appendChild(i);
    div.appendChild(img); 
    parent_counter.appendChild(div);    
    }

}


setTimeout(() => {

    createElements(newArray);

    let i = document.querySelectorAll('.image i') ; 

    let divimages=document.querySelectorAll('.image img') ; 

    let ArrFavImg = Array.from(i); 

    let icons =document.querySelector('.icons').children;

ArrFavImg.forEach(item =>{
    item.onclick=function(){
       item.classList.toggle('fa-active');

       if(item.classList.contains("fa-active"))
       {
        arraystrorage.push(item.nextSibling.getAttribute('src'));
        localStorage.setItem('fav_img', JSON.stringify(arraystrorage));
       // console.log(arraystrorage);
       }
       else{
        let index_img = arraystrorage.indexOf(item.nextSibling.getAttribute('src')) ;
        if (index_img > -1) {
            arraystrorage.splice(index_img, 1);
            localStorage.setItem('fav_img', JSON.stringify(arraystrorage));
          }
       }
    }
})



icons[0].onclick=function(){
    this.classList.add('fa-active');
    icons[2].classList.remove('fa-active');
    ArrFavImg.forEach((item , i )=>{
        if(!(item.classList.contains('fa-active')))
          item.parentElement.style.display='block'; 
   })
}
icons[2].onclick=function(){
    this.classList.add('fa-active');
    icons[0].classList.remove('fa-active');
    ArrFavImg.forEach((item , i )=>{
        if(!(item.classList.contains('fa-active')))
          item.parentElement.style.display='none'; 
   })
}

let showimages = document.querySelector('.show_image');

let close = document.querySelector('.show_image i');

let overlay = document.querySelector('.overlay');

divimages.forEach(item=>{
    
    item.onclick=function(){
        showimages.children[0].children[1].innerHTML=""; 
        image_src = item.getAttribute('src');
       // console.log(image_src);
        showimages.children[1].setAttribute('src' , image_src);
        The_Text = document.createTextNode( "|| Image No : " + item.getAttribute('alt')+"||")
        showimages.children[0].children[1].appendChild(The_Text);
        
        overlay.style.display='block';
    }
})

close.onclick = function(){
    overlay.style.display='none';  
}

}, 1000);


