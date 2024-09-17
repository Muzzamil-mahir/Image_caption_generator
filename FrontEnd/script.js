
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");

if(inputFile){
    inputFile.addEventListener("change", uploadImage);
}
function uploadImage() {
    if (inputFile.files.length > 0) {
        let imgLink = URL.createObjectURL(inputFile.files[0]);
        imageView.style.backgroundImage = `url(${imgLink})`;
        imageView.textContent = '';
        imageView.style.border = "none";
        

    }
}

  function displayCaption(caption) {

    const generateButton = document.getElementById('generate-button');
    generateButton.parentNode.removeChild(generateButton);
  
    const cgBox = document.getElementById('cg-box');
  
    const box = document.createElement('div');
    box.style.backgroundColor = 'white'; 
    box.style.padding = '10px';
    box.style.borderRadius = '5px';
    box.innerHTML = `<p>${caption}</p>`;
    cgBox.appendChild(box);
  
    const goBackButton = document.createElement('button');
    goBackButton.innerText = 'Go Back';
    goBackButton.style.backgroundColor = '#333'; 
    goBackButton.style.color = '#fff'; 
    goBackButton.style.padding = '10px 15px';
    goBackButton.style.borderRadius = '3px';
    goBackButton.style.border = 'none';
    goBackButton.style.cursor = 'pointer';
    goBackButton.style.display = 'flex';
    goBackButton.style.justifyContent = 'center';
    goBackButton.style.marginTop = '20px';
    goBackButton.style.marginLeft = '167px'
  
    cgBox.appendChild(goBackButton);
  
    goBackButton.addEventListener('click', () => {
      cgBox.innerHTML = '';
      cgBox.appendChild(generateButton);
    });
  }
  
  
  function sendImageToApi(imageFile) {
    const url = "http://127.0.0.1:5000/GC"

    const formData = new FormData();
    formData.append('image', imageFile);

    fetch(url, {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Extract the caption from the response data
        const caption = data.caption;
        // Display the caption
        displayCaption(caption);
    })
    .catch(error => {
        console.error(error);
    });
}

function processImage() {
  if (inputFile.files.length > 0){
    let im = inputFile.files[0]
    sendImageToApi(im);
          
  }
}






