

const weatherFrom=document.querySelector("form")
const searchBtn=document.querySelector("button")
const input=document.querySelector("input")
const forecastPara=document.querySelector(".forecast")
const addressPara=document.querySelector(".address")
const warning=document.querySelector(".warning-sign")

weatherFrom.addEventListener("submit",(e)=>{
    e.preventDefault()
    
    
    if(input.value===""){
        
        warning.classList.add("warning")
        setTimeout(() => {
            warning.classList.remove("warning")
        }, 2000);
    }
    else{
        forecastPara.textContent=""
        let val=input.value
        
        //Loading
        addressPara.innerHTML="Loading..."
         addressPara.classList.add("loading")

        //fetching the data
        const url="http://localhost:3000/weather?address="+input.value
        input.value=""
        fetch(url).then((response)=>{
        response.json().then((data)=>{
          if(data.error){
            addressPara.innerHTML=data.error
            addressPara.classList.remove("loading")
        }
        else{
        forecastPara.innerHTML=data.forecast
        addressPara.innerHTML= data.address
        input.value=""
    }
        
    })
})
    }
    
})






















