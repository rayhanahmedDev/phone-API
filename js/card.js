const loadPhone = async (inputText = '13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`);
    const data = await res.json();
    const phones = data.data
    displayPhones(phones,isShowAll)
}

const displayPhones =( phones,isShowAll) => {
    const phoneContainer = document.getElementById('div-container')
    phoneContainer.textContent = '';

    // show all button when 12 up
    const showAllBtn = document.getElementById('show-All-btn')
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden')
    }else{
        showAllBtn.classList.add('hidden')
    }
    // console.log('show all here',isShowAll)
    // set the number over 12 up
    if(!isShowAll){
        phones = phones.slice(0,12)
    }
    phones.forEach(phone => {
    //  console.log(phone)
    //  1create div
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    // step 2 set innerHTML
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body ">
    <h2 class="card-title ">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
    <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">details</button>
    </div>
    </div>
    `;
    // step 3 child append
    phoneContainer.appendChild(phoneCard)
    });
    
}
// show details button
    const showDetails = async (id) =>{
        // console.log('clicked',id)
        // load single data
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        const data = await res.json()
        const phone = data.data
        showPhoneDetails(phone)
    }
    // show phone details
    const showPhoneDetails = (phone) =>{
        console.log(phone)
        const showDetailsPhone = document.getElementById('show-details-phone')
        showDetailsPhone.innerText = phone.name;
        const showContainer = document.getElementById('show-details-container')
        showContainer.innerHTML = `
        <img src="${phone.image
        }" alt="" srcset="">
        `
        show_modal.showModal()
    }
// handle search button
const handleSearch = (isShowAll) =>{
   const inputField = document.getElementById('input_field')
   const inputText = inputField.value;
//    console.log(inputText)
   loadPhone(inputText,isShowAll)
}

const showAll = () =>{
    handleSearch(true)
}
loadPhone()