//trim the content
export const trimContent = (str, length, delim, appendix) => {
  if (str.length < length) return str;

  var trimmedStr = str.substr(0, length + delim.length);

  var lastDelimIndex = trimmedStr.lastIndexOf(delim);

  if (lastDelimIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimIndex);

  if (trimmedStr) trimmedStr += appendix;

  return trimmedStr;
}

//CART HELPERS ----------------------------------------------------------------
//add item to the localStorage
export const addItem = (item, next) => {
  //create a cart
  let cart = [];

  //make sure you have the window obj
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }

    //add item
    cart.push({
      ...item,
      count: 1,
    })    

    //we use set to avoid duplicate
    cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
      return cart.find(p => p._id === id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
}

//total items in the cart
export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }

  return 0;
}

//get the items in the cart
export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }

  return [];
}

//adjust the amount of item we have
export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    })

    localStorage.setItem("cart", JSON.stringify(cart));        
  }
}

//remove item from the cart
export const removeItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    })

    localStorage.setItem("cart", JSON.stringify(cart));        
  }
  return cart;
}

//clear the localStorage to empty the cart
export const emptyCart = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart")
    next();
  }
}

//FIXED PRICES ----------------------------------------------------------------
export const prices = [
  {
    _id: 0,
    name: "Any",
    array: []
  },
  {
    _id: 1,
    name: "$0 to $9",
    array: [0, 9]
  },
  {
    _id: 2,
    name: "$10 to $19",
    array: [10, 19]
  },
  {
    _id: 3,
    name: "$20 to $29",
    array: [20, 29]
  },
  {
    _id: 4,
    name: "$30 to $39",
    array: [30, 39]
  },
  {
    _id: 5,
    name: "More than $40",
    array: [40, 999999]
  }
]