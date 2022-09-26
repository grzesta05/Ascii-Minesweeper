class CookieManager{
    saveCookie(game){
        document.cookie = `game=${JSON.stringify(game)}`
    }
    readCookie(){
        if(document.cookie != "")
        {
            return JSON.parse(document.cookie.slice(4))
        }else 
        {
            return null;
        }
    }
}

export default CookieManager