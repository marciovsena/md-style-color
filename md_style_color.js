function MdStyleColor($mdColorPalette, $mdTheming) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      let group = attrs.mdStyleColor ? attrs.mdStyleColor : "accent";
      let palette = getPalette($mdTheming, element, group);
      let prop;
      let value;

      if(attrs.hasOwnProperty("mdTextColor")) {
        prop = "color";
        let hue = attrs.mdTextColor ? attrs.mdTextColor : "default";
        value = getColor($mdTheming, element, group, palette, hue);
      }else {
        prop = "background";
        let hue = attrs.mdBgColor ? attrs.mdBgColor : "default";
        value = getColor($mdTheming, element, group, palette, hue);
        let contrast = getColor($mdTheming, element, group, palette, hue, true);
        element.css("color", contrast.split(",").length == 3 ? `rgb(${contrast})` : `rgba(${contrast})`);
      }
      element.css(prop,`rgb(${value})`);

      function getColor($mdTheming, elem, group, palette, hue, isContrast) {
        let theme = angular.element(elem).controller('mdTheme').$mdTheme;
        hue = $mdTheming.THEMES[theme].colors[group].hues[hue];
        let color = $mdColorPalette[palette][hue];
        return isContrast ? color.contrast.join(",") : color.value.join(",");
      }

      function getPalette($mdTheming, elem, palette) {
        let theme = angular.element(elem).controller('mdTheme').$mdTheme;
        return $mdTheming.THEMES[theme].colors[palette].name;
      }
    }
  };
}

angular
  .module('app.md_style_color')
  .directive('mdStyleColor', MdStyleColor);
