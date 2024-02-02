function getSession(){
    const token = JSON.parse(sessionStorage.getItem("token"));
    const uid = JSON.parse(sessionStorage.getItem("cbid"));

    return { token, uid};
}
export async function getUser(){

    const sessionData = getSession();

    const requestOptions = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${sessionData.token}`
        }
    } 
    
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${sessionData.uid}`, requestOptions);
    
    if(!response.ok){
        throw { message : response.statusText, statusCode : response.status } // eslint-disable-line
    }

    const data = await response.json();
    return data;
}

export async function getUserOrders(){

    const sessionData = getSession();

    const requestOptions = {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${sessionData.token}`
        }
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.uid=${sessionData.uid}`, requestOptions);

    if(!response.ok){
        throw {message : response.statusText, statusCode : response.status} // eslint-disable-line
    }

    const data = await response.json();

    return data;
    
}

export async function createOrder(cartList,cartTotal, userData){

    const sessionData = getSession();

    const order = {
        cartList : cartList,
        amount_paid : cartTotal,
        quantity : cartList.length,
        user : userData
    }

    const requestOptions ={ 
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${sessionData.token}`
        },
        body : JSON.stringify(order)
    }

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders` , requestOptions)

    if(!response.ok){
        throw {message : response.statusText, statusCode : response.status} // eslint-disable-line
    }

    const data = await response.json();

    return data;
    
}