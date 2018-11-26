"use strict";

let key = {
  keyEvent: {},
  charEvent: {},
  init: function() {
    this.cacheDom();
    this.startPrompt();
    this.bindEvents();
    this.clearCell(false);
  },
  cacheDom: function() {
    this.toggle = document.getElementsByClassName('toggle');
    
    this.keyTable = document.getElementById('keyTable');
    this.keycode = this.keyTable.querySelector('.keycode');
    this.charcode = this.keyTable.querySelector('.charcode');
    this.character = this.keyTable.querySelector('.character');
    this.shift = this.keyTable.querySelector('.shift');
    this.ctrl = this.keyTable.querySelector('.ctrl');
    this.alt = this.keyTable.querySelector('.alt');
    this.meta = this.keyTable.querySelector('.meta');

  },
  clearCell: function(del = true) {
    const tableColumns = this.keyTable.rows.length;
    const tableRows = this.keyTable.rows[0].cells.length;
    
    // loop through columns
    for (let i = 1; i < tableColumns; i++) {
      // loop through rows
      for (let x = 1; x < tableRows; x++) {
        // replace all cells with dashes
        if (del) {
         this.keyTable.rows[i].deleteCell(x);
        }
        let cells = this.keyTable.rows[i].insertCell(x);
        cells.textContent = "-";
      }
    }
  },
  updateCell: function(element, data, position) {
    element.deleteCell(position);
    
    const cell = element.insertCell(position);
    cell.textContent = data;
    
  },
  keyListener: function(action) {
    document.addEventListener(action, event => {
      // prevent TAB key from defaulting
      if (event.which === 9 || event.keyCode === 9) { 
          event.preventDefault();
      }
      // key codes - a number which represents an actual key on the keyboard
      this.keyEvent[action] = event.which || event.keyCode;
      // character code - a number that represents the unicode character of the key
      this.charEvent[action] = event.charCode;
      
      if (action === "keydown") {
        this.clearCell();
        this.toggleDisplay();
        this.render(action, 1);
      } else if (action === "keypress") {
        this.render(action, 2);
      } else if (action === "keyup") {
        this.render(action, 3);
      }
      
    });
    
  },
  bindEvents: function() {
    this.keyListener("keydown");
    this.keyListener("keypress");
    this.keyListener("keyup");
  },
  render: function(action, cellPos) {
    this.updateCell(this.keycode, this.keyEvent[action], cellPos);
    this.updateCell(this.charcode, this.charEvent[action], cellPos);
    this.updateCell(this.character, event.key, cellPos);
    this.updateCell(this.shift, event.shiftKey, cellPos);
    this.updateCell(this.ctrl, event.ctrlKey, cellPos);
    this.updateCell(this.alt, event.altKey, cellPos);
    this.updateCell(this.meta, event.metaKey, cellPos);
    
  },
  startPrompt: function () {
    this.toggle[0].style.display = "block";
  },
  toggleDisplay: function() {
    let heading = this.toggle[0].style;
    let table = this.toggle[1].style;

    if (heading.display === "block" || heading.display === "") {
      heading.display = "none";
      table.display = "block";
    }
  }
}

// initiate code
key.init();