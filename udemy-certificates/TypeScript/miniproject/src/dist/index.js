const form=document.querySelector("form")
// btn?.addEventListener("click",function(){
//    console.log ((<HTMLInputElement>input).value)
//     // alert(input.value)
//     //  input.value=""
// })
form?.addEventListener("submit",function(e){
e.preventDefault()
console.log("submited")
})