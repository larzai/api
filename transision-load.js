const style = document.createElement("style");
style.innerHTML = `
    [kezt-transition1] {
    opacity: 0;
    position: relative;
    top: 20px;
    transition: opacity 2s, top 1s;
}

[kezt-transition2] {
    opacity: 0;
    position: relative;
    left: 20px;
    transition: opacity 2s, left 1s;
}

[kezt-transition3] {
    opacity: 0;
    position: relative;
    right: 20px;
    transition: opacity 2s, right 1s;
}

[kezt-transition4] {
    opacity: 0;
    position: relative;
    bottom: 20px;
    transition: opacity 2s, bottom 1s;
}

[kezt-transition5] {
    opacity: 0;
    position: relative;
    transition: opacity 0.3s;
}
`;
document.head.appendChild(style);

function fadeInElements() {
  var fadeUpElements = document.querySelectorAll('[kezt-transition1], [kezt-transition2], [kezt-transition3], [kezt-transition4], [kezt-transition5]');
  fadeUpElements.forEach(function(element) {
    var rect = element.getBoundingClientRect();
    var elementTop = rect.top + window.pageYOffset;
    var windowHeight = window.innerHeight;
    var scrollPosition = window.scrollY;
    
    if (elementTop < windowHeight + scrollPosition) {
      if (!element.hasAttribute('kezt-transitioned')) {
        if (element.hasAttribute('kezt-transition1')) {
          element.style.opacity = 1;
          element.style.top = 0;
        } else if (element.hasAttribute('kezt-transition2')) {
          element.style.opacity = 1;
          element.style.left = 0;
        } else if (element.hasAttribute('kezt-transition3')) {
          element.style.opacity = 1;
          element.style.right = 0;
        } else if (element.hasAttribute('kezt-transition4')) {
          element.style.opacity = 1;
          element.style.bottom = 0;
        } else if (element.hasAttribute('kezt-transition5')) {
          element.style.opacity = 1;
        }
        element.setAttribute('kezt-transitioned', 'true');
      }
    }
  });
}

window.addEventListener('scroll', function() {
  fadeInElements();
});

window.onload = function() {
  fadeInElements();
};