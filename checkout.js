// ==UserScript==
// @name         Checkout
// @namespace    http://tampermonkey.net/
// @version      2024-10-12
// @description  try to take over the world!
// @author       You
// @match        https://realt.co/checkout/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=realt.co
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const intervalId = setInterval(() => {
      const blockElement = document.querySelector('.blockUI.blockOverlay');
      if (blockElement) {
        clearInterval(intervalId);
        checkBlockElement();
      }
    }, 10);
  
    function checkBlockElement() {
      const observer = new MutationObserver((mutationsList, o) => {
        selectGnosisCurrency();
      });
      observer.observe(document.getElementById('order_review'), {
        childList: true,
      });
    }
    function selectGnosisCurrency() {
      document.getElementById('terms').click();
      const chain = document.getElementById('request_network-chain');
      chain.value = 'xdai';
      chain.dispatchEvent(new Event('change'));
      const currency = document.getElementById('request_network-currency');
      currency.value = 'armmv3USDC-xdai';
      currency.dispatchEvent(new Event('change'));
      document.getElementById('place_order').click();
      console.log('OOOO commande effectuée');
    }
  }) ();
  
  