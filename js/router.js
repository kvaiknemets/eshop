import { displayProducts } from "./allProductsView.js";
import { loadProductView } from "./productView.js";
import { loadCartView } from "./cartView.js";

// Funktsioon, mis vastutab vaadete vahel liikumise eest
export const navigate = (view, param) => {
    const views = {
        category: () => displayProducts(param || "all"),
        product: () => loadProductView(param),
        cart: () => loadCartView(),
    };

    // Vali ja käivita sobiv vaade
    if (views[view]) {
        views[view]();

        // Muuda URL-i ilma lehte uuesti laadimata
        const newUrl = view === 'category' ? '/' : `/${view}/${param || ''}`;
        window.history.pushState({}, '', newUrl);
    }
};

// Sündmuse kuulaja, kui kasutaja vajutab "tagasi" või "edasi" nuppu brauseris
window.addEventListener('popstate', () => {
    const path = window.location.pathname;
    const [_, view, param] = path.split('/');
    navigate(view || 'category', param);
});