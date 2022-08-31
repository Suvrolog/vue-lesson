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
        loadItem({ commit, state }) {
            if (JSON.parse(localStorage.getItem("listBasket") != null)) state.listBasket = JSON.parse(localStorage.getItem("listBasket"))
            axios
                .get("https://fakestoreapi.com/products")
                .then((response) => {
                    commit("getItem", response.data)
                })
                .catch((error) => console.log(error));
        },
    },
    mutations: {
        
        getItem(state, payload) {
            state.itemList = payload;
            localStorage.setItem("itemList", JSON.stringify(state.itemList))
        },
        buyItem(state, product) {
            state.listBasket.push(product);
            localStorage.setItem("listBasket", JSON.stringify(state.listBasket));

        },
        delItem(state, product) {
            let flag = true;
            //localStorage.removeItem("listBasket", JSON.stringify(state.listBasket));
            state.listBasket = state.listBasket.filter(item => {
                if (flag && item.id === product.id) {

                    flag = false;
                    return false;
                }
                return true;
            });
            localStorage.removeItem("listBasket");
            localStorage.setItem("listBasket", JSON.stringify(state.listBasket))
            // let del = JSON.stringify(product)



            // console.log(del)
            // localStorage.removeItem(del);

            // var listBasket = JSON.parse(localStorage.listBasket);
            // for (var i = 0; i < listBasket.length; i++) {
            //     if (listBasket[i].storeNumber === del) {
            //         listBasket.splice(i, 1);
            //     }
            // }
            // localStorage.listBasket = JSON.stringify(listBasket);
        },



    },
    getters: {
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
    }

})

export default store