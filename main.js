const burgerSizes = {
    SIZE_LARGE: 'SIZE_LARGE',
    SIZE_SMALL: 'SIZE_SMALL'
}
const burgerStuffings = {
    STUFFING_CHEESE: 'STUFFING_CHEESE',
    STUFFING_SALAD: 'STUFFING_SALAD',
    STUFFING_POTATO: 'STUFFING_POTATO'
}

class Hamburger {

    static SIZE_LARGE = { price: 100, calories: 40 }
    static SIZE_SMALL = { price: 50, calories: 20 }
    static STUFFING_CHEESE = { price: 10, calories: 20 }
    static STUFFING_SALAD = { price: 20, calories: 5 }
    static STUFFING_POTATO = { price: 15, calories: 10 }

    constructor(size, stuffing) {
        if (!size || !stuffing) {
            throw new Error('size and stuffing should be passed ')
        }
        if (!Hamburger[size]) {
            throw new Error('size was not found')
        }
        if (!Hamburger[stuffing]) {
            throw new Error('stuffing was not found')
        }
        this.size = size;
        this.stuffing = stuffing;
    }

    calculatePrice() {
        const price = Hamburger[this.size].price + Hamburger[this.stuffing].price
        return price
    }

    calculateCalories() {
        const calories = Hamburger[this.size].calories + Hamburger[this.stuffing].calories
        return calories
    }
}

const saladTypes = {
    TYPE_CAESAR: 'TYPE_CAESAR',
    TYPE_OLIVIE: 'TYPE_OLIVIE'
}

class Salad {
    static TYPE_CAESAR = { price: 100, calories: 20 }
    static TYPE_OLIVIE = { price: 50, calories: 80 }

    constructor(salad) {
        if (!salad) {
            throw new Error('salad should be passed')
        }
        if (!Salad[salad]) {
            throw new Error('salad was not found')
        }
        this.salad = salad
    }

    calculatePrice() {
        const price = Salad[this.salad].price
        return price
    }

    calculateCalories() {
        const calories = Salad[this.salad].calories
        return calories
    }


}

const drinkTypes = {
    TYPE_COLA: 'TYPE_COLA',
    TYPE_COFFEE: 'TYPE_COFFEE'
}

class Drink {

    static TYPE_COLA = { price: 50, calories: 40 }
    static TYPE_COFFEE = { price: 80, calories: 20 }

    constructor(drink) {
        if (!drink) {
            throw new Error('drink should be passed')
        }
        if (!Drink[drink]) {
            throw new Error('drink was not found')
        }
        this.drink = drink
    }

    calculatePrice() {
        const price = Drink[this.drink].price
        return price
    }

    calculateCalories() {
        const calories = Drink[this.drink].calories
        return calories
    }

}

class Cart {
    constructor(ordersInstance) {
        this.items = []
        this.orders = ordersInstance
    }

    add(item) {
        const objIndex = this.items.findIndex((obj) => {
            return obj.food === item
        })
        if (objIndex === -1) {
            this.items = [...this.items, { food: item, amount: 1 }]
        }
        else {
            this.items = this.items.map((el) => {
                if (item === el.food) {
                    return { ...el, amount: el.amount + 1 }
                }
                return el
            })
        }
    }

    remove(item) {
        const objIndex = this.items.findIndex((obj) => {
            return obj.food === item
        })
        this.items = this.items.map((el) => {
            if (el.food === item) {
                return { ...el, amount: el.amount - 1 }
            } return el
        }).filter(el => el.amount > 0)
    }

    clear() {
        this.items = []
    }

    calculateTotalPrice() {
        return this.items.reduce((acc, item) => {
            return acc + item.food.calculatePrice() * item.amount
        }, 0)
    }

    calculateTotalCalories() {
        return this.items.reduce((acc, item) => {
            return acc + item.food.calculateCalories() * item.amount
        }, 0)
    }

    createOrder() {
        this.orders.create(this.items)
        this.clear()
    }
}

class Orders {
    constructor() {
        this.items = []
    }

    create(items) {
        this.items = [...this.items, { order: items }]
    }
}

const orders = new Orders()
const cart = new Cart(orders)

const largeBurgerCheese = new Hamburger(burgerSizes.SIZE_LARGE, burgerStuffings.STUFFING_CHEESE)
const largeBurgerPotato = new Hamburger(burgerSizes.SIZE_LARGE, burgerStuffings.STUFFING_POTATO)
const largeBurgerSalad = new Hamburger(burgerSizes.SIZE_LARGE, burgerStuffings.STUFFING_SALAD)
const smallBurgerCheese = new Hamburger(burgerSizes.SIZE_SMALL, burgerStuffings.STUFFING_CHEESE)
const smallBurgerPotato = new Hamburger(burgerSizes.SIZE_SMALL, burgerStuffings.STUFFING_POTATO)
const smallBurgerSalad = new Hamburger(burgerSizes.SIZE_SMALL, burgerStuffings.STUFFING_SALAD)
const caesar = new Salad(saladTypes.TYPE_CAESAR)
const olivie = new Salad(saladTypes.TYPE_OLIVIE)
const cola = new Drink(drinkTypes.TYPE_COLA)
const coffee = new Drink(drinkTypes.TYPE_COFFEE)

// console.log(caesar.calculatePrice());

//adding positions 
cart.add(smallBurgerPotato)
cart.add(largeBurgerSalad)
cart.add(caesar)
cart.add(caesar)

console.log(cart.items)

//remove positions 
cart.remove(smallBurgerPotato)
cart.remove(caesar)

console.log(cart.items);

// calculating total price and calories
console.log(cart.calculateTotalCalories());
console.log(cart.calculateTotalPrice());

//creating order
cart.createOrder()

console.log(orders.items[0])





