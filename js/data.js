/* exported data */

var data = {
  view: 'edit-profile',
  profile: {
    username: '',
    fullName: '',
    location: '',
    avatarUrl: '',
    bio: ''
  },
  entries: []
};

var $profileForm = document.querySelector('#profile-form');
var $profile = document.querySelector('#profile');
var $defaultImg = document.querySelector('.default-img');
var $entriesLink = document.querySelector('#entries-link');
var $ol = document.querySelector('ol');
var $entriesForm = document.querySelector('#entries-form');
var $defaultEntryImg = document.querySelector('.default-entry-img');
var $view = document.querySelectorAll('.view');

$profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.username = $profileForm.elements.username.value;
  data.profile.fullName = $profileForm.elements.fullName.value;
  data.profile.location = $profileForm.elements.location.value;
  data.profile.avatarUrl = $profileForm.elements.avatarUrl.value;
  data.profile.bio = $profileForm.elements.bio.value;
  $profileForm.reset();
  $defaultImg.src = 'images/placeholder-image-square.jpg';
  return viewSwap('profile');
});

var previousdataJSON = localStorage.getItem('javascript-local-storage');

if (previousdataJSON !== null) {
  data = JSON.parse(previousdataJSON);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});

function renderProfile() {
  var $divContainer = document.createElement('div');
  $divContainer.setAttribute('class', 'container');
  var $h1 = document.createElement('h1');
  $h1.textContent = data.profile.fullName;
  $divContainer.appendChild($h1);
  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  $divContainer.appendChild($divRow);
  var $divColumnHalf = document.createElement('div');
  $divColumnHalf.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumnHalf);
  var $img = document.createElement('img');
  $img.setAttribute('src', data.profile.avatarUrl);
  $divColumnHalf.appendChild($img);
  var $divColumnHalf2 = document.createElement('div');
  $divColumnHalf2.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumnHalf2);
  var $divViewUsername = document.createElement('div');
  $divViewUsername.setAttribute('class', 'view-username');
  $divColumnHalf2.appendChild($divViewUsername);
  var $iFar = document.createElement('i');
  $iFar.setAttribute('class', 'far fa-user');
  $divViewUsername.appendChild($iFar);
  var $h3Username = document.createElement('h3');
  $h3Username.textContent = data.profile.username;
  $divViewUsername.appendChild($h3Username);
  var $divViewLocation = document.createElement('div');
  $divViewLocation.setAttribute('class', 'view-location');
  $divColumnHalf2.appendChild($divViewLocation);
  var $iFas = document.createElement('i');
  $iFas.setAttribute('class', 'fas fa-map-marker-alt');
  $divViewLocation.appendChild($iFas);
  var $h3Location = document.createElement('h3');
  $h3Location.textContent = data.profile.location;
  $divViewLocation.appendChild($h3Location);
  var $divViewBio = document.createElement('div');
  $divViewBio.setAttribute('class', 'view-bio');
  $divColumnHalf2.appendChild($divViewBio);
  var $pBio = document.createElement('p');
  $pBio.textContent = data.profile.bio;
  $divViewBio.appendChild($pBio);
  var $divLink = document.createElement('div');
  $divLink.setAttribute('class', 'edit-link');
  $divColumnHalf2.appendChild($divLink);
  var $link = document.createElement('a');
  $link.setAttribute('href', '#');
  $link.setAttribute('data-view', 'edit-profile');
  $link.textContent = 'Edit';
  $divLink.appendChild($link);
  return $divContainer;
}

function viewSwap(dataView) {
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].id === dataView) {
      $view[i].className = '';
      data.view = $view[i].id;
    } else {
      $view[i].className = 'hidden';
    }
  }
  if (dataView === 'edit-profile') {
    $profileForm.elements.username.value = data.profile.username;
    $profileForm.elements.fullName.value = data.profile.fullName;
    $profileForm.elements.location.value = data.profile.location;
    $profileForm.elements.avatarUrl.value = data.profile.avatarUrl;
    $profileForm.elements.bio.value = data.profile.bio;
    if (data.profile.username !== '') {
      $defaultImg.src = data.profile.avatarUrl;
    }
    if (data.profile.username === '') {
      $entriesLink.className = 'hidden';
    }
  }
  if (dataView === 'profile') {
    $profile.removeChild($profile.childNodes[0]);
    $profile.appendChild(renderProfile());
  }
  if (dataView === 'entries') {
    $ol.prepend(renderEntry(data.entries[0]));
  }
  if (data.profile.username !== '') {
    $entriesLink.className = '';
  }
}

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.profile.username === '') {
    viewSwap('edit-profile');
  }
  if (data.profile.username !== '') {
    viewSwap(data.view);
  }
});

document.addEventListener('click', function (event) {
  if (event.target && event.target.nodeName === 'A') {
    if (event.target.textContent === 'Edit') {
      viewSwap('edit-profile');
    }
    if ((event.target.textContent === 'Profile') && (data.profile.username !== '')) {
      viewSwap('profile');
    }
    if (event.target.textContent === 'Entries') {
      viewSwap('entries');
    }
    if (event.target.textContent === 'New') {
      viewSwap('create-entry');
    }
  }
});

$entriesForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var entriesObject = {
    title: '',
    imageUrl: '',
    notes: ''
  };
  entriesObject.title = $entriesForm.elements.title.value;
  entriesObject.imageUrl = $entriesForm.elements.photoUrl.value;
  entriesObject.notes = $entriesForm.elements.notes.value;
  data.entries.unshift(entriesObject);
  $entriesForm.reset();
  $defaultEntryImg.src = 'images/placeholder-image-square.jpg';
  return viewSwap('entries');
});

function renderEntry(entry) {
  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row');
  var $divColumnHalf = document.createElement('div');
  $divColumnHalf.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumnHalf);
  var $img = document.createElement('img');
  $img.setAttribute('src', entry.imageUrl);
  $divColumnHalf.appendChild($img);
  var $divColumnHalf2 = document.createElement('div');
  $divColumnHalf2.setAttribute('class', 'column-half');
  $divRow.appendChild($divColumnHalf2);
  var $divViewEntry = document.createElement('div');
  $divViewEntry.setAttribute('class', 'view-entry');
  $divColumnHalf2.appendChild($divViewEntry);
  var $h4Title = document.createElement('h4');
  $h4Title.textContent = entry.title;
  $divViewEntry.appendChild($h4Title);
  var $pNotes = document.createElement('p');
  $pNotes.textContent = entry.notes;
  $divViewEntry.appendChild($pNotes);
  return $divRow;
}
