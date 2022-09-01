import axios from "axios";
import { createStore } from 'vuex'
const store = createStore({
    // strict: true,
    state() {
        return {
            listBasket: [],
            itemList: '',
            id: '',
            title: '',
            price: '',
            category: '',
            description: '',
            image: '',
            showProductsPosition: 0,
        }
    },
    actions: {
        loadItem({ commit }) {

            axios
                .get("https://fakestoreapi.com/products")
                .then((response) => {
                    commit("getItem", response.data)
                })
                .catch((error) => console.log(error));
        },

    },
    mutations: {

        loadPages(state) {
            if (JSON.parse(localStorage.getItem("listBasket") != null)) state.listBasket = JSON.parse(localStorage.getItem("listBasket"))
            if (JSON.parse(localStorage.getItem("itemList") != null)) state.itemList = JSON.parse(localStorage.getItem("itemList"))
        },
        getItem(state, payload) {
            if (JSON.parse(localStorage.getItem("listBasket") != null)) state.listBasket = JSON.parse(localStorage.getItem("listBasket"))
            state.itemList = payload;
            localStorage.setItem("itemList", JSON.stringify(state.itemList))
        },
        buyItem(state, product) {
            state.listBasket.push(product);
            localStorage.setItem("listBasket", JSON.stringify(state.listBasket));

        },
        delItem(state, product) {
            let flag = true;
            state.listBasket = state.listBasket.filter(item => {
                if (flag && item.id === product.id) {

                    flag = false;
                    return false;
                }
                return true;
            });
            localStorage.removeItem("listBasket");
            localStorage.setItem("listBasket", JSON.stringify(state.listBasket))
        },



    },
    getters: {
        getCount(state) {
            return state.listBasket.length;
        },
        itemMen(state) {
            return state.itemList.filter((item) => item.category == "men's clothing");
        },
        itemJewelery(state) {
            return state.itemList.filter((item) => item.category == "jewelery");
        },
        itemElectronics(state) {
            return state.itemList.filter((item) => item.category == "electronics");
        },
        itemWomen(state) {
            return state.itemList.filter((item) => item.category == "women's clothing");
        },
        itemAll(state) {
            return state.itemList;
        },
    },
    

})

export default store