var $avatarURL = document.querySelector('#avatarUrl');
var $defaultImg = document.querySelector('.default-img');
var $photoUrl = document.querySelector('#photoUrl');
var $defaultEntryImg = document.querySelector('.default-entry-img');

$avatarURL.addEventListener('input', function (event) {
  var $urlValue = event.target.value;
  $defaultImg.src = $urlValue;
});

$photoUrl.addEventListener('input', function (event) {
  var $urlValue = event.target.value;
  $defaultEntryImg.src = $urlValue;
});
