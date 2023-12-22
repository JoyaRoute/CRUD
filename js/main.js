var websiteNameInput = document.getElementById('websiteNameInput')
var websiteUrlInput = document.getElementById('websiteUrlInput')
var tableBody = document.getElementById('tableBody')
var btnSubmit = document.getElementById('btnSubmit')
var btnEdit = document.getElementById('btnEdit')
var searchInput = document.getElementById('searchInput')
var pattern = /^[A-Z][A-Za-z0-9]{3,10}$/gm
var urlPattern= /^https:\/\/www\.[A-Za-z]{3,15}\.com\/$/gm

var websiteContainer = []
var updaedIndex 

if(localStorage.getItem('websites') != null){
    websiteContainer = JSON.parse(localStorage.getItem('websites'))
    displayWebsites()
}

function addWebsite(){

    if(validateWebsiteName() && validateWebsiteurl()){
        var website = {
            name : websiteNameInput.value,
            url: websiteUrlInput.value
        }
        websiteContainer.push(website)
        localStorage.setItem("websites", JSON.stringify(websiteContainer))
        displayWebsites()
        clearForm()
        Swal.fire({
            title: 'success',
            text: 'your website added successfully',
            icon: 'success',
            confirmButtonText: 'ok'
          })
    }
    else
    {
        console.log(pattern.test(websiteNameInput.value) , "  " , urlPattern.test(websiteUrlInput.value));
        console.log(websiteUrlInput.value);
        Swal.fire({
            title: 'Error!',
            text: 'invalid Inputs',
            icon: 'error',
            confirmButtonText: 'ok'
          })
    }
   
}

function clearForm(){
    websiteNameInput.value='',
    websiteUrlInput.value=''
}

function displayWebsites(){
    var cartona = '';
    for(var i =0 ; i< websiteContainer.length; i++){
        cartona+= `
        <tr>
        <td>${websiteContainer[i].name}</td>
        <td>${websiteContainer[i].url}</td>
        <td>
            <button class="btn btn-warning" onclick="setFormToUpdate(${i})">
                <i class="fa-solid fa-pen"></i>
                Update
            </button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteWebsite(${i})">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>
        </td>
        <td>
            <button class="btn btn-primary" onclick="visitWebsite(${i})">
                <i class="fa-solid fa-eye"></i>
                Visit
            </button>
        </td>
    </tr>
        `
    }
    tableBody.innerHTML= cartona;
}

function deleteWebsite(index){
    websiteContainer.splice(index , 1)
    localStorage.setItem('websites',JSON.stringify(websiteContainer));
    displayWebsites()
}

function setFormToUpdate(index){

    updaedIndex = index
    websiteNameInput.value = websiteContainer[index].name;
    websiteUrlInput.value = websiteContainer[index].url
    btnSubmit.classList.add('d-none')
    btnEdit.classList.remove('d-none')

}

function updateWebsite(){
    var website = {
        name: websiteNameInput.value
        , url : websiteUrlInput.value
    }
    websiteContainer.splice(updaedIndex , 1 , website)
    localStorage.setItem('websites',JSON.stringify(websiteContainer));
    displayWebsites()
    btnEdit.classList.add('d-none')
    btnSubmit.classList.remove('d-none')
    clearForm()
}

function visitWebsite(index){
    open(websiteContainer[index].url)
}

function search(){
   term = searchInput.value
   var cartona = '';
   for(var i =0 ; i< websiteContainer.length; i++){
    if(websiteContainer[i].name.toLowerCase().includes(term.toLowerCase())){
        cartona+= `
        <tr>
        <td>${websiteContainer[i].name}</td>
        <td>${websiteContainer[i].url}</td>
        <td>
            <button class="btn btn-warning" onclick="setFormToUpdate(${i})">
                <i class="fa-solid fa-pen"></i>
                Update
            </button>
        </td>
        <td>
            <button class="btn btn-danger" onclick="deleteWebsite(${i})">
                <i class="fa-solid fa-trash"></i>
                Delete
            </button>
        </td>
        <td>
            <button class="btn btn-primary" onclick="visitWebsite(${i})">
                <i class="fa-solid fa-eye"></i>
                Visit
            </button>
        </td>
    </tr>
        `
    }
   }
   tableBody.innerHTML= cartona;

}

function validateWebsiteName(){
    if(!pattern.test(websiteNameInput.value)){
        websiteNameInput.classList.remove('is-valid')
        websiteNameInput.classList.add('is-invalid')
    }
    else{
        websiteNameInput.classList.remove('is-invalid')
        websiteNameInput.classList.add('is-valid')
       }
       return(pattern.test(websiteNameInput.value))
}

function validateWebsiteurl(){
    if(!urlPattern.test(websiteUrlInput.value)){
        websiteUrlInput.classList.remove('is-valid')
        websiteUrlInput.classList.add('is-invalid')
    }
    else{
        websiteUrlInput.classList.remove('is-invalid')
        websiteUrlInput.classList.add('is-valid')
    }
    return(urlPattern.test(websiteUrlInput.value))
}

