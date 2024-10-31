// ==UserScript==
// @name         Marketplace
// @namespace    http://tampermonkey.net/
// @version      2024-10-12
// @description  try to take over the world!
// @author       You
// @match        https://realt.co/marketplace/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=realt.co
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
  
    const MIN_YIELD = 9.5;
    const QTY = 10;
  
    function addCheckout() {
      const liElements = document.querySelectorAll('li.instock:not(.reinvestment)');
  
      for (let li of liElements) {
        const spans = li.querySelectorAll('span.data.notranslate');
  
        for (let span of spans) {
          const text = span.textContent;
          const match = text.match(/^\d+(\.\d+)?%$/);
          if (match) {
            const percentage = parseFloat(match[0]);
            if (percentage > MIN_YIELD) {
              const productId = li.querySelector('button[name="add-to-cart"]').getAttribute('data-product_id');
              addToCart(productId);
            }
          }
        }
      }
    }
  
    function addToCart(productId) {
      let formData = new FormData();
      formData.append('action', 'woocommerce_ajax_add_to_cart');
      formData.append('product_id', productId);
      formData.append('quantity', QTY);
  
      fetch('/?wc-ajax=add_to_cart', {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      })
        .then(response => response.json())
        .then(data => {
          if (!data.error) {
            window.location.href = 'https://realt.co/checkout/';
            return;
          }
        });
    }
  
    addCheckout();
  })();
  