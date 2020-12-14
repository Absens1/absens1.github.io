class CardProduct {

    #src;
    #rating;
    #price;
    #name;
    #description;
    #category;
    #brand;

    /**
     * Создает экземпляр CardProduct.
     *
     * @constructor
     * @this  {CardProduct}
     * @param {string} src - Путь к изображению.
     * @param {number} rating - Рейтинг продукта.
     * @param {number} price - Цена продукта.
     * @param {string} name - Название продукта.
     * @param {string} description - Описание продукта.
     * @param {string} category - Категория продукта.
     * @param {string} brand - Бренд продукта.
     */
    constructor(src, rating, price, name, description, category, brand) {
        this.#src = src;
        this.#rating = rating;
        this.#price = price;
        this.#name = name;
        this.#description = description;
        this.#category = category;
        this.#brand = brand;
    }

    /**
     * Создает новый продукт.
     *
     * @return {div} Блочный элемент.
     */
    createProduct() {
        let div = document.createElement('div');
        div.classList.add('col-md-4', 'product-item');
        div.setAttribute('data-rating', this.#category);
        div.setAttribute('data-price', this.#price);
        div.setAttribute('data-name', this.#name);
        div.setAttribute('data-category', this.#category);
        div.setAttribute('data-brand', this.#brand);
        div.innerHTML = `
        <div class="product">
            <img src="${this.#src}" class="product-img">
            <div class="test">
                <div class="product-info">
                    <button class="btn btn-primary btn-rating">${this.#rating} <span class="far fa-star"></span></button>
                    <span class="price">$${this.#price}</span>
                    <p class="product-name">${this.#name}</p>
                    <span class="product-description">${this.#description}</span>
                </div>
                <div class="str">
                    <button class="btn btn-wish btn-light left"><i class="far fa-heart"></i> WISHLIST</button>
                    <button class="btn btn-primary btn-add right"><i class="fas fa-shopping-bag"></i> ADD TO CART</button>
                </div>
            </div>
        </div>`;
        return div;
    }
}


// список всех товаров
let listProducts = [new CardProduct('images/products/apple-watch.png', 
                                    3.4, 
                                    399, 
                                    'Apple Watch Series 4 GPS',
                                    'Redesigned from scratch and completely revised.',
                                    'iPhone Accessories',
                                    'Apple'),
                    new CardProduct('images/products/jbl-speaker.png', 
                                    5.0, 
                                    199, 
                                    'JBL Speaker',
                                    'Redesigned from scratch and completely revised.',
                                    'Audio',
                                    'JBL'),
                    new CardProduct('images/products/iphone-x.png', 
                                    4.4, 
                                    899, 
                                    'Apple iPhone X 128GB',
                                    'Redesigned from scratch and completely revised.',
                                    'Cell Phones',
                                    'Apple'),
                    new CardProduct('images/products//beats-headphones.png', 
                                    3.4, 
                                    459, 
                                    'Beats Headphones',
                                    'Redesigned from scratch and completely revised.',
                                    'Audio',
                                    'Beats'),
                    new CardProduct('images/products/macbook-pro.png', 
                                    4.5, 
                                    2499, 
                                    'Apple Macbook Pro 512GB SSD',
                                    'Redesigned from scratch and completely revised.',
                                    'Computers and Tablets',
                                    'Apple'),
                    new CardProduct('images/products/ipad-pro.png', 
                                    5.0, 
                                    899, 
                                    'Apple iPad Pro 64GB',
                                    'Redesigned from scratch and completely revised.',
                                    'Computers and Tablets',
                                    'Apple'),
                    new CardProduct('images/products/homepod.png', 
                                    3.3, 
                                    399, 
                                    'Apple Homepod',
                                    'Redesigned from scratch and completely revised.',
                                    'Audio',
                                    'Apple'),
                    new CardProduct('images/products/jlab-audio-wireless.png', 
                                    5.0, 
                                    2499, 
                                    'JBuds Air Wireless Bluetooth',
                                    'Redesigned from scratch and completely revised.',
                                    'Audio',
                                    'JBuds'),
                    new CardProduct('images/products/magic-mouse.png', 
                                    4.4, 
                                    99, 
                                    'Apple Magic Mouse ',
                                    'Redesigned from scratch and completely revised.',
                                    'Appliances',
                                    'Apple')
];
// создание и добавляение товаров по списку при загрузке
addDefaultProducts();
// функция добаяления товаров по умолчанию (без фильтов)
function addDefaultProducts() {
    listProducts.forEach(product => $('#product-list').append(product.createProduct()));
}

let priceFilter;
let categoryFilters = new Set();
let brandFilters = new Set();
let ratingFilter;

/**
 * Обновляет фильтры товаров.
 * 
 */
function updateFilters() {
$('.product-item').hide().filter(function() {
    let self = $(this);
    let result = true;
    if (priceFilter != null && priceFilter !='All') {
      result = result && (self.data('price') >= convertPriceFilterValue(priceFilter).min && 
                          self.data('price') <= convertPriceFilterValue(priceFilter).max)
    }
    if (categoryFilters.size != 0) {
        result = result && categoryFilters.has(self.data('category'));
    }
    if (brandFilters.size != 0) {
        result = result && brandFilters.has(self.data('brand'));
    }
    return result;
  }).show();
}

/**
 * Конветрирует ценовое значение фильтра
 *
 * @param {string} value - Ценовое значение (диапазон).
 * @return {Collection} Минимальная и максимальная цена (key:value).
 */
function convertPriceFilterValue(value) {
    let min = 0;
    let max = 0;
    // Если фильтр с диапазоном
    if (value.indexOf('-') > 0) {
         min = +value.split('-')[0];
         max = +value.split('-')[1];
    } 
    // Если фильтр по конкретной цене
    else {
        min = +value;
        max = 999999999;
    }
    return {min : min, max : max};
}

// событие изменения состояния radio (multi range)
$(":radio").change(function() {
    if ($(this).is(':checked')) {
        priceFilter = this.value;
    } else { priceFilter = null; }
    updateFilters();
});
// событие изменения состояния checkbox (categoty/brand)
$(":checkbox").change(function() {
    if (this.name == 'brand') {
        if ($(this).is(':checked')) { 
            brandFilters.add(this.id);
        } else {
            brandFilters.delete(this.id);
        }
    } else if (this.name == 'category') {
        if ($(this).is(':checked')) { 
            categoryFilters.add(this.value);
        } else {
            categoryFilters.delete(this.value);
        }      
    }
    updateFilters();
});

// событие сброса фильтров
$('.btn-clear').click(function() {
    $('input:checkbox').prop('checked', false);
    $('.product-item').show();
});