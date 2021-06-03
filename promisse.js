const p = new Promise((reslove,reject) =>{
    const a = 1+1
    if(a == 2){
        reslove('success')
    }
    else{
        reject('failed')
    }
})

p.then(message =>{
    console.log("the promise is", message)
}).catch((message)=>{
    console.log("the promise is"+ message)
})




async function something(){
    try{

    }
    catch(err){

    }
}