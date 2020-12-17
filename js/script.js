/* ---------------------------------------------------
    КЛАССЫ
----------------------------------------------------- */
class CardProduct {
    #id;
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
     * @param {string} id - Идентификатор продукта.
     * @param {string} src - Путь к изображению.
     * @param {number} rating - Рейтинг продукта.
     * @param {number} price - Цена продукта.
     * @param {string} name - Название продукта.
     * @param {string} description - Описание продукта.
     * @param {string} category - Категория продукта.
     * @param {string} brand - Бренд продукта.
     */
    constructor(id ,src, rating, price, name, description, category, brand) {
        this.#id = id;
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
        div.setAttribute('data-id', this.#id);
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

    get price() {
        return this.#price;
    }
}

/* ---------------------------------------------------
    ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
----------------------------------------------------- */

// список всех товаров
let listProducts = [new CardProduct(0,
                                    'images/products/apple-watch.png', 
                                    3.4, 
                                    399, 
                                    'Apple Watch Series 4 GPS',
                                    'Redesigned from scratch and completely revised.',
                                    'iPhone Accessories',
                                    'Apple'),
                    new CardProduct(1,
                                    'images/products/jbl-speaker.png', 
                                    5.0, 
                                    199, 
                                    'JBL Speaker',
                                    'Redesigned from scratch and completely revised.',
                                    'Audio',
                                    'JBL'),
                    new CardProduct(2,
                                    'images/products/iphone-x.png', 
                                    4.4, 
                                    899, 
                                    'Apple iPhone X 128GB',
                                    'Redesigned from scratch and completely revised.',
                                    'Cell Phones',
                                    'Apple'),
                    new CardProduct(3,
                                    'images/products//beats-headphones.png', 
                                    3.4, 
                                    459, 
                                    'Beats Headphones',
                                    'Redesigned from scratch and completely revised.',
                                    'Audio',
                                    'Beats'),
                    new CardProduct(4,
                                    'images/products/macbook-pro.png', 
                                    4.5, 
                                    2499, 
                                    'Apple Macbook Pro 512GB SSD',
                                    'Redesigned from scratch and completely revised.',
                                    'Computers and Tablets',
                                    'Apple'),
                    new CardProduct(5,
                                    'images/products/ipad-pro.png', 
                                    5.0, 
                                    899, 
                                    'Apple iPad Pro 64GB',
                                    'Redesigned from scratch and completely revised.',
                                    'Computers and Tablets',
                                    'Apple'),
                    new CardProduct(6,
                                    'images/products/homepod.png', 
                                    3.3, 
                                    399, 
                                    'Apple Homepod',
                                    'Redesigned from scratch and completely revised.',
                                    'Audio',
                                    'Apple'),
                    new CardProduct(7,
                                    'images/products/jlab-audio-wireless.png', 
                                    5.0, 
                                    2499, 
                                    'JBuds Air Wireless Bluetooth',
                                    'Redesigned from scratch and completely revised.',
                                    'Audio',
                                    'JBuds'),
                    new CardProduct(8,
                                    'images/products/magic-mouse.png', 
                                    4.4, 
                                    99, 
                                    'Apple Magic Mouse ',
                                    'Redesigned from scratch and completely revised.',
                                    'Appliances',
                                    'Apple')
];

const MIN_PRICE = 0;
const MAX_PRICE = getMinMaxProductsPrice().max;

let minPriceFilter = MIN_PRICE;
let maxPriceFilter = MAX_PRICE;
let categoryFilters = new Set();
let brandFilters = new Set();
let ratingFilter;
let searchFilter;

/* ---------------------------------------------------
    ФУНКЦИИ
----------------------------------------------------- */

// создание и добавляение товаров по списку при загрузке
createAndAddDefaultProducts();

/**
 * Создает и добавляет продукты.
 * 
 */
function createAndAddDefaultProducts() {
    listProducts.forEach(product => $('#product-list').append(product.createProduct()));
}

/**
 * Обновляет фильтры товаров.
 * 
 */
function updateFilters() {
$('.product-item').hide().filter(function() {
    let self = $(this);
    let result = true;
    if (minPriceFilter != null && maxPriceFilter != null) {
        result = result && (self.data('price') >= minPriceFilter && self.data('price') <= maxPriceFilter)
    }
    if (categoryFilters.size != 0) {
        result = result && categoryFilters.has(self.data('category'));
    }
    if (brandFilters.size != 0) {
        result = result && brandFilters.has(self.data('brand'));
    }
    if (searchFilter && searchFilter !== "") {
        result = result && self.data('name').toLowerCase().indexOf(searchFilter) > -1
    }
    return result;
  }).show();
}

/**
 * Поиск минимальной и максимальной цены продуктов.
 * 
 */
function getMinMaxProductsPrice() {
    let min = listProducts[0].price;
    let max = listProducts[0].price;
    for (let i = 1; i < listProducts.length; i++) {
        if (max < listProducts[i].price) {
            max = listProducts[i].price;
        }
        if (min > listProducts[i].price) {
            min = listProducts[i].price;
        }
    }
    return {min : min, max : max};
}

/**
 * Конветрирует ценовое значение фильтра
 *
 * @param {string} value - Ценовое значение.
 */
function convertPriceFilterValue(value) {
    // Если фильтр с диапазоном
    if (value.indexOf('-') > 0) {
        minPriceFilter = +value.split('-')[0];
        maxPriceFilter = +value.split('-')[1];
    } 
    else if (value == 'All') {
        minPriceFilter = MIN_PRICE;
        maxPriceFilter = MAX_PRICE;
    }
    // Если фильтр по конкретной цене
    else {
        minPriceFilter = +value;
        maxPriceFilter = MAX_PRICE;
    }
}

/**
 * Обновление ценового диапазона слайдера (range)
 *
 */
function updatePriceSliderRange() {
    $("#slider-range").slider({
        range: true,
        values: [minPriceFilter, maxPriceFilter],
        slide: function(event, ui) {
        $("#amount").val("$" + ui.values[ 0 ] + " - $" + ui.values[1]);
        }
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
        " - $" + $("#slider-range").slider("values", 1));
}

/* ---------------------------------------------------
    СОБЫТИЯ
----------------------------------------------------- */

// событие изменения состояния radio (multi range)
$(":radio").change(function() {
    convertPriceFilterValue(this.value);
    updatePriceSliderRange();
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
    $('input[name="range"][value="All"]').prop('checked', true);
    $('.product-item').show();
    minPriceFilter = MIN_PRICE;
    maxPriceFilter = MAX_PRICE;
    searchFilter = null;
    updatePriceSliderRange();
});

// событие поиска товара по названию
$('.btn-search').click(function() {
    searchFilter = $('#search').val().toLowerCase();
    updateFilters();
});

// событие поиска товара по названию
$("#search").on("keyup", function() {
    searchFilter = $(this).val().toLowerCase();
    updateFilters();
});

// событие кнопки wish продукта
$(".btn-wish").on("click", function() {
    let icon = $(this).children('i');
    let iconColor = icon.css('color');
    if (iconColor == "rgb(33, 37, 41)") { 
        icon.css('color', 'rgb(255, 0, 0)'); 
    } else {
        icon.css('color', 'rgb(33, 37, 41)'); 
    }
});

// событие для slider
$(function() {
    $("#slider-range").slider({
      range: true,
      min: minPriceFilter,
      max: maxPriceFilter,
      values: [minPriceFilter, maxPriceFilter],
      slide: function(event, ui) {
        $("#amount").val("$" + ui.values[ 0 ] + " - $" + ui.values[1]);
      },
      stop: function( event, ui ) { 
        let rangeAll = $('input[name="range"][value="All"]');
        if (!rangeAll.is(':checked')) {
            rangeAll.prop('checked', true);
        }
        let minMaxPrice = $("#slider-range").slider("values");
        minPriceFilter = minMaxPrice[0];
        maxPriceFilter = minMaxPrice[1];
        updateFilters();
    },
    });
    $("#amount").val("$" + $("#slider-range").slider("values", 0) +
      " - $" + $("#slider-range").slider("values", 1));
});