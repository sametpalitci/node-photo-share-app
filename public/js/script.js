let classListButton = document.querySelector('#classListButton');
classListButton.addEventListener('click', () => {
    let contetLeftBarLink = document.getElementsByClassName('contetLeftBarLink');
    for (let i = 0; i < contetLeftBarLink.length; i++) {
        if (contetLeftBarLink[i].style.display == "none") {
            contetLeftBarLink[i].style.display = "block"
        } else if(contetLeftBarLink[i].style.display == "block"){
            contetLeftBarLink[i].style.display = "none"
        }else {
            contetLeftBarLink[i].style.display = "block"
        }
    }
});
let imageSentDescription = document.querySelector('#imageSentDescription');
imageSentDescription.addEventListener('mouseover', ()=>{
    imageSentDescription.style.height = '80px';
})
imageSentDescription.addEventListener('mouseout', ()=>{
    imageSentDescription.style.height = '40px';
})