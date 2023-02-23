// Предупреждение при загрузке
const startWarning = document.querySelector('.start-warning');
const startWarningText = document.querySelector('#id-start-warning-text');
const btnCloseStartWarning = document.querySelector('.btn-close-start-warning');
const btnStopStartWarning = document.querySelector('.btn-stop-start-warning');

const isWarningOutput = sessionStorage.getItem('isWarningOutput');

if (isWarningOutput === 'true') {
  startWarning.classList.add('close-box-massage-warning')
}

setTimeout(() => {
  startWarningText.classList.add('opacity1')
}, 2500);

const funCloseStartWarning = () => {
  startWarning.classList.add('close-box-massage-warning')
}

const funStopStartWarning = () => {
  sessionStorage.setItem('isWarningOutput', true);
}

startWarning.addEventListener('click', funCloseStartWarning)
btnStopStartWarning.addEventListener('click', funStopStartWarning)

// Предупреждение разрешение >900px
if (innerWidth < 900) {
  const warningBlock = document.querySelector('#id-box-warning');
  const btnCloseWarning = document.querySelector('.btn-close-warning');

  function removeAndAddClass(node, removeHtmlClass, addHtmlClass) {
    node.classList.remove(removeHtmlClass);
    node.classList.add(addHtmlClass);
  }

  removeAndAddClass(warningBlock, 'close-box-massage-warning', 'show-box-massage-warning');

  btnCloseWarning.addEventListener(
    'click', () => {
      removeAndAddClass(
        warningBlock,
        'show-box-massage-warning',
        'close-box-massage-warning')
    })
}

// Поле игрока
const userTable = document.createElement('table');
userTable.classList.add('user-table');

for (let y = 0; y < 10; y++) {
  const tr = document.createElement('tr');
  tr.dataset.y = y + 1;

  for (let x = 0; x < 10; x++) {
    const td = document.createElement('td');
    td.classList.add('field-td');
    td.dataset.x = x + 1;
    td.dataset.y = y + 1;

    tr.append(td);
  }

  userTable.append(tr);
}

// Блок сообщений
const textMassages = document.querySelector('.text-massages-help');

/* Поле компьютера */
const compField = document.querySelector('.comp-field');
const compTable = userTable.cloneNode(true);
compTable.classList.remove('user-table');
compTable.classList.add('comp-table');
compField.append(compTable);

/* Drag and drop */
const ships = document.querySelectorAll('.ship');
const userField = document.querySelector('.user-field');
const hangarShips = document.querySelector('.hangar-ships');

let shipDrag; //@перетягиваемый корабль

// Добавление классов коробя
function addClassShipLocations(ship, n) {
  let dataX = +prevTd.dataset.x;
  let dataY = +prevTd.dataset.y;

  if (ship.classList.contains('reverse')) {
    for (let i = 0; i < n; i++) {
      userField.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`).classList.add('deployment-ships', 'combat-ready-deck', 'horizontally')
    }
  }
  if (!ship.classList.contains('reverse')) {
    for (let i = 0; i < n; i++) {
      userField.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`).classList.add('deployment-ships', 'combat-ready-deck', 'vertically');
    }
  }
}

// Начало перетягивания
function startDragShip(event) {
  shipDrag = event.target;
  setTimeout(() => {
    shipDrag.classList.add('drag');
  }, 0);
}

function endDragShip(event) {
  event.target.classList.remove('drag');
}

let prevTd; //@ предыдущая ячейка 

function shipOverField(event) {
  userField.classList.add('hover-user-field');
  if (event.target.dataset.x) {
    event.target.classList.add('hover-field-td');
  }
  if (prevTd) {
    prevTd.classList.remove('hover-field-td');
  }

  prevTd = event.target; //@ смена яичники 
  //console.log(prevTd);
}

function dropAllowed(event) {
  event.preventDefault();
}

//@ сброс кораля
function dropShip(event) {
  userField.classList.remove('hover-user-field');
  let cellDropShip = event.target;
  cellDropShip.classList.remove('hover-field-td');

  let dataX = +cellDropShip.dataset.x;
  let dataY = +cellDropShip.dataset.y;

  function checkingLocationAndDropShip(shipDrag, deck, limiter) {
    if (shipDrag.classList.contains('reverse')) {
      for (let i = -1; i <= deck; i++) {
        if (userField.querySelector(`[data-x="${dataX + i}"][data-y="${dataY - 1}"]`) && userField.querySelector(`[data-x="${dataX + i}"][data-y="${dataY - 1}"]`).classList.contains('deployment-ships')) {
          return false;
        }
        if (userField.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`) && userField.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`).classList.contains('deployment-ships')) {
          return false;
        }
        if (userField.querySelector(`[data-x="${dataX + i}"][data-y="${dataY + 1}"]`) && userField.querySelector(`[data-x="${dataX + i}"][data-y="${dataY + 1}"]`).classList.contains('deployment-ships')) {
          return false;
        }
      }
      if (dataX > limiter) {
        return false;
      }
    }
    if (!shipDrag.classList.contains('reverse')) {
      for (let i = -1; i <= deck; i++) {
        if (userField.querySelector(`[data-x="${dataX - 1}"][data-y="${dataY + i}"]`) && userField.querySelector(`[data-x="${dataX - 1}"][data-y="${dataY + i}"]`).classList.contains('deployment-ships')) {
          return false;
        }
        if (userField.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`) && userField.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`).classList.contains('deployment-ships')) {
          return false;
        }
        if (userField.querySelector(`[data-x="${dataX + 1}"][data-y="${dataY + i}"]`) && userField.querySelector(`[data-x="${dataX + 1}"][data-y="${dataY + i}"]`).classList.contains('deployment-ships')) {
          return false;
        }
        if (dataY > limiter) {
          return false;
        }
      }
    }
    cellDropShip.append(shipDrag);
    addClassShipLocations(shipDrag, deck);
  }

  if (shipDrag.classList.contains('four-deck')) {
    checkingLocationAndDropShip(shipDrag, 4, 7)
  }
  if (shipDrag.classList.contains('three-deck')) {
    checkingLocationAndDropShip(shipDrag, 3, 8)
  }
  if (shipDrag.classList.contains('two-deck')) {
    checkingLocationAndDropShip(shipDrag, 2, 9)
  }
  if (shipDrag.classList.contains('one-deck')) {
    checkingLocationAndDropShip(shipDrag, 1, 10)
  }

  cellDropShip.removeChild(cellDropShip.firstElementChild);

  let countingShipsLaunch = userField.querySelectorAll('.deployment-ships');
  if (countingShipsLaunch.length === 20) {
    btnStartBattle.disabled = false;
    btnStartBattle.classList.remove('btn-disabled');
    textMassages.innerText = 'Если вас устраивает расстановка кораблей, то нажмите на кнопу <начать сражение>. Если нет, то нажмите на кнопку <авто расстановка> ещё раз.';
  }
}

ships.forEach(ship => {
  ship.addEventListener('dragstart', startDragShip);
  ship.addEventListener('dragend', endDragShip);
})

/* Поворот корабля */
ships.forEach(ship => {

  ship.addEventListener('dblclick', () => {
    if (ship.classList.contains('four-deck')) {
      ship.classList.toggle('reverse-four-deck');
      ship.classList.toggle('reverse');
    }
    if (ship.classList.contains('three-deck')) {
      ship.classList.toggle('reverse-three-deck');
      ship.classList.toggle('reverse');
    }
    if (ship.classList.contains('two-deck')) {
      ship.classList.toggle('reverse-two-deck');
      ship.classList.toggle('reverse');
    }
  })
})

userField.addEventListener('dragenter', shipOverField);
userField.addEventListener('dragover', dropAllowed);
userField.addEventListener('drop', dropShip);

userField.append(userTable);

// Рандомная растасовку
const btnRandom = document.querySelector('.btn__random');

function randomNumbers(max) {
  return Math.floor((Math.random() * max) + 1)
}

function random(field, numberDecks, horizontallyY, horizontallyX, verticallyY, verticallyX, decks) {
  textMassages.innerText = 'Если вас устраивает расстановка кораблей, то нажмите на кнопу <начать сражение>. Если нет, то нажмите на кнопку <авто расстановка> ещё раз.';

  let horizontallyVertically = Math.floor(Math.random() * 2);

  if (horizontallyVertically === 0) {

    while (numberDecks > 0) {
      let dataY = randomNumbers(horizontallyY);
      let dataX = randomNumbers(horizontallyX);

      for (let i = -1; i <= decks; i++) {
        if (field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY - 1}"]`) && field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY - 1}"]`).classList.contains('deployment-ships')) {
          dataY = randomNumbers(horizontallyY);
          dataX = randomNumbers(horizontallyX);
          i = -2;

          continue;
        }
        if (field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`) && field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`).classList.contains('deployment-ships')) {
          dataY = randomNumbers(horizontallyY);
          dataX = randomNumbers(horizontallyX);
          i = -2;

          continue;
        }
        if (field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY + 1}"]`) && field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY + 1}"]`).classList.contains('deployment-ships')) {
          dataY = randomNumbers(horizontallyY);
          dataX = randomNumbers(horizontallyX);
          i = -2;

          continue;
        }
      }

      for (let i = 0; i < decks; i++) {
        field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`).classList.add('deployment-ships', 'combat-ready-deck', 'horizontally');
      }
      numberDecks--
    }
  }

  if (horizontallyVertically === 1) {

    let dataY = randomNumbers(verticallyY);
    let dataX = randomNumbers(verticallyX);

    while (numberDecks > 0) {

      for (let i = -1; i <= decks; i++) {
        if (field.querySelector(`[data-x="${dataX + 1}"][data-y="${dataY + i}"]`) && field.querySelector(`[data-x="${dataX + 1}"][data-y="${dataY + i}"]`).classList.contains('deployment-ships')) {
          dataY = randomNumbers(verticallyY);
          dataX = randomNumbers(verticallyX);
          i = -2;

          continue;
        }
        if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`) && field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`).classList.contains('deployment-ships')) {
          dataY = randomNumbers(verticallyY);
          dataX = randomNumbers(verticallyX);
          i = -2;

          continue;
        }
        if (field.querySelector(`[data-x="${dataX - 1}"][data-y="${dataY + i}"]`) && field.querySelector(`[data-x="${dataX - 1}"][data-y="${dataY + i}"]`).classList.contains('deployment-ships')) {
          dataY = randomNumbers(verticallyY);
          dataX = randomNumbers(verticallyX);
          i = -2;

          continue;
        }
      }
      for (let i = 0; i < decks; i++) {
        field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`).classList.add('deployment-ships', 'combat-ready-deck', 'vertically');
      }
      numberDecks--
    }
  }
}

// Рандомная расстановка user

function clearingField(field) {
  const tdAllField = field.querySelectorAll('td');
  tdAllField.forEach(td => td.className = 'field-td');
}

function startRandom() {
  clearingField(userField);

  random(userField, 1, 10, 7, 7, 10, 4);
  random(userField, 2, 10, 8, 8, 10, 3);
  random(userField, 3, 10, 9, 9, 10, 2);
  random(userField, 4, 10, 10, 10, 10, 1);

  const bigShipsHangar = document.querySelector('.big-ships');
  const smallShipsHangar = document.querySelector('.small-ships');
  bigShipsHangar.innerHTML = '';
  smallShipsHangar.innerHTML = '';

  btnStartBattle.disabled = false;
  btnStartBattle.classList.remove('btn-disabled');
}

// Рандомная расстановка comp и начало сражения
function hitCheck(field, dataX, dataY) {
  field.querySelector(`[data-x="${dataX}"][data-y="${dataY}"]`).classList.remove('combat-ready-deck')

  let combatReadyDeckShip = 0;

  if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY}"]`).classList.contains('horizontally')) {
    for (let i = 1; i < 4; i++) {
      if (field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`) && field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`).classList.contains('deployment-ships')) {
        if (field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`).classList.contains('combat-ready-deck')) {
          combatReadyDeckShip++;
        }
      }
      if (!field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`)) {
        break;
      }
      if (!field.querySelector(`[data-x="${dataX + i}"][data-y="${dataY}"]`).classList.contains('deployment-ships')) {
        break;
      }
    }
    for (let i = 1; i < 4; i++) {
      if (field.querySelector(`[data-x="${dataX - i}"][data-y="${dataY}"]`) && field.querySelector(`[data-x="${dataX - i}"][data-y="${dataY}"]`).classList.contains('deployment-ships')) {
        if (field.querySelector(`[data-x="${dataX - i}"][data-y="${dataY}"]`).classList.contains('combat-ready-deck')) {
          combatReadyDeckShip++;
        }
      }
      if (!field.querySelector(`[data-x="${dataX - i}"][data-y="${dataY}"]`)) {
        break;
      }
      if (!field.querySelector(`[data-x="${dataX - i}"][data-y="${dataY}"]`).classList.contains('deployment-ships')) {
        break;
      }
    }
  }
  if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY}"]`).classList.contains('vertically')) {
    for (let i = 1; i < 4; i++) {
      if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`) && field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`).classList.contains('deployment-ships')) {
        if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`).classList.contains('combat-ready-deck')) {
          combatReadyDeckShip++;
        }
      }
      if (!field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`)) {
        break;
      }
      if (!field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i}"]`).classList.contains('deployment-ships')) {
        break;
      }
    }
    for (let i = 1; i < 4; i++) {
      if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY - i}"]`) && field.querySelector(`[data-x="${dataX}"][data-y="${dataY - i}"]`).classList.contains('deployment-ships')) {
        if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY - i}"]`).classList.contains('combat-ready-deck')) {
          combatReadyDeckShip++;
        }
      }
      if (!field.querySelector(`[data-x="${dataX}"][data-y="${dataY - i}"]`)) {
        break;
      }
      if (!field.querySelector(`[data-x="${dataX}"][data-y="${dataY - i}"]`).classList.contains('deployment-ships')) {
        break;
      }
    }
  }

  function fieldDefinition(incomingField) {
    if (incomingField.classList.contains('comp-field')) {
      return 'Игрок'
    }
    else if (incomingField.classList.contains('user-field')) {
      return 'Компьютер'
    }
  }

  if (combatReadyDeckShip > 0) {
    textMassages.innerText = `Попадание! ${fieldDefinition(field)} ходит ещё раз`
    fieldDefinition(field)
  }
  if (combatReadyDeckShip === 0) {
    fieldDefinition(field)
    textMassages.innerText = `Попадание! Корабль, потоплен. ${fieldDefinition(field)} ходит ещё раз`;

    function verticalBlindSpot(field, dataX, dataY, n) {
      for (let i = 0; i <= 4; i++) {
        if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i * n}"]`) && field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i * n}"]`).classList.contains('deployment-ships')) {
          if (field.querySelector(`[data-x="${dataX + 1}"][data-y="${dataY + i * n}"]`)) {
            field.querySelector(`[data-x="${dataX + 1}"][data-y="${dataY + i * n}"]`).classList.add('none-hit')
          }
          if (field.querySelector(`[data-x="${dataX - 1}"][data-y="${dataY + i * n}"]`)) {
            field.querySelector(`[data-x="${dataX - 1}"][data-y="${dataY + i * n}"]`).classList.add('none-hit')
          }
        }
        if (!field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i * n}"]`)) {
          break;
        }
        if (!field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i * n}"]`).classList.contains('deployment-ships')) {
          if (field.querySelector(`[data-x="${dataX + 1}"][data-y="${dataY + i * n}"]`)) {
            field.querySelector(`[data-x="${dataX + 1}"][data-y="${dataY + i * n}"]`).classList.add('none-hit')
          }
          if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i * n}"]`)) {
            field.querySelector(`[data-x="${dataX}"][data-y="${dataY + i * n}"]`).classList.add('none-hit')
          }
          if (field.querySelector(`[data-x="${dataX - 1}"][data-y="${dataY + i * n}"]`)) {
            field.querySelector(`[data-x="${dataX - 1}"][data-y="${dataY + i * n}"]`).classList.add('none-hit')
          }
          break;
        }
      }
    }

    function horizontalBlindSpot(field, dataX, dataY, n) {
      for (let i = 0; i <= 4; i++) {
        if (field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY}"]`) && field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY}"]`).classList.contains('deployment-ships')) {
          if (field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY + 1}"]`)) {
            field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY + 1}"]`).classList.add('none-hit')
          }
          if (field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY - 1}"]`)) {
            field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY - 1}"]`).classList.add('none-hit')
          }
        }
        if (!field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY}"]`)) {
          break;
        }
        if (!field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY}"]`).classList.contains('deployment-ships')) {
          if (field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY + 1}"]`)) {
            field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY + 1}"]`).classList.add('none-hit')
          }
          if (field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY}"]`)) {
            field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY}"]`).classList.add('none-hit')
          }
          if (field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY - 1}"]`)) {
            field.querySelector(`[data-x="${dataX + i * n}"][data-y="${dataY - 1}"]`).classList.add('none-hit')
          }
          break;
        }
      }
    }

    if (field === compField) {
      if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY}"]`).classList.contains('vertically')) {
        verticalBlindSpot(field, dataX, dataY, 1);
        verticalBlindSpot(field, dataX, dataY, -1);
      }
      if (field.querySelector(`[data-x="${dataX}"][data-y="${dataY}"]`).classList.contains('horizontally')) {
        horizontalBlindSpot(field, dataX, dataY, 1);
        horizontalBlindSpot(field, dataX, dataY, -1);
      }
    }

    let combatReadyDeck = field.querySelectorAll('.combat-ready-deck');
    if (combatReadyDeck.length === 0) {
      textMassages.innerText = 'Победа!!!'
      if (field === compField) {
        compField.removeEventListener('click', userShot);
      }
      if (field === userField) {
        return false;
      }
    }
  }
}

function userShot(event) {
  let cellShot = event.target;
  if (cellShot.classList.contains('deployment-ships')) {
    cellShot.classList.add('hit');

    let dataX = +cellShot.dataset.x;
    let dataY = +cellShot.dataset.y;

    hitCheck(compField, dataX, dataY);
  }
  if (!cellShot.classList.contains('deployment-ships') && !cellShot.classList.contains('none-hit')) {
    cellShot.classList.add('none-hit');
    compField.removeEventListener('click', userShot);
    textMassages.innerText = 'Ход компьютера';
    compShot();
  }
}

function compShot() {
  setTimeout(() => {
    textMassages.innerText = 'Ход игрока';

    let dataY = randomNumbers(10);
    let dataX = randomNumbers(10);

    for (let i = 0; i < 2; i++) {
      let cellShotComp = userField.querySelector(`[data-x="${dataX}"][data-y="${dataY}"]`);
      if (!cellShotComp.classList.contains('none-hit') && !cellShotComp.classList.contains('hit')) {
        if (cellShotComp.classList.contains('deployment-ships')) {
          cellShotComp.classList.add('hit');
          hitCheck(userField, dataX, dataY);
          compShot();
        }
        if (!cellShotComp.classList.contains('deployment-ships')) {
          cellShotComp.classList.add('none-hit');
          compField.addEventListener('click', userShot);
        }
        break;
      }
      dataY = randomNumbers(10);
      dataX = randomNumbers(10);
      i = 0;
    }
  }, 2000)
}

function startOver() {
  location.reload();
}

const btnShot = document.querySelector('.btn__start-over');
btnShot.addEventListener('click', startOver)

function startBattle() {
  clearingField(compField);

  random(compField, 1, 10, 7, 7, 10, 4);
  random(compField, 2, 10, 8, 8, 10, 3);
  random(compField, 3, 10, 9, 9, 10, 2);
  random(compField, 4, 10, 10, 10, 10, 1);

  const userTdAll = userField.querySelectorAll('td');
  userTdAll.forEach(td => {
    if (td.firstElementChild) {
      td.removeChild(td.firstElementChild)
    }
  })

  const bigShipsHangar = document.querySelector('.comp-side .big-ships');
  const smallShipsHangar = document.querySelector('.comp-side .small-ships');
  bigShipsHangar.innerHTML = '';
  smallShipsHangar.innerHTML = '';

  let headsHails = Math.floor(Math.random() * 2);
  if (headsHails === 0) {
    textMassages.innerText = 'Бой начат! Ход компьютера';
    compShot();
  }
  if (headsHails === 1) {
    textMassages.innerText = 'Бой начат! Ход игрока';
    compField.addEventListener('click', userShot)
  }

  btnRandom.disabled = true;
  btnStartBattle.disabled = true;
  btnRandom.classList.add('btn-disabled');
  btnStartBattle.classList.add('btn-disabled');
}

const btnStartBattle = document.querySelector('.btn__battle');

btnRandom.addEventListener('click', startRandom);
btnStartBattle.addEventListener('click', startBattle);