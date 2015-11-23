'use strict';

angular.module('App.homecleaning',[
  'ui.router',
  'angularNumberPicker',
  'App.services.api.booking',
  'App.services.api.homecleaning'
])
  .config(function ($stateProvider) {
    $stateProvider
      .state('homecleaning', {
        url: '/homecleaning/{homeCleaningServiceId}/{zoneId}',
        templateUrl: 'app/homecleaning/homecleaning.html',
        controller: 'HomeCleaningCtrl',
        controllerAs: 'vm'
      });
  })
  .controller('HomeCleaningCtrl', function ($q, Auth, AuxApiService, _, $window, $stateParams, HomeCleaning,
                                            $mdDialog, CustomerApiService, BookingApiService) {
    var vm = this;

    init();

    vm.update = function(){
      vm.frequency = _.find(vm.frequencies, {name: vm.freq});
      vm.zone = _.find(vm.zones, {id: vm.service.ZoneId});
    };

    vm.extras = function(){
      var net = 0;
      _.each(vm.service.extras, function(extra){
        if(extra.selected){
          net += parseFloat(extra.rate);
        }
      });
      return net;
    };

    vm.total = function(){
      return (vm.hours()* (vm.frequency ? vm.frequency.rate : 0) + (vm.zone ? vm.zone.rate : 0) + vm.extras());
    };

    vm.hours = function(){
      var hrs = 2;
      if(vm.service && vm.service.bedrooms && vm.service.bathrooms){
        hrs += (vm.service.bedrooms-1)*0.5 + (vm.service.bathrooms-1)*0.5;
      }
      return hrs;
    };

    vm.next = function(){
      vm.loading = true;
      var extras = _.clone(vm.service.extras);
      vm.service.HomeCleaningServiceExtras = _.filter(vm.service.extras, 'selected');
      vm.service.ServiceTypeId = vm.ServiceTypeId;
      vm.service.FrequencyId = vm.frequency.id;
      vm.service.CustomerId = Auth.getCustomerId();
      console.log('service=>',vm.service);
      vm.service.$save(function(service){
        vm.loading = false;
        service.extras = extras;
        console.log('s=',service);
      }, function(resp){
        vm.loading = false;
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp)
            .ok('Ok')
        );
      });
    };

    fitFooter();
    angular.element($window).bind('resize',function(){
      fitFooter();
    });

    function fetchDetails(bookingId){
      var qs = [];

      var fCustomer = CustomerApiService.fetchCustomer(Auth.getCustomerId()).then(function(customer){
        vm.service.address = vm.service.address || customer.address;
        vm.service.city = vm.service.city || customer.city;
        vm.service.state = vm.service.state || customer.state;
        vm.service.postcode = vm.service.postcode || customer.postcode;
        vm.service.ZoneId = parseInt(vm.service.ZoneId || $stateParams.zoneId || customer.ZoneId);
      });
      qs.push(fCustomer);

      var fZones = AuxApiService.fetchZones().then(function(zones){
        vm.zones = _.sortBy(_.filter(zones, 'active'), 'neighborhood');
      });
      qs.push(fZones);

      var fExtras = AuxApiService.fetchExtras().then(function(extras){
        // TODO: figure this out
        // If HomeCleaningExtras exist in service object, then set them as selected
        vm.service.extras = _.map(_.sortBy(_.filter(extras, 'active'), 'rank'), function(extra){
          _.each(vm.service.extras, function(HomeCleaningExtras){
            if(extra.name === HomeCleaningExtras.name){
              extra.selected = true;
            }
          });
          return extra;
        });
      });
      qs.push(fExtras);

      var fFrequencies = AuxApiService.fetchFrequencies().then(function(frequencies){
        vm.frequencies = _.sortBy(_.filter(frequencies, 'active'), 'rank');
        vm.freq = _.find(vm.frequencies, {default:true}).name;
      });
      qs.push(fFrequencies);

      var fServiceTypes = AuxApiService.fetchServices().then(function(services){
        vm.ServiceTypeId = _.find(services, {name: 'homecleaning'}).id;
      });
      qs.push(fServiceTypes);

      if(bookingId){
        // Will be used to set the freq if it exists
        var fBooking = BookingApiService.fetchBooking(bookingId).then(function(booking){
          vm.booking = booking;
        });
        qs.push(fBooking);
      }

      $q.all(qs).catch(function(resp){
        $mdDialog.show(
          $mdDialog.alert()
            .title('Error')
            .content(resp)
            .ok('Ok')
        );
      }).finally(function(){
        vm.update();

        // Set freq from saved/existing booking
        if(vm.booking && vm.booking.FrequencyId){
          vm.freq = _.find(vm.frequencies, {id: vm.booking.FrequencyId}).name;
        }

        vm.loading = false;
      });

    }

    function init(){
      if($stateParams.homeCleaningServiceId){
        vm.loading = true;
        HomeCleaning.get({id: $stateParams.homeCleaningServiceId}, function(service){
          vm.service = service;
          fetchDetails(vm.service.BookingId);
        }, function(resp){
          $mdDialog.show(
            $mdDialog.alert()
              .title('Error')
              .content(resp)
              .ok('Ok')
          );
        });
      }else {
        vm.service = new HomeCleaning({
          bedrooms: 1,
          bathrooms: 1
        });
        fetchDetails();
      }
    }

    function fitFooter(){
      vm.inner = $window.innerHeight;
      $('#homecleaning-form-container').height(vm.inner-55);
    }

  });
