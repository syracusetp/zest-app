'use strict';

angular.module('App.schedule',[
  'ui.router',
  'App.services.api.booking',
  'App.services.api.scheduling'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule', {
        url: '/schedule/{bookingId}',
        templateUrl: 'app/schedule/schedule.html',
        controller: 'ScheduleCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('ScheduleCtrl', function ($q, Auth, AuxApiService, _, $window, $stateParams, Booking, $mdDialog,
                                        SchedulingApiService, moment, $state) {
    var vm = this;

    vm.loading = true;
    vm.booking = Booking.get({id: $stateParams.bookingId}, function(booking){
      vm.booking = booking;
      vm.loading = false;
      init();
    }, function(resp){
      vm.loading = false;
      $mdDialog.show(
        $mdDialog.alert()
          .title('Error')
          .content(resp)
          .ok('Ok')
      );
    });

    vm.update = function(){
      vm.times = _.map(_.keys(vm.openings[vm.date]), function(time){
        return {
          val: (''+(parseInt(time)+50)).replace(/50$/,'30'),
          key: time
        };
      });
    };

    vm.set = function() {
      vm.EmployeeId = _.sample(vm.openings[vm.date][vm.time]);
    };

    vm.next = function(){

     var serviceObject = 'HomeCleaningService';
     switch(vm.booking.ServiceType.name){
       case 'homecleaning':
         serviceObject = 'HomeCleaningService';
         break;
       case 'officecleaning':
         serviceObject = 'OfficeCleaningService';
         break;
       case 'fumigation':
         serviceObject = 'FumigationService';
         break;
       case 'airconditioner':
         serviceObject = 'AirConditionerService';
         break;
       case 'postconstructioncleaning':
         serviceObject = 'PostConstructionCleaningService';
         break;
       default:
         serviceObject = 'HomeCleaningService';
     }

      var schedule = {
        frequencyName: vm.booking.Frequency.name,
        FrequencyId: vm.booking.Frequency.id,
        serviceName: vm.booking.ServiceType.name,
        EmployeeId: vm.EmployeeId,
        CustomerId: vm.booking.CustomerId,
        BookingId: vm.booking.id,
        serviceId: vm.booking[serviceObject].id,
        hours: vm.booking.hours,
        date: moment(vm.date),
        etime: vm.time,
        week: (function(date){
          var prefixes = [1,2,3,4,5];
          return prefixes[0 || moment(date).date() / 7];
        })(this.date),
        serviceObject: 'HomeCleaningService'
      };

      vm.scheduling = true;
      SchedulingApiService.complete(schedule).then(function(){
        $state.go('pay',{bookingId: vm.booking.id});
      }).catch(function(resp){
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp)
            .ok('Ok')
        );
      }).finally(function(){
        vm.scheduling = false;
      });
    };

    fitFooter();
    angular.element($window).bind('resize',function(){
      fitFooter();
    });

    function init(){
      vm.openings = SchedulingApiService.fetchOpenings(vm.booking.hours).then(function(openings){
        vm.openings = openings;
        vm.dates = _.map(_.filter(_.keys(openings), function(date){return date.length === 10;}), function(date){
          return {
            val: moment(date).format('ddd MMM D'),
            key: date
          };
        });
      });
    }

    function fitFooter(){
      vm.inner = $window.innerHeight;
      $('#homecleaning-form-container').height(vm.inner-55);
    }

  });
