var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var closeBtn1 = document.getElementById("closeBtn1");
var closeBtn2 = document.getElementById("closeBtn2");
var closeBtn3 = document.getElementById("closeBtn3");
var regexName = /[a-z0-9]{3,20}/i;
var regexURL = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;


bookmarkName.addEventListener("keyup", function(){
      if (regexName.test(bookmarkName.value) != true) {
        bookmarkName.classList.add("is-invalid");
      }
      else {
        bookmarkName.classList.remove("is-invalid");
        bookmarkName.classList.add("is-valid");
      }
});


bookmarkURL.addEventListener("keyup", function(){
      if (regexURL.test(bookmarkURL.value) != true) {
        bookmarkURL.classList.add("is-invalid");
      }
      else {
        bookmarkURL.classList.remove("is-invalid");
        bookmarkURL.classList.add("is-valid");
      }
});


closeBtn1.addEventListener("click", function(){
        document.getElementById("emptyInputAlert").classList.add("d-none");
})


closeBtn2.addEventListener("click", function(){
        document.getElementById("invalidInputAlert").classList.add("d-none");
})


closeBtn3.addEventListener("click", function(){
    document.getElementById("sameInputValueAlert").classList.add("d-none");
})


var allBookmark = [];


   if (localStorage.getItem("bookmark") != null) {
    allBookmark = JSON.parse(localStorage.getItem("bookmark"));
    displayData();
   }


function addBookmark(){
     if(bookmarkName.value == '' || bookmarkURL.value == ''){
        document.getElementById("emptyInputAlert").classList.remove('d-none');
    }

    else if(regexName.test(bookmarkName.value) != true || regexURL.test(bookmarkURL.value) != true){
        document.getElementById("invalidInputAlert").classList.remove('d-none');
    }
    else {
        if(checkData() == true){
            // Add Data
              var bookmark ={
                 name : bookmarkName.value ,
                 url : bookmarkURL.value
              };

             allBookmark.push(bookmark);

             localStorage.setItem("bookmark", JSON.stringify(allBookmark));

             clear();

             displayData();

             bookmarkName.classList.remove("is-valid");
             bookmarkURL.classList.remove("is-valid");
        }

        else{
            document.getElementById("sameInputValueAlert").classList.remove('d-none');
        }
    }
}

function clear(){
    // Clear Data
    bookmarkName.value = '';
    bookmarkURL.value = '';
}

function displayData(){
    // Display Data
    var package = '';
    for (var i = 0; i < allBookmark.length; i++) {
        package += `
       <tr>
        <td>${i}</td>
        <td>${allBookmark[i].name}</td>
        <td><button onclick="visitWebsite(${i})" class="btn btn-warning text-white visitBtn"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button onclick="deleteData(${i})" class="btn btn-danger text-white deleteBtn"><i class="fa-solid fa-trash-can"></i>Delete</button></td>
       </tr>`;
    }
    document.getElementById("tContent").innerHTML = package;
}

function deleteData(index){
    // Delete Data
    allBookmark.splice(index , 1);
    localStorage.setItem("bookmark" , JSON.stringify(allBookmark));
    displayData();
}

function visitWebsite(index){
   // Visit Website
    window.open(allBookmark[index].url);
}

function checkData(){
    // Check that the Data , which the User enter hasn't been entered before
    var checkBookmarkName = document.getElementById("bookmarkName").value;
    var checkBookmarkURL = document.getElementById("bookmarkURL").value;
    var checked = true;
    for (var i = 0; i < allBookmark.length; i++) {
      if (checkBookmarkName != '' && checkBookmarkURL != '') {
        if (allBookmark[i].name.toLowerCase().includes(checkBookmarkName.toLowerCase()) == true || allBookmark[i].url.toLowerCase().includes(checkBookmarkURL.toLowerCase()) == true) {
            checked = false;
        }
      }
    }

    return checked;
}
