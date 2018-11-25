"use strict";

let key = {
  keyEvent: {},
  charEvent: {},
  init: function() {
    this.cacheDom();
    this.bindEvents();
    this.clearCell(false);
  },
  cacheDom: function() {
    this.keyTable = document.getElementById('keyTable');
    this.keycode = this.keyTable.querySelector('.keycode');
    this.charcode = this.keyTable.querySelector('.charcode');
    this.character = this.keyTable.querySelector('.character');
    this.shift = this.keyTable.querySelector('.shift');
    this.ctrl = this.keyTable.querySelector('.ctrl');
    this.alt = this.keyTable.querySelector('.alt');
    this.meta = this.keyTable.querySelector('.meta');
    
    this.toggle = document.getElementsByClassName('toggle');

  },
  clearCell: function(del = true) {
    const tableColumns = this.keyTable.rows.length;
    const tableRows = this.keyTable.rows[0].cells.length;
    
    // loop through columns
    for (let i = 1; i < tableColumns; i++) {
      // loop through rows
      for (let x = 1; x < tableRows; x++) {
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
      
      this.keyEvent[action] = event.which || event.keyCode;
      this.charEvent[action] = event.charCode;
      
      
      if (action === "keydown") {
        this.clearCell();
        this.toggleDisplay();
        
        const cellPos = 1;
        this.updateCell(this.keycode, this.keyEvent["keydown"], cellPos);
        this.updateCell(this.charcode, this.charEvent["keydown"], cellPos);
        this.updateCell(this.character, event.key, cellPos);
        this.updateCell(this.shift, event.shiftKey, cellPos);
        this.updateCell(this.ctrl, event.ctrlKey, cellPos);
        this.updateCell(this.alt, event.altKey, cellPos);
        this.updateCell(this.meta, event.metaKey, cellPos);          
        
      } else if (action === "keypress") {
        const cellPos = 2;
        
        this.updateCell(this.keycode, this.keyEvent["keypress"], cellPos);
        this.updateCell(this.charcode, this.charEvent["keypress"], cellPos);
        
        const keypressCell = this.keycode.cells[cellPos].textContent;
        const char = String.fromCharCode(keypressCell);
        this.updateCell(this.character, char, cellPos);
        
        this.updateCell(this.shift, event.shiftKey, cellPos);
        this.updateCell(this.ctrl, event.ctrlKey, cellPos);
        this.updateCell(this.alt, event.altKey, cellPos);
        this.updateCell(this.meta, event.metaKey, cellPos);
        
      } else if (action === "keyup") {
        const cellPos = 3;
        
        this.updateCell(this.keycode, this.keyEvent["keyup"], cellPos);
        this.updateCell(this.charcode, this.charEvent["keyup"], cellPos);
        this.updateCell(this.character, event.key, cellPos);
        this.updateCell(this.shift, event.shiftKey, cellPos);
        this.updateCell(this.ctrl, event.ctrlKey, cellPos);
        this.updateCell(this.alt, event.altKey, cellPos);
        this.updateCell(this.meta, event.metaKey, cellPos);
        
      }
      
    });
    
  },
  bindEvents: function() {
    // hides table
    this.toggle[1].style.display = "none";
    
    this.keyListener("keydown");
    this.keyListener("keypress");
    this.keyListener("keyup");

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