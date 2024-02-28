const name_value = document.getElementById("name")
const email_value = document.getElementById("email")
const spinner = document.getElementById('spinner')

window.addEventListener('DOMContentLoaded', async ()=>{
    spinner.classList.remove('hidden')
    const tokenData = await JSON.parse(localStorage.getItem('token'))

    if (!tokenData || !tokenData.token) {
        await localStorage.setItem('token', '{}')
        window.location.href = 'login.html'
    }

    // await checkToken(tokenData.token)

    name_value.innerText = tokenData.name
    email_value.innerText = tokenData.email
    spinner.classList.add('hidden')
})

document.querySelector('#signuot').addEventListener('click', ()=>{
    logout()
})

// async function checkToken(token){
//     const res = await fetch('SUA_API_AQUI/user',{
//         method:"GET",
//         headers: {'Authorization': Bearer ${token}}
//     })

//     if(!res.ok){
//         logout()
//     }

// }

async function logout(){
    spinner.classList.remove('hidden')
    try {
        const tokenData = await JSON.parse(localStorage.getItem('token'))
        if (!tokenData || !tokenData.token) {
            await localStorage.setItem('token', '{}')
            window.location.href = 'login.html'
        }
        await fetch('SUA_API_AQUI/logout',{
            method:"DELETE",
            headers: {'Authorization': `Bearer ${tokenData.token}`}
        })
        
    } catch (error) {
        console.log(error)
    }finally{
        await localStorage.setItem('token', '{}')
        window.location.href = 'login.html'
        spinner.classList.add('hidden')
    }
}