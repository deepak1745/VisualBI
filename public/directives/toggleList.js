/*
   * Copyright 2016 NIIT Ltd, Wipro Ltd.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * Contributors:
   *
   * 1. Abhilash Kumbhum
   * 2. Anurag Kankanala
   * 3. Bharath Jaina
   * 4. Digvijay Singam
   * 5. Sravani Sanagavarapu
   * 6. Vipul Kumar
*/

var hotChocolate = angular.module("hotChocolate");
hotChocolate.directive('toggleList', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function() {
        $this = $(this).children('span');
          $this.parent().parent().children('ul.nav-left-ml').toggle(200);
          var cs = $this.attr("class");
          if(cs == 'nav-toggle-icon glyphicon glyphicon-chevron-right') {
            $this.removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
          }
          if(cs == 'nav-toggle-icon glyphicon glyphicon-chevron-down') {
            $this.removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
          }
      });
    } // end link function
  }; // end return
}); // toggleList directive end
