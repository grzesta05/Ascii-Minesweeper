class CookieManager {
  static getCookiesDict() {
    const object = {};
    if (document.cookie != "")
      document.cookie.split(";").forEach((element) => {
        object[JSON.parse(element.split("=")[0])] = JSON.parse(
          element.split("=")[1]
        );
      });
    return object;
  }
  static #pushToCookies(object) {
    for (const label in object) {
      document.cookie = `${label}=${JSON.stringify(object[label])};`;
    }
  }
  static saveCookie(name, object) {
    const dict = this.getCookiesDict() || [];
    console.log(object);
    console.log(dict);
    dict[name] = [...(dict[name] || []), { ...object }];
    this.#pushToCookies(dict);
  }
  static readCookie(name) {
    return this.getCookiesDict()[name];
  }
}

export default CookieManager;
