import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    
    //Skapa lista / radera lista
    DOM.$createListButton = $('button#add-list'); //Skapar listan med valt namn
    DOM.$deleteListButton = $('.list-header > button.delete');

    //Skapa kort / radera kort
    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() {}
function createDialogs() {}
  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {

    //Skapa lista / radera lista
    DOM.$board.on('click', 'button#new-list', createList);
    DOM.$board.on('click', '.list-header > button.delete', deleteList);
    //Skapa kort / radera kort
    DOM.$board.on('submit', 'form.new-card', createCard);
    DOM.$board.on('click', '.card > button.delete', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    console.log("This should create a new list");

    $('.column:last')
      .before(`
    <div class="column">
      <div class="list">
          <div class="list-header">
              Doing
              <button class="button delete">X</button>
          </div>
          <ul class="list-cards">
              <li class="card">
                  Card #2
                  <button class="button delete">X</button>
              </li>
              <li class="add-new">
                  <form class="new-card" action="index.html">
                      <input type="text" name="title" placeholder="Please name the card" />
                      <button class="button add">Add new card</button>
                  </form>
              </li>
          </ul>
      </div>
    </div>`);

  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
    $(this).closest('.list').remove();
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    console.log("This should create a new card");

    let cardInput = $(this).find('input');
    let newCard = cardInput.val();

    $(this)
      .closest('.add-new')
        .append()
          .before('<li class="card">' + newCard + '<button class="button delete">X</button></li>');

    $(this)
      .parent()
        .prev()
          .find('button.delete')
            .click(deleteCard);

      $(this).find('input').val('');
  }

  function deleteCard() {
    console.log("This should delete the card you clicked on");
    
    $(this).closest('.card').remove();
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ÄPPLE ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();

    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
