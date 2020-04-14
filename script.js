/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
document.addEventListener('DOMContentLoaded', () => {
  const ENGLISH_BUTTONS = [
    [
      { Backquote: ['~', '`'] },
      {
        Digit1: ['!', '1'],
      },
      {
        Digit2: ['@', '2'],
      },
      {
        Digit3: ['#', '3'],
      },
      {
        Digit4: ['$', '4'],
      },
      {
        Digit5: ['%', '5'],
      },
      {
        Digit6: [':', '6'],
      },
      {
        Digit7: ['?', '7'],
      },
      {
        Digit8: ['*', '8'],
      },
      {
        Digit9: ['(', '9'],
      },
      {
        Digit0: [')', '0'],
      },
      {
        Minus: ['_', '-'],
      },
      {
        Equal: ['+', '='],
      },
      {
        Backspace: ['Backspace'],
      },
    ],
    [
      {
        Tab: ['Tab'],
      },
      {
        KeyQ: ['Q'],
      },
      {
        KeyW: ['W'],
      },
      {
        KeyE: ['E'],
      },
      {
        KeyR: ['R'],
      },
      {
        KeyT: ['T'],
      },
      {
        KeyY: ['Y'],
      },
      {
        KeyU: ['U'],
      },
      {
        KeyI: ['I'],
      },
      {
        KeyO: ['O'],
      },
      {
        KeyP: ['P'],
      },
      {
        BracketLeft: ['['],
      },
      {
        BracketRight: [']'],
      },
      {
        Backslash: ['/', '\\'],
      },
      {
        Delete: ['DEL'],
      },
    ],
    [
      {
        CapsLock: ['CapsLock'],
      },
      {
        KeyA: ['A'],
      },
      {
        KeyS: ['S'],
      },
      {
        KeyD: ['D'],
      },
      {
        KeyF: ['F'],
      },
      {
        KeyG: ['G'],
      },
      {
        KeyH: ['H'],
      },
      {
        KeyJ: ['J'],
      },
      {
        KeyK: ['K'],
      },
      {
        KeyL: ['L'],
      },
      {
        Semicolon: [';'],
      },
      {
        Semicolon: ["'"],
      },

      {
        Enter: ['Enter'],
      },
    ],
    [
      {
        ShiftLeft: ['Shift'],
      },
      {
        Quote: ['\\'],
      },
      {
        KeyZ: ['Z'],
      },
      {
        KeyX: ['X'],
      },
      {
        KeyC: ['C'],
      },
      {
        KeyV: ['V'],
      },
      {
        KeyB: ['B'],
      },
      {
        KeyN: ['N'],
      },
      {
        KeyM: ['M'],
      },
      {
        Comma: ['.'],
      },
      {
        Period: [','],
      },
      {
        Slash: ['/'],
      },
      {
        ShiftRight: ['Shift'],
      },
    ],
    [
      {
        ArrowUp: ['↑'],
      },
      {
        ArrowLeft: ['←'],
      },
      {
        ArrowDown: ['↓'],
      },
      {
        ArrowRight: ['→'],
      },
    ],

    [
      {
        ControlLeft: ['Ctrl'],
      },
      {
        MetaLeft: ['⊞'],
      },
      {
        AltLeft: ['Alt'],
      },
      {
        Space: ['Space'],
      },
      {
        AltRight: ['Alt'],
      },
      {
        MetaRight: ['⊞'],
      },
      {
        ControlRight: ['Ctrl'],
      },
    ],
  ];

  const createItem = (newClass, keyButton, itemOne, itemTwo) => `
   <div
   onmousedown="return false" 
   onselectstart="return false"
   class="item ${newClass || ''}"
   data="${keyButton}">
    <span> 
   ${itemOne}<br>
   ${itemTwo || ''}
   </span>
   </div>`;

  const showKeyboard = (keyboard) => {
    let out = '<div class="container">';
    out += '<textarea class="textarea" cols="30" rows="5"></textarea>';
    out += '<div class="keyboard">';

    for (const k in keyboard) {
      out += '<div class="line">';
      for (const n in keyboard[k]) {
        for (const j in keyboard[k][n]) {
          const cls = j;
          const itemOne = keyboard[k][n][j][0];
          const itemTwo = keyboard[k][n][j][1];

          out += createItem(cls, j, itemOne, itemTwo);
        }
      }
      out += '</div>';
    }
    out += '</div>';
    out += '</div>';
    out += '</div>';
    document.body.innerHTML = out;
  };

  const keyboardActive = ({ code, target } = event) => {
    if (target.tagName === 'TEXTAREA')
      document.querySelectorAll('.item').forEach((elem) => {
        const attr = elem.getAttribute('data');
        if (code === attr) elem.classList.toggle('active');
      });
  };

  const keyboardRemove = ({ code } = event) => {
    document.querySelectorAll('.item').forEach((elem) => {
      const attr = elem.getAttribute('data');
      if (code === attr && code !== 'CapsLock') {
        elem.classList.remove('active');
      }
    });
  };

  const clickButton = ({ target } = event) => {
    if (
      target.classList.contains('textarea') ||
      target.classList.contains('container')
    ) {
      return false;
    }

    const input = document.querySelector('.textarea');
    const capsLock = document.querySelector('.CapsLock');
    const str = target.innerText;
    const arr = str.split('<br>').join('');
    const res = arr.match(/\S{1,}/g);

    target.classList.toggle('active');

    if (res[0] === 'Tab') {
      return (input.value += ' ');
    }

    if (res[0] === 'DEL') {
      return input.setRangeText(
        '',
        input.selectionStart,
        input.selectionEnd + 1
      );
    }

    if (res[0] === 'Backspace') {
      return (input.value = input.value.slice(0, input.value.length - 1));
    }

    if (
      res[0] === '⊞' ||
      res[0] === 'Shift' ||
      res[0] === 'Ctrl' ||
      res[0] === 'Alt' ||
      res[0] === 'Space'
    ) {
      return false;
    }

    if (res[0] === 'Enter') {
      return (input.value += '\n');
    }
    if (res[0] === 'CapsLock') {
      return false;
    }

    if (capsLock.classList.contains('active')) {
      if (res.length === 1) input.value += res[0].toUpperCase();
      else input.value += res[1].toUpperCase();
    } else if (res.length === 2) input.value += res[1].toLowerCase();
    else input.value += res[0].toLowerCase();
  };

  const removeActiveButton = () => {
    setTimeout(() => {
      document.querySelectorAll('.item').forEach((el) => {
        if (el.getAttribute('data') !== 'CapsLock') {
          el.classList.remove('active');
        }
      });
    }, 100);
  };

  showKeyboard(ENGLISH_BUTTONS);

  document.body.addEventListener('keydown', keyboardActive);
  document.body.addEventListener('keyup', keyboardRemove);
  document.body.addEventListener('click', clickButton);
  document.body.addEventListener('click', removeActiveButton);
});
