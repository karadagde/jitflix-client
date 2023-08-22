export default function createQualitySettingsButton(
  quality: number,
  qualityLevels: any
) {
  const controls = document.querySelector('.vjs-fullscreen-control');
  const qualityButton = document.getElementById('vjs-quality-selector');
  if (controls && !qualityButton) {
    const qualityButton = createQualitySettingsDiv();
    const qualityMenu = createQualitySettingsMenu(qualityLevels);
    qualityButton.appendChild(qualityMenu);
    controls.before(qualityButton);
  }

  const menuList = document.getElementById('vjs-quality-selector-menu-list');
  if (menuList) {
    const menuItem = createQualitySettingsMenuItem(quality, qualityLevels);
    menuList.appendChild(menuItem);
  }
}

function createQualitySettingsDiv() {
  const div = document.createElement('div');
  div.classList.add(
    'vjs-quality-selector',
    'vjs-menu-button',
    'vjs-menu-button-popup',
    'vjs-control',
    'vjs-button'
  );
  div.setAttribute('id', 'vjs-quality-selector');

  const selectedQuality = document.createElement('div');
  selectedQuality.classList.add('vjs-selected-quality-value');
  selectedQuality.setAttribute('id', 'vjs-selected-quality-value');

  const qualityLevelButton = document.createElement('button');
  qualityLevelButton.classList.add(
    'vjs-quality-button',
    'vjs-menu-button',
    'vjs-menu-button-popup',
    'vjs-button'
  );
  qualityLevelButton.innerHTML = `<span class="vjs-icon-placeholder" aria-hidden="true"></span>
      <span class="vjs-control-text" aria-live="polite">Quality Rate</span>`;

  div.addEventListener('click', () => {
    const menu = document.getElementById('vjs-quality-selector-menu');
    if (menu) {
      menu.classList.toggle('vjs-selected');
    }
  });

  div.addEventListener('mouseover', () => {
    if (div.classList.contains('vjs-hover')) {
      return;
    }

    div.classList.add('vjs-hover');
  });
  div.addEventListener('mouseout', () => {
    if (!div.classList.contains('vjs-hover')) {
      return;
    }

    div.classList.toggle('vjs-hover');
  });

  div.appendChild(selectedQuality);
  div.appendChild(qualityLevelButton);

  return div;
}

function createQualitySettingsMenu(qualityLevels: any) {
  const menu = document.createElement('div');
  menu.classList.add('vjs-quality-selector-menu', 'vjs-menu');
  menu.setAttribute('id', 'vjs-quality-selector-menu');

  const menuList = document.createElement('ul');
  menuList.classList.add('vjs-quality-selector-menu-list', 'vjs-menu-content');
  menuList.setAttribute('id', 'vjs-quality-selector-menu-list');
  menuList.setAttribute('role', 'menu');

  const menuItem = createQualitySettingsMenuItem('auto', qualityLevels);
  menuItem.addEventListener('click', () => {
    setQualityStream('auto', qualityLevels);
    setSelectedQuality('auto');
  });

  menuList.appendChild(menuItem);

  menu.appendChild(menuList);
  return menu;
}

function createQualitySettingsMenuItem(
  quality: number | 'auto',
  qualityLevels: any
) {
  const menuItem = document.createElement('li');
  menuItem.classList.add('vjs-quality-selector-menu-item', 'vjs-menu-item');
  menuItem.setAttribute('role', 'menuitemradio');
  menuItem.setAttribute('tabindex', '-1');
  menuItem.setAttribute('aria-disabled', 'false');
  menuItem.setAttribute('aria-checked', 'false');
  menuItem.setAttribute('data-quality', quality.toString());
  menuItem.setAttribute('id', 'quality-level-' + quality.toString());
  menuItem.innerHTML = `<span class="vjs-menu-item-text">${quality}</span>
      <span class="vjs-control-text" aria-live="polite"></span>`;
  menuItem.addEventListener('click', () => {
    setQualityStream(quality, qualityLevels);
    setSelectedQuality(quality);
  });
  return menuItem;
}

export function setSelectedQuality(quality: number | 'auto') {
  const selectedQuality = document.getElementById('vjs-selected-quality-value');
  const selectedQualityItem = document.getElementById(
    'quality-level-' + quality.toString()
  );

  if (selectedQuality && selectedQualityItem) {
    selectedQuality.innerHTML = quality.toString();
    document
      .querySelector('#vjs-quality-selector-menu-list')
      ?.querySelectorAll('li')
      .forEach((item) => {
        item.setAttribute('aria-checked', 'false');
        item.classList.remove('vjs-selected');
      });

    selectedQualityItem.setAttribute('aria-checked', 'true');
    selectedQualityItem.classList.add('vjs-selected');
  }
}

function setQualityStream(quality: number | 'auto', qualityLevels: any) {
  if (quality === 'auto') {
    qualityLevels.levels_.forEach((item: any) => {
      item.enabled = true;
    });
  } else {
    qualityLevels.levels_.forEach((item: any) => {
      if (item.height === quality) {
        item.enabled = true;
      } else {
        item.enabled = false;
      }
    });
  }
}
