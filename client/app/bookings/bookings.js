'use strict';

angular.module('App.bookings',[
  'ui.router',
  'App.services.utils',
  'App.services.api.booking',
  'App.services.api.checkout'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('bookings', {
        url: '/bookings',
        templateUrl: 'app/bookings/bookings.html',
        controller: 'BookingsCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('BookingsCtrl', function ($q, Auth, _, BookingApiService, Booking, $mdDialog, moment, Utils, $state) {
    var vm = this;

    vm.loading = true;
    init();

    vm.edit = function(booking){
      var serviceName = booking.ServiceType.name,
          serviceObject = 'HomeCleaningService';

      switch(serviceName){
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

      $state.go(serviceName, {serviceId: booking[serviceObject].id});

    };

    vm.delete = function(booking){
      vm.loading = true;
      Booking.delete({id: booking.id}).$promise.then(function(){
        init();
      });
    };

    vm.nextDateTime = function(booking){
        var s;
        if(booking.ScheduledDailyBooking){
          return moment().format('ddd MMM D')+', '+Utils.ctime(booking.ScheduledDailyBooking.etime);
        }else if(booking.ScheduledOnceBooking){
          return moment(booking.ScheduledOnceBooking.date).format('ddd MMM D') +
                ', '+Utils.ctime(booking.ScheduledOnceBooking.etime);
        }else if(booking.ScheduledMonthlyBooking){
          s = moment().day(booking.ScheduledMonthlyBooking.day*booking.ScheduledMonthlyBooking.week);
          if(s < moment()){
            s.add(1, 'months');
          }
          return s.format('ddd MMM D') +
                ', '+Utils.ctime(booking.ScheduledMonthlyBooking.etime);

        }else if(booking.ScheduledBiWeeklyBooking){
          s = moment().day(booking.ScheduledBiWeeklyBooking.day*booking.ScheduledBiWeeklyBooking.week);
          if(s < moment()){
            s.add(14, 'days');
          }
          return s.format('ddd MMM D') +
            ', '+Utils.ctime(booking.ScheduledBiWeeklyBooking.etime);

        }else if(booking.ScheduledWeeklyBooking){
          s = moment().day(booking.ScheduledWeeklyBooking.day*booking.ScheduledWeeklyBooking.week);
          if(s < moment()){
            s.add(7, 'days');
          }
          return s.format('ddd MMM D') +
            ', '+Utils.ctime(booking.ScheduledWeeklyBooking.etime);
        }else if(booking.ScheduledTwiceWeeklyBooking){

        }
    };



    function init(){
      vm.scheduled = [];
      BookingApiService.fetchBookingsByCustomerId(Auth.getCustomerId())
        .then(function(bookings){
          vm.scheduled = _.filter(bookings, function(booking){
            var oncePassed = !(booking.ScheduledOnceBooking && (moment(booking.ScheduledOnceBooking.date) < moment()));
            return oncePassed;
          });
        })
        .catch(function(resp){
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error')
              .content(resp)
              .ok('Ok')
          );
        }).finally(function(){
          vm.loading = false;
        });

      vm.completed = [];
    }

  });
