/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
document.addEventListener('DOMContentLoaded', () => {
  const en = [
    [{ Backquote: ['~', '`'] },
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
    [{
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
    [{
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
      Semicolon: ['\''],
    },

    {
      Enter: ['Enter'],
    },
    ],
    [{
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
    [{
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

    [{
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

  const createItem = (newClass, attr, itemOne, itemTwo) => `
                <div
                onmousedown="return false" 
                onselectstart="return false"
                class="item ${newClass || ''}"
                data="${attr}">
                <span> 
                ${itemOne}<br>
                ${itemTwo || ''}
                </span>
                </div>`;

  const addClass = () => {
    const lines = [
      'first-line',
      'second-line',
      'third-line',
      'fourth-line',
      'fith-line',
      'sixth-line',
    ];
    const line = document.querySelectorAll('.line');
    return line.forEach((el, i) => el.classList.add(lines[i]));
  };

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

    addClass();
  };

  const keyboardActive = (event) => {
    const {
      code,
    } = event;
    [...document.querySelectorAll('.item')].map((elem) => {
      const attr = elem.getAttribute('data');
      if (code === attr) elem.classList.toggle('active');
    });
  };

  const keyboardRemove = (event) => {
    const {
      code,
    } = event;

    document.querySelectorAll('.item').forEach((elem) => {
      const attr = elem.getAttribute('data');

      if (code === attr && code !== 'CapsLock') {
        elem.classList.remove('active');
      }
    });
  };

  const clickButton = (event) => {
    const {
      target,
    } = event;
    const input = document.querySelector('.textarea');
    const capsLock = document.querySelector('.CapsLock');
    const str = target.innerText;
    const arr = str.split('<br>').join('');
    const res = arr.match(/\S{1,}/g);

    target.classList.toggle('active');

    if (res[0] === 'Tab') {
      return input.value += ' ';
    }

    if (res[0] === 'DEL') {
      return input.setRangeText(
        '',
        input.selectionStart,
        input.selectionEnd + 1,
      );
    }

    if (res[0] === 'Backspace') {
      return (input.value = input.value.slice(0, input.value.length - 1));
    }

    if (
      res[0] === '⊞'
      || res[0] === 'Shift'
      || res[0] === 'Ctrl'
      || res[0] === 'Alt'
      || res[0] === 'Space'
    ) {
      return;
    }

    if (res[0] === 'Enter') {
      return (input.value += '\n');
    }
    if (res[0] === 'CapsLock') {
      return;
    }

    if (capsLock.classList.contains('active')) {
      if (res.length === 1) input.value += res[0].toUpperCase();
      else input.value += res[1].toUpperCase();
    } else if (res.length === 2) input.value += res[1].toLowerCase();
    else input.value += res[0].toLowerCase();
  };

  const removeActiveButton = () => {
    setTimeout(() => {
      [...document.querySelectorAll('.item')].map((el) => {
        if (el.getAttribute('data') !== 'CapsLock') {
          el.classList.remove('active');
        }
      });
    }, 100);
  };

  showKeyboard(en);

  document
    .querySelector('.textarea')
    .addEventListener('keydown', keyboardActive);

  document.querySelector('.textarea').addEventListener('keyup', keyboardRemove);

  [...document.querySelectorAll('.line')].map((el) => el.addEventListener('click', clickButton));

  [...document.querySelectorAll('.line')].map((el) => el.addEventListener('click', removeActiveButton));
});
