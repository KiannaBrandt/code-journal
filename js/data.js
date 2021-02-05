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
var $defaultImg = document.querySelector('.default-img');

$profileForm.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.username = $profileForm.elements.username.value;
  data.profile.fullName = $profileForm.elements.fullName.value;
  data.profile.location = $profileForm.elements.location.value;
  data.profile.avatarUrl = $profileForm.elements.avatarUrl.value;
  data.profile.bio = $profileForm.elements.bio.value;
  $profileForm.reset();
  $defaultImg.src = 'images/placeholder-image-square.jpg';
});

var previousdataJSON = localStorage.getItem('javascript-local-storage');

data = JSON.parse(previousdataJSON);

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});
