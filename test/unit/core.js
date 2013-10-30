'use strict';

/* globals describe, beforeEach, afterEach, it, expect, Imager, jQuery, document */

function loadFixtures(location){
  var fixtures = document.createElement('div');
  fixtures.id = 'karma-fixtures';
  fixtures.innerHTML = window.__html__['test/fixtures/'+location+'.html'];
  document.body.appendChild(fixtures);

  return fixtures;
}

describe('Imager.js', function(){
  describe('handling {width} in data-src', function(){
    var fixtures;

    afterEach(function(){
      if(fixtures){
        document.body.removeChild(fixtures);
      }
    });

    it('should does not use RegExp anymore', function(done){
      fixtures = loadFixtures('data-src-old');
      var imgr = new Imager({ availableWidths: [320, 640] });

      setTimeout(function(){
        Object.keys(imgr.cache).forEach(function(key){
          var replacement = imgr.cache[key];

          expect(replacement.nodeName).to.eq('IMG');
          expect(replacement.getAttribute('src')).to.eq(replacement.getAttribute('data-src'));
        });

        done();
      }, 100);
    });

    it('should replace {width} by the computed width or a fallback', function(done){
      fixtures = loadFixtures('data-src-new');
      var imgr = new Imager({ availableWidths: [320, 640] });

      setTimeout(function(){
        expect(imgr.cache['base/Demo - Grunt/Assets/Images/Generated/C-320.jpg'].getAttribute('data-src')).to.eq('base/Demo - Grunt/Assets/Images/Generated/C-{width}.jpg');
        expect(imgr.cache['base/Demo - Grunt/Assets/Images/Generated/B-640.jpg'].getAttribute('data-src')).to.eq('base/Demo - Grunt/Assets/Images/Generated/B-{width}.jpg');
        expect(imgr.cache['base/test/fixtures/media-320/fillmurray.jpg'].getAttribute('data-src')).to.eq('base/test/fixtures/media-{width}/fillmurray.jpg');

        done();
      }, 100);
    });
  });
});