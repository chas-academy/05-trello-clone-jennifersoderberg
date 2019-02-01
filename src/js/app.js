import $ from 'jquery';
import sortable from 'jquery-ui/ui/widgets/sortable';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function ($, sortable) {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');

    //Skapa lista / radera lista
    DOM.$listDialog = $('button#new-list'); //skapar dialogruta och skapar ny lista
    DOM.$deleteListButton = $('.list-header > button.delete');
    //Skapa kort / radera kort
    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() { }

  function createDialogs() {
    //DIALOG FÖR ADD NEW LIST BUTTON
    $("#list-creation-dialog").dialog({
      autoOpen: false,
    });

    $("#new-list").click(function () {
      $("#list-creation-dialog").dialog("open");
    });

    $("#list-creation-dialog").dialog({
      buttons: [
        {
          text: "Create list",
          click: function () {
            createList();
            $("#list-creation-dialog").dialog("close");
          }
        }
      ]
    });
  }

  function createSortable() {
    //kortet
    $('.list-cards').sortable({ connectWith: '.list-cards' });
    //listan
    $('.board').sortable({ connectWith: '.column' });

  }
  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    //Skapa lista / radera lista
    DOM.$board.on('click', 'button#new-list', createDialogs);
    DOM.$board.on('click', '.list-header > button.delete', deleteList);
    //Skapa kort / radera kort
    DOM.$board.on('submit', 'form.new-card', createCard);
    DOM.$board.on('click', '.card > button.delete', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();

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
    $(this).closest('.list').remove();
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();

    let cardInput = $(this).find('input');
    let newCard = cardInput.val();

    $(this)
      .closest('.add-new')
      .append()
      .before(`<li class="card"> ${newCard} <button class="button delete">X</button></li>`);

    $(this)
      .parent()
      .prev()
      .find('button.delete')
      .click(deleteCard);

    $(this).find('input').val('');
  }

  function deleteCard() {
    $(this).closest('.card').remove();
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();
    createSortable();

    bindEvents();
  }

  // All kod här
  return {
    init: init
  };
})($, sortable);

//usage
$("document").ready(function () {
  jtrello.init();
});
